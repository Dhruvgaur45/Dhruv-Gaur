import React, { useRef, useEffect } from 'react';

export default function Projects3DCanvas() {
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

    // 3D Laboratory Wireframe Grid Plane
    let time = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      time += 0.01;

      // Draw 3D Perspective Isometric Lab Grid
      const horizon = height * 0.45;
      const fov = 300;

      ctx.strokeStyle = 'rgba(0, 242, 254, 0.04)';
      ctx.lineWidth = 1;

      // Horizontal depth lines
      for (let z = 50; z < 500; z += 40) {
        const offsetZ = (z + (time * 25) % 40);
        const scale = fov / (fov + offsetZ);
        const y = horizon + (height - horizon) * scale;

        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Vertical perspective lines
      const numLines = 16;
      for (let i = -numLines; i <= numLines; i++) {
        const xStart = width / 2 + i * 35;
        const xEnd = width / 2 + i * 160;

        ctx.beginPath();
        ctx.moveTo(xStart, horizon);
        ctx.lineTo(xEnd, height);
        ctx.stroke();
      }

      // Floating Genetic Alignment Reads
      ctx.font = '8px var(--font-mono, monospace)';
      ctx.fillStyle = 'rgba(16, 185, 129, 0.15)';
      const reads = ['ATCGGCTA', 'CGTAGCTA', 'TTACGGCA', 'GGCATATC', 'AACCTTGG'];
      for (let r = 0; r < 6; r++) {
        const x = (r * 180 + time * 20) % width;
        const y = horizon - 40 - Math.sin(time + r) * 30;
        ctx.fillText(`READ_ALIGN_${r}: ${reads[r % reads.length]}`, x, y);
      }

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
