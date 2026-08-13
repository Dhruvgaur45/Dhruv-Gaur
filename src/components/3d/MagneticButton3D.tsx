import React, { useRef, useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';

interface MagneticButton3DProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  strength?: number; // How far the button pulls (default: 20)
  maxTilt?: number; // Tilt angle in degrees (default: 12)
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  id?: string;
  title?: string;
}

export default function MagneticButton3D({
  children,
  className = '',
  onClick,
  strength = 18,
  maxTilt = 10,
  disabled = false,
  type = 'button',
  id,
  title,
}: MagneticButton3DProps) {
  const btnRef = useRef<HTMLButtonElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { stiffness: 350, damping: 25 };
  const smoothX = useSpring(x, springConfig);
  const smoothY = useSpring(y, springConfig);

  const rotateX = useSpring(useTransform(y, [-strength, strength], [maxTilt, -maxTilt]), springConfig);
  const rotateY = useSpring(useTransform(x, [-strength, strength], [-maxTilt, maxTilt]), springConfig);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!btnRef.current || prefersReducedMotion || disabled) return;
    const rect = btnRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const deltaX = (e.clientX - centerX) * 0.4;
    const deltaY = (e.clientY - centerY) * 0.4;

    x.set(Math.max(-strength, Math.min(strength, deltaX)));
    y.set(Math.max(-strength, Math.min(strength, deltaY)));
  };

  const handleMouseEnter = () => {
    if (!disabled && !prefersReducedMotion) setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  if (prefersReducedMotion) {
    return (
      <button
        id={id}
        type={type}
        title={title}
        disabled={disabled}
        onClick={onClick}
        className={className}
      >
        {children}
      </button>
    );
  }

  return (
    <motion.button
      ref={btnRef}
      id={id}
      type={type}
      title={title}
      disabled={disabled}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        x: smoothX,
        y: smoothY,
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
      }}
      whileTap={{ scale: 0.96 }}
      className={`relative cursor-pointer select-none will-change-transform ${className}`}
    >
      <span
        style={{
          transform: isHovered ? 'translateZ(12px)' : 'translateZ(0px)',
          transition: 'transform 0.2s ease-out',
          display: 'inline-flex',
          alignItems: 'center',
          gap: 'inherit',
        }}
      >
        {children}
      </span>
    </motion.button>
  );
}
