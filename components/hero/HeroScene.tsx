'use client';

import React, { Suspense, lazy, useEffect, useRef, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { PerspectiveCamera, Environment, Preload } from '@react-three/drei';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import HeroFallback from './HeroFallback';

gsap.registerPlugin(ScrollTrigger);

// Lazy load the 3D models (no external GLTF needed!)
const Laptop3D = lazy(() => import('./Laptop3D'));
const Laptop3DMobile = lazy(() => import('./Laptop3D-Mobile'));

const HeroScene: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<any>(null);
    const textRef = useRef<HTMLDivElement>(null);
    const [isMobile, setIsMobile] = useState(false);
    const [mounted, setMounted] = useState(false);

    // Detect mobile and screen size
    useEffect(() => {
        const checkScreen = () => {
            const mobile = window.innerWidth < 768;
            setIsMobile(mobile);
        };

        checkScreen();
        setMounted(true);
        window.addEventListener('resize', checkScreen);
        return () => window.removeEventListener('resize', checkScreen);
    }, []);

    // Scroll animations with mobile optimizations
    useEffect(() => {
        if (!containerRef.current || !mounted) return;

        const scrollTrigger = ScrollTrigger.create({
            trigger: containerRef.current,
            start: 'top top',
            end: 'bottom center',
            scrub: isMobile ? 2 : 1, // Slower scrub on mobile
            onUpdate: (self) => {
                if (canvasRef.current?.camera) {
                    // Mobile: less aggressive zoom
                    const zoomDistance = isMobile ? 1 : 2;
                    gsap.to(canvasRef.current.camera.position, {
                        x: 0,
                        y: isMobile ? 1 : 2,
                        z: isMobile ? 2 : 3 - self.progress * zoomDistance,
                        duration: 0.5,
                        ease: 'power2.inOut',
                        overwrite: 'auto',
                    });
                }
            },
        });

        return () => {
            scrollTrigger.kill();
        };
    }, [isMobile, mounted]);

    // Entrance animation for text
    useEffect(() => {
        if (!textRef.current || !mounted) return;

        const textElements = textRef.current.querySelectorAll('.hero-text-item');
        gsap.fromTo(
            textElements,
            {
                opacity: 0,
                y: 20,
            },
            {
                opacity: 1,
                y: 0,
                stagger: 0.1,
                duration: 0.8,
                ease: 'power2.out',
            }
        );
    }, [mounted]);

    // Don't render until mounted to avoid hydration mismatch
    if (!mounted) return <HeroFallback />;

    return (
        <div
            ref={containerRef}
            className="relative w-full h-screen overflow-hidden"
        >
            {/* Ambient background glows */}
            <div className="absolute -top-24 -left-24 w-96 h-96 bg-accent/5 rounded-full blur-3xl animate-flow pointer-events-none" aria-hidden />
            <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-flow pointer-events-none" style={{ animationDelay: '-1.5s' }} aria-hidden />

            {/* Content Section */}
            <div className="absolute inset-0 flex flex-col md:flex-row items-center justify-between pointer-events-none z-10 w-full max-w-7xl mx-auto">

                {/* Text Content - Responsive */}
                <div
                    ref={textRef}
                    className={`w-full md:w-1/2 h-full flex flex-col justify-center px-6 md:px-8 pointer-events-auto z-20 ${isMobile ? 'pt-10' : ''
                        }`}
                >
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

                        <h1 className="hero-text-item text-5xl md:text-6xl lg:text-7xl font-bold text-foreground leading-tight tracking-tight">
                            Allison{' '}
                            <span className="text-accent">Anthonio</span>
                        </h1>
                        <p className="hero-text-item text-xl md:text-2xl font-semibold text-accent/90">
                            Full Stack Web Developer
                        </p>
                        <p className="hero-text-item text-base md:text-lg text-foreground/75 leading-relaxed max-w-xl font-light">
                            I create elegant digital solutions that merge thoughtful design with robust engineering.
                            Passionate about combining law and technology to build impactful products.
                        </p>
                        <div className="hero-text-item flex flex-col sm:flex-row gap-4 pt-4">
                            <button className="group px-8 py-4 bg-accent text-accent-foreground rounded-xl font-bold text-sm hover:shadow-[0_0_28px_rgba(245,200,66,0.38)] hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2">
                                View My Projects
                            </button>
                            <button className="px-8 py-4 border-2 border-accent/30 text-foreground rounded-xl hover:bg-accent/10 hover:border-accent transition-all font-bold text-sm flex items-center justify-center">
                                Contact Me
                            </button>
                        </div>
                    </div>
                </div>

                {/* 3D Canvas */}
                <div className={`pointer-events-auto ${isMobile ? 'absolute inset-0 opacity-40 z-0' : 'w-1/2 h-full z-10'}`}>
                    <Canvas
                        ref={canvasRef}
                        camera={{
                            position: [0, 2, isMobile ? 3 : 5],
                            fov: isMobile ? 60 : 50,
                        }}
                        className="w-full h-full"
                        gl={{
                            antialias: true,
                            powerPreference: 'high-performance',
                            alpha: true,
                        }}
                    >
                        <PerspectiveCamera
                            makeDefault
                            position={[0, isMobile ? 1 : 2, isMobile ? 3 : 5]}
                            fov={isMobile ? 60 : 50}
                        />
                        <ambientLight intensity={0.6} />
                        <directionalLight
                            position={[5, 10, 5]}
                            intensity={1.2}
                            castShadow
                            color="#ffffff"
                        />
                        <pointLight position={[-5, 5, 5]} intensity={0.5} color="#ffffff" />
                        <pointLight position={[5, 5, -5]} intensity={0.3} color="#f5c842" />

                        <Suspense fallback={null}>
                            {isMobile ? <Laptop3DMobile /> : <Laptop3D />}
                        </Suspense>

                        <Environment preset="city" />
                        <Preload all />
                    </Canvas>
                </div>
            </div>

            {/* Scroll Indicator */}
            <div className={`absolute bottom-8 left-1/2 transform -translate-x-1/2 text-muted-foreground z-30 ${isMobile ? 'text-sm' : 'animate-bounce'}`}>
                {isMobile ? (
                    <p className="animate-bounce">↓ Scroll to explore</p>
                ) : (
                    <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 14l-7 7m0 0l-7-7m7 7V3"
                        />
                    </svg>
                )}
            </div>
        </div>
    );
};

export default HeroScene;
