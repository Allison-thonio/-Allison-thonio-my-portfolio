'use client'

import { useEffect, useState } from 'react'
import { Menu, X, Moon, Sun } from 'lucide-react'

export default function Header() {
  const [isDark, setIsDark] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const isDarkMode = document.documentElement.classList.contains('dark')
    setIsDark(isDarkMode)
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
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
      setIsMobileMenuOpen(false)
    }
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 md:h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <button
              onClick={() => scrollToSection('home')}
              className="text-xl md:text-2xl font-bold bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent hover:opacity-80 transition-opacity"
            >
              AA
            </button>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => scrollToSection('about')}
              className="text-foreground hover:text-accent transition-colors text-sm font-medium"
            >
              ABOUT
            </button>
            <button
              onClick={() => scrollToSection('projects')}
              className="text-foreground hover:text-accent transition-colors text-sm font-medium"
            >
              PROJECTS
            </button>
            <button
              onClick={() => scrollToSection('law-journey')}
              className="text-foreground hover:text-accent transition-colors text-sm font-medium"
            >
              LAW JOURNEY
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="text-foreground hover:text-accent transition-colors text-sm font-medium"
            >
              CONTACT
            </button>
          </nav>

          {/* Theme Toggle & Mobile Menu */}
          <div className="flex items-center space-x-4">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg hover:bg-secondary/20 transition-colors"
              aria-label="Toggle theme"
            >
              {isDark ? (
                <Sun className="w-5 h-5 text-accent" />
              ) : (
                <Moon className="w-5 h-5 text-primary" />
              )}
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-secondary/20 transition-colors"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <nav className="md:hidden pb-4 space-y-2 animate-in slide-in-from-top">
            <button
              onClick={() => scrollToSection('about')}
              className="block w-full text-left px-4 py-2 rounded-lg hover:bg-secondary/20 transition-colors text-sm font-medium"
            >
              ABOUT
            </button>
            <button
              onClick={() => scrollToSection('projects')}
              className="block w-full text-left px-4 py-2 rounded-lg hover:bg-secondary/20 transition-colors text-sm font-medium"
            >
              PROJECTS
            </button>
            <button
              onClick={() => scrollToSection('law-journey')}
              className="block w-full text-left px-4 py-2 rounded-lg hover:bg-secondary/20 transition-colors text-sm font-medium"
            >
              LAW JOURNEY
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="block w-full text-left px-4 py-2 rounded-lg hover:bg-secondary/20 transition-colors text-sm font-medium"
            >
              CONTACT
            </button>
          </nav>
        )}
      </div>
    </header>
  )
}
