'use client'

import { ExternalLink, Github, ChevronRight } from 'lucide-react'
import { useState } from 'react'
import Link from 'next/link'
import { projects } from '@/lib/projects'

export default function Projects() {
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
    <section className="py-16 md:py-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="space-y-12">
        {/* Section Header */}
        <div className="space-y-4 animate-fade-in-down">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground">Featured Projects</h2>
          <div className="w-12 h-1 bg-accent rounded-full" />
          <p className="text-base md:text-lg text-foreground/70 max-w-2xl">
            15 completed projects showcasing full-stack development, AI integration, and legal tech solutions. 150K+ lines of code across 4+ years.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-4 py-2 rounded-full transition-all text-sm font-medium ${selectedCategory === category.id
                  ? 'bg-accent text-primary'
                  : 'bg-card border border-border text-foreground hover:border-accent'
                }`}
            >
              {category.label}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {filteredProjects.map((project, index) => (
            <div
              key={project.id}
              className={`group rounded-xl overflow-hidden bg-card border border-border hover:border-accent hover:shadow-lg transition-all duration-300 h-full reveal-on-scroll stagger-${(index % 3) + 1}`}
            >
              {/* Image Container */}
              <div className="relative overflow-hidden h-48 bg-gradient-to-br from-accent/20 to-primary/20">
                <img
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                  <div className="flex gap-2 w-full">
                    <a
                      href={project.link}
                      className="flex-1 px-3 py-2 bg-accent text-primary rounded-lg hover:opacity-90 transition-opacity text-sm font-medium flex items-center justify-center gap-2"
                    >
                      <ExternalLink className="w-4 h-4" />
                      View
                    </a>
                    <a
                      href={project.github}
                      className="flex-1 px-3 py-2 border border-accent rounded-lg text-accent hover:bg-accent/10 transition-colors text-sm font-medium flex items-center justify-center gap-2"
                    >
                      <Github className="w-4 h-4" />
                      Code
                    </a>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 space-y-3">
                <h3 className="text-lg font-bold text-foreground group-hover:text-accent transition-colors">
                  {project.title}
                </h3>
                <p className="text-sm text-foreground/70 leading-relaxed">
                  {project.description}
                </p>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2 pt-4">
                  {project.tech.slice(0, 3).map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-1 text-xs rounded-full bg-accent/10 text-accent font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.tech.length > 3 && (
                    <span className="px-2 py-1 text-xs text-muted-foreground">
                      +{project.tech.length - 3} more
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View More */}
        <div className="flex justify-center pt-8">
          <Link href="/projects">
            <button className="inline-flex items-center gap-2 px-8 py-3 border border-accent text-accent rounded-lg hover:bg-accent/10 transition-all font-medium group">
              View All Projects
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </Link>
        </div>
      </div>
    </section>
  )
}
