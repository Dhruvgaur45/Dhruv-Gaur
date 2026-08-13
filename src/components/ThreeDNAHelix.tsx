import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Cylinder, Sphere, Torus } from '@react-three/drei';
import * as THREE from 'three';

const DNA_BASE_PAIRS = 28;

// Scientific Nucleotide Colors
const NUCLEOTIDE_COLORS = [
  { name: 'Adenine', color: '#00F2FE', emissive: '#00F2FE', complement: '#10B981', compName: 'Thymine' },
  { name: 'Guanine', color: '#8B5CF6', emissive: '#8B5CF6', complement: '#EC4899', compName: 'Cytosine' },
  { name: 'Cytosine', color: '#EC4899', emissive: '#EC4899', complement: '#8B5CF6', compName: 'Guanine' },
  { name: 'Thymine', color: '#10B981', emissive: '#10B981', complement: '#00F2FE', compName: 'Adenine' },
];

// Floating Molecular Ring Structure (e.g. Purine / Pyrimidine ring)
function FloatingMolecularRing({
  position,
  speed,
  scale = 1,
  color = '#0D9488',
}: {
  position: [number, number, number];
  speed: number;
  scale?: number;
  color?: string;
}) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      const t = state.clock.getElapsedTime() * speed;
      groupRef.current.position.y = position[1] + Math.sin(t * 1.2) * 0.35;
      groupRef.current.position.x = position[0] + Math.cos(t * 0.8) * 0.2;
      groupRef.current.rotation.x = t * 0.2;
      groupRef.current.rotation.y = t * 0.3;
      groupRef.current.rotation.z = Math.sin(t * 0.5) * 0.2;
    }
  });

  return (
    <group ref={groupRef} position={position} scale={scale}>
      {/* Central Ring Torus */}
      <Torus args={[0.35, 0.025, 12, 24]}>
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.5} transparent opacity={0.65} />
      </Torus>
      {/* 6 Peripheral Carbon/Nitrogen Vertices */}
      {Array.from({ length: 6 }).map((_, i) => {
        const angle = (i / 6) * Math.PI * 2;
        const x = Math.cos(angle) * 0.35;
        const y = Math.sin(angle) * 0.35;
        const isNitrogen = i % 2 === 0;
        return (
          <Sphere key={i} position={[x, y, 0]} args={[0.07, 12, 12]}>
            <meshStandardMaterial
              color={isNitrogen ? '#00F2FE' : color}
              emissive={isNitrogen ? '#00F2FE' : color}
              emissiveIntensity={0.6}
            />
          </Sphere>
        );
      })}
    </group>
  );
}

// Floating Protein Peptide Chain Particle
function ProteinPeptideChain({
  position,
  speed,
}: {
  position: [number, number, number];
  speed: number;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const numLinks = 7;

  useFrame((state) => {
    if (groupRef.current) {
      const t = state.clock.getElapsedTime() * speed;
      groupRef.current.children.forEach((child, idx) => {
        child.position.y = Math.sin(t + idx * 0.5) * 0.18;
      });
      groupRef.current.rotation.z = Math.sin(t * 0.4) * 0.15;
    }
  });

  return (
    <group ref={groupRef} position={position}>
      {Array.from({ length: numLinks }).map((_, i) => (
        <group key={i} position={[i * 0.28, 0, 0]}>
          <Sphere args={[0.065, 12, 12]}>
            <meshStandardMaterial color="#10B981" emissive="#10B981" emissiveIntensity={0.5} />
          </Sphere>
          {i < numLinks - 1 && (
            <mesh rotation={[0, 0, Math.PI / 2]} position={[0.14, 0, 0]}>
              <cylinderGeometry args={[0.012, 0.012, 0.28]} />
              <meshStandardMaterial color="#ffffff" opacity={0.25} transparent />
            </mesh>
          )}
        </group>
      ))}
    </group>
  );
}

// Biological Data Point Cloud
function BiologicalDataParticles() {
  const count = 45;
  const particles = useMemo(() => {
    const arr = [];
    const colors = ['#00F2FE', '#10B981', '#8B5CF6', '#EC4899', '#38BDF8'];
    for (let i = 0; i < count; i++) {
      arr.push({
        basePos: new THREE.Vector3(
          (Math.random() - 0.5) * 16,
          (Math.random() - 0.5) * 12,
          (Math.random() - 0.5) * 8 - 2
        ),
        speed: 0.15 + Math.random() * 0.35,
        phase: Math.random() * Math.PI * 2,
        color: colors[Math.floor(Math.random() * colors.length)],
        size: 0.035 + Math.random() * 0.045,
      });
    }
    return arr;
  }, []);

  const ref = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (ref.current) {
      const t = state.clock.getElapsedTime();
      particles.forEach((p, idx) => {
        const child = ref.current?.children[idx];
        if (child) {
          child.position.y = p.basePos.y + Math.sin(t * p.speed + p.phase) * 0.35;
          child.position.x = p.basePos.x + Math.cos(t * p.speed * 0.6 + p.phase) * 0.2;
          child.position.z = p.basePos.z + Math.sin(t * p.speed * 0.4 + p.phase) * 0.15;
        }
      });
    }
  });

  return (
    <group ref={ref}>
      {particles.map((p, idx) => (
        <group key={idx} position={p.basePos.toArray()}>
          <Sphere args={[p.size, 8, 8]}>
            <meshStandardMaterial
              color={p.color}
              emissive={p.color}
              emissiveIntensity={0.7}
              transparent
              opacity={0.65}
            />
          </Sphere>
        </group>
      ))}
    </group>
  );
}

export function ThreeDNAHelix() {
  const meshRef = useRef<THREE.Group>(null);
  const leftStrandRef = useRef<THREE.Group>(null);
  const rightStrandRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (meshRef.current) {
      // Continuous slow rotation + smooth mouse parallax reaction
      const t = state.clock.getElapsedTime();
      const baseRotationY = t * 0.12;
      const targetX = state.mouse.y * 0.2;
      const targetY = baseRotationY + state.mouse.x * 0.35;
      const targetZ = Math.sin(t * 0.2) * 0.05;

      meshRef.current.rotation.x = THREE.MathUtils.lerp(meshRef.current.rotation.x, targetX, 0.04);
      meshRef.current.rotation.y = THREE.MathUtils.lerp(meshRef.current.rotation.y, targetY, 0.04);
      meshRef.current.rotation.z = THREE.MathUtils.lerp(meshRef.current.rotation.z, targetZ, 0.04);

      // Gentle vertical floating breathing motion
      meshRef.current.position.y = Math.sin(t * 0.4) * 0.12;
    }
  });

  return (
    <group>
      {/* Background Biological Data Clouds */}
      <BiologicalDataParticles />

      {/* Floating Molecular Ring Structures */}
      <FloatingMolecularRing position={[-4.2, 2.2, -2.5]} speed={0.35} scale={1.2} color="#00F2FE" />
      <FloatingMolecularRing position={[4.0, -2.2, -3.0]} speed={0.28} scale={1.1} color="#8B5CF6" />
      <FloatingMolecularRing position={[-4.5, -2.8, -1.8]} speed={0.4} scale={0.9} color="#10B981" />
      <FloatingMolecularRing position={[4.6, 2.6, -2.2]} speed={0.3} scale={1.05} color="#EC4899" />

      {/* Floating Protein Peptide Chains */}
      <ProteinPeptideChain position={[-3.6, 0.8, -3.2]} speed={0.5} />
      <ProteinPeptideChain position={[2.8, 1.4, -3.8]} speed={0.45} />

      {/* Primary 3D DNA Double Helix */}
      <group ref={meshRef} scale={[1.15, 1.15, 1.15]}>
        {Array.from({ length: DNA_BASE_PAIRS }).map((_, i) => {
          const t = (i / DNA_BASE_PAIRS) * Math.PI * 4.5;
          const yPos = i * 0.32 - DNA_BASE_PAIRS * 0.16;
          const radius = 1.35;
          const xPos = Math.cos(t) * radius;
          const zPos = Math.sin(t) * radius;

          const basePair = NUCLEOTIDE_COLORS[i % NUCLEOTIDE_COLORS.length];

          return (
            <group key={i} position={[0, yPos, 0]}>
              {/* Stand A node (e.g. Adenine / Guanine) */}
              <Sphere position={[xPos, 0, zPos]} args={[0.13, 16, 16]}>
                <meshStandardMaterial
                  color={basePair.color}
                  emissive={basePair.color}
                  emissiveIntensity={0.85}
                  roughness={0.15}
                  metalness={0.2}
                />
              </Sphere>

              {/* Stand B node (e.g. Thymine / Cytosine) */}
              <Sphere position={[-xPos, 0, -zPos]} args={[0.13, 16, 16]}>
                <meshStandardMaterial
                  color={basePair.complement}
                  emissive={basePair.complement}
                  emissiveIntensity={0.85}
                  roughness={0.15}
                  metalness={0.2}
                />
              </Sphere>

              {/* Hydrogen Bond Connecting Rung - Left Half */}
              <group position={[xPos / 2, 0, zPos / 2]} rotation={[0, -t, 0]}>
                <Cylinder args={[0.022, 0.022, radius, 8]} rotation={[0, 0, Math.PI / 2]}>
                  <meshStandardMaterial
                    color={basePair.color}
                    emissive={basePair.color}
                    emissiveIntensity={0.4}
                    transparent
                    opacity={0.5}
                  />
                </Cylinder>
              </group>

              {/* Hydrogen Bond Connecting Rung - Right Half */}
              <group position={[-xPos / 2, 0, -zPos / 2]} rotation={[0, -t, 0]}>
                <Cylinder args={[0.022, 0.022, radius, 8]} rotation={[0, 0, Math.PI / 2]}>
                  <meshStandardMaterial
                    color={basePair.complement}
                    emissive={basePair.complement}
                    emissiveIntensity={0.4}
                    transparent
                    opacity={0.5}
                  />
                </Cylinder>
              </group>

              {/* Center Hydrogen Bridge Indicator */}
              <Sphere position={[0, 0, 0]} args={[0.035, 8, 8]}>
                <meshStandardMaterial
                  color="#FFFFFF"
                  emissive="#FFFFFF"
                  emissiveIntensity={0.6}
                  transparent
                  opacity={0.7}
                />
              </Sphere>
            </group>
          );
        })}
      </group>
    </group>
  );
}
