'use client'

import { useState } from 'react'
import Link from 'next/link'
import { projects } from '@/lib/projects'
import { ExternalLink, Github, ChevronRight } from 'lucide-react'

export default function ProjectsPage() {
  const [selectedCategory, setSelectedCategory] = useState('all')

  const categories = [
    { id: 'all', label: 'All Projects (15)' },
    { id: 'fullstack', label: 'Full Stack' },
    { id: 'frontend', label: 'Frontend' },
    { id: 'backend', label: 'Backend' },
    { id: 'ai', label: 'AI/Tools' },
    { id: 'mobile', label: 'Mobile' },
  ]

  const filteredProjects =
    selectedCategory === 'all'
      ? projects
      : projects.filter((p) => p.category === selectedCategory)

  return (
    <main className="min-h-screen pt-20 md:pt-24 pb-20 px-4 sm:px-6 lg:px-8 bg-background text-foreground">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12 animate-fade-in-down">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-accent mb-6 hover:gap-3 transition-all"
          >
            ← Back to Home
          </Link>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4">
            All Projects
          </h1>
          <p className="text-base md:text-lg text-foreground/70 max-w-2xl">
            Browse through my collection of 15 completed projects spanning full-stack development, AI integration, and specialized tools.
          </p>
        </div>

        {/* Category Filter */}
        <div className="mb-12 flex flex-wrap gap-2 md:gap-3">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-full font-medium text-sm transition-all ${
                selectedCategory === cat.id
                  ? 'bg-accent text-primary'
                  : 'bg-card border border-border text-foreground hover:border-accent/50'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {filteredProjects.map((project, index) => (
            <Link key={project.id} href={`/projects/${project.slug}`}>
              <div
                className="h-full p-6 md:p-8 rounded-2xl bg-card border border-border hover:border-accent/50 hover:shadow-xl transition-all duration-300 cursor-pointer group animate-fade-in-up"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                {/* Project Image */}
                <div className="w-full aspect-video rounded-xl overflow-hidden mb-6 bg-muted">
                  <img
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                {/* Content */}
                <div className="space-y-4">
                  {/* Category & Year */}
                  <div className="flex items-center justify-between">
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-accent/20 text-accent">
                      {project.category === 'fullstack'
                        ? 'Full Stack'
                        : project.category.charAt(0).toUpperCase() + project.category.slice(1)}
                    </span>
                    <span className="text-sm text-muted-foreground">{project.yearBuilt}</span>
                  </div>

                  {/* Title */}
                  <h2 className="text-xl md:text-2xl font-bold text-foreground group-hover:text-accent transition-colors">
                    {project.title}
                  </h2>

                  {/* Description */}
                  <p className="text-sm md:text-base text-foreground/70 line-clamp-2">
                    {project.description}
                  </p>

                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-2">
                    {project.tech.slice(0, 3).map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-1 text-xs rounded bg-background border border-border text-foreground/70"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.tech.length > 3 && (
                      <span className="px-2 py-1 text-xs rounded bg-background border border-border text-foreground/70">
                        +{project.tech.length - 3} more
                      </span>
                    )}
                  </div>

                  {/* Stats */}
                  <div className="flex items-center justify-between pt-4 border-t border-border">
                    <div className="flex items-center gap-4 text-sm text-foreground/70">
                      <span>{project.linesOfCode?.toLocaleString()} LOC</span>
                    </div>
                    <div className="flex items-center gap-2 text-accent group-hover:gap-3 transition-all">
                      View Details
                      <ChevronRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <div className="text-center py-20">
            <p className="text-xl text-foreground/70">No projects found in this category.</p>
          </div>
        )}
      </div>
    </main>
  )
}
