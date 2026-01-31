'use client'

import React, { useState } from 'react'
import { projects, Project } from '@/lib/projects'
import { Upload, Edit2, Trash2, Link as LinkIcon, Eye } from 'lucide-react'

export default function PicturesManager() {
  const [projectsList, setProjectsList] = useState<Project[]>(projects)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [newImageUrl, setNewImageUrl] = useState('')
  const [previewUrl, setPreviewUrl] = useState('')
  const [showForm, setShowForm] = useState(false)

  const handleEditImage = (projectId: number) => {
    const project = projectsList.find((p) => p.id === projectId)
    if (project) {
      setEditingId(projectId)
      setNewImageUrl(project.image)
      setPreviewUrl(project.image)
      setShowForm(true)
    }
  }

  const handleUpdateImage = () => {
    if (editingId && newImageUrl) {
      setProjectsList(
        projectsList.map((p) =>
          p.id === editingId ? { ...p, image: newImageUrl } : p
        )
      )
      setShowForm(false)
      setEditingId(null)
      setNewImageUrl('')
      setPreviewUrl('')
    }
  }

  const handleUrlChange = (url: string) => {
    setNewImageUrl(url)
    setPreviewUrl(url)
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        const result = event.target?.result as string
        setNewImageUrl(result)
        setPreviewUrl(result)
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-2">Manage Project Images</h2>
        <p className="text-foreground/70">Update images for your projects. You can upload from your device or provide a URL.</p>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projectsList.map((project) => (
          <div
            key={project.id}
            className="rounded-lg bg-card border border-border overflow-hidden hover:border-accent/50 transition-all"
          >
            {/* Image Preview */}
            <div className="w-full aspect-video bg-muted overflow-hidden relative group">
              <img
                src={project.image || '/placeholder.svg'}
                alt={project.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                <button
                  onClick={() => handleEditImage(project.id)}
                  className="p-2 bg-accent text-primary rounded-lg hover:opacity-90 transition-opacity"
                  title="Edit image"
                >
                  <Edit2 className="w-5 h-5" />
                </button>
                <a
                  href={project.image}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-primary text-accent rounded-lg hover:opacity-90 transition-opacity"
                  title="View full image"
                >
                  <Eye className="w-5 h-5" />
                </a>
              </div>
            </div>

            {/* Project Info */}
            <div className="p-4">
              <h3 className="font-semibold text-foreground mb-2 line-clamp-1">{project.title}</h3>
              <p className="text-xs text-foreground/60 mb-2 line-clamp-1">{project.image}</p>
              <button
                onClick={() => handleEditImage(project.id)}
                className="w-full px-3 py-2 text-sm bg-accent/20 text-accent rounded hover:bg-accent/30 transition-colors font-medium"
              >
                Edit Image
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Edit Form Modal */}
      {showForm && editingId && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-card border border-border rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-card border-b border-border p-6 flex justify-between items-center">
              <h3 className="text-xl font-bold text-foreground">
                Update Image: {projectsList.find((p) => p.id === editingId)?.title}
              </h3>
              <button
                onClick={() => {
                  setShowForm(false)
                  setEditingId(null)
                  setNewImageUrl('')
                  setPreviewUrl('')
                }}
                className="text-foreground/60 hover:text-foreground text-2xl"
              >
                ×
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Image Preview */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-foreground">Image Preview</label>
                <div className="w-full aspect-video bg-muted rounded-lg overflow-hidden border border-border">
                  {previewUrl ? (
                    <img
                      src={previewUrl || "/placeholder.svg"}
                      alt="Preview"
                      className="w-full h-full object-cover"
                      onError={() => setPreviewUrl('')}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-foreground/50">
                      <span>No image to preview</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Upload Methods */}
              <div className="space-y-4">
                {/* Method 1: URL Input */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-foreground flex items-center gap-2">
                    <LinkIcon className="w-4 h-4" />
                    Image URL
                  </label>
                  <input
                    type="text"
                    value={newImageUrl}
                    onChange={(e) => handleUrlChange(e.target.value)}
                    placeholder="https://example.com/image.jpg"
                    className="w-full px-4 py-2 rounded-lg bg-background border border-border text-foreground placeholder:text-foreground/40 focus:outline-none focus:border-accent"
                  />
                  <p className="text-xs text-foreground/60">Paste a direct image URL</p>
                </div>

                {/* Method 2: File Upload */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-foreground flex items-center gap-2">
                    <Upload className="w-4 h-4" />
                    Upload from Device
                  </label>
                  <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-accent/50 transition-colors cursor-pointer">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileUpload}
                      className="hidden"
                      id="file-upload"
                    />
                    <label htmlFor="file-upload" className="cursor-pointer">
                      <div className="flex flex-col items-center gap-2">
                        <Upload className="w-6 h-6 text-accent" />
                        <span className="text-sm text-foreground">Click to upload or drag and drop</span>
                        <span className="text-xs text-foreground/60">PNG, JPG, GIF up to 10MB</span>
                      </div>
                    </label>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2 pt-4 border-t border-border">
                <button
                  onClick={handleUpdateImage}
                  disabled={!newImageUrl}
                  className="flex-1 px-6 py-3 bg-accent text-primary rounded-lg hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-opacity font-medium"
                >
                  Update Image
                </button>
                <button
                  onClick={() => {
                    setShowForm(false)
                    setEditingId(null)
                    setNewImageUrl('')
                    setPreviewUrl('')
                  }}
                  className="flex-1 px-6 py-3 border border-border rounded-lg text-foreground hover:bg-background transition-colors font-medium"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
