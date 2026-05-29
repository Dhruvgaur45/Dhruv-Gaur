import React from 'react';

interface LogoProps {
  /**
   * Layout of the logo presentation
   * - 'full': Stacked mark and full text underneath
   * - 'horizontal': Logo mark on the left, name & trade on the right
   * - 'mark-only': Just the symbol (DNA + DG + Leaf)
   */
  variant?: 'full' | 'horizontal' | 'mark-only';
  /**
   * Size of the logo container (maps to width or height depending on the aspect ratio)
   */
  size?: number | string;
  /**
   * Custom Tailwind of CSS classes to apply to the container
   */
  className?: string;
}

export default function Logo({
  variant = 'horizontal',
  size,
  className = ''
}: LogoProps) {
  // Common vector gradients and defs
  const svgDefs = (
    <defs>
      {/* Helix Green Gradient */}
      <linearGradient id="helixGreenGrad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#4ADE80" />
        <stop offset="100%" stopColor="#22C55E" />
      </linearGradient>

      {/* Helix Blue Gradient */}
      <linearGradient id="helixBlueGrad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#60A5FA" />
        <stop offset="100%" stopColor="#2563EB" />
      </linearGradient>

      {/* DG Gradient (Vibrant green to bright blue) */}
      <linearGradient id="dgMainGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#22C55E" />
        <stop offset="45%" stopColor="#10B981" />
        <stop offset="100%" stopColor="#2563EB" />
      </linearGradient>

      {/* Leaf Gradient */}
      <linearGradient id="leafGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#86EFAC" />
        <stop offset="100%" stopColor="#16A34A" />
      </linearGradient>

      {/* Text Metallic Gradient */}
      <linearGradient id="textMetallicGrad" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#333333" />
        <stop offset="50%" stopColor="#666666" />
        <stop offset="100%" stopColor="#333333" />
      </linearGradient>

      {/* Drop shadow for bio cells */}
      <filter id="subtleGlow" x="-10%" y="-10%" width="120%" height="120%">
        <feGaussianBlur stdDeviation="1.5" result="blur" />
        <feComposite in="SourceGraphic" in2="blur" operator="over" />
      </filter>
    </defs>
  );

  // SVG Logo Mark / Emblem alone (Helix, DG, Leaf, Arc)
  const drawEmblemSymbol = () => (
    <g id="logo-emblem-group">
      {/* 1. DNA DOUBLE HELIX (Left section of symbol) */}
      <g id="dna-helix-group" transform="translate(10, 0)">
        {/* Rungs (base pairs) from top to bottom */}
        <line x1="145" y1="130" x2="165" y2="130" stroke="#60A5FA" strokeWidth="2.5" strokeDasharray="3 2" />
        <line x1="132" y1="150" x2="158" y2="150" stroke="#4ADE80" strokeWidth="2.5" strokeDasharray="3 2" />
        <line x1="125" y1="170" x2="155" y2="170" stroke="#3B82F6" strokeWidth="2.5" strokeDasharray="3 2" />
        <line x1="126" y1="190" x2="158" y2="190" stroke="#22C55E" strokeWidth="2.5" strokeDasharray="3 2" />
        <line x1="135" y1="210" x2="167" y2="210" stroke="#60A5FA" strokeWidth="2.5" strokeDasharray="3 2" />
        <line x1="147" y1="230" x2="173" y2="230" stroke="#10B981" strokeWidth="2.5" strokeDasharray="3 2" />
        <line x1="151" y1="250" x2="171" y2="250" stroke="#2563EB" strokeWidth="2.5" strokeDasharray="3 2" />
        <line x1="142" y1="270" x2="162" y2="270" stroke="#4ADE80" strokeWidth="2.5" strokeDasharray="3 2" />

        {/* Helix Right Ribbon (Blue) */}
        {/* Wave form curving from top-right to bottom and crossing */}
        <path
          d="M168,114 C163,140 120,165 120,195 C120,230 178,250 178,285 C178,305 158,320 148,325"
          fill="none"
          stroke="url(#helixBlueGrad)"
          strokeWidth="6"
          strokeLinecap="round"
        />

        {/* Helix Left Ribbon (Green) */}
        {/* Opposite wave form to create 3D overlaps */}
        <path
          d="M125,119 C130,145 174,170 174,200 C174,235 116,255 116,290 C116,305 125,318 135,324"
          fill="none"
          stroke="url(#helixGreenGrad)"
          strokeWidth="6"
          strokeLinecap="round"
        />
      </g>

      {/* 2. THE STYLIZED "DG" IN MODERN GRADIENT TEXT / BEZIER */}
      <g id="letters-dg-group">
        {/* Letter 'D' customized geometry path */}
        <path
          d="M198,135 L245,135 C282,135 298,155 298,198 C298,241 282,261 245,261 L198,261 Z M224,158 L224,238 L244,238 C267,238 274,228 274,198 C274,168 267,158 244,158 Z"
          fill="url(#dgMainGrad)"
        />

        {/* Letter 'G' customized geometry path with integrated stem */}
        <path
          d="M380,152 C376,141 358,135 342,135 C310,135 290,161 290,198 C290,235 308,261 345,261 C378,261 385,240 385,220 L338,220 L338,198 L405,198 L405,214 C405,250 385,274 345,274 C296,274 266,238 266,198 C266,158 296,122 344,122 C371,122 400,131 405,152 Z"
          fill="url(#dgMainGrad)"
        />
      </g>

      {/* 3. BIOTECHNOLOGY GREEN LEAF (Connected/sprouting out of the 'G') */}
      <g id="biotech-leaf-group">
        <path
          d="M400,210 C412,206 426,192 441,178 C448,171 454,161 458,151 C454,171 432,199 416,211 Z"
          fill="url(#leafGrad)"
        />
        <path
          d="M400,210 C420,205 445,185 455,160 C458,152 460,143 462,135 C456,153 438,187 412,216"
          fill="url(#leafGrad)"
          opacity="0.85"
        />
        {/* Full leaf shape drawing */}
        <path
          d="M403,212 C415,200 445,178 458,142 C458,142 459,140 460,138 C458,138 456,139 454,141 C431,162 411,180 401,210 Z"
          fill="url(#leafGrad)"
        />
        {/* Sleek central leaf vein */}
        <path
          d="M402,211 C420,190 438,173 454,141"
          fill="none"
          stroke="#FFFFFF"
          strokeWidth="1.2"
          opacity="0.6"
        />
      </g>

      {/* 4. THREE BIO CELLS / DOTS (Floating above the leaf) */}
      <g id="cells-dots-group" filter="url(#subtleGlow)">
        {/* Circle 1 */}
        <circle cx="415" cy="122" r="7.5" fill="#4ADE80" />
        <circle cx="413" cy="120" r="2.5" fill="#FFFFFF" opacity="0.6" />

        {/* Circle 2 */}
        <circle cx="433" cy="112" r="10.5" fill="#22C55E" />
        <circle cx="430" cy="109" r="3.5" fill="#FFFFFF" opacity="0.6" />

        {/* Circle 3 */}
        <circle cx="442" cy="129" r="6.0" fill="#10B981" />
        <circle cx="440" cy="127" r="1.8" fill="#FFFFFF" opacity="0.5" />
      </g>

      {/* 5. FINELY BALANCED ARC / UNDERLINE */}
      <path
        d="M205,274 C285,279 365,279 445,274"
        fill="none"
        stroke="#60A5FA"
        strokeWidth="2.5"
        strokeLinecap="round"
        opacity="0.9"
      />
    </g>
  );

  // Layout presentation renderer
  if (variant === 'mark-only') {
    // Elegant scaled square mark
    const boxSize = size || 80;
    return (
      <svg
        viewBox="100 90 380 200"
        width={boxSize}
        height={boxSize}
        className={`inline-block select-none ${className}`}
        style={{ display: 'inline-block', verticalAlign: 'middle' }}
        xmlns="http://www.w3.org/2000/svg"
      >
        {svgDefs}
        {drawEmblemSymbol()}
      </svg>
    );
  }

  if (variant === 'full') {
    // Complete 1:1 format (dynamic alignment depending on className, defaults to center)
    const containerWidth = size || 320;
    const isCenter = !className.includes('items-start') && !className.includes('text-left');
    
    return (
      <div className={`flex flex-col select-none ${isCenter ? 'items-center text-center' : 'items-start text-left'} ${className}`}>
        <svg
          viewBox="100 80 380 210"
          width={containerWidth}
          className={isCenter ? "mx-auto" : ""}
          xmlns="http://www.w3.org/2000/svg"
        >
          {svgDefs}
          {drawEmblemSymbol()}
        </svg>

        {/* DHRUV GAUR - BIOTECHNOLOGY Typography below */}
        <div className="mt-2">
          <h2 className="text-[#1A1A1A] font-sans font-black uppercase text-xl md:text-2xl tracking-[0.25em] leading-none mb-2">
            DHRUV GAUR
          </h2>
          <div className={`flex items-center gap-3 ${isCenter ? 'justify-center' : ''}`}>
            <span className="h-[1px] w-8 bg-[#22C55E]" />
            <p className="text-[#22C55E] font-mono text-[9px] md:text-[10px] font-black uppercase tracking-[0.35em] whitespace-nowrap">
              BIOTECHNOLOGY
            </p>
            <span className="h-[1px] w-8 bg-[#22C55E]" />
          </div>
        </div>
      </div>
    );
  }

  // Variant: 'horizontal' (Emblem mark on the left side, stacked name and bio on the right side)
  const renderSize = size || 55;
  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      {/* Scaled symbol */}
      <svg
        viewBox="100 90 380 200"
        width={renderSize}
        height={renderSize}
        className="shrink-0"
        xmlns="http://www.w3.org/2000/svg"
      >
        {svgDefs}
        {drawEmblemSymbol()}
      </svg>

      {/* Styled text description */}
      <div className="flex flex-col text-left">
        <h1 className="font-display font-black text-[#1A1A1A] text-sm md:text-base uppercase tracking-[0.22em] leading-none">
          DHRUV GAUR
        </h1>
        <div className="flex items-center gap-1.5 mt-1">
          <span className="w-1.5 h-1.5 bg-[#22C55E] rounded-full animate-pulse" />
          <span className="text-[9px] font-mono font-black uppercase tracking-[0.25em] text-[#22C55E]">
            BIOTECHNOLOGY
          </span>
        </div>
      </div>
    </div>
  );
}
