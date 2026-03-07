'use client'

import React from "react"

import { useState, useEffect } from 'react'
import { ThemeProvider } from '@/components/ThemeProvider'
import AdminHeader from '@/components/admin/AdminHeader'
import AdminSidebar from '@/components/admin/AdminSidebar'
import ProjectsManager from '@/components/admin/ProjectsManager'
import PicturesManager from '@/components/admin/PicturesManager'
import EducationManager from '@/components/admin/EducationManager'
import ContactManager from '@/components/admin/ContactManager'
import HeroManager from '@/components/admin/HeroManager'
import SettingsManager from '@/components/admin/SettingsManager'
import { Lock } from 'lucide-react'

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [activeTab, setActiveTab] = useState('projects')
  const [error, setError] = useState('')

  // Simple password protection (in production, use proper auth)
  const ADMIN_PASSWORD = 'oneandonlyghost2304'

  useEffect(() => {
    const isAuth = localStorage.getItem('admin_auth')
    if (isAuth === 'true') {
      setIsAuthenticated(true)
    }
  }, [])

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true)
      localStorage.setItem('admin_auth', 'true')
      setPassword('')
      setError('')
    } else {
      setError('Incorrect password')
      setPassword('')
    }
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    localStorage.removeItem('admin_auth')
    setPassword('')
  }

  if (!isAuthenticated) {
    return (
      <ThemeProvider>
        <div className="min-h-screen bg-gradient-to-br from-background to-background/95 flex items-center justify-center p-4">
          <div className="w-full max-w-md">
            <div className="bg-card border border-border rounded-2xl p-8 shadow-lg">
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center">
                  <Lock className="w-8 h-8 text-accent" />
                </div>
              </div>

              <h1 className="text-3xl font-bold text-center text-foreground mb-2">
                Admin Portal
              </h1>
              <p className="text-center text-foreground/60 mb-8">
                Allison's Portfolio Management
              </p>

              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Password
                  </label>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter admin password"
                    className="w-full px-4 py-2 rounded-lg bg-background border border-border text-foreground placeholder:text-foreground/40 focus:outline-none focus:border-accent transition-colors"
                  />
                </div>

                <label className="flex items-center gap-2 text-sm text-foreground/70 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={showPassword}
                    onChange={(e) => setShowPassword(e.target.checked)}
                    className="rounded"
                  />
                  Show password
                </label>

                {error && (
                  <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-600 text-sm">
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full py-2 px-4 bg-accent text-primary rounded-lg font-medium hover:opacity-90 transition-opacity mt-6"
                >
                  Login
                </button>
              </form>

              <div className="mt-6 p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                <p className="text-xs text-foreground/70">
                  <span className="font-medium text-blue-600 dark:text-blue-400">Demo:</span> This is a password-protected admin panel. Update the password in the settings.
                </p>
              </div>
            </div>
          </div>
        </div>
      </ThemeProvider>
    )
  }

  return (
    <ThemeProvider>
      <div className="bg-background text-foreground min-h-screen">
        <AdminHeader onLogout={handleLogout} />

        <div className="flex flex-col lg:flex-row">
          <AdminSidebar activeTab={activeTab} setActiveTab={setActiveTab} />

          <main className="flex-1 p-4 md:p-8 lg:ml-64 lg:mt-20">
            <div className="max-w-6xl">
              {activeTab === 'hero' && <HeroManager />}
              {activeTab === 'projects' && <ProjectsManager />}
              {activeTab === 'pictures' && <PicturesManager />}
              {activeTab === 'education' && <EducationManager />}
              {activeTab === 'contact' && <ContactManager />}
              {activeTab === 'settings' && <SettingsManager />}
            </div>
          </main>
        </div>
      </div>
    </ThemeProvider>
  )
}
