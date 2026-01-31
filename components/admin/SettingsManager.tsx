'use client'

import React from "react"

import { useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'

export default function SettingsManager() {
  const [showPassword, setShowPassword] = useState(false)
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [saved, setSaved] = useState(false)

  const handleUpdatePassword = (e: React.FormEvent) => {
    e.preventDefault()
    if (newPassword === confirmPassword && newPassword.length > 0) {
      // Update password logic here
      setSaved(true)
      setTimeout(() => setSaved(false), 3000)
      setNewPassword('')
      setConfirmPassword('')
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-foreground">Portfolio Settings</h2>
        <p className="text-foreground/60 mt-1">Manage your portfolio security and preferences</p>
      </div>

      {/* Security Settings */}
      <div className="bg-card border border-border rounded-lg p-6 space-y-6">
        <h3 className="text-xl font-bold text-foreground">Security</h3>

        <form onSubmit={handleUpdatePassword} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Current Password
            </label>
            <input
              type="password"
              placeholder="Enter current password"
              className="w-full px-4 py-2 rounded-lg bg-background border border-border text-foreground placeholder:text-foreground/40 focus:outline-none focus:border-accent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              New Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Enter new password"
                className="w-full px-4 py-2 rounded-lg bg-background border border-border text-foreground placeholder:text-foreground/40 focus:outline-none focus:border-accent"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-foreground/50"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Confirm Password
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm new password"
              className="w-full px-4 py-2 rounded-lg bg-background border border-border text-foreground placeholder:text-foreground/40 focus:outline-none focus:border-accent"
            />
          </div>

          {saved && (
            <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/20 text-green-600 dark:text-green-400 text-sm">
              Password updated successfully!
            </div>
          )}

          <button
            type="submit"
            className="px-6 py-2 bg-accent text-primary rounded-lg hover:opacity-90 transition-opacity font-medium"
          >
            Update Password
          </button>
        </form>
      </div>

      {/* Preferences */}
      <div className="bg-card border border-border rounded-lg p-6 space-y-6">
        <h3 className="text-xl font-bold text-foreground">Preferences</h3>

        <div className="space-y-4">
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              defaultChecked
              className="w-5 h-5 rounded border-border accent-accent"
            />
            <div>
              <div className="font-medium text-foreground">Enable Notifications</div>
              <div className="text-sm text-foreground/60">Get notified about new messages and inquiries</div>
            </div>
          </label>

          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              defaultChecked
              className="w-5 h-5 rounded border-border accent-accent"
            />
            <div>
              <div className="font-medium text-foreground">Email Alerts</div>
              <div className="text-sm text-foreground/60">Receive email notifications for new contact requests</div>
            </div>
          </label>

          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              defaultChecked
              className="w-5 h-5 rounded border-border accent-accent"
            />
            <div>
              <div className="font-medium text-foreground">Show LinkedIn</div>
              <div className="text-sm text-foreground/60">Display LinkedIn link on your portfolio</div>
            </div>
          </label>
        </div>
      </div>

      {/* Portfolio Info */}
      <div className="bg-card border border-border rounded-lg p-6 space-y-6">
        <h3 className="text-xl font-bold text-foreground">Portfolio Information</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Full Name</label>
            <input
              type="text"
              defaultValue="Allison Anthonio"
              className="w-full px-4 py-2 rounded-lg bg-background border border-border text-foreground placeholder:text-foreground/40 focus:outline-none focus:border-accent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Professional Title</label>
            <input
              type="text"
              defaultValue="Full Stack Developer & Law Student"
              className="w-full px-4 py-2 rounded-lg bg-background border border-border text-foreground placeholder:text-foreground/40 focus:outline-none focus:border-accent"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-foreground mb-2">Bio</label>
            <textarea
              defaultValue="Full stack web developer with 4+ years of experience, currently studying Law at 300 level and Accounting. Passionate about combining legal knowledge with technology."
              className="w-full px-4 py-2 rounded-lg bg-background border border-border text-foreground placeholder:text-foreground/40 focus:outline-none focus:border-accent"
              rows={4}
            />
          </div>
        </div>

        <button className="px-6 py-2 bg-accent text-primary rounded-lg hover:opacity-90 transition-opacity font-medium">
          Save Portfolio Info
        </button>
      </div>

      {/* Danger Zone */}
      <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-6 space-y-4">
        <h3 className="text-xl font-bold text-red-600 dark:text-red-400">Danger Zone</h3>
        <p className="text-sm text-foreground/60">
          These actions cannot be undone. Please proceed with caution.
        </p>

        <div className="flex flex-col gap-2">
          <button className="px-6 py-2 border border-red-500/30 text-red-600 dark:text-red-400 rounded-lg hover:bg-red-500/10 transition-colors font-medium">
            Reset All Data
          </button>
          <button className="px-6 py-2 border border-red-500/30 text-red-600 dark:text-red-400 rounded-lg hover:bg-red-500/10 transition-colors font-medium">
            Export Data
          </button>
        </div>
      </div>
    </div>
  )
}
