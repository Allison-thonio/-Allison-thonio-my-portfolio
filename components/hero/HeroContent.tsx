'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function HeroContent() {
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!contentRef.current) return;

    const tl = gsap.timeline();

    tl.fromTo(
      contentRef.current.querySelector('h1'),
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }
    )
      .fromTo(
        contentRef.current.querySelector('.subheading'),
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
        '-=0.6'
      )
      .fromTo(
        contentRef.current.querySelector('.description'),
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
        '-=0.6'
      )
      .fromTo(
        contentRef.current.querySelector('.buttons'),
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
        '-=0.6'
      );
  }, []);

  return (
    <div ref={contentRef} className="flex flex-col justify-center space-y-6 lg:space-y-8">
      {/* Floating badge */}
      <div className="inline-flex items-center gap-2 w-fit px-4 py-2 rounded-full bg-slate-800/50 border border-slate-700 backdrop-blur-sm">
        <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
        <span className="text-sm text-slate-300">Available for work</span>
      </div>

      {/* Main Heading */}
      <div>
        <h1 className="text-5xl lg:text-6xl font-bold text-white leading-tight">
          Allison Anthonio
        </h1>
      </div>

      {/* Subheading */}
      <div className="subheading">
        <h2 className="text-2xl lg:text-3xl text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
          Full Stack Web Developer
        </h2>
      </div>

      {/* Description */}
      <p className="description text-slate-300 text-lg leading-relaxed max-w-md">
        I build scalable web applications, financial systems, and modern user interfaces.
        Passionate about creating elegant solutions to complex problems.
      </p>

      {/* CTA Buttons */}
      <div className="buttons flex flex-col sm:flex-row gap-4 pt-4">
        <button className="group px-8 py-3 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/50 transform hover:scale-105 active:scale-95">
          <span className="flex items-center gap-2">
            View Projects
            <svg
              className="w-4 h-4 group-hover:translate-x-1 transition-transform"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </span>
        </button>

        <button className="px-8 py-3 rounded-lg border-2 border-slate-600 text-white font-semibold transition-all duration-300 hover:border-cyan-500 hover:bg-slate-800/50 active:scale-95">
          Contact Me
        </button>
      </div>

      {/* Tech Stack */}
      <div className="pt-6 border-t border-slate-700/50">
        <p className="text-sm text-slate-400 mb-3">Tech Stack</p>
        <div className="flex flex-wrap gap-2">
          {['React', 'Next.js', 'TypeScript', 'TailwindCSS', 'Three.js'].map((tech) => (
            <span
              key={tech}
              className="px-3 py-1 rounded-full bg-slate-800/50 border border-slate-700 text-xs text-slate-300 hover:border-cyan-500 transition-colors cursor-default"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
