import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Stars } from '@react-three/drei';
import * as THREE from 'three';
import { ThreeDNAHelix } from './ThreeDNAHelix';

export function HeroScene() {
  return (
    <Canvas 
      className="w-full h-full"
      dpr={[1, 2]} 
      gl={{ antialias: true, toneMapping: THREE.ACESFilmicToneMapping }}
    >
      <PerspectiveCamera makeDefault position={[0, 0, 10]} />
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <directionalLight position={[-10, 10, 5]} intensity={0.5} />
      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
      <Suspense fallback={null}>
        <ThreeDNAHelix />
      </Suspense>
      <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
    </Canvas>
  );
}
