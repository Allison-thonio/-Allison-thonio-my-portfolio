'use client'
import { siteConfig } from '@/lib/projects'
import { useEffect, useState } from 'react'

export default function About() {
  const [imageUrl, setImageUrl] = useState(siteConfig.hero.mainImage)
  const [linesOfCode, setLinesOfCode] = useState(siteConfig.hero.linesOfCode)

  useEffect(() => {
    const fetchConfig = async () => {
      try {
        const { doc, getDoc } = await import('firebase/firestore')
        const { db } = await import('@/lib/firebase')
        const docSnap = await getDoc(doc(db, 'portfolio', 'hero'))
        if (docSnap.exists()) {
          const data = docSnap.data()
          if (data.mainImage) setImageUrl(data.mainImage)
          if (data.linesOfCode) setLinesOfCode(data.linesOfCode)
        }
      } catch (error) {
        console.error("Error fetching about config:", error)
      }
    }
    fetchConfig()
  }, [])

  const skills = [
    { category: 'Frontend', items: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Vue.js'] },
    { category: 'Backend', items: ['Node.js', 'Python', 'PostgreSQL', 'MongoDB', 'REST APIs'] },
    { category: 'Tools', items: ['Git', 'Docker', 'AWS', 'Vercel', 'VS Code'] },
    { category: 'Professional', items: ['Legal Research', 'Contract Analysis', 'Accounting Principles', 'Business Law'] },
  ]

  return (
    <section className="py-16 md:py-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="space-y-12">
        {/* Section Header */}
        <div className="space-y-4 animate-fade-in-down">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground">About Me</h2>
          <div className="w-12 h-1 bg-accent rounded-full" />
        </div>

        {/* Main Content — photo left, bio right on large screens */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 items-start">

          {/* ── Profile Photo Card ── */}
          <div className="reveal-on-scroll stagger-1 flex justify-center lg:justify-start">
            <div className="relative group w-full max-w-[280px]">
              {/* Glow backdrop */}
              <div
                className="absolute -inset-1 rounded-2xl bg-accent/20 blur-xl opacity-60 group-hover:opacity-90 transition-opacity duration-500"
                aria-hidden
              />

              {/* Card */}
              <div className="relative rounded-2xl overflow-hidden border border-accent/20 bg-card shadow-2xl">
                {/* Photo */}
                <div className="aspect-[3/4] overflow-hidden">
                  <img
                    src={imageUrl}
                    alt="Allison Anthonio — Full Stack Developer"
                    className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                  />
                </div>

                {/* Name badge overlay at bottom */}
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
                  <p className="font-bold text-white text-base leading-tight">Allison Anthonio</p>
                  <p className="text-accent text-xs font-semibold mt-0.5">Full Stack Developer</p>

                  {/* Status pill */}
                  <div className="mt-2 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/40 border border-accent/30 backdrop-blur-sm">
                    <div className="relative flex items-center justify-center">
                      <span className="absolute w-2 h-2 rounded-full bg-green-400 animate-ping opacity-75" />
                      <span className="w-2 h-2 rounded-full bg-green-400 relative" />
                    </div>
                    <span className="text-[10px] font-bold text-green-400 uppercase tracking-wider">Available</span>
                  </div>
                </div>
              </div>

              {/* Floating experience badge */}
              <div className="absolute -top-3 -right-3 flex flex-col items-center justify-center w-16 h-16 rounded-full bg-accent text-accent-foreground shadow-lg border-2 border-background">
                <span className="text-lg font-black leading-none">4+</span>
                <span className="text-[8px] font-bold uppercase leading-tight text-center">Yrs Exp</span>
              </div>
            </div>
          </div>

          {/* ── Bio + Stats ── */}
          <div className="lg:col-span-2 space-y-8">
            {/* Bio paragraphs */}
            <div className="space-y-5 reveal-on-scroll stagger-2">
              <p className="text-base md:text-lg text-foreground/80 leading-relaxed">
                I'm Allison Anthonio, a full-stack developer blending code with law. Starting my journey in 2023, I've grown from a tech enthusiast to someone fluent in both web technologies and legal frameworks. Currently in 300 level law school while maintaining a coding career.
              </p>

              <p className="text-base md:text-lg text-foreground/80 leading-relaxed">
                My unique perspective comes from juggling three fields: web development, legal studies, and accounting. I believe the future belongs to those who can bridge technology and law—creating ethical, compliant applications that make real impact.
              </p>

              <p className="text-base md:text-lg text-foreground/80 leading-relaxed">
                When not coding or studying, I'm exploring emerging tech, analyzing case law, or mentoring developers. I'm always open to collaborations that push boundaries and create meaningful solutions.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 reveal-on-scroll stagger-3">
              <div className="p-4 md:p-6 rounded-lg bg-card border border-border hover:border-accent/50 transition-colors text-center">
                <div className="text-2xl md:text-3xl font-bold text-accent mb-1">15</div>
                <p className="text-xs md:text-sm text-muted-foreground">Projects Built</p>
              </div>
              <div className="p-4 md:p-6 rounded-lg bg-card border border-border hover:border-accent/50 transition-colors text-center">
                <div className="text-2xl md:text-3xl font-bold text-accent mb-1">4+</div>
                <p className="text-xs md:text-sm text-muted-foreground">Years Experience</p>
              </div>
              <div className="p-4 md:p-6 rounded-lg bg-card border border-border hover:border-accent/50 transition-colors text-center">
                <div className="text-2xl md:text-3xl font-bold text-accent mb-1">{linesOfCode}</div>
                <p className="text-xs md:text-sm text-muted-foreground">Lines of Code</p>
              </div>
            </div>
          </div>
        </div>

        {/* Skills Grid */}
        <div className="pt-12 border-t border-border">
          <h3 className="text-2xl font-bold text-foreground mb-8">Skills &amp; Expertise</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {skills.map((skillGroup) => (
              <div key={skillGroup.category} className="space-y-3">
                <h4 className="font-semibold text-accent uppercase text-sm">{skillGroup.category}</h4>
                <ul className="space-y-2">
                  {skillGroup.items.map((skill) => (
                    <li
                      key={skill}
                      className="text-sm text-foreground/70 hover:text-accent transition-colors cursor-pointer"
                    >
                      {skill}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Education */}
        <div className="pt-12 border-t border-border">
          <h3 className="text-2xl font-bold text-foreground mb-8">Education</h3>
          <div className="space-y-6">
            <div className="flex gap-4 pb-6 border-b border-border">
              <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-accent/20 flex items-center justify-center text-accent font-bold">
                ⚖️
              </div>
              <div>
                <h4 className="font-bold text-foreground">Bachelor of Laws (LL.B.)</h4>
                <p className="text-sm text-muted-foreground">University of Law • 300 Level</p>
                <p className="text-xs text-foreground/60 mt-1">Specializing in Technology Law &amp; Intellectual Property</p>
              </div>
            </div>

            <div className="flex gap-4 pb-6 border-b border-border">
              <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-accent/20 flex items-center justify-center text-accent font-bold">
                📊
              </div>
              <div>
                <h4 className="font-bold text-foreground">Accounting Studies</h4>
                <p className="text-sm text-muted-foreground">Professional Accounting Program</p>
                <p className="text-xs text-foreground/60 mt-1">Focus on Financial Analysis &amp; Business Accounting</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-accent/20 flex items-center justify-center text-accent font-bold">
                💻
              </div>
              <div>
                <h4 className="font-bold text-foreground">Full Stack Web Development</h4>
                <p className="text-sm text-muted-foreground">Self-taught &amp; Professional Experience</p>
                <p className="text-xs text-foreground/60 mt-1">Continuous learning in modern web technologies</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
