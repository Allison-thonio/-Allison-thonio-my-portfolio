'use client'

import React from "react"
import { useState, useEffect } from 'react'
import AdminHeader from '@/components/admin/AdminHeader'
import AdminSidebar from '@/components/admin/AdminSidebar'
import ProjectsManager from '@/components/admin/ProjectsManager'
import PicturesManager from '@/components/admin/PicturesManager'
import EducationManager from '@/components/admin/EducationManager'
import ContactManager from '@/components/admin/ContactManager'
import HeroManager from '@/components/admin/HeroManager'
import SettingsManager from '@/components/admin/SettingsManager'
import { Lock } from 'lucide-react'
import { auth } from '@/lib/firebase'
import { signInWithEmailAndPassword, onAuthStateChanged, signOut } from 'firebase/auth'

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [activeTab, setActiveTab] = useState('projects')
  const [error, setError] = useState('')

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAuthenticated(true)
      } else {
        setIsAuthenticated(false)
      }
      setIsLoading(false)
    })
    return () => unsubscribe()
  }, [])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    try {
      await signInWithEmailAndPassword(auth, email, password)
      setEmail('')
      setPassword('')
    } catch (err: any) {
      setError(err.message || 'Failed to login')
    }
  }

  const handleLogout = async () => {
    try {
      await signOut(auth)
    } catch (err) {
      console.error("Failed to log out", err)
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent"></div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return (
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
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter admin email"
                  className="w-full px-4 py-2 rounded-lg bg-background border border-border text-foreground placeholder:text-foreground/40 focus:outline-none focus:border-accent transition-colors"
                  required
                />
              </div>

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
                  required
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
                <span className="font-medium text-blue-600 dark:text-blue-400">Security Notice:</span> Make sure your email and password match your Firebase account credentials.
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
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
  )
}
