'use client';

import React, { useRef, useEffect, useState } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import gsap from 'gsap';

interface LaptopGroup extends THREE.Group {
    rotation: THREE.Euler;
    position: THREE.Vector3;
}

const Laptop3D: React.FC = () => {
    const groupRef = useRef<LaptopGroup>(null);
    const screenRef = useRef<THREE.Mesh>(null);
    const { camera, mouse, size } = useThree();
    const [isHovering, setIsHovering] = useState(false);
    const rotationVelocity = useRef({ x: 0, y: 0 });
    const floatOffset = useRef(0);

    // Load laptop model - using a basic geometry fallback
    useEffect(() => {
        // Entrance animation
        if (groupRef.current) {
            groupRef.current.position.z = 10;
            groupRef.current.rotation.x = Math.PI / 4;
            groupRef.current.rotation.y = Math.PI / 6;
            groupRef.current.scale.set(0.5, 0.5, 0.5);

            gsap.timeline().to(groupRef.current.position, {
                z: 0,
                duration: 1.2,
                ease: 'back.out',
            });

            gsap.to(groupRef.current.rotation, {
                x: 0,
                y: 0,
                duration: 1.2,
                ease: 'back.out',
            });

            gsap.to(groupRef.current.scale, {
                x: 1,
                y: 1,
                z: 1,
                duration: 1.2,
                ease: 'back.out',
            });
        }
    }, []);

    // Handle mouse movement for parallax
    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            const x = (e.clientX / window.innerWidth) * 2 - 1;
            const y = -(e.clientY / window.innerHeight) * 2 + 1;

            // Tilt effect based on mouse position
            rotationVelocity.current.x = y * 0.1;
            rotationVelocity.current.y = x * 0.1;
        };

        const handleMouseEnter = () => {
            setIsHovering(true);
        };

        const handleMouseLeave = () => {
            setIsHovering(false);
            rotationVelocity.current = { x: 0, y: 0 };
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseenter', handleMouseEnter);
        window.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseenter', handleMouseEnter);
            window.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, []);

    useFrame(() => {
        if (!groupRef.current) return;

        // Floating animation
        floatOffset.current += 0.01;
        groupRef.current.position.y = Math.sin(floatOffset.current) * 0.3;

        // Slow rotation on idle
        if (!isHovering) {
            groupRef.current.rotation.y += 0.003;
            groupRef.current.rotation.x = Math.sin(floatOffset.current * 0.5) * 0.05;
        } else {
            // Increase rotation on hover
            groupRef.current.rotation.x += rotationVelocity.current.x * 0.1;
            groupRef.current.rotation.y += rotationVelocity.current.y * 0.1;

            // Add glow effect on hover
            if (screenRef.current && screenRef.current.material) {
                gsap.to(screenRef.current.material, {
                    emissiveIntensity: 0.8,
                    duration: 0.3,
                });
            }
        }

        // Smoothly dampen rotation
        rotationVelocity.current.x *= 0.95;
        rotationVelocity.current.y *= 0.95;
    });

    const handlePointerEnter = () => {
        setIsHovering(true);
        if (groupRef.current) {
            gsap.to(groupRef.current.scale, {
                x: 1.05,
                y: 1.05,
                z: 1.05,
                duration: 0.3,
            });
        }
    };

    const handlePointerLeave = () => {
        setIsHovering(false);
        if (groupRef.current) {
            gsap.to(groupRef.current.scale, {
                x: 1,
                y: 1,
                z: 1,
                duration: 0.3,
            });
        }
        if (screenRef.current && screenRef.current.material) {
            gsap.to(screenRef.current.material, {
                emissiveIntensity: 0.3,
                duration: 0.3,
            });
        }
    };

    return (
        <group
            ref={groupRef}
            onPointerEnter={handlePointerEnter}
            onPointerLeave={handlePointerLeave}
        >
            {/* Laptop Base/Body */}
            <group>
                {/* Base plate */}
                <mesh position={[0, -0.4, 0]} receiveShadow castShadow>
                    {/* Thinner base for modern look */}
                    <boxGeometry args={[2.2, 0.08, 1.5]} />
                    <meshStandardMaterial
                        color="#d4d4d8"
                        metalness={0.9}
                        roughness={0.2}
                    />
                </mesh>

                {/* Keyboard area */}
                <mesh position={[0, -0.34, 0.1]} castShadow receiveShadow>
                    <boxGeometry args={[2.0, 0.05, 0.9]} />
                    <meshStandardMaterial color="#18181b" metalness={0.8} roughness={0.5} />
                </mesh>

                {/* Trackpad area */}
                <mesh position={[0, -0.35, 0.65]}>
                    <boxGeometry args={[0.7, 0.02, 0.45]} />
                    <meshStandardMaterial color="#a1a1aa" metalness={0.7} roughness={0.3} />
                </mesh>

                {/* Screen/Display */}
                {/* Adjust group position to match the hinge */}
                <group position={[0, 0.35, -0.7]} rotation={[-0.1, 0, 0]}>
                    <group position={[0, 0, 0.7]}>
                        {/* Screen bezel */}
                        <mesh castShadow receiveShadow>
                            {/* Sleeker thinner screen */}
                            <boxGeometry args={[2.2, 1.4, 0.05]} />
                            <meshStandardMaterial
                                color="#d4d4d8"
                                metalness={0.9}
                                roughness={0.2}
                            />
                        </mesh>

                        {/* Internal black border */}
                        <mesh position={[0, 0, 0.026]}>
                            <planeGeometry args={[2.15, 1.35]} />
                            <meshStandardMaterial color="#000000" metalness={1} roughness={0} />
                        </mesh>

                        {/* Display with gradient */}
                        <mesh position={[0, 0, 0.06]} ref={screenRef}>
                            <planeGeometry args={[1.85, 1.3]} />
                            <meshStandardMaterial
                                color="#0a0e27"
                                emissive="#00d9ff"
                                emissiveIntensity={0.3}
                                metalness={0.3}
                                roughness={0.8}
                            />
                        </mesh>

                        {/* Screen content canvas overlay */}
                        <mesh position={[0, 0, 0.03]}>
                            <planeGeometry args={[2.1, 1.3]} />
                            <meshBasicMaterial>
                                <canvasTexture
                                    attach="map"
                                    args={[createScreenContent()]}
                                />
                            </meshBasicMaterial>
                        </mesh>
                    </group>
                </group>

                {/* Hinge/Stand */}
                <mesh position={[0, -0.36, -0.7]} rotation={[0, 0, Math.PI / 2]} castShadow>
                    <cylinderGeometry args={[0.04, 0.04, 1.8, 16]} />
                    <meshStandardMaterial color="#111111" metalness={0.8} roughness={0.3} />
                </mesh>
            </group>

            {/* Ambient glow effect */}
            <pointLight
                position={[0, 0, 1]}
                intensity={isHovering ? 1.5 : 0.5}
                color="#00d9ff"
                distance={3}
            />
        </group>
    );
};

/**
 * Creates dynamic screen content using canvas texture
 * This displays looping project previews
 */
function createScreenContent(): HTMLCanvasElement {
    const canvas = document.createElement('canvas');
    canvas.width = 1024;
    canvas.height = 768;
    const ctx = canvas.getContext('2d');

    if (!ctx) return canvas;

    // Background gradient
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    gradient.addColorStop(0, '#0a0e27');
    gradient.addColorStop(1, '#16213e');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Title
    ctx.fillStyle = '#00d9ff';
    ctx.font = 'bold 48px "Courier New"';
    ctx.textAlign = 'center';
    ctx.fillText('Portfolio Projects', canvas.width / 2, 100);

    // Project cards animation
    ctx.fillStyle = '#1a3a52';
    ctx.fillRect(50, 150, 900, 550);

    ctx.strokeStyle = '#00d9ff';
    ctx.lineWidth = 2;
    ctx.strokeRect(50, 150, 900, 550);

    // Sample project text
    ctx.fillStyle = '#ffffff';
    ctx.font = '24px "Courier New"';
    ctx.textAlign = 'left';
    ctx.fillText('Interactive 3D Experiences', 100, 250);
    ctx.fillStyle = '#a0aec0';
    ctx.font = '16px "Courier New"';
    ctx.fillText(
        'Built with React Three Fiber, GSAP, and WebGL',
        100,
        290
    );

    return canvas;
}

export default Laptop3D;
