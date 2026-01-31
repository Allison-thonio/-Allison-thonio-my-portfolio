'use client'

import { useState } from 'react'

export default function LawJourney() {
  const [expandedId, setExpandedId] = useState<number | null>(0)

  const milestones = [
    {
      id: 0,
      year: '2022',
      title: 'Began Law Studies',
      description:
        'Started my journey into law with a focus on understanding how technology intersects with legal frameworks. Discovered my passion for tech law and digital rights.',
      image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=400&h=300&fit=crop',
      icon: '📚',
    },
    {
      id: 1,
      year: '2023',
      title: 'Reached 200 Level',
      description:
        'Completed fundamental law courses including Constitutional Law, Criminal Law, and Contracts. Started specializing in intellectual property and tech law electives.',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop',
      icon: '⚖️',
    },
    {
      id: 2,
      year: '2024',
      title: 'Advanced to 300 Level',
      description:
        'Currently pursuing advanced legal studies with emphasis on Technology Law, Data Privacy, and Cybersecurity law. Combining development skills with legal knowledge.',
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=300&fit=crop',
      icon: '🎓',
    },
    {
      id: 3,
      year: '2024',
      title: 'Started Accounting',
      description:
        'Added accounting to my academic portfolio to better understand business law and financial regulations. This complements my technical and legal expertise.',
      image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&h=300&fit=crop',
      icon: '💼',
    },
  ]

  const achievements = [
    { icon: '🏆', title: 'Best Tech Law Essay', description: 'Recognized for innovative approach to digital governance' },
    { icon: '📖', title: 'Published Analysis', description: 'Contributed to legal tech blog on smart contracts' },
    { icon: '🤝', title: 'Internship Ready', description: 'Prepared for tech law internship opportunities' },
    { icon: '💡', title: 'Innovation Focus', description: 'Developing legal solutions through coding' },
  ]

  return (
    <section className="py-20 md:py-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto lg:ml-48">
      <div className="space-y-12">
        {/* Section Header */}
        <div className="space-y-4">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground">Law Journey</h2>
          <div className="w-12 h-1 bg-accent rounded-full" />
          <p className="text-base md:text-lg text-foreground/70">
            My path through legal education and how it shapes my perspective on technology and society.
          </p>
        </div>

        {/* Timeline */}
        <div className="space-y-6">
          {milestones.map((milestone, idx) => (
            <div
              key={milestone.id}
              className={`group cursor-pointer reveal-on-scroll stagger-${(idx % 3) + 1}`}
              onClick={() =>
                setExpandedId(expandedId === milestone.id ? null : milestone.id)
              }
            >
              <div
                className={`rounded-xl border transition-all duration-300 overflow-hidden ${expandedId === milestone.id
                    ? 'border-accent bg-card'
                    : 'border-border bg-card hover:border-accent/50'
                  }`}
              >
                {/* Header */}
                <div className="p-6 flex items-center gap-4 md:gap-6">
                  <div className="text-3xl md:text-4xl flex-shrink-0">{milestone.icon}</div>
                  <div className="flex-grow">
                    <div className="flex items-baseline gap-2 mb-1">
                      <span className="text-sm font-bold text-accent">{milestone.year}</span>
                      <h3 className="text-lg md:text-xl font-bold text-foreground">
                        {milestone.title}
                      </h3>
                    </div>
                    <p className="text-sm text-muted-foreground hidden sm:block">
                      {milestone.description.substring(0, 80)}...
                    </p>
                  </div>
                  <div
                    className={`text-2xl transition-transform duration-300 ${expandedId === milestone.id ? 'rotate-180' : ''
                      }`}
                  >
                    ↓
                  </div>
                </div>

                {/* Expanded Content */}
                {expandedId === milestone.id && (
                  <div className="border-t border-border px-6 py-6 animate-in slide-in-from-top">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <p className="text-base text-foreground/80 leading-relaxed">
                          {milestone.description}
                        </p>
                        <div className="pt-4 border-t border-border">
                          <h4 className="font-semibold text-foreground mb-3">Key Learnings:</h4>
                          <ul className="space-y-2 text-sm text-foreground/70">
                            <li>✓ Understanding legal frameworks in tech</li>
                            <li>✓ Digital rights and data protection</li>
                            <li>✓ Legal aspects of software development</li>
                            <li>✓ Ethics in technology deployment</li>
                          </ul>
                        </div>
                      </div>
                      <div className="hidden md:block rounded-lg overflow-hidden h-64 bg-gradient-to-br from-accent/20 to-primary/20 border border-accent/30">
                        <img
                          src={milestone.image || "/placeholder.svg"}
                          alt={milestone.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Achievements Grid */}
        <div className="pt-12 border-t border-border reveal-on-scroll">
          <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-8">
            Achievements & Recognition
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {achievements.map((achievement, idx) => (
              <div
                key={idx}
                className="p-6 rounded-lg border border-border bg-card hover:border-accent/50 hover:shadow-lg transition-all group"
              >
                <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">
                  {achievement.icon}
                </div>
                <h4 className="font-bold text-foreground mb-2 group-hover:text-accent transition-colors">
                  {achievement.title}
                </h4>
                <p className="text-sm text-foreground/70">{achievement.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Why Law & Tech */}
        <div className="pt-12 border-t border-border bg-gradient-to-r from-accent/10 to-primary/10 rounded-xl p-8 md:p-12">
          <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-6">Why Law & Technology?</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <p className="text-base text-foreground/80 leading-relaxed">
                The future belongs to those who understand both code and law. As technology continues to evolve, legal professionals who understand development will be invaluable. Similarly, developers with legal knowledge can create more responsible, compliant, and ethical applications.
              </p>
            </div>
            <div className="space-y-4">
              <p className="text-base text-foreground/80 leading-relaxed">
                This intersection fascinates me. Whether it's blockchain regulations, data privacy laws, AI ethics, or intellectual property in software, I want to be at the forefront of creating solutions that work for everyone.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
