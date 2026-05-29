import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';

// Live sample data structures
interface DataPoint {
  x: number;
  y: number;
}

export default function BioDataVizBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  // Real-time PCR Amplification Curves State for miniature visualizers
  const [pcrPoints, setPcrPoints] = useState<DataPoint[][]>([]);
  // Sequence alignment grid heatmap matrix state
  const [heatmapMatrix, setHeatmapMatrix] = useState<number[][]>([]);

  // 1. Generate static or rolling biological data
  useEffect(() => {
    // Generate 3 sample PCR curves
    const generatesCurves = () => {
      const curves: DataPoint[][] = [];
      for (let c = 0; c < 3; c++) {
        const points: DataPoint[] = [];
        const threshold = 12 + c * 4;
        for (let cycle = 0; cycle <= 40; cycle++) {
          let fluorescence = 0.05;
          if (cycle > threshold) {
            fluorescence += Math.pow(cycle - threshold, 1.8) * (0.02 + c * 0.015);
          }
          // Cap fluorescence and add tiny noise
          fluorescence = Math.min(fluorescence, 1.25) + (Math.random() * 0.01 - 0.005);
          points.push({ x: cycle, y: Math.max(0.02, fluorescence) });
        }
        curves.push(points);
      }
      setPcrPoints(curves);
    };

    // Generate gene sequence comparison heatmap matrix (8x8)
    const generateHeatmap = () => {
      const matrix: number[][] = [];
      for (let i = 0; i < 8; i++) {
        const row: number[] = [];
        for (let j = 0; j < 8; j++) {
          // Alignment score between 0.1 and 1.0
          row.push(Math.random());
        }
        matrix.push(row);
      }
      setHeatmapMatrix(matrix);
    };

    generatesCurves();
    generateHeatmap();

    // Re-jitter matrix occasionally to resemble real alignment processing
    const interval = setInterval(() => {
      setHeatmapMatrix(prev => 
        prev.map(row => 
          row.map(val => Math.min(1.0, Math.max(0.0, val + (Math.random() * 0.1 - 0.05))))
        )
      );
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  // 2. Interactive 3D Wireframe Molecule / Ribosomal Assembly on Canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let width = canvas.width = 400;
    let height = canvas.height = 400;

    // Handle container resize safely
    const handleResize = () => {
      if (canvas && canvas.parentElement) {
        width = canvas.width = canvas.parentElement.clientWidth;
        height = canvas.height = canvas.parentElement.clientHeight;
      }
    };
    window.addEventListener('resize', handleResize);
    handleResize();

    // Define 3D Nodes of a complex Biotech Macro-Molecule (Double Helix base pairing nodes)
    interface Node3D {
      x: number;
      y: number;
      z: number;
      color: string;
      radius: number;
    }
    
    interface Link {
      source: number;
      target: number;
      dashed?: boolean;
    }

    const nodes: Node3D[] = [];
    const links: Link[] = [];

    // Construct a synthetic miniature capsid/double helix wireframe structure
    // Let's build a clean double spiral with central binding hydrogen strands
    const numPoints = 26;
    const spiralRadius = 60;
    
    for (let i = 0; i < numPoints; i++) {
      const angle = (i / numPoints) * Math.PI * 4; // 2 complete loops
      const zOffset = (i - numPoints / 2) * 12; // Z-axis stretch

      // Spiral A Node
      nodes.push({
        x: Math.cos(angle) * spiralRadius,
        y: Math.sin(angle) * spiralRadius,
        z: zOffset,
        color: '#10B981', // emerald green (GFP core)
        radius: i % 3 === 0 ? 3.5 : 2
      });

      // Spiral B Node (opposite spiral, offset by 180 deg)
      nodes.push({
        x: Math.cos(angle + Math.PI) * spiralRadius,
        y: Math.sin(angle + Math.PI) * spiralRadius,
        z: zOffset,
        color: '#3B82F6', // Blue (Teal/Co-factor dye)
        radius: i % 3 === 0 ? 3.5 : 2
      });

      // Indices mapping
      const idxA = nodes.length - 2;
      const idxB = nodes.length - 1;

      // Link spiral elements together (phosphate backbone connections)
      if (i > 0) {
        links.push({ source: idxA - 2, target: idxA });
        links.push({ source: idxB - 2, target: idxB });
      }

      // Link Spiral A to Spiral B (base pairing hydrogen links)
      if (i % 2 === 0) {
        links.push({ source: idxA, target: idxB, dashed: true });
      }
    }

    // Capture rotation states
    let angleX = 0.003;
    let angleY = 0.005;
    let angleZ = 0.001;

    // Projection loop
    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      // Save center coordinates
      const cx = width / 2;
      const cy = height / 2;

      // Rotate nodes in-place
      const cosX = Math.cos(angleX);
      const sinX = Math.sin(angleX);
      const cosY = Math.cos(angleY);
      const sinY = Math.sin(angleY);
      const cosZ = Math.cos(angleZ);
      const sinZ = Math.sin(angleZ);

      // Perform matrix transformations on nodes
      const projectedNodes = nodes.map(node => {
        // Rotate path Z
        let x1 = node.x * cosZ - node.y * sinZ;
        let y1 = node.x * sinZ + node.y * cosZ;
        let z1 = node.z;

        // Rotate path Y
        let x2 = x1 * cosY - z1 * sinY;
        let y2 = y1;
        let z2 = x1 * sinY + z1 * cosY;

        // Rotate path X
        let x3 = x2;
        let y3 = y2 * cosX - z2 * sinX;
        let z3 = y2 * sinX + z2 * cosX;

        // 3D perspective projection factor
        const scale = 300 / (300 + z3);
        const projX = cx + x3 * scale;
        const projY = cy + y3 * scale;

        return { x: projX, y: projY, z: z3, original: node, scaleFactor: scale };
      });

      // Sort links by depth so closer links paint on top
      // For simplicity, we just paint links with transparency
      links.forEach(link => {
        const sourceNode = projectedNodes[link.source];
        const targetNode = projectedNodes[link.target];

        // Soft line depth fade calculation
        const averageZ = (sourceNode.z + targetNode.z) / 2;
        const lineOpacity = Math.max(0.04, Math.min(0.28, 0.2 - averageZ / 400));

        ctx.strokeStyle = link.dashed ? 'rgba(16, 185, 129, ' + lineOpacity + ')' : 'rgba(59, 130, 246, ' + lineOpacity + ')';
        ctx.lineWidth = link.dashed ? 0.75 : 1.25;
        ctx.beginPath();
        ctx.moveTo(sourceNode.x, sourceNode.y);
        ctx.lineTo(targetNode.x, targetNode.y);
        if (link.dashed) {
          ctx.setLineDash([3, 4]);
        } else {
          ctx.setLineDash([]);
        }
        ctx.stroke();
      });

      // Clear line dash
      ctx.setLineDash([]);

      // Paint molecular atom nodes
      projectedNodes.forEach(pNode => {
        const rad = pNode.original.radius * pNode.scaleFactor;
        const nodeOpacity = Math.max(0.06, Math.min(0.4, 0.25 - pNode.z / 350));
        
        ctx.beginPath();
        ctx.arc(pNode.x, pNode.y, Math.max(1, rad), 0, Math.PI * 2);
        ctx.fillStyle = pNode.original.color === '#10B981' 
          ? `rgba(16, 185, 129, ${nodeOpacity})` 
          : `rgba(59, 130, 246, ${nodeOpacity})`;
        ctx.fill();

        // Small inner nuclear highlight of atoms
        if (pNode.original.radius > 3) {
          ctx.beginPath();
          ctx.arc(pNode.x, pNode.y, rad * 0.4, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 255, 255, ${nodeOpacity * 0.8})`;
          ctx.fill();
        }
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden select-none z-0">
      
      {/* 3D BIOTECH CANVAS STRUCTURE (Centrally positioned, stretching from intro down to skills) */}
      <div className="absolute top-[80vh] left-1/2 -translate-x-1/2 w-full md:w-[700px] h-[450px] opacity-[0.05] md:opacity-[0.08] mix-blend-multiply z-0 flex items-center justify-center">
        <div className="relative w-full h-full">
          <canvas ref={canvasRef} className="w-full h-full" />
          {/* Subtle outer tech diagnostic bounds */}
          <div className="absolute inset-x-8 top-4 flex justify-between font-mono text-[7px] text-[#10B981] opacity-70">
            <span>SYS_PROJ_3D: macromolecule_dna_matrix</span>
            <span>MODEL: CAPSID_POLYMERASE_44</span>
          </div>
          <div className="absolute inset-x-8 bottom-4 flex justify-between font-mono text-[7px] text-[#10B981] opacity-70">
            <span>ROTATION_X: 0.003rad/f</span>
            <span>NODES: 52 // LINKS: 39</span>
          </div>
        </div>
      </div>

      {/* DATA VISUALIZATION PANEL 1: PCR Amplification Grid (Floating around middle-left of section 2) */}
      <div className="absolute top-[130vh] left-[4%] w-[240px] hidden xl:block border border-neutral-400/10 bg-white/50 p-3 shadow-sm rounded-none z-0">
        <div className="flex items-center justify-between font-mono text-[7px] text-zinc-400 uppercase tracking-widest border-b border-neutral-200 pb-1.5 mb-2 font-bold">
          <span>PCR_AMPLIFICATION_CYCLES</span>
          <span className="text-[#10B981]">RT_RUN: ACTIVE</span>
        </div>
        
        {/* Simple inline amplification graph curves rendered with SVG */}
        <div className="h-20 w-full relative">
          <svg className="w-full h-full overflow-visible" viewBox="0 0 40 1.5">
            {/* Horizontal lines */}
            <line x1="0" y1="0.1" x2="40" y2="0.1" stroke="#e4e4e7" strokeWidth="0.05" />
            <line x1="0" y1="0.5" x2="40" y2="0.5" stroke="#e4e4e7" strokeWidth="0.05" />
            <line x1="0" y1="1.0" x2="40" y2="1.0" stroke="#e4e4e7" strokeWidth="0.05" strokeDasharray="1 0.5" />
            
            {/* Draw the curves */}
            {pcrPoints.map((curve, idx) => {
              const pathData = curve.map(p => `${p.x},${1.3 - p.y}`).join(' L ');
              const strokeColor = idx === 0 ? '#10B981' : idx === 1 ? '#3B82F6' : '#6B7280';
              return (
                <path
                  key={idx}
                  d={`M ${pathData}`}
                  fill="none"
                  stroke={strokeColor}
                  strokeWidth="0.12"
                  opacity="0.25"
                  className="transition-all duration-300"
                />
              );
            })}
          </svg>
          
          {/* Diagnostic vertical guide */}
          <div className="absolute left-[38%] top-0 bottom-0 border-l border-emerald-500/15 border-dashed" />
          <div className="absolute left-[39%] top-2 text-[6px] font-mono text-emerald-600/30 font-bold">CT_TH_14.5</div>
        </div>

        <div className="flex justify-between items-center text-[7px] font-mono text-zinc-400 pt-1.5 border-t border-neutral-200 uppercase mt-2">
          <span>0 (CYCLES) 40</span>
          <span>FLUOR (λ) max 1.25</span>
        </div>
      </div>

      {/* DATA VISUALIZATION PANEL 2: Sequence Map Alignment Heatmap (Floating right behind Section 3) */}
      <div className="absolute top-[215vh] right-[5%] w-[180px] hidden xl:block border border-neutral-400/10 bg-white/50 p-2.5 shadow-sm rounded-none z-0">
        <div className="flex items-center justify-between font-mono text-[7px] text-zinc-400 uppercase tracking-widest border-b border-neutral-100 pb-1.5 mb-2 font-bold">
          <span>SEQUENCE_HEATMAP</span>
          <span className="text-[#3B82F6]">WILD_vs_MUT</span>
        </div>

        {/* Heatmap grid */}
        <div className="grid grid-cols-8 gap-1 aspect-square w-full">
          {heatmapMatrix.map((row, i) => 
            row.map((val, j) => {
              // Custom emerald/teal gradient based on val
              let bgStyle = 'rgba(212, 212, 216, 0.1)'; // default gray
              if (val > 0.7) bgStyle = `rgba(16, 185, 129, ${val * 0.25})`; // emerald
              else if (val > 0.4) bgStyle = `rgba(59, 130, 246, ${val * 0.25})`; // blue-teal
              else bgStyle = `rgba(107, 114, 128, ${val * 0.15})`; // neutral

              return (
                <div
                  key={`${i}-${j}`}
                  style={{ backgroundColor: bgStyle }}
                  className="w-full h-full rounded-[1px] transition-all duration-700"
                  title={`Align score: ${val.toFixed(2)}`}
                />
              );
            })
          )}
        </div>

        <div className="flex justify-between items-center text-[6.5px] font-mono text-zinc-400 pt-1.5 mt-2">
          <span>LOCUS_ID_0A</span>
          <span>SIMILARITY SCORE</span>
        </div>
      </div>

      {/* DATA VISUALIZATION PANEL 3: Polyacrylamide Gel Electrophoresis Array (Floating near top content) */}
      <div className="absolute top-[48vh] left-[2%] w-[65px] hidden md:flex flex-col gap-1 text-[7px] font-mono text-zinc-400 select-none opacity-[0.25] hover:opacity-[0.5] transition-all duration-500 z-0 border-r border-[#10B981]/15 pr-3">
        <span className="font-extrabold uppercase text-[7px] tracking-wider mb-2 text-[#10B981]">GEL_REF</span>
        <div className="flex items-end gap-1 px-1 py-1 bg-zinc-100/50 border border-zinc-200/50">
          {/* Lane 1 */}
          <div className="w-1.5 h-36 bg-zinc-200 relative">
            <div className="absolute top-[10%] inset-x-0 h-1 bg-[#10B981]/60" />
            <div className="absolute top-[28%] inset-x-0 h-1 bg-[#10B981]/40" />
            <div className="absolute top-[45%] inset-x-0 h-1.5 bg-[#10B981]/80" />
            <div className="absolute top-[68%] inset-x-0 h-1.5 bg-[#10B981]/50" />
            <div className="absolute top-[82%] inset-x-0 h-1.5 bg-[#10B981]/35" />
          </div>
          {/* Lane 2 */}
          <div className="w-1.5 h-36 bg-zinc-200 relative">
            <div className="absolute top-[12%] inset-x-0 h-1 bg-zinc-400" />
            <div className="absolute top-[25%] inset-x-0 h-1 bg-zinc-400" />
            <div className="absolute top-[52%] inset-x-0 h-1.5 bg-[#10B981]/70" />
            <div className="absolute top-[72%] inset-x-0 h-1 bg-zinc-400" />
            <div className="absolute top-[85%] inset-x-0 h-1.5 bg-zinc-400" />
          </div>
          {/* Lane 3 */}
          <div className="w-1.5 h-36 bg-zinc-200 relative">
            <div className="absolute top-[10%] inset-x-0 h-1 bg-[#10B981]/60" />
            <div className="absolute top-[32%] inset-x-0 h-1.5 bg-[#10B981]/80" />
            <div className="absolute top-[45%] inset-x-0 h-1 bg-[#10B981]/40" />
            <div className="absolute top-[60%] inset-x-0 h-1.5 bg-zinc-400" />
            <div className="absolute top-[82%] inset-x-0 h-1.5 bg-[#10B981]/35" />
          </div>
        </div>
        <div className="mt-1 text-[6.5px] leading-tight opacity-80 text-center uppercase text-zinc-500 font-extrabold">250bp <br/> Ladder</div>
      </div>
    </div>
  );
}
