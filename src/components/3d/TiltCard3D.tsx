import React, { useRef, useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';

interface TiltCard3DProps {
  children: React.ReactNode;
  className?: string;
  maxTilt?: number; // Maximum rotation in degrees (default: 8)
  perspective?: number; // Perspective distance (default: 1000)
  scale?: number; // Scale on hover (default: 1.02)
  glowColor?: string; // Color for the specular light sheen
  depth?: number; // Z-depth translation for child content (default: 20)
  id?: string;
  onClick?: () => void;
  interactive?: boolean;
  specular?: boolean; // Whether to render specular sheen overlay (default: true)
}

export default function TiltCard3D({
  children,
  className = '',
  maxTilt = 8,
  perspective = 1000,
  scale = 1.02,
  glowColor = 'rgba(13, 148, 136, 0.15)',
  depth = 15,
  id,
  onClick,
  interactive = true,
  specular = true,
}: TiltCard3DProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  // Motion values for normalized mouse positions (-0.5 to 0.5)
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const hoverScaleTarget = useMotionValue(1);

  // Smooth springs for rotation
  const springConfig = { stiffness: 260, damping: 20 };
  const rotateXSpring = useSpring(useTransform(mouseY, [-0.5, 0.5], [maxTilt, -maxTilt]), springConfig);
  const rotateYSpring = useSpring(useTransform(mouseX, [-0.5, 0.5], [-maxTilt, maxTilt]), springConfig);
  const scaleSpring = useSpring(hoverScaleTarget, springConfig);

  // Sheen gradient positions
  const sheenX = useTransform(mouseX, [-0.5, 0.5], [20, 80]);
  const sheenY = useTransform(mouseY, [-0.5, 0.5], [20, 80]);
  const sheenBackground = useTransform(
    [sheenX, sheenY],
    ([x, y]) => `radial-gradient(circle 350px at ${x}% ${y}%, ${glowColor}, transparent 70%)`
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || prefersReducedMotion || !interactive) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    if (width <= 0 || height <= 0) return;

    const clientX = e.clientX - rect.left;
    const clientY = e.clientY - rect.top;

    const xPct = clientX / width - 0.5;
    const yPct = clientY / height - 0.5;

    mouseX.set(xPct);
    mouseY.set(yPct);
  };

  const handleMouseEnter = () => {
    if (interactive && !prefersReducedMotion) {
      setIsHovered(true);
      hoverScaleTarget.set(scale);
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    hoverScaleTarget.set(1);
    mouseX.set(0);
    mouseY.set(0);
  };

  if (prefersReducedMotion || !interactive) {
    return (
      <div id={id} className={`relative ${className}`} onClick={onClick}>
        {children}
      </div>
    );
  }

  return (
    <div
      style={{ perspective: `${perspective}px` }}
      className="relative will-change-transform"
      id={id}
    >
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={onClick}
        style={{
          rotateX: rotateXSpring,
          rotateY: rotateYSpring,
          scale: scaleSpring,
          transformStyle: 'preserve-3d',
        }}
        className={`relative transition-shadow duration-300 ${className} ${
          isHovered ? 'shadow-xl' : ''
        }`}
      >
        {/* Dynamic Specular Sheen Layer (unconditionally rendered, opacity toggled) */}
        {specular && (
          <motion.div
            className="pointer-events-none absolute inset-0 rounded-[inherit] z-20 transition-opacity duration-300"
            style={{
              background: sheenBackground,
              opacity: isHovered ? 1 : 0,
            }}
          />
        )}

        {/* 3D Depth Content Wrapper */}
        <div
          style={{
            transform: isHovered ? `translateZ(${depth}px)` : 'translateZ(0px)',
            transition: 'transform 0.25s ease-out',
            transformStyle: 'preserve-3d',
          }}
          className="relative z-10 w-full h-full"
        >
          {children}
        </div>
      </motion.div>
    </div>
  );
}
