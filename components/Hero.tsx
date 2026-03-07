'use client';

import { useEffect, useState } from 'react';
import { SplineScene } from '@/components/ui/spline';
import { Spotlight } from '@/components/ui/spotlight';
import HeroFallback from './hero/HeroFallback';

export default function Hero() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <HeroFallback />;

  return (
    <div id="home" className="relative w-full h-screen bg-black overflow-hidden flex items-center justify-center">
      {/* Spotlight Effect from UI component */}
      <Spotlight
        className="-top-40 left-0 md:left-60 md:-top-20"
        fill="white"
      />

      <div className="flex flex-col md:flex-row h-full w-full max-w-7xl mx-auto z-10 relative pointer-events-none">

        {/* Left content (Text Area) */}
        <div className="w-full md:w-1/2 h-full flex flex-col justify-center px-6 md:px-8 pointer-events-auto z-20 pt-20 md:pt-0">
          <div className="space-y-6">
            <div className="hero-text-item inline-flex items-center gap-3 px-3 py-1.5 rounded-full bg-accent/10 border border-accent/20 w-fit backdrop-blur-sm">
              <div className="relative flex items-center justify-center">
                <div className="w-2.5 h-2.5 rounded-full bg-accent animate-ping absolute" />
                <div className="w-2.5 h-2.5 rounded-full bg-accent relative" />
              </div>
              <span className="text-xs font-bold text-accent uppercase tracking-wider">
                Available for work
              </span>
            </div>

            <h1 className="hero-text-item text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight tracking-tight">
              Allison{' '}
              <span className="text-accent">Anthonio</span>
            </h1>
            <p className="hero-text-item text-xl md:text-2xl font-semibold text-accent/90">
              Full Stack Web Developer
            </p>
            <p className="hero-text-item text-base md:text-lg text-gray-300 leading-relaxed max-w-xl font-light">
              I create elegant digital solutions that merge thoughtful design with robust engineering.
              Passionate about combining law and technology to build impactful products.
            </p>
            <div className="hero-text-item flex flex-col sm:flex-row gap-4 pt-4">
              <a href="#projects" className="group px-8 py-4 bg-accent text-accent-foreground rounded-xl font-bold text-sm hover:shadow-[0_0_28px_rgba(245,200,66,0.38)] hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer">
                View My Projects
              </a>
              <a href="#contact" className="px-8 py-4 border-2 border-accent/30 text-white rounded-xl hover:bg-accent/10 hover:border-accent transition-all font-bold text-sm flex items-center justify-center cursor-pointer">
                Contact Me
              </a>
            </div>
          </div>
        </div>

        {/* Right content - Spline 3D Scene */}
        <div className="absolute inset-0 md:relative md:w-1/2 md:h-full z-0 pointer-events-auto opacity-50 md:opacity-100 flex items-center justify-center">
          <SplineScene
            scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
            className="w-full h-full"
          />
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-gray-400 z-30 animate-bounce">
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </div>
  );
}
