import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Wrench, Clock, ArrowLeft, RotateCw } from 'lucide-react';

interface MaintenancePageProps {
  onBypass: () => void;
}

// Baseline starting anchor date: May 1st, 2026 UTC
const ANCHOR_DATE_MS = new Date('2026-05-01T00:00:00Z').getTime();
const ONE_DAY_MS = 24 * 60 * 60 * 1000;
const CYCLE_MS = 31 * ONE_DAY_MS; // Core cyclic period
const COUNTDOWN_LIMIT_MS = 30 * ONE_DAY_MS; // 30 Days active countdown timer

export default function MaintenancePage({ onBypass }: MaintenancePageProps) {
  const [simulatedTime, setSimulatedTime] = useState(new Date());
  const [virtualTimeOffset, setVirtualTimeOffset] = useState(0);
  const [timeMultiplier, setTimeMultiplier] = useState(1);

  // Handle continuous clock ticks
  useEffect(() => {
    const tickInterval = 1000;
    const timer = setInterval(() => {
      setVirtualTimeOffset(prev => prev + (tickInterval * timeMultiplier));
    }, tickInterval);
    return () => clearInterval(timer);
  }, [timeMultiplier]);

  useEffect(() => {
    setSimulatedTime(new Date(Date.now() + virtualTimeOffset));
  }, [virtualTimeOffset]);

  // Modulo math for the cyclic 31-day period
  const diffMs = simulatedTime.getTime() - ANCHOR_DATE_MS;
  const elapsedInCurrentCycle = ((diffMs % CYCLE_MS) + CYCLE_MS) % CYCLE_MS;
  const currentCycleIndex = Math.floor(diffMs / CYCLE_MS) + 1;

  let days = 0;
  let hours = 0;
  let minutes = 0;
  let seconds = 0;
  let isUnderMaintenance = true;

  if (elapsedInCurrentCycle < COUNTDOWN_LIMIT_MS) {
    // Standard 30 days active countdown
    const remainingMs = COUNTDOWN_LIMIT_MS - elapsedInCurrentCycle;
    days = Math.floor(remainingMs / ONE_DAY_MS);
    hours = Math.floor((remainingMs % ONE_DAY_MS) / (60 * 60 * 1000));
    minutes = Math.floor((remainingMs % (60 * 60 * 1000)) / (60 * 1000));
    seconds = Math.floor((remainingMs % (60 * 1000)) / 1000);
    isUnderMaintenance = true;
  } else {
    // 31st day refractory refresh period (24 hours window to reset)
    const remainingMs = CYCLE_MS - elapsedInCurrentCycle;
    days = 0;
    hours = Math.floor(remainingMs / (60 * 60 * 1000));
    minutes = Math.floor((remainingMs % (60 * 60 * 1000)) / (60 * 1000));
    seconds = Math.floor((remainingMs % (60 * 1000)) / 1000);
    isUnderMaintenance = false;
  }

  // Fast forward helper to demonstrate reset loop (jump 30s before transition)
  const jumpToTransitionWindow = () => {
    const cyclePos = elapsedInCurrentCycle;
    const shift = (COUNTDOWN_LIMIT_MS - (30 * 1000)) - cyclePos;
    setVirtualTimeOffset(prev => prev + shift);
  };

  const resetToRealTime = () => {
    setVirtualTimeOffset(0);
    setTimeMultiplier(1);
  };

  return (
    <div className="min-h-screen bg-[#FBFBFA] text-[#1A1A1A] font-sans selection:bg-brand-accent/20 selection:text-brand-accent relative flex flex-col justify-between p-6 sm:p-10 md:p-16 overflow-hidden">
      
      {/* Absolute faint background accents */}
      <div className="absolute inset-0 bg-[radial-gradient(#1A1A1A_1px,transparent_1px)] [background-size:24px_24px] opacity-[0.015] pointer-events-none z-0" />
      
      {/* Top Header Row */}
      <header className="relative z-10 w-full flex items-center justify-between border-b border-[#1A1A1A]/10 pb-6">
        <div className="flex items-center gap-2 font-mono text-[10px] tracking-[0.25em] text-[#1A1A1A]/50 uppercase font-bold">
          <span>PORTAL UPKEEP COORDINATOR</span>
          <span className="w-1.5 h-1.5 bg-[#10B981] rounded-full inline-block animate-pulse" />
        </div>

        <button
          onClick={onBypass}
          className="px-3.5 py-1.5 border border-[#1A1A1A]/10 hover:border-[#1A1A1A] hover:bg-[#1A1A1A]/5 font-mono text-[9px] uppercase tracking-widest text-[#1A1A1A] transition-all duration-300 flex items-center gap-2 cursor-pointer active:scale-95"
        >
          <ArrowLeft className="w-3 h-3 text-brand-accent" />
          Go Back
        </button>
      </header>

      {/* Main Clean Centered Content Card */}
      <main className="relative z-10 flex-grow flex flex-col items-center justify-center max-w-lg mx-auto w-full my-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.215, 0.610, 0.355, 1.000] }}
          className="space-y-10 w-full"
        >
          {/* Simple Icon Badge */}
          <div className="mx-auto w-12 h-12 bg-[#1A1A1A]/5 border border-[#1A1A1A]/10 flex items-center justify-center rounded-none relative">
            <Wrench className="w-5 h-5 text-brand-accent animate-spin" style={{ animationDuration: '8s' }} />
          </div>

          {/* Title and Description */}
          <div className="space-y-4">
            <h1 className="text-3xl sm:text-4xl font-serif italic text-[#1A1A1A] tracking-tight uppercase leading-tight font-black">
              Undergoing System <br />
              <span className="not-italic text-brand-accent font-sans font-black">Recalibration</span>
            </h1>
            <p className="text-xs text-[#1A1A1A]/60 max-w-sm mx-auto leading-relaxed font-normal">
              Dhruv Gaur's biotechnology scheduler automatically cycles a 30-day structural upkeep window. This interface refreshes after every 31 days to optimize sequence caching, lab statistics, and static site indexes.
            </p>
          </div>

          {/* Elegant Simplified Countdown Row */}
          <div className="border border-[#1A1A1A]/10 bg-white p-6 shadow-sm flex items-center justify-center gap-4 relative">
            {/* Countdown Days */}
            <div className="w-16">
              <div className="text-3xl font-bold text-[#1A1A1A] leading-none tracking-tight tabular-nums font-mono">
                {String(days).padStart(2, '0')}
              </div>
              <div className="text-[8px] text-[#1A1A1A]/40 tracking-wider mt-1.5 uppercase font-bold">Days</div>
            </div>

            <span className="text-lg text-brand-accent font-black animate-pulse font-mono">:</span>

            {/* Countdown Hours */}
            <div className="w-16">
              <div className="text-3xl font-bold text-[#1A1A1A] leading-none tracking-tight tabular-nums font-mono">
                {String(hours).padStart(2, '0')}
              </div>
              <div className="text-[8px] text-[#1A1A1A]/40 tracking-wider mt-1.5 uppercase font-bold">Hours</div>
            </div>

            <span className="text-lg text-brand-accent font-black animate-pulse font-mono">:</span>

            {/* Countdown Minutes */}
            <div className="w-16">
              <div className="text-3xl font-bold text-[#1A1A1A] leading-none tracking-tight tabular-nums font-mono">
                {String(minutes).padStart(2, '0')}
              </div>
              <div className="text-[8px] text-[#1A1A1A]/40 tracking-wider mt-1.5 uppercase font-bold">Mins</div>
            </div>

            <span className="text-lg text-brand-accent font-black animate-pulse font-mono">:</span>

            {/* Countdown Seconds */}
            <div className="w-16">
              <div className="text-3xl font-bold text-brand-accent leading-none tracking-tight tabular-nums font-mono">
                {String(seconds).padStart(2, '0')}
              </div>
              <div className="text-[8px] text-[#1A1A1A]/40 tracking-wider mt-1.5 uppercase font-bold">Secs</div>
            </div>
          </div>

          {/* Status Label and Interval Indicator */}
          <div className="space-y-2">
            <span className="font-mono text-[9px] font-bold tracking-[0.2em] text-[#1A1A1A]/45 uppercase block">
              CURRENT RUNNING STATE
            </span>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand-accent/5 border border-brand-accent/25">
              <span className="w-2 h-2 rounded-full bg-brand-accent animate-ping" />
              <span className="font-mono text-[10px] font-bold text-brand-accent tracking-widest uppercase">
                {isUnderMaintenance ? 'ACTIVE 30-DAY COUNTDOWN' : 'BUFFER REFRESH WINDOW'}
              </span>
            </div>
            <div className="text-[9.5px] text-[#1A1A1A]/50 font-mono mt-1">
              Cycle Epoch #{currentCycleIndex} &middot; Automatic looping system
            </div>
          </div>
        </motion.div>
      </main>

      {/* Discrete Controls Footer (Keeping simulation mechanics testable & simple) */}
      <footer className="relative z-10 w-full flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-[#1A1A1A]/10 pt-6">
        {/* Simple details */}
        <div className="text-[9px] font-mono text-[#1A1A1A]/40 uppercase tracking-widest font-black flex items-center gap-2">
          <span>Dhruv Gaur LIMS Server Time</span>
          <span className="text-[#1A1A1A]/70 font-semibold mt-0.5 sm:mt-0">
            {simulatedTime.toLocaleTimeString('en-US', { hour12: false })}
          </span>
        </div>

        {/* Minimal Time Warp Control Drawer strictly to demonstrate countdown refresh looping */}
        <div className="flex items-center gap-3">
          {timeMultiplier === 1 ? (
            <button
              onClick={() => setTimeMultiplier(400000)}
              className="text-[8.5px] font-mono border border-[#1A1A1A]/10 text-[#1A1A1A]/55 hover:text-brand-accent hover:border-brand-accent/40 hover:bg-brand-accent/5 px-2.5 py-1 transition-all cursor-pointer font-bold uppercase tracking-wider"
              title="Speed up virtual clock ticks to see timer refresh loop"
            >
              [ Run Fast Simulation ]
            </button>
          ) : (
            <button
              onClick={resetToRealTime}
              className="text-[8.5px] font-mono border border-brand-accent/40 bg-brand-accent/5 text-brand-accent px-2.5 py-1 transition-all cursor-pointer font-bold uppercase tracking-wider animate-pulse"
            >
              [ Restore Standard Time ]
            </button>
          )}

          <button
            onClick={jumpToTransitionWindow}
            className="text-[8.5px] font-mono border border-[#1A1A1A]/10 text-[#1A1A1A]/55 hover:text-brand-accent hover:border-brand-accent/40 hover:bg-brand-accent/5 px-2.5 py-1 transition-all cursor-pointer font-bold uppercase tracking-wider"
            title="Fast forward simulated time near the transition boundaries"
          >
            [ Advance Near Refresh ]
          </button>
        </div>
      </footer>
      
    </div>
  );
}
