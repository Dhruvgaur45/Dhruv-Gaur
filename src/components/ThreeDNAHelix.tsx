import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Cylinder, Sphere } from '@react-three/drei';
import * as THREE from 'three';

const DNA_BASE_PAIRS = 20;

export function ThreeDNAHelix() {
  const meshRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.2;
    }
  });

  return (
    <group ref={meshRef}>
      {Array.from({ length: DNA_BASE_PAIRS }).map((_, i) => {
        const t = (i / DNA_BASE_PAIRS) * Math.PI * 4;
        return (
          <group key={i} position={[0, i * 0.4 - DNA_BASE_PAIRS * 0.2, 0]}>
            <Sphere position={[Math.cos(t), 0, Math.sin(t)]} args={[0.15, 16, 16]}>
              <meshStandardMaterial color="#6366F1" emissive="#6366F1" emissiveIntensity={0.5} />
            </Sphere>
            <Sphere position={[-Math.cos(t), 0, -Math.sin(t)]} args={[0.15, 16, 16]}>
              <meshStandardMaterial color="#10B981" emissive="#10B981" emissiveIntensity={0.5} />
            </Sphere>
            <Cylinder
              args={[0.05, 0.05, 1.5]}
              rotation={[0, 0, Math.PI / 2 + t]}
            >
              <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={0.2} transparent opacity={0.3} />
            </Cylinder>
          </group>
        );
      })}
    </group>
  );
}
