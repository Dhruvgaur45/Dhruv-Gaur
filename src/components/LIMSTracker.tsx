import React, { useState, useMemo } from 'react';
import { Database, FileSpreadsheet, RefreshCw, Layers, CheckCircle, Award } from 'lucide-react';

interface LIMSTrackerProps {
  scientificMetric: string;
}

interface WellData {
  row: string;
  col: number;
  id: string;
  sampleName: string;
  concentration: number; // in μg/μL
  purity: number; // A260/A280 ratio (optimal is ~1.8-2.0)
  status: 'empty' | 'extracted' | 'pcr-amplified' | 'sequenced' | 're-assay';
}

const ROWS = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
const COLS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

export default function LIMSTracker({ scientificMetric }: LIMSTrackerProps) {
  const [selectedWell, setSelectedWell] = useState<{ row: string; col: number } | null>({ row: 'A', col: 1 });
  const [plateMode, setPlateMode] = useState<'pcr' | 'dilution' | 'default'>('pcr');

  // Compute 96 wells based on selected mode
  const wells = useMemo<Record<string, WellData>>(() => {
    const data: Record<string, WellData> = {};

    ROWS.forEach(row => {
      COLS.forEach(col => {
        const wellId = `${row}${col < 10 ? '0' : ''}${col}`;
        const key = `${row}-${col}`;

        // Seed calculations based on rows & columns
        let concentration = 0;
        let purity = 0;
        let status: WellData['status'] = 'empty';
        let sampleName = 'NTC (No Template Control)';

        if (plateMode === 'dilution') {
          // Columns 1 and 2 are calibration dilution curves of Human cDNA
          if (col <= 2) {
            const step = row.charCodeAt(0) - 65; // 0 to 7
            concentration = Number((100 / Math.pow(2, step)).toFixed(3)); // 100, 50, 25, 12.5...
            purity = Number((1.85 + step * 0.01).toFixed(2));
            status = 'extracted';
            sampleName = `STD-cDNA-CRV-${wellId}`;
          } else {
            // Random dilutions
            const seed = (row.charCodeAt(0) * col) % 41;
            concentration = Number((seed * 0.85).toFixed(2));
            purity = Number((1.72 + (seed % 15) * 0.02).toFixed(2));
            status = concentration > 15 ? 'sequenced' : concentration > 2 ? 'pcr-amplified' : 're-assay';
            sampleName = `SPL-OMN-${wellId}`;
          }
        } else if (plateMode === 'pcr') {
          // Heat map resembling centered PCR amplifications
          const distRow = Math.abs(row.charCodeAt(0) - 68); // Distance to center D
          const distCol = Math.abs(col - 6.5); // Distance to center 6.5
          const totalDist = distRow + distCol;
          
          concentration = Number((Math.max(0.1, 45 - totalDist * 6.2) + (row.charCodeAt(0) % 2)).toFixed(2));
          purity = Number((1.80 + (totalDist / 50)).toFixed(2));
          sampleName = `SPL-COVID2-PCR-${wellId}`;
          
          if (concentration > 30) {
            status = 'sequenced';
          } else if (concentration > 10) {
            status = 'pcr-amplified';
          } else if (concentration > 1) {
            status = 'extracted';
          } else {
            status = 're-assay';
          }
        } else {
          // Default randomized catalog
          const hash = (row.charCodeAt(0) + col * 17) % 7;
          if (hash === 0) {
            status = 'empty';
          } else {
            concentration = Number((15 + (col * 3.5) - (row.charCodeAt(0) - 65)).toFixed(1));
            purity = Number((1.65 + (col * 0.03)).toFixed(2));
            status = hash === 1 || hash === 3 ? 'pcr-amplified' : hash === 2 ? 'sequenced' : 'extracted';
            sampleName = `SPL-INS-BATCH-${wellId}`;
          }
        }

        data[key] = {
          row,
          col,
          id: wellId,
          sampleName,
          concentration,
          purity,
          status
        };
      });
    });

    return data;
  }, [plateMode]);

  const activeWellData = useMemo(() => {
    if (!selectedWell) return null;
    return wells[`${selectedWell.row}-${selectedWell.col}`];
  }, [selectedWell, wells]);

  // Download functional CSV structure
  const handleExportCSV = () => {
    let csvContent = "data:text/csv;charset=utf-8,";
    csvContent += "Well_ID,Sample_Name,Concentration_ug_uL,Absorbance_Ratio_A260_A280,Execution_Status\n";

    ROWS.forEach(row => {
      COLS.forEach(col => {
        const item = wells[`${row}-${col}`];
        csvContent += `${item.id},"${item.sampleName}",${item.concentration},${item.purity},${item.status}\n`;
      });
    });

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `LIMS_ASSAY_PLATE_${plateMode.toUpperCase()}_EXPORT.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getWellColor = (well: WellData) => {
    if (well.status === 'empty') return 'bg-brand-bg border-brand-border/40 hover:bg-brand-surface';
    
    // Highlight based on concentration levels (assay intensity)
    if (well.status === 're-assay') return 'bg-rose-500/15 border-rose-500/40 text-rose-700 hover:bg-rose-500/30';
    if (well.concentration > 30) return 'bg-brand-accent text-white border-brand-accent hover:opacity-90';
    if (well.concentration > 15) return 'bg-brand-accent/70 text-white border-brand-accent/80 hover:bg-brand-accent/90';
    if (well.concentration > 5) return 'bg-brand-accent/30 text-brand-text border-brand-accent/40 hover:bg-brand-accent/45';
    return 'bg-brand-surface border-brand-border hover:bg-brand-surface-card';
  };

  return (
    <div className="bg-brand-surface rounded-xl border border-brand-border overflow-hidden shadow-2xl">
      {/* Header bar */}
      <div className="bg-brand-surface-card px-5 py-4 border-b border-brand-border flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 items-center justify-center flex bg-brand-accent/15 rounded text-brand-accent border border-brand-accent/25">
            <Database className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <h4 className="font-display font-semibold text-brand-text tracking-wide text-sm">ASSAY_PLATE_MAPPER_96x</h4>
            <p className="text-xs text-brand-text-muted font-mono">{scientificMetric}</p>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-2xs font-mono text-brand-text-muted hidden sm:inline">LAYOUT SELECT:</span>
          <button 
            onClick={() => setPlateMode('pcr')}
            className={`px-2 py-1 rounded text-2xs font-mono border transition-all ${
              plateMode === 'pcr' 
                ? 'bg-brand-accent/20 text-brand-accent border-brand-accent/50' 
                : 'bg-brand-bg/50 text-brand-text border-brand-border/30 hover:border-brand-accent/35'
            }`}
          >
            PCR_SCREEN
          </button>
          <button 
            onClick={() => setPlateMode('dilution')}
            className={`px-2 py-1 rounded text-2xs font-mono border transition-all ${
              plateMode === 'dilution' 
                ? 'bg-brand-accent/20 text-brand-accent border-brand-accent/50' 
                : 'bg-brand-bg/50 text-brand-text border-brand-border/30 hover:border-brand-accent/35'
            }`}
          >
            DILUTION_CURVE
          </button>
          <button 
            onClick={() => setPlateMode('default')}
            className={`px-2 py-1 rounded text-2xs font-mono border transition-all ${
              plateMode === 'default' 
                ? 'bg-brand-accent/20 text-brand-accent border-brand-accent/50' 
                : 'bg-brand-bg/50 text-brand-text border-brand-border/30 hover:border-brand-accent/35'
            }`}
          >
            CATALOG_RANDOM
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 p-6">
        {/* Left Side: 96-Well Grid Interface */}
        <div className="lg:col-span-8 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-2xs font-mono text-brand-text-muted flex items-center gap-1">
              <Layers className="w-3 h-3 text-brand-accent" /> 96-WELL ASSAY PLATE PREPARATION
            </span>
            <span className="text-[10px] font-mono text-brand-text-muted">
              Grid View: column (1-12) x row (A-H)
            </span>
          </div>

          <div className="bg-brand-bg/40 p-4 rounded-lg border border-brand-border overflow-x-auto scrollbar-thin">
            <table className="w-full border-collapse select-none">
              <thead>
                <tr>
                  <th className="w-6 h-6 text-center text-brand-text-muted font-mono text-[10px]"></th>
                  {COLS.map(col => (
                    <th key={col} className="w-6 h-6 text-center text-brand-text-muted font-mono text-[10px] pb-1 font-normal">
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {ROWS.map(row => (
                  <tr key={row}>
                    <td className="w-6 h-6 text-center text-brand-text-muted font-mono text-[11px] pr-2 font-normal">
                      {row}
                    </td>
                    {COLS.map(col => {
                      const item = wells[`${row}-${col}`];
                      const isSelected = selectedWell?.row === row && selectedWell?.col === col;
                      
                      return (
                        <td key={col} className="p-0.5 text-center">
                          <button
                            onClick={() => setSelectedWell({ row, col })}
                            className={`w-6 h-6 rounded-full border text-[9px] font-semibold transition-all cursor-pointer ${getWellColor(item)} ${
                              isSelected ? 'ring-2 ring-brand-accent scale-110 z-10 border-white' : ''
                            }`}
                            title={`Well ID: ${item.id} - Conc: ${item.concentration} μg/μL`}
                          />
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex gap-4 items-center justify-between text-2xs font-mono text-brand-text-muted border-t border-brand-border p-2 pt-4">
            <div className="flex flex-wrap gap-x-3 gap-y-1">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-brand-bg border border-brand-border/40" />
                <span>Empty</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-brand-surface border border-brand-border/85" />
                <span>Extracted</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-brand-accent/30 border border-brand-accent/40" />
                <span>Amplified (Conc 5 - 15)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-brand-accent border border-brand-accent/60" />
                <span>High Conc (Conc &gt; 30)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500/20 border border-rose-500/40" />
                <span>Re-Assay (Flagged)</span>
              </div>
            </div>
            <button
              onClick={handleExportCSV}
              className="px-3 py-1.5 bg-brand-bg border border-brand-border hover:border-brand-accent/40 text-brand-text hover:text-brand-accent rounded transition-all flex items-center gap-1.5 text-3xs font-semibold"
            >
              <FileSpreadsheet className="w-3.5 h-3.5 text-brand-accent" /> EXPORT CSV
            </button>
          </div>
        </div>

        {/* Right Side: Single Selected Well Diagnostics */}
        <div className="lg:col-span-4 flex flex-col justify-between space-y-4">
          <div className="bg-brand-bg/40 p-4 rounded-lg border border-brand-border/80 h-full flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-brand-border">
                <span className="text-2xs font-mono text-brand-text-muted">WELL DIAGNOSTIC UNIT</span>
                {activeWellData && (
                  <span className="px-2 py-0.5 bg-brand-accent text-brand-bg font-mono font-bold text-xs rounded">
                    {activeWellData.id}
                  </span>
                )}
              </div>

              {activeWellData ? (
                <div className="space-y-4 mt-4 text-xs">
                  <div>
                    <p className="text-2xs font-mono text-brand-text-muted">SAMPLE BARCODE REGISTER</p>
                    <p className="font-mono text-brand-text text-sm font-bold mt-1 tracking-wider">
                      {activeWellData.sampleName}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-3 pt-2">
                    <div className="bg-brand-surface p-2.5 rounded border border-brand-border/40">
                      <p className="text-[10px] font-mono text-brand-text-muted">DNA/RNA CONC.</p>
                      <p className="text-sm font-display font-semibold text-brand-accent mt-1">
                        {activeWellData.concentration} <span className="text-[10px] font-mono text-neutral-400">μg/μL</span>
                      </p>
                    </div>

                    <div className="bg-brand-surface p-2.5 rounded border border-brand-border/40">
                      <p className="text-[10px] font-mono text-brand-text-muted">A260 / A280 INDEX</p>
                      <p className="text-sm font-display font-semibold text-brand-accent mt-1">
                        {activeWellData.purity} <span className="text-[10px] font-mono text-neutral-400">ratio</span>
                      </p>
                    </div>
                  </div>

                  <div className="pt-2">
                    <p className="text-2xs font-mono text-brand-text-muted mb-1.5">RUN SECURITY RATING</p>
                    {activeWellData.purity >= 1.8 && activeWellData.purity <= 2.0 ? (
                      <span className="inline-flex items-center gap-1.5 text-emerald-400 font-semibold bg-emerald-500/10 px-2 py-1 rounded text-2xs font-mono">
                        <CheckCircle className="w-3.5 h-3.5" /> PURIFIED HIGH QUALITY
                      </span>
                    ) : activeWellData.purity > 0 ? (
                      <span className="inline-flex items-center gap-1.5 text-amber-400 font-semibold bg-amber-500/10 px-2 py-1 rounded text-2xs font-mono">
                        <Award className="w-3.5 h-3.5 animate-pulse" /> IMPURITY SUSPECTED / SALTS
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 text-neutral-400 font-semibold bg-neutral-500/10 px-2 py-1 rounded text-2xs font-mono">
                        NO SPECTROMETRY
                      </span>
                    )}
                  </div>

                  <div className="pt-2">
                    <p className="text-2xs font-mono text-brand-text-muted mb-1.5">WORKFLOW STAGE STATUS</p>
                    <span className="px-2 py-1 rounded bg-brand-bg text-[10px] font-mono border border-brand-border/80 text-brand-text font-bold uppercase tracking-wider block text-center">
                      {activeWellData.status}
                    </span>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12 text-brand-text-muted text-xs font-mono">
                  Select any well on the plate to trigger automated spectrometer read.
                </div>
              )}
            </div>

            <div className="mt-6 text-2xs font-mono text-brand-text-muted text-center pt-3 border-t border-brand-border/40 select-none">
              A260/A280 coefficient represents spectral purity index checks verified recursively.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
