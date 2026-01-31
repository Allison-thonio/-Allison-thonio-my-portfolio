'use client'

import { Github, Linkedin, Twitter, Mail } from 'lucide-react'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  const footerLinks = [
    {
      label: 'GitHub',
      icon: Github,
      href: 'https://github.com',
    },
    {
      label: 'LinkedIn',
      icon: Linkedin,
      href: 'https://linkedin.com',
    },
    {
      label: 'Twitter',
      icon: Twitter,
      href: 'https://twitter.com',
    },
    {
      label: 'Email',
      icon: Mail,
      href: 'mailto:allison@example.com',
    },
  ]

  return (
    <footer className="border-t border-border bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        {/* Main Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 mb-8 md:mb-12">
          {/* Branding */}
          <div className="space-y-4">
            <div className="text-2xl font-bold bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">
              AA
            </div>
            <p className="text-foreground/70 max-w-sm">
              Full Stack Developer, Law Student, Accounting Student. Building the future at the
              intersection of technology, law, and business.
            </p>
          </div>

          {/* Quick Navigation */}
          <div className="grid grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-foreground mb-3 text-sm uppercase tracking-wider">
                Navigation
              </h4>
              <ul className="space-y-2 text-sm text-foreground/70">
                <li>
                  <a href="#home" className="hover:text-accent transition-colors">
                    Home
                  </a>
                </li>
                <li>
                  <a href="#about" className="hover:text-accent transition-colors">
                    About
                  </a>
                </li>
                <li>
                  <a href="#projects" className="hover:text-accent transition-colors">
                    Projects
                  </a>
                </li>
                <li>
                  <a href="#law-journey" className="hover:text-accent transition-colors">
                    Law Journey
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-foreground mb-3 text-sm uppercase tracking-wider">
                Resources
              </h4>
              <ul className="space-y-2 text-sm text-foreground/70">
                <li>
                  <a href="#" className="hover:text-accent transition-colors">
                    Resume
                  </a>
                </li>
                <li>
                  <a href="#contact" className="hover:text-accent transition-colors">
                    Contact
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-accent transition-colors">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-accent transition-colors">
                    Testimonials
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-border my-8 md:my-12" />

        {/* Bottom */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Copyright */}
          <p className="text-sm text-foreground/60 text-center md:text-left">
            © {currentYear} Allison Anthonio. All rights reserved. • Crafted with code, law, and curiosity.
          </p>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            {footerLinks.map((link) => {
              const IconComponent = link.icon
              return (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.label}
                  className="w-10 h-10 rounded-lg border border-border flex items-center justify-center text-foreground/60 hover:text-accent hover:border-accent transition-all duration-300 hover:shadow-lg"
                >
                  <IconComponent className="w-5 h-5" />
                </a>
              )
            })}
          </div>
        </div>

        {/* Extra Links */}
        <div className="flex flex-wrap justify-center gap-4 mt-8 pt-8 border-t border-border text-xs text-foreground/50">
          <a href="#" className="hover:text-accent transition-colors">
            Privacy Policy
          </a>
          <span>•</span>
          <a href="#" className="hover:text-accent transition-colors">
            Terms of Service
          </a>
          <span>•</span>
          <a href="#" className="hover:text-accent transition-colors">
            Accessibility
          </a>
        </div>
      </div>
    </footer>
  )
}
