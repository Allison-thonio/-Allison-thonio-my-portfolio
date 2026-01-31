'use client'

import React from "react"

import { useState } from 'react'
import { projects, Project } from '@/lib/projects'
import { Plus, Edit2, Trash2, Github, ExternalLink, X, ChevronDown } from 'lucide-react'

export default function ProjectsManager() {
  const [projectsList, setProjectsList] = useState<Project[]>(projects)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [formData, setFormData] = useState<Partial<Project>>({})
  const [showForm, setShowForm] = useState(false)
  const [expandedId, setExpandedId] = useState<number | null>(null)

  const handleEdit = (project: Project) => {
    setEditingId(project.id)
    setFormData(project)
    setShowForm(true)
  }

  const handleDelete = (id: number) => {
    setProjectsList(projectsList.filter((p) => p.id !== id))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (editingId) {
      setProjectsList(
        projectsList.map((p) =>
          p.id === editingId ? { ...p, ...formData } : p
        )
      )
    } else {
      const newProject = {
        ...formData,
        id: Math.max(...projectsList.map((p) => p.id), 0) + 1,
        slug: (formData.title || '').toLowerCase().replace(/\s+/g, '-'),
      } as Project
      setProjectsList([...projectsList, newProject])
    }
    setShowForm(false)
    setEditingId(null)
    setFormData({})
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
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-foreground">Projects Manager</h2>
          <p className="text-foreground/60 mt-1">Manage your 15 completed projects</p>
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
                className="px-6 py-2 bg-accent text-primary rounded-lg hover:opacity-90 transition-opacity font-medium"
              >
                {editingId ? 'Update' : 'Add'} Project
              </button>
              <button
                type="button"
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
