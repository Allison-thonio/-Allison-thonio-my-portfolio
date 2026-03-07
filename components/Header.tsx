'use client'

import { useEffect, useState } from 'react'
import { Moon, Sun, Home, User, Briefcase, Scale, Mail } from 'lucide-react'
import { TubelightNavBar } from '@/components/ui/tubelight-navbar'

interface HeaderProps {
  activeSection?: string
  setActiveSection?: (section: string) => void
}

const navItems = [
  { name: 'Home', id: 'home', icon: Home },
  { name: 'About', id: 'about', icon: User },
  { name: 'Projects', id: 'projects', icon: Briefcase },
  { name: 'Law Journey', id: 'law-journey', icon: Scale },
  { name: 'Contact', id: 'contact', icon: Mail },
]

export default function Header({ activeSection = 'home', setActiveSection }: HeaderProps) {
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem('theme')
    if (saved === 'dark' || (!saved && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.documentElement.classList.add('dark')
      setIsDark(true)
    }
  }, [])

  const toggleTheme = () => {
    const html = document.documentElement
    if (html.classList.contains('dark')) {
      html.classList.remove('dark')
      setIsDark(false)
      localStorage.setItem('theme', 'light')
    } else {
      html.classList.add('dark')
      setIsDark(true)
      localStorage.setItem('theme', 'dark')
    }
  }

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
      setActiveSection?.(id)
    }
  }

  return (
    <>
      {/* Logo — pinned top-left */}
      <div className="fixed top-0 left-0 z-50 px-6 h-16 md:h-20 flex items-center">
        <button
          onClick={() => scrollToSection('home')}
          className="text-xl md:text-2xl font-bold bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent hover:opacity-80 transition-opacity"
        >
          AA
        </button>
      </div>

      {/* Tubelight Navbar — centered at top */}
      <TubelightNavBar
        items={navItems}
        activeSection={activeSection}
        onNavigate={scrollToSection}
      />

      {/* Theme toggle — pinned top-right */}
      <div className="fixed top-0 right-0 z-50 px-6 h-16 md:h-20 flex items-center">
        <button
          onClick={toggleTheme}
          className="p-2 rounded-lg hover:bg-accent/10 transition-colors"
          aria-label="Toggle theme"
        >
          {isDark ? (
            <Sun className="w-5 h-5 text-accent" />
          ) : (
            <Moon className="w-5 h-5 text-foreground/70" />
          )}
        </button>
      </div>
    </>
  )
}
