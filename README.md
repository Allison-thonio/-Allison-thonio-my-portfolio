# Allison Anthonio's Portfolio

A modern, elegant portfolio website showcasing a full-stack developer's journey through law and technology.

## Features

### Main Portfolio
- **Hero Section**: Animated typewriter effect, social links, and CTAs
- **About Section**: Professional bio, stats (15 projects, 4+ years, 150K+ LOC)
- **Projects Section**: 15 completed projects with filtering by category (Full Stack, Frontend, Backend, AI, Mobile)
- **Law Journey Section**: Interactive timeline of educational milestones (2023-2026)
- **Contact Section**: Fully functional contact form with real contact information
- **Dark/Light Mode**: Toggle theme with automatic persistence
- **Responsive Design**: Mobile-first approach with special mobile optimizations

### Admin Portal (`/nigga`)
Password-protected admin dashboard for managing:
- **Projects Manager**: Add, edit, delete projects with GitHub and live links
- **Education Manager**: Manage law journey milestones and stats
- **Contact Manager**: Update contact information and social links
- **Settings**: Change admin password, manage preferences, export data

### Design System
- **Color Palette**: 
  - Light: White, Gold (#D4AF37), Black
  - Dark: Gold (#D4AF37), Blue (#5B7DB1)
- **Typography**: Clean, readable fonts optimized for all devices
- **Animations**: Flow animations, fade-in effects, hover states, and smooth transitions

## Contact Information
- **Email**: allisonfezyy@gmail.com
- **Phone**: +2349066486040
- **WhatsApp**: +2349066486040
- **Instagram**: @one.busy.human.being
- **GitHub**: allisonfezyy

## Technology Stack
- **Frontend**: Next.js 16, React 19, TypeScript, Tailwind CSS v4
- **Backend**: Node.js (for contact forms)
- **Database**: Suitable for Supabase/Neon integration
- **Hosting**: Vercel-ready

## Getting Started

### Installation
```bash
# Clone the repository
git clone <repository-url>

# Install dependencies
npm install

# Run development server
npm run dev

# Open http://localhost:3000 in your browser
```

### Admin Access
Navigate to `/nigga` and use the password found in your configuration.

Change this in `/app/nigga/page.tsx` and `/components/admin/SettingsManager.tsx`

## Customization

### Adding Your Own Photos
1. Replace placeholder images in `/public/images`
2. Update image paths in components:
   - Hero section (Hero.tsx)
   - Projects (projects.ts, Projects.tsx)
   - Law Journey (LawJourney.tsx)

### Updating Projects
Edit `/lib/projects.ts` to add or modify your 15 projects. Include:
- Title, description, category, tech stack
- Image URL, live link, GitHub link
- Lines of code, year built

### Managing Your Law Journey
Update the timeline in `/lib/projects.ts` under `experience.educationTimeline`

## Mobile Optimizations
- **No Zoom Required**: Full-height sections prevent unnecessary zooming
- **Touch-Friendly**: Large buttons and spacing for touch interfaces
- **Performance**: Optimized images and animations for mobile devices
- **Readable Typography**: Proper font sizes and line heights for readability

## Deployment

### Vercel (Recommended)
```bash
# Push to GitHub
git push origin main

# Vercel automatically deploys from GitHub
# Visit https://vercel.com and connect your repository
```

### Manual Deployment
```bash
npm run build
npm start
```

## Project Statistics
- **Total Projects**: 15
- **Years of Experience**: 4+
- **Lines of Code**: 150,000+
- **Law School Level**: 300 (as of 2026)

## Features & Functionalities
- ✓ Dark/Light mode toggle
- ✓ Smooth scroll navigation
- ✓ Mobile-responsive design
- ✓ Project filtering
- ✓ Interactive animations
- ✓ Password-protected admin panel
- ✓ Contact form (ready for backend integration)
- ✓ Educational timeline
- ✓ Social media links
- ✓ Performance optimized

## Future Enhancements
- [ ] Blog section for tech & law insights
- [ ] Case study deep-dives
- [ ] Email notification system
- [ ] Analytics dashboard
- [ ] Newsletter signup
- [ ] Dark mode animations

---

**Made with care** • Built to showcase the intersection of law and technology
