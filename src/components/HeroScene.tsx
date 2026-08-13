import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { PerspectiveCamera, Stars } from '@react-three/drei';
import * as THREE from 'three';
import { ThreeDNAHelix } from './ThreeDNAHelix';

export function HeroScene() {
  return (
    <Canvas
      className="w-full h-full pointer-events-none"
      dpr={[1, 1.5]}
      gl={{
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance',
        toneMapping: THREE.ACESFilmicToneMapping,
      }}
    >
      <PerspectiveCamera makeDefault position={[0, 0, 9]} fov={50} />
      
      {/* Soft scientific laboratory lighting */}
      <ambientLight intensity={0.65} />
      <pointLight position={[8, 8, 8]} intensity={1.2} color="#00F2FE" />
      <pointLight position={[-8, -8, -5]} intensity={0.9} color="#10B981" />
      <directionalLight position={[0, 10, 5]} intensity={0.6} color="#FFFFFF" />
      
      {/* Subtle deep space / genomic stars */}
      <Stars radius={60} depth={40} count={2500} factor={3} saturation={0} fade speed={0.8} />
      
      <Suspense fallback={null}>
        <ThreeDNAHelix />
      </Suspense>
    </Canvas>
  );
}

export default HeroScene;
