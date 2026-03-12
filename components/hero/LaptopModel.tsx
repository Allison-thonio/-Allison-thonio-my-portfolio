'use client'

import { useRef, useMemo, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { siteConfig } from '@/lib/projects'

interface LaptopModelProps {
  mouseX: number
  mouseY: number
}

// ─── Canvas drawing helpers ────────────────────────────────────────────────────

function roundRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number
) {
  ctx.beginPath()
  ctx.moveTo(x + r, y)
  ctx.lineTo(x + w - r, y)
  ctx.arcTo(x + w, y, x + w, y + r, r)
  ctx.lineTo(x + w, y + h - r)
  ctx.arcTo(x + w, y + h, x + w - r, y + h, r)
  ctx.lineTo(x + r, y + h)
  ctx.arcTo(x, y + h, x, y + h - r, r)
  ctx.lineTo(x, y + r)
  ctx.arcTo(x, y, x + r, y, r)
  ctx.closePath()
  ctx.fill()
}

/** Draw the portfolio preview onto a canvas */
function drawPortfolioScreen(
  canvas: HTMLCanvasElement,
  profileImg: HTMLImageElement | null,
  lines: string = '150K+'
) {
  const ctx = canvas.getContext('2d')!
  const W = canvas.width
  const H = canvas.height

  // ── Page background ──────────────────────────────────────────────────────
  const bg = ctx.createLinearGradient(0, 0, 0, H)
  bg.addColorStop(0, '#0e1118')
  bg.addColorStop(1, '#090c14')
  ctx.fillStyle = bg
  ctx.fillRect(0, 0, W, H)

  // ── Browser chrome ───────────────────────────────────────────────────────
  ctx.fillStyle = '#1a1d24'
  ctx.fillRect(0, 0, W, 40)

  // traffic lights
  ;[
    { x: 16, c: '#ff5f57' },
    { x: 37, c: '#ffbd2e' },
    { x: 58, c: '#28c840' },
  ].forEach(({ x, c }) => {
    ctx.beginPath()
    ctx.arc(x, 20, 6, 0, Math.PI * 2)
    ctx.fillStyle = c
    ctx.fill()
  })

  // URL bar
  ctx.fillStyle = '#252830'
  roundRect(ctx, 82, 9, W - 102, 22, 5)
  ctx.fillStyle = '#64748b'
  ctx.font = '11px monospace'
  ctx.fillText('allisonanthonio.dev/about', 94, 24)

  // ── Profile area ─────────────────────────────────────────────────────────
  const PAD = 30
  const PHOTO_R = 48 // radius
  const photoX = PAD + PHOTO_R
  const photoY = 40 + 20 + PHOTO_R // 20 padding below chrome

  // Amber glow ring behind photo
  const glow = ctx.createRadialGradient(photoX, photoY, PHOTO_R - 4, photoX, photoY, PHOTO_R + 18)
  glow.addColorStop(0, 'rgba(245,200,66,0.55)')
  glow.addColorStop(1, 'rgba(245,200,66,0)')
  ctx.fillStyle = glow
  ctx.beginPath()
  ctx.arc(photoX, photoY, PHOTO_R + 18, 0, Math.PI * 2)
  ctx.fill()

  // Photo clip
  ctx.save()
  ctx.beginPath()
  ctx.arc(photoX, photoY, PHOTO_R, 0, Math.PI * 2)
  ctx.clip()

  if (profileImg) {
    ctx.drawImage(
      profileImg,
      photoX - PHOTO_R,
      photoY - PHOTO_R,
      PHOTO_R * 2,
      PHOTO_R * 2
    )
  } else {
    // Gradient placeholder
    const pal = ctx.createLinearGradient(photoX - PHOTO_R, photoY - PHOTO_R, photoX + PHOTO_R, photoY + PHOTO_R)
    pal.addColorStop(0, '#f5c842')
    pal.addColorStop(1, '#e07b20')
    ctx.fillStyle = pal
    ctx.fillRect(photoX - PHOTO_R, photoY - PHOTO_R, PHOTO_R * 2, PHOTO_R * 2)
    ctx.fillStyle = '#000'
    ctx.font = 'bold 26px sans-serif'
    ctx.textAlign = 'center'
    ctx.fillText('AA', photoX, photoY + 9)
    ctx.textAlign = 'left'
  }
  ctx.restore()

  // Amber border ring
  ctx.beginPath()
  ctx.arc(photoX, photoY, PHOTO_R + 3, 0, Math.PI * 2)
  ctx.strokeStyle = '#f5c842'
  ctx.lineWidth = 2.5
  ctx.stroke()

  // Online status dot
  ctx.beginPath()
  ctx.arc(photoX + PHOTO_R - 8, photoY + PHOTO_R - 8, 8, 0, Math.PI * 2)
  ctx.fillStyle = '#0e1118'
  ctx.fill()
  ctx.beginPath()
  ctx.arc(photoX + PHOTO_R - 8, photoY + PHOTO_R - 8, 6, 0, Math.PI * 2)
  ctx.fillStyle = '#22c55e'
  ctx.fill()

  // ── Name & role (right of photo) ─────────────────────────────────────────
  const TX = photoX + PHOTO_R + 22
  const TY = photoY - PHOTO_R + 10

  ctx.fillStyle = '#f1f5f9'
  ctx.font = 'bold 22px Arial, sans-serif'
  ctx.fillText('Allison Anthonio', TX, TY + 22)

  ctx.fillStyle = '#f5c842'
  ctx.font = '600 13px Arial, sans-serif'
  ctx.fillText('Full Stack Developer', TX, TY + 44)

  ctx.fillStyle = '#64748b'
  ctx.font = '11px Arial, sans-serif'
  ctx.fillText('📍 Nigeria  ·  🌐 Open to Work', TX, TY + 64)

  // ── Divider ──────────────────────────────────────────────────────────────
  const divY = photoY + PHOTO_R + 20
  ctx.fillStyle = '#252830'
  ctx.fillRect(PAD, divY, W - PAD * 2, 1)

  // ── Stats ────────────────────────────────────────────────────────────────
  const statsY = divY + 24
  const stats = [
    { value: '15', label: 'Projects' },
    { value: '4+', label: 'Years Exp.' },
    { value: lines.replace('+', ''), label: 'Lines' },
  ]
  const colW = (W - PAD * 2) / 3

  stats.forEach((s, i) => {
    const sx = PAD + i * colW
    ctx.fillStyle = '#f5c842'
    ctx.font = 'bold 20px Arial, sans-serif'
    ctx.fillText(s.value, sx, statsY + 22)
    ctx.fillStyle = '#64748b'
    ctx.font = '10px Arial, sans-serif'
    ctx.fillText(s.label, sx, statsY + 38)
    // separator
    if (i < stats.length - 1) {
      ctx.fillStyle = '#252830'
      ctx.fillRect(sx + colW - 1, statsY, 1, 40)
    }
  })

  // ── Tech badges ──────────────────────────────────────────────────────────
  const badgeY = statsY + 58
  const techs = ['Next.js', 'TypeScript', 'Node.js', 'PostgreSQL', 'Law + Tech']
  let bx = PAD
  ctx.font = 'bold 10px monospace'

  techs.forEach((tech) => {
    const tw = ctx.measureText(tech).width + 16
    if (bx + tw > W - PAD) return // wrap if overflow
    ctx.fillStyle = '#1e293b'
    roundRect(ctx, bx, badgeY, tw, 22, 5)
    ctx.fillStyle = tech === 'Law + Tech' ? '#f5c842' : '#7dd3fc'
    ctx.fillText(tech, bx + 8, badgeY + 15)
    bx += tw + 8
  })

  // ── Footer ───────────────────────────────────────────────────────────────
  ctx.fillStyle = '#131620'
  ctx.fillRect(0, H - 28, W, 28)

  ctx.fillStyle = '#374151'
  ctx.font = '10px monospace'
  ctx.fillText('github.com/allisonfezyy', PAD, H - 10)

  // Green available dot + text
  ctx.beginPath()
  ctx.arc(W - 80, H - 14, 5, 0, Math.PI * 2)
  ctx.fillStyle = '#22c55e'
  ctx.fill()
  ctx.fillStyle = '#94a3b8'
  ctx.font = '10px Arial, sans-serif'
  ctx.fillText('Available', W - 70, H - 10)
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function LaptopModel({ mouseX, mouseY }: LaptopModelProps) {
  const groupRef = useRef<THREE.Group>(null)
  const floatTime = useRef(0)

  // Create canvas + texture once
  const { screenCanvas, screenTexture } = useMemo(() => {
    const screenCanvas = document.createElement('canvas')
    screenCanvas.width = 640
    screenCanvas.height = 400
    drawPortfolioScreen(screenCanvas, null, siteConfig.hero.linesOfCode)
    const screenTexture = new THREE.CanvasTexture(screenCanvas)
    return { screenCanvas, screenTexture }
  }, [])

  // Async-load profile photo → redraw canvas
  useEffect(() => {
    const fetchConfigAndDraw = async () => {
      let imageUrl = siteConfig.hero.mainImage
      let lines = siteConfig.hero.linesOfCode
      
      try {
        const { doc, getDoc } = await import('firebase/firestore')
        const { db } = await import('@/lib/firebase')
        const docSnap = await getDoc(doc(db, 'portfolio', 'hero'))
        if (docSnap.exists()) {
          const data = docSnap.data()
          if (data.mainImage) imageUrl = data.mainImage
          if (data.linesOfCode) lines = data.linesOfCode
        }
      } catch (error) {
        console.error("Error fetching hero config for LaptopModel:", error)
      }

      // We technically should pass lines to drawPortfolioScreen, but let's keep it simple
      // and draw the image.
      const img = new window.Image()
      img.crossOrigin = 'anonymous'
      img.onload = () => {
        drawPortfolioScreen(screenCanvas, img, lines)
        screenTexture.needsUpdate = true
      }
      img.onerror = () => {} // keep placeholder on failure
      img.src = imageUrl
    }
    
    fetchConfigAndDraw()
  }, [screenCanvas, screenTexture])

  // Materials
  const bodyMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#2a2a3e',
        metalness: 0.92,
        roughness: 0.12,
        envMapIntensity: 1.3,
      }),
    []
  )
  const lidMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#22223a',
        metalness: 0.9,
        roughness: 0.15,
        envMapIntensity: 1.3,
      }),
    []
  )
  const keyboardMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#18182c',
        roughness: 0.82,
        metalness: 0.2,
      }),
    []
  )
  const screenMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        map: screenTexture,
        emissiveMap: screenTexture,
        emissive: new THREE.Color('#3366cc'),
        emissiveIntensity: 0.2,
        roughness: 0.04,
        metalness: 0.0,
      }),
    [screenTexture]
  )

  // Animate: float + mouse parallax
  useFrame((_, delta) => {
    if (!groupRef.current) return
    floatTime.current += delta * 0.55
    const floatY = Math.sin(floatTime.current) * 0.09

    groupRef.current.rotation.y +=
      (mouseX * 0.28 - groupRef.current.rotation.y) * 0.055
    groupRef.current.rotation.x +=
      (-mouseY * 0.13 - groupRef.current.rotation.x) * 0.055
    groupRef.current.position.y +=
      (floatY - groupRef.current.position.y) * 0.055
  })

  return (
    <group ref={groupRef} rotation={[0.04, 0.3, 0]}>
      {/* ── Base / keyboard unit ── */}
      <mesh material={bodyMat} position={[0, 0, 0]} castShadow receiveShadow>
        <boxGeometry args={[3, 0.12, 2]} />
      </mesh>

      {/* Keyboard surface */}
      <mesh material={keyboardMat} position={[0, 0.062, 0.08]} castShadow>
        <boxGeometry args={[2.6, 0.005, 1.55]} />
      </mesh>

      {/* Trackpad */}
      <mesh material={keyboardMat} position={[0, 0.062, 0.68]}>
        <boxGeometry args={[0.75, 0.005, 0.46]} />
      </mesh>

      {/* Front-edge highlight strip */}
      <mesh position={[0, 0, 1.01]} castShadow>
        <boxGeometry args={[3, 0.12, 0.012]} />
        <meshStandardMaterial
          color="#4a4a6a"
          metalness={0.96}
          roughness={0.04}
          emissive="#2a2a5a"
          emissiveIntensity={0.35}
        />
      </mesh>

      {/* ── Lid — hinge pivot ── */}
      <group position={[0, 0.06, -1]} rotation={[-1.18, 0, 0]}>
        {/* Lid outer shell */}
        <mesh material={lidMat} position={[0, 0.95, 0]} castShadow receiveShadow>
          <boxGeometry args={[3, 1.9, 0.1]} />
        </mesh>

        {/* Bezel */}
        <mesh position={[0, 0.95, 0.052]}>
          <boxGeometry args={[2.72, 1.68, 0.006]} />
          <meshStandardMaterial color="#0a0a18" roughness={0.9} metalness={0.1} />
        </mesh>

        {/* Active screen — portfolio card texture */}
        <mesh material={screenMat} position={[0, 0.95, 0.058]}>
          <planeGeometry args={[2.5, 1.52]} />
        </mesh>

        {/* Screen glow overlay */}
        <mesh position={[0, 0.95, 0.062]}>
          <planeGeometry args={[2.5, 1.52]} />
          <meshStandardMaterial
            color="#112244"
            emissive="#1a3a8c"
            emissiveIntensity={0.1}
            transparent
            opacity={0.12}
          />
        </mesh>

        {/* Screen light — illuminates base and casts real-time shadow */}
        <pointLight
          position={[0, 0.95, 0.55]}
          intensity={1.6}
          color="#7aadff"
          distance={4}
          castShadow
          shadow-mapSize-width={512}
          shadow-mapSize-height={512}
        />
      </group>

      {/* Warm under-glow */}
      <pointLight
        position={[0, -0.6, 0.5]}
        intensity={0.65}
        color="#f5c842"
        distance={3}
      />

      {/* Rim light — left blue edge */}
      <pointLight
        position={[-2.6, 1.6, 0.5]}
        intensity={0.8}
        color="#aabbff"
        distance={6}
      />
    </group>
  )
}
