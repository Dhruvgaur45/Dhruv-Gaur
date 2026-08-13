import React, { useRef, useEffect } from 'react';

export default function About3DCanvas() {
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

    // 3D Nodes for Biological Data Network
    interface Node3D {
      x: number;
      y: number;
      z: number;
      radius: number;
      color: string;
      label?: string;
      vx: number;
      vy: number;
      vz: number;
    }

    const nodeCount = 32;
    const nodes: Node3D[] = [];
    const colors = [
      'rgba(13, 148, 136, 0.65)',
      'rgba(16, 185, 129, 0.65)',
      'rgba(59, 130, 246, 0.65)',
      'rgba(139, 92, 246, 0.65)',
    ];

    const labels = [
      'GENOME_V4', 'FASTA_SEQ', 'RNA_FOLD', 'NGS_READ', 'AMINO_CHAIN', 
      'PROTEIN_A', 'CRISPR_GUIDE', 'BLAST_ALIGN', 'MODBUS_TX', 'LIMS_96W'
    ];

    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        x: (Math.random() - 0.5) * width * 1.2,
        y: (Math.random() - 0.5) * height * 1.2,
        z: Math.random() * 600 + 100,
        radius: Math.random() * 2.5 + 2,
        color: colors[i % colors.length],
        label: i < labels.length ? labels[i] : undefined,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        vz: (Math.random() - 0.5) * 0.3,
      });
    }

    const fov = 400; // 3D perspective field of view
    let angle = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Smooth mouse interpolation
      mouseX += (targetMouseX - mouseX) * 0.05;
      mouseY += (targetMouseY - mouseY) * 0.05;

      const offsetX = (mouseX - width / 2) * 0.15;
      const offsetY = (mouseY - height / 2) * 0.15;

      angle += 0.003;

      // Projected 2D Points
      const projectedNodes: { x: number; y: number; scale: number; node: Node3D }[] = [];

      nodes.forEach((node) => {
        // Move in 3D
        node.x += node.vx;
        node.y += node.vy;
        node.z += node.vz;

        // Wrap around bounds
        if (node.x < -width) node.x = width;
        if (node.x > width) node.x = -width;
        if (node.y < -height) node.y = height;
        if (node.y > height) node.y = -height;
        if (node.z < 80) node.z = 700;
        if (node.z > 700) node.z = 80;

        // Rotate around Y-axis
        const cosA = Math.cos(angle * 0.3);
        const sinA = Math.sin(angle * 0.3);
        const rotX = node.x * cosA - (node.z - 400) * sinA;
        const rotZ = node.x * sinA + (node.z - 400) * cosA + 400;

        const scale = fov / (fov + rotZ);
        const projX = (rotX + offsetX) * scale + width / 2;
        const projY = (node.y + offsetY) * scale + height / 2;

        projectedNodes.push({ x: projX, y: projY, scale, node });
      });

      // Sort by Z for realistic depth layering
      projectedNodes.sort((a, b) => b.scale - a.scale);

      // 1. Draw 3D biological connection lines
      ctx.lineWidth = 0.6;
      for (let i = 0; i < projectedNodes.length; i++) {
        for (let j = i + 1; j < projectedNodes.length; j++) {
          const p1 = projectedNodes[i];
          const p2 = projectedNodes[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 130) {
            const alpha = (1 - dist / 130) * 0.22 * Math.min(p1.scale, p2.scale);
            ctx.strokeStyle = `rgba(13, 148, 136, ${alpha})`;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      }

      // 2. Draw 3D Nodes and Glows
      projectedNodes.forEach(({ x, y, scale, node }) => {
        const radius = node.radius * scale * 1.4;
        if (radius <= 0) return;

        // Outer soft glow
        const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius * 3);
        gradient.addColorStop(0, node.color);
        gradient.addColorStop(1, 'transparent');

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(x, y, radius * 3, 0, Math.PI * 2);
        ctx.fill();

        // Solid core
        ctx.fillStyle = node.color;
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.fill();

        // Scientific micro labels for high depth nodes
        if (node.label && scale > 0.7) {
          ctx.fillStyle = 'rgba(13, 148, 136, 0.45)';
          ctx.font = `${Math.round(8 * scale)}px var(--font-mono, monospace)`;
          ctx.fillText(node.label, x + radius + 4, y + 3);
        }
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
