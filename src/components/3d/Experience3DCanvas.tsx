import React, { useRef, useEffect } from 'react';

export default function Experience3DCanvas() {
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

    let progress = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      progress += 0.008;

      // 3D Sine Wave Milestone Spine
      ctx.lineWidth = 1.5;
      const points: { x: number; y: number; z: number }[] = [];
      const numPoints = 25;

      for (let i = 0; i < numPoints; i++) {
        const y = (i / (numPoints - 1)) * height;
        const xOffset = Math.sin((i * 0.4) + progress) * 60;
        const z = Math.cos((i * 0.4) + progress) * 80 + 200;

        const fov = 350;
        const scale = fov / (fov + z);
        const x = width * 0.15 + xOffset * scale;

        points.push({ x, y, z });
      }

      // Draw pathway line
      ctx.strokeStyle = 'rgba(13, 148, 136, 0.2)';
      ctx.beginPath();
      points.forEach((p, idx) => {
        if (idx === 0) ctx.moveTo(p.x, p.y);
        else ctx.lineTo(p.x, p.y);
      });
      ctx.stroke();

      // Draw glowing milestone beacons along spine
      points.forEach((p, idx) => {
        if (idx % 4 === 0) {
          const glow = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, 16);
          glow.addColorStop(0, 'rgba(0, 242, 254, 0.4)');
          glow.addColorStop(1, 'transparent');

          ctx.fillStyle = glow;
          ctx.beginPath();
          ctx.arc(p.x, p.y, 16, 0, Math.PI * 2);
          ctx.fill();

          ctx.fillStyle = '#00F2FE';
          ctx.beginPath();
          ctx.arc(p.x, p.y, 3, 0, Math.PI * 2);
          ctx.fill();
        }
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
