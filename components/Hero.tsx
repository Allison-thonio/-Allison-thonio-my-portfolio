'use client'

import { useEffect, useState } from 'react'
import { ChevronDown, Github, Linkedin, Twitter, User, ChevronRight } from 'lucide-react'
import { siteConfig } from '@/lib/projects'

export default function Hero() {
  const [displayedText, setDisplayedText] = useState('')
  const fullText = "Allison Anthonio"
  const [index, setIndex] = useState(0)

  useEffect(() => {
    if (index < fullText.length) {
      const timer = setTimeout(() => {
        setDisplayedText(fullText.slice(0, index + 1))
        setIndex(index + 1)
      }, 50)
      return () => clearTimeout(timer)
    }
  }, [index])

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section className="min-h-screen flex items-center pt-20 md:pt-0 pb-12 md:pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="w-full max-w-7xl mx-auto relative">
        {/* Decorative background element for "Flow" */}
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-accent/5 rounded-full blur-3xl animate-flow pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-flow pointer-events-none" style={{ animationDelay: '-1.5s' }} />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center">
          {/* Left Content */}
          <div className="flex flex-col justify-center space-y-8 animate-fade-in-up">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-3 px-3 py-1.5 rounded-full bg-accent/10 border border-accent/20 w-fit backdrop-blur-sm">
                <div className="relative flex items-center justify-center">
                  <div className="w-2.5 h-2.5 rounded-full bg-accent animate-ping absolute" />
                  <div className="w-2.5 h-2.5 rounded-full bg-accent relative" />
                </div>
                <span className="text-xs font-bold text-accent uppercase tracking-wider">Available for work</span>
              </div>

              <div className="flex flex-col gap-4">
                <div className="flex items-center flex-wrap gap-4">
                  <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-foreground leading-tight tracking-tight">
                    {displayedText}
                    <span className="animate-pulse text-accent">|</span>
                  </h1>
                </div>

                {/* Small featured images and lines of code stat beside the name */}
                <div className="flex items-center gap-6 animate-slide-in" style={{ animationDelay: '0.4s' }}>
                  <div className="flex -space-x-3">
                    {siteConfig.hero.featuredImages.map((img, i) => (
                      <div key={i} className="group relative">
                        <img
                          src={img}
                          alt={`Featured ${i}`}
                          className="w-12 h-12 md:w-14 md:h-14 rounded-full border-2 border-background object-cover grayscale hover:grayscale-0 transition-all duration-300 shadow-xl"
                        />
                        <div className="absolute inset-0 rounded-full bg-accent/0 group-hover:bg-accent/20 transition-colors" />
                      </div>
                    ))}
                  </div>
                  <div className="h-10 w-[1px] bg-border hidden sm:block" />
                  <div className="flex flex-col">
                    <span className="text-2xl md:text-3xl font-bold text-accent leading-none">{siteConfig.hero.linesOfCode}</span>
                    <span className="text-[10px] md:text-xs text-muted-foreground uppercase font-bold tracking-widest mt-1">Lines of Code</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <p className="text-xl md:text-2xl font-semibold text-accent/90">
                Full Stack Web Developer
              </p>
              <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm md:text-base text-muted-foreground">
                <span className="flex items-center gap-1.5">⚖️ Law Student (300L)</span>
                <span className="flex items-center gap-1.5">📊 Accounting Student</span>
                <span className="flex items-center gap-1.5">🚀 4+ Years Experience</span>
              </div>
            </div>

            <p className="text-base md:text-lg text-foreground/80 leading-relaxed max-w-xl font-light">
              I create elegant digital solutions that merge thoughtful design with robust engineering. Passionate about combining law and technology to build impactful products.
            </p>

            <div className="flex flex-col sm:flex-row flex-wrap gap-4 pt-4">
              <button
                onClick={() => scrollToSection('projects')}
                className="group px-8 py-4 bg-accent text-primary rounded-xl hover:shadow-[0_0_20px_rgba(var(--accent),0.4)] transition-all font-bold text-sm md:text-base hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2"
              >
                View My Projects
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
              <button
                onClick={() => scrollToSection('contact')}
                className="px-8 py-4 border-2 border-accent/30 text-foreground rounded-xl hover:bg-accent/10 hover:border-accent transition-all font-bold text-sm md:text-base flex items-center justify-center"
              >
                Get in Touch
              </button>
            </div>

            {/* Social Links */}
            <div className="flex items-center space-x-6 pt-8 border-t border-border/50">
              {[
                { name: 'GitHub', icon: <Github className="w-5 h-5" />, href: '#' },
                { name: 'LinkedIn', icon: <Linkedin className="w-5 h-5" />, href: '#' },
                { name: 'Twitter', icon: <Twitter className="w-5 h-5" />, href: '#' }
              ].map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className="text-muted-foreground hover:text-accent transition-all hover:scale-110"
                  aria-label={social.name}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Right - Image/Visual */}
          <div className="relative flex items-center justify-center md:min-h-[600px] order-first md:order-last animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <div className="relative w-full max-w-md">
              {/* Premium Glow Effect - Animated */}
              <div className="absolute -inset-4 bg-gradient-to-br from-accent via-primary to-accent opacity-20 blur-3xl animate-glow rounded-full" />

              {/* Main Container */}
              <div className="relative group overflow-hidden rounded-[32px] md:rounded-[48px] bg-card border-2 border-accent/20 shadow-2xl transition-transform duration-700 hover:scale-[1.02]">
                <div className="relative w-full aspect-[4/5] overflow-hidden">
                  {siteConfig.hero.mainImage ? (
                    <img
                      src={siteConfig.hero.mainImage}
                      alt="Allison Anthonio"
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center p-8 bg-gradient-to-br from-accent/10 to-primary/10">
                      <div className="text-center space-y-4">
                        <div className="w-24 h-24 mx-auto rounded-full bg-accent/20 flex items-center justify-center border-2 border-accent/30 animate-pulse">
                          <User className="w-10 h-10 text-accent" />
                        </div>
                        <div>
                          <p className="text-lg font-bold text-foreground">Upload Photo</p>
                          <p className="text-sm text-foreground/50">Show your professional self</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Glassmorphism Badge */}
                  <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-black/40 backdrop-blur-md border border-white/10 text-white animate-fade-in-up" style={{ animationDelay: '0.8s' }}>
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-bold text-sm">Full Stack Developer</p>
                        <p className="text-[10px] text-white/60">Based in Nigeria</p>
                      </div>
                      <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center text-primary">
                        <span className="text-[10px] font-bold">FE</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Decorative elements */}
              <div className="absolute -bottom-8 -left-8 w-24 h-24 bg-accent/20 rounded-2xl rotate-12 blur-sm -z-10 animate-flow" />
              <div className="absolute -top-8 -right-8 w-32 h-32 bg-primary/10 rounded-full blur-xl -z-10 animate-flow" style={{ animationDelay: '-2s' }} />
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator - Only show on larger screens */}
      <div className="hidden md:flex justify-center absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
        <button
          onClick={() => scrollToSection('about')}
          className="p-3 rounded-full border border-accent/30 text-accent hover:bg-accent/10 transition-colors"
          aria-label="Scroll down"
        >
          <ChevronDown className="w-6 h-6" />
        </button>
      </div>
    </section>
  )
}
