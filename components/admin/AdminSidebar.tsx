'use client'

import { Briefcase, BookOpen, Mail, Settings, ImageIcon } from 'lucide-react'

interface AdminSidebarProps {
  activeTab: string
  setActiveTab: (tab: string) => void
}

export default function AdminSidebar({ activeTab, setActiveTab }: AdminSidebarProps) {
  const menuItems = [
    { id: 'hero', label: 'Hero Info', icon: ImageIcon, description: 'Manage hero images & stats' },
    { id: 'projects', label: 'Projects', icon: Briefcase, description: 'Manage your portfolio projects' },
    { id: 'pictures', label: 'Pictures', icon: ImageIcon, description: 'Manage project images' },
    { id: 'education', label: 'Education', icon: BookOpen, description: 'Update your law journey timeline' },
    { id: 'contact', label: 'Contact', icon: Mail, description: 'Manage contact information' },
    { id: 'settings', label: 'Settings', icon: Settings, description: 'Portfolio settings & password' },
  ]

  return (
    <>
      <aside className="fixed left-0 top-20 w-64 h-[calc(100vh-80px)] bg-card border-r border-border overflow-y-auto hidden lg:block">
        <nav className="p-4 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon
            const isActive = activeTab === item.id
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full text-left px-4 py-3 rounded-lg transition-all ${isActive
                  ? 'bg-accent text-primary'
                  : 'text-foreground hover:bg-background'
                  }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className="w-5 h-5" />
                  <div>
                    <div className="font-medium">{item.label}</div>
                    <div className={`text-xs ${isActive ? 'text-primary/70' : 'text-foreground/50'}`}>
                      {item.description}
                    </div>
                  </div>
                </div>
              </button>
            )
          })}
        </nav>
      </aside>
      {/* Mobile menu */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-card border-t border-border">
        <div className="flex overflow-x-auto gap-2 p-2">
          {menuItems.map((item) => {
            const Icon = item.icon
            const isActive = activeTab === item.id
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg whitespace-nowrap transition-all ${isActive
                  ? 'bg-accent text-primary'
                  : 'text-foreground hover:bg-background'
                  }`}
              >
                <Icon className="w-4 h-4" />
                {item.label}
              </button>
            )
          })}
        </div>
      </div>
    </>
  )
}
