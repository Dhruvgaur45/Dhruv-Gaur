import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Microscope, Dna, Activity, Sparkles, Layers, Cpu } from 'lucide-react';

interface ResearchTopic3D {
  id: string;
  title: string;
  code: string;
  abstract: string;
  metric: string;
  color: string;
}

const RESEARCH_TOPICS: ResearchTopic3D[] = [
  {
    id: 'res-photonics',
    title: 'Silicon Photonic Integrated Processors for Genomics',
    code: 'GIC2026-OPTICAL-GENOME',
    abstract: 'Framework mapping sequence alignment algorithms onto ultra-fast silicon photonics, bypassing von Neumann copper interconnect bottlenecks.',
    metric: '15.4x Throughput Gain',
    color: '#00F2FE',
  },
  {
    id: 'res-crispr',
    title: 'CRISPR-Cas9 Off-Target Prediction via Bio-LLMs',
    code: 'GEN-CRISPR-2026',
    abstract: 'Multi-modal transformer architectures predicting thermodynamic Cas9 cleave propensities across heterogeneous genomic matrices.',
    metric: '99.4% Cleavage Precision',
    color: '#10B981',
  },
  {
    id: 'res-lims',
    title: 'Distributed IoT Microplate Telemetry Automation',
    code: 'LIMS-AUTONOMOUS-SBS',
    abstract: 'Real-time MODBUS protocol telemetry bridging 96-well automated assay plate handling with high-reliability cloud databases.',
    metric: '<12ms Polling Jitter',
    color: '#8B5CF6',
  },
];

export default function Research3DLab() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [activeModel, setActiveModel] = useState<'protein' | 'photonics'>('protein');

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number | null = null;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 700);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 400);

    const handleResize = () => {
      if (canvas && canvas.parentElement) {
        width = canvas.width = canvas.parentElement.clientWidth;
        height = canvas.height = canvas.parentElement.clientHeight;
      }
    };
    window.addEventListener('resize', handleResize);

    let angle = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      angle += 0.015;

      const centerX = width / 2;
      const centerY = height / 2;

      if (activeModel === 'protein') {
        // Render 3D Alpha-Helix Protein Ribbon Structure
        const numResidues = 36;
        const helixRadius = 55;
        const pitch = 7;
        const fov = 350;

        const points: { x: number; y: number; z: number; projX: number; projY: number; scale: number; i: number }[] = [];

        for (let i = 0; i < numResidues; i++) {
          const t = i * 0.45 + angle;
          const y = (i - numResidues / 2) * pitch;
          const x = Math.cos(t) * helixRadius;
          const z = Math.sin(t) * helixRadius;

          // 3D rotation around X/Z
          const rotY = y * Math.cos(0.3) - z * Math.sin(0.3);
          const rotZ = y * Math.sin(0.3) + z * Math.cos(0.3) + 250;

          const scale = fov / (fov + rotZ);
          const projX = centerX + x * scale;
          const projY = centerY + rotY * scale;

          points.push({ x, y, z, projX, projY, scale, i });
        }

        // Draw Protein Ribbon Backbone
        ctx.lineWidth = 3;
        for (let i = 0; i < points.length - 1; i++) {
          const p1 = points[i];
          const p2 = points[i + 1];

          const gradient = ctx.createLinearGradient(p1.projX, p1.projY, p2.projX, p2.projY);
          gradient.addColorStop(0, '#00F2FE');
          gradient.addColorStop(1, '#10B981');

          ctx.strokeStyle = gradient;
          ctx.beginPath();
          ctx.moveTo(p1.projX, p1.projY);
          ctx.lineTo(p2.projX, p2.projY);
          ctx.stroke();
        }

        // Draw Amino Acid Side Chains & Residue Spheres
        points.forEach((p) => {
          const r = 4.5 * p.scale;
          ctx.fillStyle = p.i % 3 === 0 ? '#EC4899' : p.i % 2 === 0 ? '#8B5CF6' : '#00F2FE';
          ctx.beginPath();
          ctx.arc(p.projX, p.projY, r, 0, Math.PI * 2);
          ctx.fill();

          // Hydrogen bond dashes to nearby coil
          if (p.i + 4 < points.length) {
            const target = points[p.i + 4];
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
            ctx.lineWidth = 0.8;
            ctx.setLineDash([2, 3]);
            ctx.beginPath();
            ctx.moveTo(p.projX, p.projY);
            ctx.lineTo(target.projX, target.projY);
            ctx.stroke();
            ctx.setLineDash([]);
          }
        });
      } else {
        // Render 3D Silicon Photonic Waveguide & Optical Ring Resonators
        const fov = 350;
        const ringRadius = 50;

        // 3D Optical Waveguide Bus
        ctx.strokeStyle = 'rgba(0, 242, 254, 0.6)';
        ctx.lineWidth = 2.5;
        ctx.beginPath();
        ctx.moveTo(centerX - 160, centerY + 30);
        ctx.lineTo(centerX + 160, centerY + 30);
        ctx.stroke();

        // 3D Resonator Ring
        const ringPoints: { x: number; y: number }[] = [];
        for (let a = 0; a <= Math.PI * 2; a += 0.15) {
          const x = Math.cos(a) * ringRadius;
          const z = Math.sin(a) * ringRadius;
          const rotZ = z * Math.cos(0.5) + 250;
          const scale = fov / (fov + rotZ);
          const px = centerX + x * scale;
          const py = centerY - 25 + (z * Math.sin(0.5)) * scale;
          ringPoints.push({ x: px, y: py });
        }

        ctx.strokeStyle = 'rgba(16, 185, 129, 0.7)';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ringPoints.forEach((p, idx) => {
          if (idx === 0) ctx.moveTo(p.x, p.y);
          else ctx.lineTo(p.x, p.y);
        });
        ctx.closePath();
        ctx.stroke();

        // Photons traveling along ring
        const photonCount = 6;
        for (let i = 0; i < photonCount; i++) {
          const pAngle = angle * 2 + (i * Math.PI * 2) / photonCount;
          const px = Math.cos(pAngle) * ringRadius;
          const pz = Math.sin(pAngle) * ringRadius;
          const scale = fov / (fov + (pz * Math.cos(0.5) + 250));
          const screenX = centerX + px * scale;
          const screenY = centerY - 25 + (pz * Math.sin(0.5)) * scale;

          ctx.fillStyle = '#39FF14';
          ctx.beginPath();
          ctx.arc(screenX, screenY, 4 * scale, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      if (animId) cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
    };
  }, [activeModel]);

  return (
    <div className="relative w-full bg-[#03001C]/90 border border-[#00F2FE]/25 p-5 my-6 shadow-2xl">
      {/* Visualizer Controls */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-white/10 relative z-10">
        <div className="flex items-center gap-2">
          <Microscope className="w-4 h-4 text-[#00F2FE]" />
          <h4 className="text-xs font-mono font-bold tracking-widest text-[#00F2FE] uppercase">
            3D COMPUTATIONAL BIOLOGY LABORATORY BENCH
          </h4>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveModel('protein')}
            className={`px-3 py-1 text-[10px] font-mono font-bold uppercase transition-all cursor-pointer ${
              activeModel === 'protein'
                ? 'bg-[#00F2FE] text-[#03001C]'
                : 'bg-white/5 text-white/70 hover:text-white border border-white/10'
            }`}
          >
            Alpha-Helix Ribbon
          </button>
          <button
            onClick={() => setActiveModel('photonics')}
            className={`px-3 py-1 text-[10px] font-mono font-bold uppercase transition-all cursor-pointer ${
              activeModel === 'photonics'
                ? 'bg-[#10B981] text-[#03001C]'
                : 'bg-white/5 text-white/70 hover:text-white border border-white/10'
            }`}
          >
            Silicon Photonic IC
          </button>
        </div>
      </div>

      {/* 3D Canvas Rendering Area */}
      <div className="relative w-full h-[260px] sm:h-[300px] flex items-center justify-center">
        <canvas ref={canvasRef} className="w-full h-full block" />
        <div className="absolute top-2 right-2 text-[9px] font-mono text-white/40 select-none">
          {activeModel === 'protein' ? '3D Alpha-Helix Folding Simulator' : 'Photonic Ring Resonator Q-Factor: 1.2e5'}
        </div>
      </div>

      {/* Live Data Footer Bar */}
      <div className="pt-3 border-t border-white/10 grid grid-cols-1 sm:grid-cols-3 gap-3 text-2xs font-mono text-white/70">
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-[#00F2FE] animate-pulse" />
          <span>Biophysics Compute:</span>
          <span className="text-white font-bold">128 TFLOPS</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Dna className="w-3 h-3 text-[#10B981]" />
          <span>Alignment Pipeline:</span>
          <span className="text-white font-bold">STAR / DESeq2</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Activity className="w-3 h-3 text-[#8B5CF6]" />
          <span>PDB Model Status:</span>
          <span className="text-white font-bold">STABLE (RMSD &lt; 0.8Å)</span>
        </div>
      </div>
    </div>
  );
}
