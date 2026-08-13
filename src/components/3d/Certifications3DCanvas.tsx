import React, { useRef, useEffect } from 'react';

export default function Certifications3DCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number | null = null;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 800);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 600);

    const handleResize = () => {
      if (canvas && canvas.parentElement) {
        width = canvas.width = canvas.parentElement.clientWidth;
        height = canvas.height = canvas.parentElement.clientHeight;
      }
    };
    window.addEventListener('resize', handleResize);

    // 3D Holographic Prisms / Credential Badges
    interface Prism3D {
      x: number;
      y: number;
      z: number;
      rotX: number;
      rotY: number;
      speedX: number;
      speedY: number;
      size: number;
      color: string;
    }

    const prisms: Prism3D[] = [
      { x: -180, y: -100, z: 250, rotX: 0, rotY: 0, speedX: 0.01, speedY: 0.012, size: 28, color: '#00F2FE' },
      { x: 220, y: -80, z: 300, rotX: 0.4, rotY: 0.2, speedX: -0.008, speedY: 0.015, size: 34, color: '#10B981' },
      { x: -220, y: 120, z: 280, rotX: 0.1, rotY: 0.5, speedX: 0.012, speedY: -0.01, size: 30, color: '#8B5CF6' },
      { x: 180, y: 140, z: 220, rotX: 0.3, rotY: 0.3, speedX: -0.01, speedY: -0.012, size: 26, color: '#F59E0B' },
    ];

    const fov = 350;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      const centerX = width / 2;
      const centerY = height / 2;

      prisms.forEach((p) => {
        p.rotX += p.speedX;
        p.rotY += p.speedY;

        const scale = fov / (fov + p.z);
        const projX = centerX + p.x * scale;
        const projY = centerY + p.y * scale;

        // Draw 3D Octahedron / Holographic Diamond
        const s = p.size * scale;
        const vertices = [
          { x: 0, y: -s, z: 0 },
          { x: s, y: 0, z: 0 },
          { x: 0, y: s, z: 0 },
          { x: -s, y: 0, z: 0 },
          { x: 0, y: 0, z: s * 0.8 },
          { x: 0, y: 0, z: -s * 0.8 },
        ];

        // Rotate vertices
        const cosX = Math.cos(p.rotX);
        const sinX = Math.sin(p.rotX);
        const cosY = Math.cos(p.rotY);
        const sinY = Math.sin(p.rotY);

        const rotated = vertices.map((v) => {
          // Around Y
          let x1 = v.x * cosY - v.z * sinY;
          let z1 = v.x * sinY + v.z * cosY;
          // Around X
          let y2 = v.y * cosX - z1 * sinX;
          return {
            x: projX + x1,
            y: projY + y2,
          };
        });

        // Draw Edges
        ctx.strokeStyle = p.color;
        ctx.lineWidth = 0.8;
        ctx.globalAlpha = 0.35;

        const edges = [
          [0, 1], [1, 2], [2, 3], [3, 0], // Base square
          [4, 0], [4, 1], [4, 2], [4, 3], // Top apex
          [5, 0], [5, 1], [5, 2], [5, 3], // Bottom apex
        ];

        edges.forEach(([i1, i2]) => {
          ctx.beginPath();
          ctx.moveTo(rotated[i1].x, rotated[i1].y);
          ctx.lineTo(rotated[i2].x, rotated[i2].y);
          ctx.stroke();
        });

        ctx.globalAlpha = 1;
      });

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      if (animId) cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none select-none z-0 opacity-40 dark:opacity-60"
    />
  );
}
