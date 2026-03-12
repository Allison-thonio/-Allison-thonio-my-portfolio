'use client'

import React, { useState, useEffect } from "react"
import { projects, Project } from '@/lib/projects'
import { Plus, Edit2, Trash2, Github, ExternalLink, X, Loader2, UploadCloud } from 'lucide-react'
import { db, storage } from '@/lib/firebase'
import { doc, getDoc, setDoc } from 'firebase/firestore'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'

export default function ProjectsManager() {
  const [projectsList, setProjectsList] = useState<Project[]>(projects)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [formData, setFormData] = useState<Partial<Project>>({})
  const [showForm, setShowForm] = useState(false)
  const [expandedId, setExpandedId] = useState<number | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [isUploading, setIsUploading] = useState(false)

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const docRef = doc(db, 'portfolio', 'projects')
        const docSnap = await getDoc(docRef)
        if (docSnap.exists()) {
           const data = docSnap.data().list
           if (data && Array.isArray(data)) {
             setProjectsList(data)
           }
        }
      } catch (error) {
        console.error("Error fetching projects:", error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchProjects()
  }, [])


  const handleEdit = (project: Project) => {
    setEditingId(project.id)
    setFormData(project)
    setShowForm(true)
  }

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setIsUploading(true)
    try {
      const storageRef = ref(storage, `portfolio/projects/${Date.now()}_${file.name}`)
      await uploadBytes(storageRef, file)
      const url = await getDownloadURL(storageRef)
      setFormData(prev => ({ ...prev, image: url }))
    } catch (error) {
      console.error("Error uploading image:", error)
      alert("Failed to upload image")
    } finally {
      setIsUploading(false)
    }
  }

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this project?")) return
    setIsSaving(true)
    try {
      const newList = projectsList.filter((p) => p.id !== id)
      await setDoc(doc(db, 'portfolio', 'projects'), { list: newList })
      setProjectsList(newList)
    } catch (error) {
      console.error("Error deleting project:", error)
      alert("Failed to delete project")
    }
    setIsSaving(false)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSaving(true)
    try {
      let newList: Project[]
      if (editingId) {
        newList = projectsList.map((p) =>
          p.id === editingId ? { ...p, ...formData } as Project : p
        )
      } else {
        const newProject = {
          ...formData,
          id: Math.max(...projectsList.map((p) => p.id), 0) + 1,
          slug: (formData.title || '').toLowerCase().replace(/\s+/g, '-'),
        } as Project
        newList = [...projectsList, newProject]
      }
      
      await setDoc(doc(db, 'portfolio', 'projects'), { list: newList })
      setProjectsList(newList)
      setShowForm(false)
      setEditingId(null)
      setFormData({})
    } catch (error) {
      console.error("Error saving project:", error)
      alert("Failed to save project")
    }
    setIsSaving(false)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    if (name === 'tech' || name === 'features' || name === 'challenges') {
      setFormData({
        ...formData,
        [name]: value.split(',').map((v) => v.trim()).filter(v => v),
      })
    } else if (name === 'linesOfCode' || name === 'yearBuilt' || name === 'id') {
      setFormData({ ...formData, [name]: parseInt(value) })
    } else {
      setFormData({ ...formData, [name]: value })
    }
  }

  return (
    <div className="space-y-6">
      {isLoading && (
        <div className="text-foreground/50 flex py-4 items-center gap-2">
          <Loader2 className="w-4 h-4 animate-spin" /> Loading Projects...
        </div>
      )}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-foreground">Projects Manager</h2>
          <p className="text-foreground/60 mt-1">Manage your active projects</p>
        </div>
        <button
          onClick={() => {
            setShowForm(true)
            setEditingId(null)
            setFormData({})
          }}
          className="flex items-center gap-2 px-6 py-3 bg-accent text-primary rounded-lg hover:opacity-90 transition-opacity font-medium"
        >
          <Plus className="w-5 h-5" />
          Add Project
        </button>
      </div>

      {/* Form */}
      {showForm && (
        <div className="bg-card border border-border rounded-lg p-6 space-y-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold text-foreground">
              {editingId ? 'Edit Project' : 'Add New Project'}
            </h3>
            <button
              onClick={() => {
                setShowForm(false)
                setEditingId(null)
                setFormData({})
              }}
              className="text-foreground/60 hover:text-foreground"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                name="title"
                placeholder="Project Title"
                value={formData.title || ''}
                onChange={handleInputChange}
                required
                className="px-4 py-2 rounded-lg bg-background border border-border text-foreground placeholder:text-foreground/40 focus:outline-none focus:border-accent"
              />
              <select
                name="category"
                value={formData.category || ''}
                onChange={handleInputChange}
                required
                className="px-4 py-2 rounded-lg bg-background border border-border text-foreground focus:outline-none focus:border-accent"
              >
                <option value="">Select Category</option>
                <option value="fullstack">Full Stack</option>
                <option value="frontend">Frontend</option>
                <option value="backend">Backend</option>
                <option value="ai">AI</option>
                <option value="mobile">Mobile</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-foreground">Project Image</label>
              <div className="flex items-center gap-4">
                {formData.image && (
                  <img src={formData.image} alt="Preview" className="w-16 h-16 object-cover rounded border border-border" />
                )}
                <label className={`flex items-center gap-2 px-4 py-2 bg-background border border-border rounded-lg text-foreground cursor-pointer hover:border-accent transition-colors ${isUploading ? 'opacity-50 pointer-events-none' : ''}`}>
                  {isUploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <UploadCloud className="w-4 h-4" />}
                  {isUploading ? 'Uploading...' : 'Upload Image'}
                  <input type="file" className="hidden" accept="image/*,.heic,.heif" onChange={handleFileUpload} disabled={isUploading} />
                </label>
              </div>
            </div>

            <textarea
              name="description"
              placeholder="Project Description"
              value={formData.description || ''}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-2 rounded-lg bg-background border border-border text-foreground placeholder:text-foreground/40 focus:outline-none focus:border-accent"
              rows={3}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                name="github"
                placeholder="GitHub Link"
                value={formData.github || ''}
                onChange={handleInputChange}
                className="px-4 py-2 rounded-lg bg-background border border-border text-foreground placeholder:text-foreground/40 focus:outline-none focus:border-accent"
              />
              <input
                type="text"
                name="link"
                placeholder="Live Link"
                value={formData.link || ''}
                onChange={handleInputChange}
                className="px-4 py-2 rounded-lg bg-background border border-border text-foreground placeholder:text-foreground/40 focus:outline-none focus:border-accent"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="number"
                name="yearBuilt"
                placeholder="Year Built"
                value={formData.yearBuilt || ''}
                onChange={handleInputChange}
                className="px-4 py-2 rounded-lg bg-background border border-border text-foreground placeholder:text-foreground/40 focus:outline-none focus:border-accent"
              />
              <input
                type="number"
                name="linesOfCode"
                placeholder="Lines of Code"
                value={formData.linesOfCode || ''}
                onChange={handleInputChange}
                className="px-4 py-2 rounded-lg bg-background border border-border text-foreground placeholder:text-foreground/40 focus:outline-none focus:border-accent"
              />
            </div>

            <textarea
              name="readme"
              placeholder="Project Overview/README"
              value={formData.readme || ''}
              onChange={handleInputChange}
              className="w-full px-4 py-2 rounded-lg bg-background border border-border text-foreground placeholder:text-foreground/40 focus:outline-none focus:border-accent"
              rows={3}
            />

            <input
              type="text"
              name="tech"
              placeholder="Technologies (comma-separated)"
              value={(formData.tech as string[])?.join(', ') || ''}
              onChange={handleInputChange}
              className="w-full px-4 py-2 rounded-lg bg-background border border-border text-foreground placeholder:text-foreground/40 focus:outline-none focus:border-accent"
            />

            <textarea
              name="features"
              placeholder="Features (comma-separated)"
              value={(formData.features as string[])?.join(', ') || ''}
              onChange={handleInputChange}
              className="w-full px-4 py-2 rounded-lg bg-background border border-border text-foreground placeholder:text-foreground/40 focus:outline-none focus:border-accent"
              rows={2}
            />

            <textarea
              name="challenges"
              placeholder="Challenges (comma-separated)"
              value={(formData.challenges as string[])?.join(', ') || ''}
              onChange={handleInputChange}
              className="w-full px-4 py-2 rounded-lg bg-background border border-border text-foreground placeholder:text-foreground/40 focus:outline-none focus:border-accent"
              rows={2}
            />

            <div className="flex gap-2 pt-4">
              <button
                type="submit"
                disabled={isSaving}
                className="px-6 py-2 bg-accent text-primary rounded-lg hover:opacity-90 transition-opacity font-medium flex items-center gap-2"
              >
                {isSaving && <Loader2 className="w-4 h-4 animate-spin" />}
                {editingId ? 'Update' : 'Add'} Project
              </button>
              <button
                type="button"
                disabled={isSaving}
                onClick={() => {
                  setShowForm(false)
                  setEditingId(null)
                  setFormData({})
                }}
                className="px-6 py-2 border border-border rounded-lg text-foreground hover:bg-background transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Projects List */}
      <div className="grid gap-4">
        {projectsList.map((project) => (
          <div
            key={project.id}
            className="bg-card border border-border rounded-lg p-4 md:p-6 hover:border-accent transition-colors"
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex-1">
                <h3 className="text-lg font-bold text-foreground mb-1">{project.title}</h3>
                <p className="text-sm text-foreground/60 mb-3">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-2 py-1 bg-accent/20 text-accent rounded text-xs font-medium">
                    {project.category}
                  </span>
                  {project.yearBuilt && (
                    <span className="px-2 py-1 bg-background text-foreground/70 rounded text-xs">
                      {project.yearBuilt}
                    </span>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-2">
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 hover:bg-background rounded transition-colors"
                    title="GitHub"
                  >
                    <Github className="w-5 h-5 text-foreground/60" />
                  </a>
                )}
                {project.link && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 hover:bg-background rounded transition-colors"
                    title="Live Link"
                  >
                    <ExternalLink className="w-5 h-5 text-foreground/60" />
                  </a>
                )}
                <button
                  onClick={() => handleEdit(project)}
                  className="p-2 hover:bg-background rounded transition-colors text-accent"
                >
                  <Edit2 className="w-5 h-5" />
                </button>
                <button
                  onClick={() => handleDelete(project.id)}
                  className="p-2 hover:bg-red-500/10 rounded transition-colors text-red-600 dark:text-red-400"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
