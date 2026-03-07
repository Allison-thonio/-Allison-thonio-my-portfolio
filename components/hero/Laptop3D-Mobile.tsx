'use client';

import React, { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import gsap from 'gsap';

interface LaptopGroup extends THREE.Group {
    rotation: THREE.Euler;
    position: THREE.Vector3;
}

/**
 * Mobile-optimized procedural laptop
 * Lightweight geometry for better performance on phones/tablets
 */
const Laptop3D_Mobile: React.FC = () => {
    const groupRef = useRef<LaptopGroup>(null);
    const floatOffset = useRef(0);

    // Entrance animation
    useEffect(() => {
        if (groupRef.current) {
            groupRef.current.position.z = 5;
            groupRef.current.rotation.x = Math.PI / 6;
            groupRef.current.scale.set(0.3, 0.3, 0.3);

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
                x: 0.5,
                y: 0.5,
                z: 0.5,
                duration: 1.2,
                ease: 'back.out',
            });
        }
    }, []);

    useFrame(() => {
        if (!groupRef.current) return;

        floatOffset.current += 0.01;
        // Subtle floating on mobile
        groupRef.current.position.y = Math.sin(floatOffset.current) * 0.1;
        // Slow rotation
        groupRef.current.rotation.y += 0.002;
    });

    return (
        <group ref={groupRef}>
            {/* Simplified base */}
            <mesh position={[0, -0.4, 0]}>
                <boxGeometry args={[1.6, 0.08, 1.1]} />
                <meshStandardMaterial color="#d4d4d8" metalness={0.8} roughness={0.3} />
            </mesh>

            {/* Keyboard area indication */}
            <mesh position={[0, -0.35, 0.1]}>
                <boxGeometry args={[1.4, 0.05, 0.6]} />
                <meshStandardMaterial color="#18181b" metalness={0.7} />
            </mesh>

            {/* Simplified screen */}
            <group position={[0, 0.2, -0.5]} rotation={[-0.1, 0, 0]}>
                <group position={[0, 0, 0.5]}>
                    <mesh>
                        <boxGeometry args={[1.6, 1.1, 0.05]} />
                        <meshStandardMaterial color="#d4d4d8" metalness={0.8} roughness={0.3} />
                    </mesh>

                    {/* Internal black border */}
                    <mesh position={[0, 0, 0.03]}>
                        <planeGeometry args={[1.55, 1.05]} />
                        <meshStandardMaterial color="#000000" metalness={1} roughness={0} />
                    </mesh>

                    {/* Display */}
                    <mesh position={[0, 0, 0.04]}>
                        <planeGeometry args={[1.45, 0.95]} />
                        <meshStandardMaterial
                            color="#0a0e27"
                            emissive="#00d9ff"
                            emissiveIntensity={0.6}
                        />
                    </mesh>
                </group>
            </group>

            <pointLight position={[0, 0, 0.8]} intensity={0.4} color="#00d9ff" />
        </group>
    );
};

export default Laptop3D_Mobile;
