import React, { useState, useEffect, useRef } from 'react';
import { Activity, Flame, ShieldAlert, Play, RefreshCw, Layers } from 'lucide-react';

interface BioreactorMonitorProps {
  scientificMetric: string;
}

// ----------------- HIGH END TECH BACKGROUND GRAPHICS -----------------
function BioreactorFluidBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 600);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 500);

    const handleResize = () => {
      if (canvas && canvas.parentElement) {
        width = canvas.width = canvas.parentElement.clientWidth;
        height = canvas.height = canvas.parentElement.clientHeight;
      }
    };
    window.addEventListener('resize', handleResize);

    interface Bubble {
      x: number;
      y: number;
      radius: number;
      speedY: number;
      speedX: number;
      opacity: number;
    }

    const bubbles: Bubble[] = Array.from({ length: 18 }, () => ({
      x: Math.random() * width,
      y: height + Math.random() * 100,
      radius: Math.random() * 2.5 + 1.2,
      speedY: Math.random() * 0.45 + 0.2,
      speedX: Math.random() * 0.2 - 0.1,
      opacity: Math.random() * 0.25 + 0.1
    }));

    let phase = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // 1. Draw elegant grid lines
      ctx.strokeStyle = 'rgba(59, 130, 246, 0.02)';
      ctx.lineWidth = 0.5;
      const gridSize = 40;
      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // 2. Rising fluid micro bubbles representing dissolved oxygen
      bubbles.forEach(b => {
        b.y -= b.speedY;
        b.x += b.speedX;

        // Reset if bubble floats out
        if (b.y < -10) {
          b.y = height + Math.random() * 30;
          b.x = Math.random() * width;
        }

        ctx.fillStyle = `rgba(59, 130, 246, ${b.opacity * 0.15})`;
        ctx.strokeStyle = `rgba(59, 130, 246, ${b.opacity * 0.35})`;
        ctx.lineWidth = 0.5;
        
        ctx.beginPath();
        ctx.arc(b.x, b.y, b.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();

        // Shiny reflex dot
        ctx.fillStyle = `rgba(255, 255, 255, ${b.opacity * 0.4})`;
        ctx.beginPath();
        ctx.arc(b.x - b.radius * 0.3, b.y - b.radius * 0.3, b.radius * 0.2, 0, Math.PI * 2);
        ctx.fill();
      });

      // 3. Draw soft, fluid wavy horizontal bands at the bottom representing media level
      phase += 0.006;
      ctx.fillStyle = 'rgba(59, 130, 246, 0.015)';
      ctx.beginPath();
      ctx.moveTo(0, height);
      for (let x = 0; x <= width; x += 10) {
        const y = height - 55 + Math.sin(x * 0.008 + phase) * 8 + Math.cos(x * 0.004 + phase * 1.5) * 4;
        ctx.lineTo(x, y);
      }
      ctx.lineTo(width, height);
      ctx.fill();

      ctx.fillStyle = 'rgba(16, 185, 129, 0.012)'; // emerald overlap wave
      ctx.beginPath();
      ctx.moveTo(0, height);
      for (let x = 0; x <= width; x += 10) {
        const y = height - 44 + Math.sin(x * 0.011 - phase * 0.8) * 6 + Math.cos(x * 0.005 + phase) * 3;
        ctx.lineTo(x, y);
      }
      ctx.lineTo(width, height);
      ctx.fill();

      animationId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none select-none z-0"
    />
  );
}

export default function BioreactorMonitor({ scientificMetric }: BioreactorMonitorProps) {
  // Bioreactor Telemetry State
  const [pH, setPH] = useState(7.22);
  const [temp, setTemp] = useState(37.0);
  const [do2, setDo2] = useState(41.4);
  const [agitation, setAgitation] = useState(240);
  const [cellDensity, setCellDensity] = useState(14.8);
  const [isFeeding, setIsFeeding] = useState(false);

  // Setpoints
  const [targetTemp, setTargetTemp] = useState(37.0);
  const [targetPH, setTargetPH] = useState(7.20);
  const [targetAgitation, setTargetAgitation] = useState(250);

  // History for plot (SVG charts)
  const [pHHistory, setPHHistory] = useState<number[]>([7.2, 7.21, 7.23, 7.22, 7.21, 7.22, 7.23, 7.24, 7.22, 7.23]);
  const [densityHistory, setDensityHistory] = useState<number[]>([12.1, 12.3, 12.6, 13.0, 13.5, 13.9, 14.2, 14.5, 14.6, 14.8]);

  // Determine status
  const phError = Math.abs(pH - targetPH) > 0.15;
  const tempError = Math.abs(temp - targetTemp) > 1.0;
  
  const status = phError || tempError 
    ? 'warning' 
    : 'optimal';

  // Tick simulation loop to mimic actual micro-sensor outputs
  useEffect(() => {
    const interval = setInterval(() => {
      // Drift towards setpoints with minor random noise
      setPH(prev => {
        const diff = targetPH - prev;
        const adjustment = diff * 0.15 + (Math.random() - 0.5) * 0.015;
        const newVal = Number((prev + adjustment).toFixed(2));
        setPHHistory(h => [...h.slice(1), newVal]);
        return newVal;
      });

      setTemp(prev => {
        const diff = targetTemp - prev;
        const adjustment = diff * 0.1 + (Math.random() - 0.5) * 0.1;
        return Number((prev + adjustment).toFixed(1));
      });

      setAgitation(prev => {
        const diff = targetAgitation - prev;
        const adjustment = diff * 0.2 + (Math.random() - 0.5) * 2;
        return Math.round(prev + adjustment);
      });

      setDo2(prev => {
        // DO2 fluctuates based on agitation speed
        const expectedDo2 = 100 - (agitation * 0.2) + (Math.random() - 0.5) * 2;
        const adjustment = (expectedDo2 - prev) * 0.08;
        return Number(Math.max(0, Math.min(100, prev + adjustment)).toFixed(1));
      });

      setCellDensity(prev => {
        // Growth happens if status is optimal
        const isOptimal = Math.abs(pH - targetPH) < 0.1 && Math.abs(temp - targetTemp) < 0.5;
        const baseGrowth = isOptimal ? 0.05 : 0.01;
        const feedBonus = isFeeding ? 0.4 : 0;
        const newVal = Number((prev + baseGrowth + feedBonus + (Math.random() - 0.5) * 0.02).toFixed(2));
        setDensityHistory(h => [...h.slice(1), newVal]);
        return newVal;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [targetPH, targetTemp, targetAgitation, pH, temp, agitation, isFeeding]);

  // Turn off feeding spikes after 3.5s
  useEffect(() => {
    if (isFeeding) {
      const t = setTimeout(() => setIsFeeding(false), 3500);
      return () => clearTimeout(t);
    }
  }, [isFeeding]);

  const handleInoculateFeed = () => {
    setIsFeeding(true);
  };

  // Build coordinate paths for SVG sparkline graphs
  const buildSvgPath = (data: number[], min: number, max: number) => {
    const width = 280;
    const height = 40;
    const padding = 2;
    const step = width / (data.length - 1);
    
    return data.map((val, idx) => {
      const x = idx * step;
      // Normalize to 0-height range
      const ratio = (val - min) / (max - min || 1);
      const y = height - padding - (ratio * (height - padding * 2));
      return `${x},${y}`;
    }).join(' ');
  };

  return (
    <div className="bg-brand-surface rounded-xl border border-brand-border overflow-hidden shadow-2xl relative">
      <BioreactorFluidBackground />
      <div className="relative z-10 flex flex-col h-full w-full">
        {/* Header bar */}
      <div className="bg-brand-surface-card px-5 py-4 border-b border-brand-border flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 items-center justify-center flex bg-brand-accent/15 rounded text-brand-accent border border-brand-accent/25">
            <Activity className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <h4 className="font-display font-semibold text-brand-text tracking-wide text-sm">OMNIVESSEL BIOREACTOR CTR-4</h4>
            <p className="text-xs text-brand-text-muted font-mono">{scientificMetric}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded text-2xs font-mono font-medium border ${
            status === 'optimal' 
              ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' 
              : 'bg-amber-500/10 text-amber-400 border-amber-500/20'
          }`}>
            <span className={`w-1.5 h-1.5 rounded-full ${status === 'optimal' ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400 animate-ping'}`} />
            {status.toUpperCase()} FEED
          </span>
          <button 
            onClick={() => {
              setPH(7.20);
              setTemp(37.0);
              setDo2(40.0);
              setAgitation(250);
              setCellDensity(12.0);
              setPHHistory([7.2, 7.2, 7.2, 7.2, 7.2, 7.2, 7.2, 7.2, 7.2, 7.2]);
              setDensityHistory([12, 12, 12, 12, 12, 12, 12, 12, 12, 12]);
            }}
            className="p-1 px-1.5 bg-brand-bg/80 border border-brand-border hover:border-brand-accent/40 text-brand-text hover:text-brand-accent rounded transition-all text-2xs font-mono flex items-center gap-1"
            title="Reset telemetry counters"
          >
            <RefreshCw className="w-3 h-3" /> RESET
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 p-6">
        {/* Left Side: Bioreactor Vessel Animation and Status */}
        <div className="lg:col-span-5 flex flex-col justify-between bg-brand-bg/40 p-5 rounded-lg border border-brand-border">
          <div>
            <span className="text-2xs font-mono text-brand-text-muted flex items-center gap-1">
              <Layers className="w-3 h-3" /> CULTIVATION VESSEL SCHEMATIC
            </span>
            <p className="text-2xs text-brand-text-muted font-mono mt-0.5">Scale representation of bioreaction fluid</p>
          </div>

          {/* Animated Vessel Visualizer */}
          <div className="my-8 flex justify-center items-center relative">
            <svg viewBox="0 0 160 220" className="w-36 h-48 drop-shadow-lg overflow-visible">
              {/* Vessel outline outer tank */}
              <rect x="20" y="20" width="120" height="180" rx="30" fill="none" stroke="var(--color-brand-border)" strokeWidth="3" />
              
              {/* Fluid color based on pH: Neutral = Teal/blue, Acid = Greenish/yellow, Alkaline = Red/indigo */}
              <path 
                d="M 21.5,100 C 50,105 110,95 138.5,100 L 138.5,170 C 138.5,185 125,198.5 110,198.5 L 50,198.5 C 35,198.5 21.5,185 21.5,170 Z" 
                fill={
                  pH < 7.0 
                  ? 'rgba(234, 179, 8, 0.25)' // Acidic: yellow-ish
                  : pH > 7.5 
                  ? 'rgba(129, 140, 248, 0.25)' // Alkaline: indigo-ish
                  : 'rgba(45, 212, 191, 0.25)' // Optimal: teal-ish
                }
                className="transition-colors duration-1000"
              />

              {/* Liquid interface line */}
              <path 
                d="M 21.5,100 C 50,104 110,96 138.5,100" 
                fill="none" 
                stroke={pH < 7.0 ? '#fbbf24' : pH > 7.5 ? '#818cf8' : '#2dd4bf'} 
                strokeWidth="1.5" 
                className="transition-colors duration-1000"
              />

              {/* Bubbles / yeast particles inside the vessel. Bubble speed varies with agitation */}
              <circle cx="50" cy="120" r="1.5" fill="#ffffff" opacity="0.4" className="animate-bounce" style={{ animationDuration: `${Math.max(0.5, 3 - agitation / 150)}s` }} />
              <circle cx="90" cy="140" r="2.5" fill="#ffffff" opacity="0.3" className="animate-pulse" style={{ animationDuration: `${Math.max(0.5, 2.5 - agitation / 150)}s` }} />
              <circle cx="70" cy="165" r="2" fill="#ffffff" opacity="0.35" className="animate-bounce" style={{ animationDuration: `${Math.max(0.4, 2 - agitation / 150)}s` }} />
              <circle cx="110" cy="115" r="1" fill="#ffffff" opacity="0.5" className="animate-pulse" style={{ animationDuration: `${Math.max(0.3, 1.8 - agitation / 150)}s` }} />
              {isFeeding && (
                <>
                  {/* Floating green nutrient droplets */}
                  <circle cx="80" cy="60" r="4" fill="#10b981" className="animate-bounce" style={{ animationDuration: '0.8s' }} />
                  <circle cx="65" cy="85" r="3" fill="#10b981" className="animate-pulse" style={{ animationDuration: '0.5s' }} />
                </>
              )}

              {/* Thermal heating jacket visual markers */}
              {temp > 38.5 && (
                <g stroke="#ef4444" strokeWidth="1" fill="none" opacity="0.6">
                  <path d="M 12,50 Q 15,55 12,60 Q 15,65 12,70" />
                  <path d="M 148,50 Q 151,55 148,60 Q 151,65 148,70" />
                </g>
              )}

              {/* Stirring Impeller Shaft */}
              <line x1="80" y1="10" x2="80" y2="160" stroke="#64748b" strokeWidth="2.5" />
              {/* Stirring Blades (spinning representation) */}
              <g className="origin-center" style={{ transform: `rotate(${Date.now() / 100}deg)` }}>
                <rect x="50" y="155" width="60" height="4" rx="2" fill="#64748b" />
                <rect x="65" y="125" width="30" height="3" rx="1.5" fill="#64748b" />
              </g>

              {/* Feed Entry tube */}
              <path d="M 80,10 L 80,45" fill="none" stroke="#64748b" strokeWidth="3" />
            </svg>
            {isFeeding && (
              <span className="absolute top-0 bg-emerald-500 text-brand-bg font-mono font-bold text-[9px] px-2 py-0.5 rounded animate-bounce">
                FEED ACTIVE
              </span>
            )}
          </div>

          <div className="space-y-2">
            <p className="text-2xs font-mono text-brand-text-muted flex justify-between">
              <span>EST. CELL DENSITY:</span>
              <span className="text-brand-text font-bold">{cellDensity} g/L</span>
            </p>
            <div className="flex items-center gap-1.5 justify-center">
              <button
                onClick={handleInoculateFeed}
                disabled={isFeeding}
                className="w-full text-center py-2 bg-brand-accent hover:bg-brand-accent/90 disabled:bg-brand-surface disabled:text-neutral-400 font-mono text-2xs font-bold text-white rounded transition-all shadow-md shadow-brand-accent/10 cursor-pointer"
              >
                {isFeeding ? "INJECTING NUTRIENT..." : "INJECT FEED SPORE"}
              </button>
            </div>
          </div>
        </div>

        {/* Right Side: Sensor Readings, Charts, and Parameter Controllers */}
        <div className="lg:col-span-7 space-y-5">
          {/* Live Sensor Grids */}
          <div className="grid grid-cols-2 gap-4">
            {/* pH Sensor */}
            <div className={`p-4 rounded-lg border bg-brand-bg/15 flex flex-col justify-between ${phError ? 'border-amber-500/30 font-bold' : 'border-brand-border'}`}>
              <div className="flex justify-between items-center">
                <span className="text-2xs font-mono text-brand-text-muted">SENSOR_pH</span>
                {phError && <ShieldAlert className="w-3.5 h-3.5 text-amber-500 animate-pulse" />}
              </div>
              <div className="my-2">
                <p className="text-2xl font-display font-bold text-brand-text">{pH.toFixed(2)}</p>
                <p className="text-[10px] text-brand-text-muted font-mono">Target: {targetPH.toFixed(2)} pH</p>
              </div>
              <div className="h-10 mt-1">
                <svg className="w-full h-full overflow-visible">
                  <polyline
                    fill="none"
                    stroke="#E5422B"
                    strokeWidth="1.5"
                    points={buildSvgPath(pHHistory, 7.15, 7.30)}
                  />
                </svg>
              </div>
            </div>

            {/* Temperature Sensor */}
            <div className={`p-4 rounded-lg border bg-brand-bg/15 flex flex-col justify-between ${tempError ? 'border-amber-500/30' : 'border-brand-border'}`}>
              <div className="flex justify-between items-center">
                <span className="text-2xs font-mono text-brand-text-muted">SENSOR_TEMP</span>
                {tempError && <Flame className="w-3.5 h-3.5 text-red-500 animate-pulse" />}
              </div>
              <div className="my-2">
                <p className="text-2xl font-display font-bold text-brand-text">{temp.toFixed(1)} <span className="text-sm">°C</span></p>
                <p className="text-[10px] text-brand-text-muted font-mono">Target: {targetTemp.toFixed(1)} °C</p>
              </div>
              <div className="h-10 mt-1 flex items-end">
                {/* Horizontal simple progress level bar for temperature */}
                <div className="w-full bg-brand-border h-1.5 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-red-400 transition-all duration-300" 
                    style={{ width: `${Math.min(100, Math.max(0, ((temp - 30) / 12) * 100))}%` }} 
                  />
                </div>
              </div>
            </div>

            {/* Dissolved O2 Sensor */}
            <div className="p-4 rounded-lg border border-brand-border bg-brand-bg/15 flex flex-col justify-between">
              <span className="text-2xs font-mono text-brand-text-muted">SENSOR_dO2</span>
              <div className="my-2">
                <p className="text-2xl font-display font-bold text-brand-text">{do2} <span className="text-sm">%</span></p>
                <p className="text-[10px] text-brand-text-muted font-mono">Optimal: 30 - 50 %</p>
              </div>
              <div className="h-1.5 w-full bg-brand-border rounded-full overflow-hidden mt-1 col-span-2">
                <div className="h-full bg-indigo-500" style={{ width: `${do2}%` }} />
              </div>
            </div>

            {/* Cell Culture Growth Graph */}
            <div className="p-4 rounded-lg border border-brand-border bg-brand-bg/15 flex flex-col justify-between">
              <span className="text-2xs font-mono text-brand-text-muted">CELL_BIO_GROWTH</span>
              <div className="my-2">
                <p className="text-2xl font-display font-bold text-emerald-600">{cellDensity} <span className="text-xs font-mono text-brand-text-muted">g/L</span></p>
                <p className="text-[10px] text-brand-text-muted font-mono">Est. Dry Cell Mass</p>
              </div>
              <div className="h-10 mt-1">
                <svg className="w-full h-full overflow-visible">
                  <polyline
                    fill="none"
                    stroke="#34d399"
                    strokeWidth="1.5"
                    points={buildSvgPath(densityHistory, 12.0, 16.5)}
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* Actuator Sliders Container */}
          <div className="bg-brand-bg p-5 border border-brand-border space-y-4 rounded-lg">
            <h5 className="text-xs font-mono font-bold text-brand-text tracking-widest uppercase">
              FEEDBACK CONTROLLERS & SOLENOID SHUNTS
            </h5>

            {/* Temp Control Slider */}
            <div className="space-y-1">
              <div className="flex justify-between text-2xs font-mono">
                <span className="text-brand-text-muted">SOLENOID TEMPERATURE HEATER JACKET</span>
                <span className="text-brand-accent font-semibold">{targetTemp.toFixed(1)} °C</span>
              </div>
              <input
                type="range"
                min="32"
                max="41"
                step="0.5"
                value={targetTemp}
                onChange={(e) => setTargetTemp(parseFloat(e.target.value))}
                className="w-full h-1 bg-brand-border rounded-lg appearance-none cursor-pointer accent-brand-accent"
              />
            </div>

            {/* pH buffer flow control */}
            <div className="space-y-1">
              <div className="flex justify-between text-2xs font-mono">
                <span className="text-brand-text-muted">SOLENOID pH BUFFER FLUID DISPENSE</span>
                <span className="text-brand-accent font-semibold">{targetPH.toFixed(2)} pH</span>
              </div>
              <input
                type="range"
                min="6.80"
                max="7.80"
                step="0.05"
                value={targetPH}
                onChange={(e) => setTargetPH(parseFloat(e.target.value))}
                className="w-full h-1 bg-brand-border rounded-lg appearance-none cursor-pointer accent-brand-accent"
              />
            </div>

            {/* Agitation Speed RPM */}
            <div className="space-y-1">
              <div className="flex justify-between text-2xs font-mono">
                <span className="text-brand-text-muted">IMPELLER STIRRER AGITATION ACTUATION</span>
                <span className="text-brand-accent font-semibold">{targetAgitation} RPM</span>
              </div>
              <input
                type="range"
                min="100"
                max="480"
                step="10"
                value={targetAgitation}
                onChange={(e) => setTargetAgitation(parseInt(e.target.value))}
                className="w-full h-1 bg-brand-border rounded-lg appearance-none cursor-pointer accent-brand-accent"
              />
            </div>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
}
