import React, { useRef, useEffect } from 'react';

export default function Contact3DCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number | null = null;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 800);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 600);

    let mouseX = width / 2;
    let mouseY = height / 2;
    let targetMouseX = mouseX;
    let targetMouseY = mouseY;

    const handleResize = () => {
      if (canvas && canvas.parentElement) {
        width = canvas.width = canvas.parentElement.clientWidth;
        height = canvas.height = canvas.parentElement.clientHeight;
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      targetMouseX = e.clientX - rect.left;
      targetMouseY = e.clientY - rect.top;
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);

    // Calm 3D Molecular Constellation
    interface Particle3D {
      x: number;
      y: number;
      z: number;
      radius: number;
      color: string;
      speed: number;
      phase: number;
    }

    const count = 28;
    const particles: Particle3D[] = [];
    const colors = ['#00F2FE', '#10B981', '#38BDF8'];

    for (let i = 0; i < count; i++) {
      particles.push({
        x: (Math.random() - 0.5) * width * 1.1,
        y: (Math.random() - 0.5) * height * 1.1,
        z: Math.random() * 500 + 100,
        radius: Math.random() * 2 + 1.5,
        color: colors[i % colors.length],
        speed: 0.2 + Math.random() * 0.3,
        phase: Math.random() * Math.PI * 2,
      });
    }

    const fov = 350;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      mouseX += (targetMouseX - mouseX) * 0.03;
      mouseY += (targetMouseY - mouseY) * 0.03;

      const offsetX = (mouseX - width / 2) * 0.08;
      const offsetY = (mouseY - height / 2) * 0.08;

      const time = performance.now() * 0.001;

      // Project particles
      const projected = particles.map((p) => {
        const curY = p.y + Math.sin(time * p.speed + p.phase) * 15;
        const curX = p.x + Math.cos(time * p.speed * 0.5 + p.phase) * 10;

        const scale = fov / (fov + p.z);
        const projX = width / 2 + (curX + offsetX) * scale;
        const projY = height / 2 + (curY + offsetY) * scale;

        return { x: projX, y: projY, scale, p };
      });

      // Draw subtle connection web
      ctx.lineWidth = 0.5;
      for (let i = 0; i < projected.length; i++) {
        for (let j = i + 1; j < projected.length; j++) {
          const p1 = projected[i];
          const p2 = projected[j];
          const dist = Math.hypot(p1.x - p2.x, p1.y - p2.y);

          if (dist < 100) {
            const alpha = (1 - dist / 100) * 0.15;
            ctx.strokeStyle = `rgba(13, 148, 136, ${alpha})`;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      }

      // Draw calm molecular nodes
      projected.forEach(({ x, y, scale, p }) => {
        const r = p.radius * scale;
        ctx.fillStyle = p.color;
        ctx.globalAlpha = 0.45;
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1;
      });

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      if (animId) cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none select-none z-0 opacity-40 dark:opacity-60"
    />
  );
}
