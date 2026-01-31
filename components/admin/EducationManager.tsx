'use client'

import React from "react"

import { useState } from 'react'
import { experience } from '@/lib/projects'
import { Plus, Edit2, Trash2 } from 'lucide-react'

interface EducationEntry {
  year: number
  level: string
  milestone: string
  description: string
}

export default function EducationManager() {
  const [timeline, setTimeline] = useState<EducationEntry[]>(experience.educationTimeline)
  const [editingIndex, setEditingIndex] = useState<number | null>(null)
  const [formData, setFormData] = useState<EducationEntry>({
    year: 0,
    level: '',
    milestone: '',
    description: '',
  })
  const [showForm, setShowForm] = useState(false)

  const handleEdit = (index: number) => {
    setEditingIndex(index)
    setFormData(timeline[index])
    setShowForm(true)
  }

  const handleDelete = (index: number) => {
    setTimeline(timeline.filter((_, i) => i !== index))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (editingIndex !== null) {
      const newTimeline = [...timeline]
      newTimeline[editingIndex] = formData
      setTimeline(newTimeline)
    } else {
      setTimeline([...timeline, formData])
    }
    setShowForm(false)
    setEditingIndex(null)
    setFormData({ year: 0, level: '', milestone: '', description: '' })
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-foreground">Law Journey Timeline</h2>
          <p className="text-foreground/60 mt-1">Manage your educational milestones</p>
        </div>
        <button
          onClick={() => {
            setShowForm(true)
            setEditingIndex(null)
            setFormData({ year: 0, level: '', milestone: '', description: '' })
          }}
          className="flex items-center gap-2 px-6 py-3 bg-accent text-primary rounded-lg hover:opacity-90 transition-opacity font-medium"
        >
          <Plus className="w-5 h-5" />
          Add Milestone
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-card border border-border rounded-lg p-4">
          <div className="text-2xl font-bold text-accent">{experience.yearsInDevelopment}+</div>
          <div className="text-sm text-foreground/60">Years Experience</div>
        </div>
        <div className="bg-card border border-border rounded-lg p-4">
          <div className="text-2xl font-bold text-accent">{experience.projectsCompleted}</div>
          <div className="text-sm text-foreground/60">Projects Completed</div>
        </div>
        <div className="bg-card border border-border rounded-lg p-4">
          <div className="text-2xl font-bold text-accent">{(experience.totalLinesOfCode / 1000).toFixed(0)}K+</div>
          <div className="text-sm text-foreground/60">Lines of Code</div>
        </div>
        <div className="bg-card border border-border rounded-lg p-4">
          <div className="text-2xl font-bold text-accent">2023</div>
          <div className="text-sm text-foreground/60">Started Law School</div>
        </div>
      </div>

      {/* Form */}
      {showForm && (
        <div className="bg-card border border-border rounded-lg p-6">
          <h3 className="text-xl font-bold text-foreground mb-4">
            {editingIndex !== null ? 'Edit Milestone' : 'Add New Milestone'}
          </h3>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="number"
                placeholder="Year"
                value={formData.year || ''}
                onChange={(e) => setFormData({ ...formData, year: parseInt(e.target.value) })}
                className="px-4 py-2 rounded-lg bg-background border border-border text-foreground placeholder:text-foreground/40 focus:outline-none focus:border-accent"
              />
              <input
                type="text"
                placeholder="Level (e.g., 100L, 200L, 300L)"
                value={formData.level || ''}
                onChange={(e) => setFormData({ ...formData, level: e.target.value })}
                className="px-4 py-2 rounded-lg bg-background border border-border text-foreground placeholder:text-foreground/40 focus:outline-none focus:border-accent"
              />
            </div>

            <input
              type="text"
              placeholder="Milestone Title"
              value={formData.milestone || ''}
              onChange={(e) => setFormData({ ...formData, milestone: e.target.value })}
              className="w-full px-4 py-2 rounded-lg bg-background border border-border text-foreground placeholder:text-foreground/40 focus:outline-none focus:border-accent"
            />

            <textarea
              placeholder="Description"
              value={formData.description || ''}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-4 py-2 rounded-lg bg-background border border-border text-foreground placeholder:text-foreground/40 focus:outline-none focus:border-accent"
              rows={3}
            />

            <div className="flex gap-2">
              <button
                type="submit"
                className="px-6 py-2 bg-accent text-primary rounded-lg hover:opacity-90 transition-opacity font-medium"
              >
                {editingIndex !== null ? 'Update' : 'Add'} Milestone
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowForm(false)
                  setEditingIndex(null)
                  setFormData({ year: 0, level: '', milestone: '', description: '' })
                }}
                className="px-6 py-2 border border-border rounded-lg text-foreground hover:bg-background transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Timeline */}
      <div className="space-y-4">
        {timeline.map((entry, index) => (
          <div
            key={index}
            className="bg-card border border-border rounded-lg p-6 hover:border-accent transition-colors"
          >
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center">
                    <span className="text-sm font-bold text-accent">{entry.year}</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground">{entry.milestone}</h3>
                    <p className="text-sm text-accent">{entry.level}</p>
                  </div>
                </div>
                <p className="text-foreground/70">{entry.description}</p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleEdit(index)}
                  className="p-2 hover:bg-background rounded transition-colors text-accent"
                >
                  <Edit2 className="w-5 h-5" />
                </button>
                <button
                  onClick={() => handleDelete(index)}
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
