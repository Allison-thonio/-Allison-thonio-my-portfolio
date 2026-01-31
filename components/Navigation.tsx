'use client'

interface NavigationProps {
  activeSection: string
  setActiveSection: (section: string) => void
}

export default function Navigation({ activeSection, setActiveSection }: NavigationProps) {
  const sections = [
    { id: 'about', label: 'ABOUT' },
    { id: 'projects', label: 'PROJECTS' },
    { id: 'law-journey', label: 'LAW JOURNEY' },
    { id: 'contact', label: 'CONTACT' },
  ]

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
      setActiveSection(id)
    }
  }

  return (
    <div className="fixed left-8 top-1/2 -translate-y-1/2 hidden lg:flex flex-col space-y-8 z-40">
      {sections.map((section) => (
        <div key={section.id} className="flex items-center space-x-4">
          <div
            className={`h-0.5 transition-all duration-300 ${
              activeSection === section.id
                ? 'w-8 bg-accent'
                : 'w-4 bg-muted-foreground/30 hover:bg-muted-foreground/60'
            }`}
          />
          <button
            onClick={() => scrollToSection(section.id)}
            className={`text-xs font-semibold tracking-widest transition-colors ${
              activeSection === section.id
                ? 'text-accent'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            {section.label}
          </button>
        </div>
      ))}
    </div>
  )
}
