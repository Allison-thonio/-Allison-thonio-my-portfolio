'use client'

import { contactInfo } from '@/lib/projects'
import { Mail, Phone, MessageCircle, Instagram, Copy, Check } from 'lucide-react'
import { useState } from 'react'

export default function ContactManager() {
  const [copied, setCopied] = useState<string | null>(null)

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text)
    setCopied(label)
    setTimeout(() => setCopied(null), 2000)
  }

  const contactDetails = [
    {
      icon: Mail,
      label: 'Email',
      value: contactInfo.email,
      color: 'text-blue-600 dark:text-blue-400',
      bgColor: 'bg-blue-500/10',
    },
    {
      icon: Phone,
      label: 'Phone',
      value: contactInfo.phone,
      color: 'text-green-600 dark:text-green-400',
      bgColor: 'bg-green-500/10',
    },
    {
      icon: MessageCircle,
      label: 'WhatsApp',
      value: contactInfo.whatsapp,
      color: 'text-emerald-600 dark:text-emerald-400',
      bgColor: 'bg-emerald-500/10',
    },
    {
      icon: Instagram,
      label: 'Instagram',
      value: contactInfo.instagram,
      color: 'text-pink-600 dark:text-pink-400',
      bgColor: 'bg-pink-500/10',
    },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-foreground">Contact Information</h2>
        <p className="text-foreground/60 mt-1">Manage your contact details</p>
      </div>

      {/* Quick Contact Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {contactDetails.map((contact) => {
          const Icon = contact.icon
          const isCopied = copied === contact.label
          return (
            <div
              key={contact.label}
              className={`${contact.bgColor} border border-border rounded-lg p-6`}
            >
              <div className="flex items-start justify-between mb-3">
                <div className={`w-12 h-12 ${contact.bgColor} rounded-lg flex items-center justify-center`}>
                  <Icon className={`w-6 h-6 ${contact.color}`} />
                </div>
                <button
                  onClick={() => handleCopy(contact.value, contact.label)}
                  className="p-2 hover:bg-background rounded transition-colors"
                >
                  {isCopied ? (
                    <Check className="w-5 h-5 text-green-600" />
                  ) : (
                    <Copy className="w-5 h-5 text-foreground/50" />
                  )}
                </button>
              </div>
              <h3 className={`font-bold text-lg ${contact.color}`}>{contact.label}</h3>
              <p className="text-foreground/70 text-sm mt-1 break-all">{contact.value}</p>
            </div>
          )
        })}
      </div>

      {/* Edit Form */}
      <div className="bg-card border border-border rounded-lg p-6 space-y-6">
        <h3 className="text-xl font-bold text-foreground">Update Contact Information</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Email</label>
            <input
              type="email"
              defaultValue={contactInfo.email}
              className="w-full px-4 py-2 rounded-lg bg-background border border-border text-foreground placeholder:text-foreground/40 focus:outline-none focus:border-accent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Phone Number</label>
            <input
              type="tel"
              defaultValue={contactInfo.phone}
              className="w-full px-4 py-2 rounded-lg bg-background border border-border text-foreground placeholder:text-foreground/40 focus:outline-none focus:border-accent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">WhatsApp</label>
            <input
              type="tel"
              defaultValue={contactInfo.whatsapp}
              className="w-full px-4 py-2 rounded-lg bg-background border border-border text-foreground placeholder:text-foreground/40 focus:outline-none focus:border-accent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Instagram URL</label>
            <input
              type="url"
              defaultValue={contactInfo.instagram}
              className="w-full px-4 py-2 rounded-lg bg-background border border-border text-foreground placeholder:text-foreground/40 focus:outline-none focus:border-accent"
            />
          </div>
        </div>

        <button className="px-6 py-2 bg-accent text-primary rounded-lg hover:opacity-90 transition-opacity font-medium">
          Save Changes
        </button>
      </div>

      {/* Social Links */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-xl font-bold text-foreground mb-4">Social Links</h3>
        <div className="space-y-3">
          <a
            href={contactInfo.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between p-4 bg-background rounded-lg hover:border-accent border border-border transition-colors"
          >
            <span className="font-medium text-foreground">GitHub</span>
            <span className="text-accent">@allisonfezyy →</span>
          </a>
          <a
            href={contactInfo.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between p-4 bg-background rounded-lg hover:border-accent border border-border transition-colors"
          >
            <span className="font-medium text-foreground">Instagram</span>
            <span className="text-accent">@one.busy.human.being →</span>
          </a>
          <a
            href={`mailto:${contactInfo.email}`}
            className="flex items-center justify-between p-4 bg-background rounded-lg hover:border-accent border border-border transition-colors"
          >
            <span className="font-medium text-foreground">Email</span>
            <span className="text-accent">{contactInfo.email} →</span>
          </a>
        </div>
      </div>
    </div>
  )
}
