'use client'

import { useRef, useEffect, useState, Suspense } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { ContactShadows, Environment } from '@react-three/drei'
import * as THREE from 'three'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import LaptopModel from './LaptopModel'

// Mutable camera target – lives outside React to avoid re-renders
const camTarget = { z: 5.5 }

function CameraController() {
  const { camera } = useThree()
  useFrame(() => {
    camera.position.z += (camTarget.z - camera.position.z) * 0.04
  })
  return null
}

/** Invisible plane at floor level that receives real-time shadows */
function ShadowCatcher() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.87, 0]} receiveShadow>
      <planeGeometry args={[14, 14]} />
      <shadowMaterial transparent opacity={0.45} />
    </mesh>
  )
}

export default function LaptopScene({ scrollProgress }: { scrollProgress?: number }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [mouse, setMouse] = useState({ x: 0, y: 0 })

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    // Reset in case component re-mounts
    camTarget.z = 5.5

    const tween = gsap.to(camTarget, {
      z: 2.6,
      ease: 'none',
      scrollTrigger: {
        trigger: '#home',
        start: 'top top',
        end: 'bottom center',
        scrub: 1.5,
      },
    })

    return () => {
      tween.kill()
      ScrollTrigger.getAll().forEach((t) => t.kill())
      camTarget.z = 5.5
    }
  }, [])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = containerRef.current?.getBoundingClientRect()
    if (!rect) return
    setMouse({
      x: ((e.clientX - rect.left) / rect.width) * 2 - 1,
      y: -((e.clientY - rect.top) / rect.height) * 2 + 1,
    })
  }

  const handleMouseLeave = () => {
    setMouse({ x: 0, y: 0 })
  }

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ width: '100%', height: '100%' }}
    >
      <Canvas
        camera={{ position: [0, 0.3, 5.5], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        shadows="soft"
        style={{ background: 'transparent' }}
      >
        <CameraController />

        {/* ── Lighting ── */}
        <ambientLight intensity={0.25} />

        {/* Key light from top-left – casts the main real-time shadow */}
        <directionalLight
          position={[-3, 6, 4]}
          intensity={2.2}
          color="#ffffff"
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
          shadow-camera-near={0.5}
          shadow-camera-far={20}
          shadow-camera-left={-5}
          shadow-camera-right={5}
          shadow-camera-top={5}
          shadow-camera-bottom={-5}
          shadow-bias={-0.001}
        />

        {/* Fill light from right – warm tone */}
        <pointLight position={[4, 2, 2]} intensity={1} color="#f5c842" />

        {/* Back rim light */}
        <pointLight position={[0, 4, -3]} intensity={0.6} color="#aabbff" />

        <Suspense fallback={null}>
          <LaptopModel mouseX={mouse.x} mouseY={mouse.y} />

          {/* Real-time shadow catcher plane */}
          <ShadowCatcher />

          {/* Soft baked contact shadow for extra depth */}
          <ContactShadows
            position={[0, -0.88, 0]}
            opacity={0.5}
            scale={7}
            blur={2.8}
            far={4}
            color="#000000"
          />

          <Environment preset="city" />
        </Suspense>
      </Canvas>
    </div>
  )
}
