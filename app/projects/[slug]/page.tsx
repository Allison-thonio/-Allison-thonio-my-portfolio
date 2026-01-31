'use client'

import { projects } from '@/lib/projects'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { ExternalLink, Github, ChevronLeft, CheckCircle, AlertCircle } from 'lucide-react'

export default function ProjectDetailPage() {
  const params = useParams()
  const slug = params.slug as string

  const project = projects.find((p) => p.slug === slug)

  if (!project) {
    return (
      <main className="min-h-screen pt-20 px-4 sm:px-6 lg:px-8 bg-background">
        <div className="max-w-4xl mx-auto text-center py-20">
          <h1 className="text-3xl font-bold text-foreground mb-4">Project Not Found</h1>
          <p className="text-foreground/70 mb-8">The project you're looking for doesn't exist.</p>
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-primary rounded-lg hover:opacity-90 transition-all"
          >
            ← Back to Projects
          </Link>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen pt-20 md:pt-24 pb-20 px-4 sm:px-6 lg:px-8 bg-background text-foreground">
      <div className="max-w-4xl mx-auto">
        {/* Navigation */}
        <div className="mb-8 animate-fade-in-down">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-sm text-accent hover:gap-3 transition-all mb-6"
          >
            <ChevronLeft className="w-4 h-4" />
            Back to Projects
          </Link>
        </div>

        {/* Hero Section */}
        <div className="mb-12 animate-fade-in-down">
          {/* Image */}
          <div className="w-full rounded-2xl overflow-hidden mb-8 bg-muted aspect-video">
            <img
              src={project.image || "/placeholder.svg"}
              alt={project.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Header */}
          <div className="space-y-4">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div>
                <span className="px-4 py-2 rounded-full text-sm font-semibold bg-accent/20 text-accent">
                  {project.category === 'fullstack'
                    ? 'Full Stack'
                    : project.category.charAt(0).toUpperCase() + project.category.slice(1)}
                </span>
              </div>
              <span className="text-sm text-muted-foreground">Built in {project.yearBuilt}</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground">
              {project.title}
            </h1>

            <p className="text-lg md:text-xl text-foreground/70 max-w-2xl leading-relaxed">
              {project.description}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-6">
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-accent text-primary rounded-lg hover:opacity-90 transition-all font-semibold"
              >
                <ExternalLink className="w-5 h-5" />
                View Live Project
              </a>
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 border-2 border-accent text-accent rounded-lg hover:bg-accent hover:text-primary transition-all font-semibold"
              >
                <Github className="w-5 h-5" />
                View Source Code
              </a>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Left Column - Content */}
          <div className="lg:col-span-2 space-y-12">
            {/* Overview */}
            <section className="animate-fade-in-up">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">Project Overview</h2>
              <div className="prose prose-invert max-w-none">
                <p className="text-base md:text-lg text-foreground/80 leading-relaxed">
                  {project.readme}
                </p>
              </div>
            </section>

            {/* Features */}
            {project.features && project.features.length > 0 && (
              <section className="animate-fade-in-up">
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6">Key Features</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {project.features.map((feature, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-3 p-4 rounded-lg bg-card border border-border hover:border-accent/50 transition-all"
                    >
                      <CheckCircle className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                      <span className="text-foreground/80">{feature}</span>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Challenges */}
            {project.challenges && project.challenges.length > 0 && (
              <section className="animate-fade-in-up">
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6">Technical Challenges</h2>
                <div className="space-y-4">
                  {project.challenges.map((challenge, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-3 p-4 rounded-lg bg-card border border-border hover:border-accent/50 transition-all"
                    >
                      <AlertCircle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                      <span className="text-foreground/80">{challenge}</span>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-6">
            {/* Tech Stack */}
            <section className="p-6 rounded-2xl bg-card border border-border animate-fade-in-up">
              <h3 className="text-lg font-bold text-foreground mb-4">Technology Stack</h3>
              <div className="flex flex-wrap gap-2">
                {project.tech.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 rounded-full text-xs font-semibold bg-accent/20 text-accent"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </section>

            {/* Statistics */}
            <section className="p-6 rounded-2xl bg-card border border-border animate-fade-in-up">
              <h3 className="text-lg font-bold text-foreground mb-4">Project Stats</h3>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Lines of Code</p>
                  <p className="text-2xl font-bold text-accent">{project.linesOfCode?.toLocaleString()}</p>
                </div>
                <div className="border-t border-border pt-4">
                  <p className="text-sm text-muted-foreground mb-1">Built</p>
                  <p className="text-lg font-semibold text-foreground">{project.yearBuilt}</p>
                </div>
                <div className="border-t border-border pt-4">
                  <p className="text-sm text-muted-foreground mb-1">Category</p>
                  <p className="text-lg font-semibold text-foreground capitalize">
                    {project.category === 'fullstack' ? 'Full Stack' : project.category}
                  </p>
                </div>
              </div>
            </section>

            {/* Quick Links */}
            <section className="p-6 rounded-2xl bg-card border border-border space-y-3 animate-fade-in-up">
              <h3 className="text-lg font-bold text-foreground mb-4">Links</h3>
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-between p-3 rounded-lg bg-background border border-border hover:border-accent/50 hover:bg-accent/10 transition-all"
              >
                <span className="text-foreground">Live Demo</span>
                <ExternalLink className="w-4 h-4 text-accent" />
              </a>
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-between p-3 rounded-lg bg-background border border-border hover:border-accent/50 hover:bg-accent/10 transition-all"
              >
                <span className="text-foreground">GitHub Repo</span>
                <Github className="w-4 h-4 text-accent" />
              </a>
            </section>
          </div>
        </div>

        {/* Navigation to other projects */}
        <div className="mt-20 pt-12 border-t border-border animate-fade-in-up">
          <h3 className="text-xl font-bold text-foreground mb-6">Explore More Projects</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {projects
              .filter((p) => p.id !== project.id)
              .slice(0, 2)
              .map((p) => (
                <Link key={p.id} href={`/projects/${p.slug}`}>
                  <div className="p-4 rounded-lg bg-card border border-border hover:border-accent/50 transition-all cursor-pointer group">
                    <h4 className="font-semibold text-foreground group-hover:text-accent transition-colors mb-1">
                      {p.title}
                    </h4>
                    <p className="text-sm text-foreground/70 line-clamp-1">{p.description}</p>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </div>
    </main>
  )
}
