'use client'

import React from "react"

import { useState } from 'react'
import { Mail, Phone, MessageCircle, Instagram, Github, Linkedin, Twitter } from 'lucide-react'
import { contactInfo } from '@/lib/projects'

export default function Contact() {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    setTimeout(() => {
      setSubmitStatus('success')
      setFormState({ name: '', email: '', subject: '', message: '' })
      setIsSubmitting(false)

      // Reset status after 3 seconds
      setTimeout(() => setSubmitStatus('idle'), 3000)
    }, 1500)
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormState((prev) => ({ ...prev, [name]: value }))
  }

  const contactMethods = [
    {
      icon: Mail,
      label: 'Email',
      value: contactInfo.email,
      link: `mailto:${contactInfo.email}`,
      color: 'text-blue-600 dark:text-blue-400',
    },
    {
      icon: Phone,
      label: 'Phone',
      value: contactInfo.phone,
      link: `tel:${contactInfo.phone}`,
      color: 'text-green-600 dark:text-green-400',
    },
    {
      icon: MessageCircle,
      label: 'WhatsApp',
      value: contactInfo.whatsapp,
      link: `https://wa.me/${contactInfo.whatsapp.replace(/\D/g, '')}`,
      color: 'text-emerald-600 dark:text-emerald-400',
    },
    {
      icon: Instagram,
      label: 'Instagram',
      value: '@one.busy.human.being',
      link: contactInfo.instagram,
      color: 'text-pink-600 dark:text-pink-400',
    },
  ]

  return (
    <section className="py-20 md:py-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto lg:ml-48">
      <div className="space-y-12">
        {/* Section Header */}
        <div className="space-y-4">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground">Get In Touch</h2>
          <div className="w-12 h-1 bg-accent rounded-full" />
          <p className="text-base md:text-lg text-foreground/70">
            Have a project in mind or just want to chat? I'd love to hear from you. Feel free to reach out!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12">
          {/* Contact Form */}
          <div className="lg:col-span-2 reveal-on-scroll stagger-1">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formState.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg bg-card border border-border text-foreground placeholder-muted-foreground focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all"
                  placeholder="Your name"
                />
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formState.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg bg-card border border-border text-foreground placeholder-muted-foreground focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all"
                  placeholder="your.email@example.com"
                />
              </div>

              {/* Subject */}
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-foreground mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formState.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg bg-card border border-border text-foreground placeholder-muted-foreground focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all"
                  placeholder="What's this about?"
                />
              </div>

              {/* Message */}
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formState.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full px-4 py-3 rounded-lg bg-card border border-border text-foreground placeholder-muted-foreground focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all resize-none"
                  placeholder="Your message here..."
                />
              </div>

              {/* Submit Status */}
              {submitStatus === 'success' && (
                <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/30 text-green-600 text-sm font-medium">
                  ✓ Message sent successfully! I'll get back to you soon.
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="p-4 rounded-lg bg-destructive/10 border border-destructive/30 text-destructive text-sm font-medium">
                  ✗ Something went wrong. Please try again.
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full px-6 py-3 bg-accent text-primary rounded-lg hover:opacity-90 transition-all font-semibold disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
                    Sending...
                  </>
                ) : (
                  'Send Message'
                )}
              </button>
            </form>
          </div>

          {/* Contact Methods */}
          <div className="space-y-6 reveal-on-scroll stagger-2">
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-foreground">Contact Information</h3>
              {contactMethods.map((method) => {
                const IconComponent = method.icon
                return (
                  <a
                    key={method.label}
                    href={method.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-start gap-4 p-4 rounded-lg border border-border bg-card hover:border-accent hover:bg-accent/5 transition-all group"
                  >
                    <IconComponent className={`w-6 h-6 mt-1 flex-shrink-0 ${method.color}`} />
                    <div>
                      <h4 className="font-semibold text-foreground group-hover:text-accent transition-colors">
                        {method.label}
                      </h4>
                      <p className="text-sm text-foreground/70 break-all">{method.value}</p>
                    </div>
                  </a>
                )
              })}
            </div>

            {/* Quick Links */}
            <div className="pt-6 border-t border-border space-y-4">
              <h3 className="text-lg font-bold text-foreground">Social</h3>
              <div className="space-y-2">
                <a
                  href={contactInfo.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-sm text-foreground/70 hover:text-accent transition-colors"
                >
                  → GitHub
                </a>
                <a
                  href={contactInfo.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-sm text-foreground/70 hover:text-accent transition-colors"
                >
                  → Instagram
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="pt-12 border-t border-border bg-gradient-to-r from-accent/10 to-primary/10 rounded-xl p-8 md:p-12 text-center reveal-on-scroll">
          <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
            Let's Build Something Great
          </h3>
          <p className="text-base text-foreground/80 max-w-2xl mx-auto mb-6">
            Whether you have an exciting project, want to collaborate, or just want to discuss tech and law,
            I'm always open to new opportunities.
          </p>
          <button className="px-8 py-3 bg-accent text-primary rounded-lg hover:opacity-90 transition-all font-semibold inline-flex items-center gap-2">
            Schedule a Meeting
            <span>→</span>
          </button>
        </div>
      </div>
    </section>
  )
}
