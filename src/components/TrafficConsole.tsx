import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Activity, 
  Terminal, 
  Play, 
  Square, 
  Zap, 
  RotateCcw, 
  Cpu, 
  HardDrive, 
  Clock, 
  TrendingUp, 
  Gauge, 
  CheckCircle2, 
  XCircle, 
  Layers, 
  Loader2,
  ListFilter,
  BarChart2
} from 'lucide-react';

interface RequestLog {
  id: string;
  timestamp: string;
  method: string;
  url: string;
  status: number;
  latencyMs: number;
}

interface ServerStats {
  uptimeSeconds: number;
  systemUptimeSeconds: number;
  systemCpuCount: number;
  systemCpuModel: string;
  systemLoadAverage: number[];
  memory: {
    freeBytes: number;
    totalBytes: number;
    processRssBytes: number;
    processHeapTotalBytes: number;
    processHeapUsedBytes: number;
  };
  metrics: {
    totalRequests: number;
    statusCodes: {
      "2xx": number;
      "3xx": number;
      "4xx": number;
      "5xx": number;
    };
    methods: Record<string, number>;
    averageLatencyMs: number;
  };
  recentRequests: RequestLog[];
}

interface ClientTestResult {
  id: string;
  index: number;
  timestamp: string;
  path: string;
  status: number;
  latencyMs: number;
  success: boolean;
}

export default function TrafficConsole() {
  // Server-side telemetry state
  const [serverStats, setServerStats] = useState<ServerStats | null>(null);
  const [refreshInterval, setRefreshInterval] = useState<number>(3000); // 3s
  const [isAutoRefreshing, setIsAutoRefreshing] = useState(true);

  // Client-side Load Simulator Configuration
  const [concurrency, setConcurrency] = useState<number>(4);
  const [totalRequests, setTotalRequests] = useState<number>(100);
  const [targetPath, setTargetPath] = useState<string>('/api/health');
  const [delayMs, setDelayMs] = useState<number>(50);
  const [cpuLoadFactor, setCpuLoadFactor] = useState<number>(5000); // Prime numbers range for stress test

  // Loader Simulator Live State
  const [isRunning, setIsRunning] = useState(false);
  const [completedRequests, setCompletedRequests] = useState(0);
  const [simResults, setSimResults] = useState<ClientTestResult[]>([]);
  const [simSummary, setSimSummary] = useState({
    avgLatency: 0,
    maxLatency: 0,
    minLatency: 99999,
    successCount: 0,
    failureCount: 0,
    requestsPerSec: 0,
    elapsedMs: 0
  });

  const abortControllerRef = useRef<AbortController | null>(null);
  const stopRequestedRef = useRef(false);

  // Fetch telemetry updates from Express Backend
  const fetchTelemetry = async () => {
    try {
      const response = await fetch('/api/traffic/stats');
      if (response.ok) {
        const data = await response.json();
        setServerStats(data);
      }
    } catch (err) {
      console.warn('[Telemetry Fetch Failure] Express server is updating or booting:', err);
    }
  };

  // Trigger telemetry pipeline reset
  const handleResetServerStats = async () => {
    try {
      await fetch('/api/traffic/reset', { method: 'POST' });
      fetchTelemetry();
    } catch (err) {
      console.error(err);
    }
  };

  // Run the concurrent request stream using dynamic async windows
  const startLoadSimulation = async () => {
    setIsRunning(true);
    setCompletedRequests(0);
    setSimResults([]);
    setSimSummary({
      avgLatency: 0,
      maxLatency: 0,
      minLatency: 99999,
      successCount: 0,
      failureCount: 0,
      requestsPerSec: 0,
      elapsedMs: 0
    });
    stopRequestedRef.current = false;
    
    // Setup Abort Controller
    const controller = new AbortController();
    abortControllerRef.current = controller;

    const startTime = performance.now();
    const resultsAccumulator: ClientTestResult[] = [];
    
    let activeWorkersCount = 0;
    let requestsIssued = 0;
    let requestsCompleted = 0;

    let successes = 0;
    let failures = 0;
    let sumLatency = 0;
    let maxLat = 0;
    let minLat = 99999;

    // Helper worker thread
    const executeNextRequest = async (workerId: number) => {
      if (requestsIssued >= totalRequests || stopRequestedRef.current) return;
      
      const currentRequestIndex = ++requestsIssued;
      activeWorkersCount++;

      // Construct request path based on selection
      let uri = targetPath;
      if (targetPath === '/api/traffic/stress') {
        uri = `/api/traffic/stress?delayMs=${delayMs}&loadFactor=${cpuLoadFactor}`;
      }

      const reqStart = performance.now();
      let status = 0;
      let ok = false;

      try {
        const response = await fetch(uri, {
          signal: controller.signal
        });
        status = response.status;
        ok = response.ok;
      } catch (err: any) {
        if (err.name === 'AbortError') {
          activeWorkersCount--;
          return;
        }
        status = 500;
        ok = false;
      }

      const reqEnd = performance.now();
      const latency = Math.round(reqEnd - reqStart);

      requestsCompleted++;
      setCompletedRequests(requestsCompleted);

      if (ok) successes++;
      else failures++;

      sumLatency += latency;
      if (latency > maxLat) maxLat = latency;
      if (latency < minLat) minLat = latency;

      const deltaMs = performance.now() - startTime;
      const rps = deltaMs > 0 ? Math.round((requestsCompleted / (deltaMs / 1000)) * 10) / 10 : 0;

      const singleResult: ClientTestResult = {
        id: `c-req-${currentRequestIndex}-${Date.now()}`,
        index: currentRequestIndex,
        timestamp: new Date().toLocaleTimeString(),
        path: uri,
        status,
        latencyMs: latency,
        success: ok
      };

      resultsAccumulator.unshift(singleResult);
      // Keep only last 35 simulator items to maintain React performance
      if (resultsAccumulator.length > 35) {
        resultsAccumulator.pop();
      }

      setSimResults([...resultsAccumulator]);

      setSimSummary({
        avgLatency: Math.round(sumLatency / requestsCompleted),
        maxLatency: maxLat,
        minLatency: minLat === 99999 ? 0 : minLat,
        successCount: successes,
        failureCount: failures,
        requestsPerSec: rps,
        elapsedMs: Math.round(deltaMs)
      });

      activeWorkersCount--;

      // Recurse to keep concurrency pool saturated
      if (requestsIssued < totalRequests && !stopRequestedRef.current) {
        await executeNextRequest(workerId);
      }
    };

    // Spin up parallel workers based on concurrency bounds
    const workerPromises = [];
    const poolSize = Math.min(concurrency, totalRequests);
    for (let i = 0; i < poolSize; i++) {
      workerPromises.push(executeNextRequest(i));
    }

    await Promise.all(workerPromises);
    setIsRunning(false);
    fetchTelemetry(); // final stats sync
  };

  // Halt active simulator
  const stopLoadSimulation = () => {
    stopRequestedRef.current = true;
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    setIsRunning(false);
  };

  // Handle telemetry pooling intervals
  useEffect(() => {
    fetchTelemetry();
    if (!isAutoRefreshing) return;

    const timer = setInterval(() => {
      fetchTelemetry();
    }, refreshInterval);

    return () => clearInterval(timer);
  }, [refreshInterval, isAutoRefreshing]);

  // Format Helper
  const formatBytes = (bytes: number) => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  // Memory usage ratio for health meter gauge
  const heapUsagePercent = serverStats 
    ? Math.min(100, Math.round((serverStats.memory.processHeapUsedBytes / serverStats.memory.processHeapTotalBytes) * 100))
    : 0;

  return (
    <div className="space-y-12 max-w-7xl mx-auto px-4 md:px-8">
      {/* HUD Header Block */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 pb-6 border-b border-[#1A1A1A]/10">
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-violet-600 animate-pulse" />
            <span className="text-brand-accent text-[9px] font-mono font-bold tracking-widest uppercase block">
              TRAFFIC PERFORMANCE TESTING REACTOR
            </span>
          </div>
          <h2 className="font-serif italic text-4xl md:text-5xl font-black text-[#1A1A1A] tracking-tighter uppercase leading-none">
            Traffic Console.
          </h2>
          <p className="text-sm text-brand-text-muted leading-relaxed font-normal max-w-xl">
            Simulate concurrent request spikes, stress-test API payloads (computational delay vs. Prime factoring), and capture microsecond HTTP latency statistics.
          </p>
        </div>

        {/* Sync Indicator */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsAutoRefreshing(!isAutoRefreshing)}
            className={`px-3 py-1.5 rounded-full font-mono text-[9px] font-bold uppercase tracking-wider transition-colors border cursor-pointer ${
              isAutoRefreshing 
                ? 'bg-emerald-50 border-emerald-200 text-emerald-700 hover:bg-emerald-100' 
                : 'bg-gray-50 border-gray-200 text-gray-500 hover:bg-gray-100'
            }`}
          >
            {isAutoRefreshing ? '● TELEMETRY HOOK ACTIVE' : '○ HOOK IDLE'}
          </button>

          <select
            value={refreshInterval}
            onChange={(e) => setRefreshInterval(Number(e.target.value))}
            className="bg-white border border-gray-200 text-gray-700 rounded-xl px-2.5 py-1.5 text-[10px] font-mono font-bold uppercase tracking-wider outline-none cursor-pointer"
          >
            <option value={1000}>1s Poll</option>
            <option value={3000}>3s Poll</option>
            <option value={10000}>10s Poll</option>
          </select>
        </div>
      </div>

      {/* Main Grid: Control Injector & Server Metrics Visualizer */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Interactive Stress Simulator Configuration and Metrics */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-white/90 backdrop-blur-md border border-[#1A1A1A]/10 p-6 rounded-[2.5rem] shadow-sm space-y-6 relative overflow-hidden">
            <div className="flex items-center justify-between border-b border-gray-100 pb-4">
              <h4 className="font-mono text-[10px] font-bold uppercase tracking-wider text-gray-500 flex items-center gap-2">
                <Layers className="w-4 h-4 text-[#8B5CF6]" />
                TRAFFIC LOAD INJECTOR
              </h4>
              <span className="font-mono text-[9px] text-[#8B5CF6] font-bold tracking-wider uppercase">
                EMBEDDED STRESS TEST UTILITY
              </span>
            </div>

            {/* Inputs Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="block text-xs font-sans font-semibold text-gray-700 flex justify-between">
                  <span>Concurrency Cap:</span>
                  <span className="font-mono text-indigo-600 font-bold">{concurrency} Threads</span>
                </label>
                <input
                  type="range"
                  min="1"
                  max="15"
                  value={concurrency}
                  onChange={(e) => setConcurrency(Number(e.target.value))}
                  disabled={isRunning}
                  className="w-full h-1.5 bg-gray-100 rounded-lg appearance-none cursor-pointer accent-indigo-600 disabled:opacity-50"
                />
                <span className="text-[10px] text-gray-400 font-mono block">Simultaneous browser-to-server connection pools.</span>
              </div>

              <div className="space-y-2">
                <label className="block text-xs font-sans font-semibold text-gray-700 flex justify-between">
                  <span>Total Requests Volume:</span>
                  <span className="font-mono text-indigo-600 font-bold">{totalRequests} Calls</span>
                </label>
                <input
                  type="range"
                  min="10"
                  max="300"
                  step="10"
                  value={totalRequests}
                  onChange={(e) => setTotalRequests(Number(e.target.value))}
                  disabled={isRunning}
                  className="w-full h-1.5 bg-gray-100 rounded-lg appearance-none cursor-pointer accent-indigo-600 disabled:opacity-50"
                />
                <span className="text-[10px] text-gray-400 font-mono block">Aggregate transaction test window load size.</span>
              </div>

              <div className="space-y-2">
                <label className="block text-xs font-sans font-semibold text-gray-700">Target Pipeline Endpoint:</label>
                <select
                  value={targetPath}
                  onChange={(e) => setTargetPath(e.target.value)}
                  disabled={isRunning}
                  className="w-full text-xs font-mono bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 outline-none focus:bg-white focus:border-indigo-500 transition-colors"
                >
                  <option value="/api/health">GET /api/health (Light Heartbeat)</option>
                  <option value="/api/custom-certs">GET /api/custom-certs (Disk Read)</option>
                  <option value="/api/traffic/stress">GET /api/traffic/stress (Workload Injector)</option>
                </select>
              </div>

              {/* Conditional Stress Panel */}
              {targetPath === '/api/traffic/stress' ? (
                <div className="space-y-2">
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-[10px] font-sans font-semibold text-gray-500 mb-1">Response Delay:</label>
                      <input
                        type="number"
                        min="0"
                        max="2000"
                        value={delayMs}
                        onChange={(e) => setDelayMs(Math.max(0, Number(e.target.value)))}
                        disabled={isRunning}
                        placeholder="Ms"
                        className="w-full text-xs font-mono bg-gray-50 border border-gray-200 rounded-xl p-2 focus:outline-none focus:bg-white focus:border-indigo-500"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-sans font-semibold text-gray-500 mb-1">Prime Complexity:</label>
                      <input
                        type="number"
                        min="0"
                        max="150000"
                        step="5000"
                        value={cpuLoadFactor}
                        onChange={(e) => setCpuLoadFactor(Math.max(0, Number(e.target.value)))}
                        disabled={isRunning}
                        placeholder="Load limit"
                        className="w-full text-xs font-mono bg-gray-50 border border-gray-200 rounded-xl p-2 focus:outline-none focus:bg-white focus:border-indigo-500"
                      />
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-gray-50 p-3 rounded-2xl border border-gray-100 flex items-center justify-center">
                  <span className="font-mono text-[10px] text-gray-400 text-center">No extra CPU/Timeout factors applied. Selected API route runs raw payload speed.</span>
                </div>
              )}
            </div>

            {/* Launch Buttons */}
            <div className="flex gap-3 pt-2">
              {!isRunning ? (
                <button
                  onClick={startLoadSimulation}
                  className="flex-1 flex items-center justify-center gap-2 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-mono font-black tracking-wider uppercase transition-all shadow-md hover:shadow-indigo-500/10 cursor-pointer"
                >
                  <Play className="w-4 h-4 fill-white" />
                  SATURATE CONNECTIONS
                </button>
              ) : (
                <button
                  onClick={stopLoadSimulation}
                  className="flex-1 flex items-center justify-center gap-2 py-3 bg-red-650 hover:bg-red-700 text-white rounded-xl text-xs font-mono font-black tracking-wider uppercase transition-all shadow-md cursor-pointer animate-pulse"
                >
                  <Square className="w-4 h-4 fill-white" />
                  HALT TEST ENGINE
                </button>
              )}
            </div>

            {/* Progress Bar */}
            {isRunning || completedRequests > 0 ? (
              <div className="space-y-2 pt-4 border-t border-gray-100">
                <div className="flex justify-between items-center text-xs font-mono">
                  <span className="text-gray-500 uppercase tracking-wider flex items-center gap-1.5 font-bold">
                    {isRunning ? <Loader2 className="w-3.5 h-3.5 animate-spin text-indigo-500" /> : <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />}
                    STRESS WAVE TRANSMITTING
                  </span>
                  <span className="font-black text-gray-700">
                    {completedRequests} / {totalRequests} ({Math.round((completedRequests / totalRequests) * 100)}%)
                  </span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${(completedRequests / totalRequests) * 100}%` }}
                    transition={{ ease: 'easeOut', duration: 0.1 }}
                    className="bg-indigo-600 h-full rounded-full"
                  />
                </div>
              </div>
            ) : null}

            {/* Live Client Test KPI Summary */}
            {completedRequests > 0 && (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-indigo-50/40 p-4 border border-indigo-100/50 rounded-2.5xl font-mono text-center">
                <div className="space-y-0.5">
                  <span className="text-[9px] text-indigo-500 uppercase tracking-widest block font-bold">RPS ROUTING</span>
                  <strong className="text-lg text-indigo-950 font-black">{simSummary.requestsPerSec} <span className="text-[10px]">avg</span></strong>
                </div>
                <div className="space-y-0.5 border-l sm:border-l border-indigo-100/30">
                  <span className="text-[9px] text-indigo-500 uppercase tracking-widest block font-bold">RTT LATENCY</span>
                  <strong className="text-lg text-indigo-950 font-black">{simSummary.avgLatency} <span className="text-[10px] font-normal text-indigo-400">ms</span></strong>
                </div>
                <div className="space-y-0.5 border-l border-indigo-100/30">
                  <span className="text-[9px] text-indigo-500 uppercase tracking-widest block font-bold">STABILITY</span>
                  <span className={`text-lg font-black block ${simSummary.failureCount > 0 ? 'text-amber-600' : 'text-emerald-600'}`}>
                    {Math.round((simSummary.successCount / completedRequests) * 100)}%
                  </span>
                </div>
                <div className="space-y-0.5 border-l border-indigo-100/30">
                  <span className="text-[9px] text-indigo-500 uppercase tracking-widest block font-bold">MIN / MAX</span>
                  <strong className="text-sm text-indigo-950 block pt-1 font-black">{simSummary.minLatency}ms / {simSummary.maxLatency}ms</strong>
                </div>
              </div>
            )}
          </div>

          {/* Connection Simulator Logs Visualizer */}
          <div className="bg-white/90 backdrop-blur-md border border-[#1A1A1A]/10 p-6 rounded-[2.5rem] shadow-sm space-y-4">
            <h4 className="font-mono text-[10px] font-bold uppercase tracking-wider text-gray-500 flex items-center justify-between">
              <span className="flex items-center gap-2">
                <Terminal className="w-4 h-4 text-emerald-500" />
                CONCURRENT CLIENT TRANSACTION LOGS ({simResults.length} / 35 CACHED)
              </span>
              {isRunning && (
                <span className="text-indigo-600 font-bold uppercase tracking-wider animate-pulse text-[8px]">
                  STREAMING METRICS LIVE
                </span>
              )}
            </h4>

            {/* Virtual Terminal Log Roll */}
            <div className="bg-black text-[11px] font-mono p-4 rounded-3xl h-[240px] overflow-y-auto space-y-1.5 custom-scrollbar shadow-inner border border-white/5">
              {simResults.length > 0 ? (
                simResults.map((r) => (
                  <div key={r.id} className="flex flex-wrap items-center justify-between text-gray-300 gap-2 font-mono py-0.5 border-b border-white/5 last:border-0">
                    <div className="flex items-center gap-2 shrink-0">
                      <span className="text-gray-500 text-[10px]">{r.timestamp}</span>
                      <span className="bg-indigo-950 text-indigo-300 px-1.5 py-0.5 rounded text-[9px] font-black uppercase">W-{r.index}</span>
                      <span className="text-emerald-400 font-semibold truncate max-w-[150px]">{r.path}</span>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="font-bold flex items-center gap-1 text-[10px]">
                        {r.success ? (
                          <span className="text-emerald-500 flex items-center gap-0.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                            {r.status} OK
                          </span>
                        ) : (
                          <span className="text-red-400 flex items-center gap-0.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-red-400" />
                            {r.status} ERR
                          </span>
                        )}
                      </span>
                      <span className="text-gray-500 font-bold text-[10px]">RTT: <strong className="text-white">{r.latencyMs}ms</strong></span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-gray-500 space-y-2">
                  <Zap className="w-6 h-6 text-gray-600 animate-pulse" />
                  <p className="text-[10px] text-center max-w-xs leading-normal">
                    Simulator idle. Select testing parameters above and click "Saturate Connections" to dispatch transactional traffic threads.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Column: Server-Side Vital Diagnostics Monitor */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-[#1A1A1A] text-white p-6 rounded-[2.5rem] border border-white/10 space-y-6 shadow-sm">
            
            {/* Header */}
            <div className="flex items-start justify-between border-b border-white/10 pb-4">
              <div className="space-y-1">
                <h4 className="font-mono text-[9px] uppercase tracking-widest text-indigo-400 flex items-center gap-1.5 font-bold">
                  <Activity className="w-4 h-4 text-indigo-400" />
                  SERVER HEALTH TELEMETRY
                </h4>
                <p className="text-[11px] text-gray-400">Real-time parameters parsed via NodeJS diagnostic APIs.</p>
              </div>
              <button
                onClick={handleResetServerStats}
                className="p-1.5 text-gray-400 hover:text-white bg-white/5 hover:bg-white/10 rounded-full border border-white/5 transition-colors cursor-pointer text-xs flex items-center gap-1"
                title="Reset server counters"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Diagnostics Stats Cards Grid */}
            {serverStats ? (
              <div className="space-y-5">
                {/* Visual Server Logs Counters */}
                <div className="grid grid-cols-2 gap-3 font-mono">
                  <div className="bg-white/5 border border-white/5 p-3.5 rounded-2xl">
                    <span className="text-[9px] text-gray-400 uppercase tracking-wider block">AGGREGATE REQUESTS</span>
                    <strong className="text-2xl text-white font-black">{serverStats.metrics.totalRequests}</strong>
                  </div>
                  <div className="bg-white/5 border border-white/5 p-3.5 rounded-2xl">
                    <span className="text-[9px] text-gray-400 uppercase tracking-wider block">AVG PROCESSING LATENCY</span>
                    <strong className="text-2xl text-emerald-400 font-black">{serverStats.metrics.averageLatencyMs} <span className="text-xs">ms</span></strong>
                  </div>
                </div>

                {/* HTTP Status Breakdown Progress Grid */}
                <div className="space-y-2.5 bg-white/5 border border-white/5 p-4 rounded-3xl">
                  <span className="font-mono text-[9px] text-gray-400 uppercase tracking-wider block font-bold">Transaction Codes Matrix</span>
                  
                  <div className="grid grid-cols-2 gap-3 text-xs font-mono">
                    <div className="flex justify-between items-center bg-emerald-950/20 border border-emerald-500/15 px-2.5 py-1.5 rounded-xl">
                      <span className="text-emerald-400 font-bold">2xx Status:</span>
                      <strong className="text-emerald-300 font-black">{serverStats.metrics.statusCodes["2xx"]}</strong>
                    </div>
                    <div className="flex justify-between items-center bg-blue-950/20 border border-blue-500/15 px-2.5 py-1.5 rounded-xl">
                      <span className="text-blue-400 font-bold">3xx Cache:</span>
                      <strong className="text-blue-300 font-black">{serverStats.metrics.statusCodes["3xx"]}</strong>
                    </div>
                    <div className="flex justify-between items-center bg-orange-950/20 border border-orange-500/15 px-2.5 py-1.5 rounded-xl">
                      <span className="text-orange-400 font-bold">4xx Client Err:</span>
                      <strong className="text-orange-300 font-black">{serverStats.metrics.statusCodes["4xx"]}</strong>
                    </div>
                    <div className="flex justify-between items-center bg-red-950/20 border border-red-500/15 px-2.5 py-1.5 rounded-xl">
                      <span className="text-red-400 font-bold">5xx Fatal:</span>
                      <strong className="text-red-300 font-black">{serverStats.metrics.statusCodes["5xx"]}</strong>
                    </div>
                  </div>
                </div>

                {/* Node JS Sandbox Vitals */}
                <div className="space-y-4 pt-2">
                  <h4 className="font-mono text-[9px] text-gray-400 uppercase tracking-wider block font-bold flex items-center gap-1">
                    <Gauge className="w-3.5 h-3.5 text-indigo-400" />
                    ENVIRONMENT VITAL SIGNALS
                  </h4>

                  {/* Heap Memory usage visual pointer */}
                  <div className="space-y-2 font-mono">
                    <div className="flex justify-between text-xs">
                      <span className="text-gray-400">Node JS Heap Memory Resource:</span>
                      <span>{formatBytes(serverStats.memory.processHeapUsedBytes)} / {formatBytes(serverStats.memory.processHeapTotalBytes)}</span>
                    </div>
                    <div className="w-full bg-white/10 rounded-full h-1.5 overflow-hidden">
                      <div 
                        className={`h-full rounded-full transition-all duration-300 ${
                          heapUsagePercent > 80 ? 'bg-red-500' : heapUsagePercent > 50 ? 'bg-amber-400' : 'bg-emerald-400'
                        }`}
                        style={{ width: `${heapUsagePercent}%` }}
                      />
                    </div>
                    <div className="flex justify-between text-[10px] text-gray-500">
                      <span>Rss Boundary: {formatBytes(serverStats.memory.processRssBytes)}</span>
                      <span>Ratio: {heapUsagePercent}%</span>
                    </div>
                  </div>

                  {/* CPU Load Metric List */}
                  <div className="grid grid-cols-2 gap-3 text-xs font-mono">
                    <div className="bg-white/5 p-2.5 border border-white/5 rounded-xl flex items-center gap-2.5">
                      <Cpu className="w-4 h-4 text-emerald-400 shrink-0" />
                      <div className="truncate">
                        <span className="text-[9px] text-gray-400 block uppercase">CORES COUNT</span>
                        <strong className="text-white truncate font-black">{serverStats.systemCpuCount} Logical</strong>
                      </div>
                    </div>

                    <div className="bg-white/5 p-2.5 border border-white/5 rounded-xl flex items-center gap-2.5">
                      <Clock className="w-4 h-4 text-emerald-400 shrink-0" />
                      <div className="truncate">
                        <span className="text-[9px] text-gray-400 block uppercase">UPTIME SECONDS</span>
                        <strong className="text-white truncate font-black">{serverStats.uptimeSeconds}s</strong>
                      </div>
                    </div>
                  </div>

                  {/* CPU Model banner */}
                  <div className="bg-black/50 p-3 rounded-2xl border border-white/5 font-mono text-[10px] text-gray-450 leading-relaxed truncate">
                    <span className="text-gray-500 uppercase block text-[8px] tracking-wider mb-0.5">CPU CORE PROFILE:</span>
                    <strong>{serverStats.systemCpuModel}</strong>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center text-center py-20 space-y-4">
                <Loader2 className="w-8 h-8 text-gray-400 animate-spin" />
                <p className="text-xs text-gray-400 font-mono">Pinging Node Diagnostic Endpoints...</p>
              </div>
            )}
          </div>

          {/* Active Express Server Transactions logs queue */}
          <div className="bg-white/95 backdrop-blur-md border border-[#1A1A1A]/10 p-6 rounded-[2.5rem] shadow-sm space-y-4 relative overflow-hidden">
            <h4 className="font-mono text-[10px] font-bold uppercase tracking-wider text-gray-500 flex items-center gap-2">
              <BarChart2 className="w-4 h-4 text-indigo-500" />
              GLOBAL HTTP TRANSACTION FEED (SERVER-SIDE FEED)
            </h4>

            {/* List */}
            <div className="space-y-2 max-h-[200px] overflow-y-auto custom-scrollbar pr-1">
              {serverStats && serverStats.recentRequests.length > 0 ? (
                serverStats.recentRequests.map((req) => (
                  <div key={req.id} className="flex justify-between items-center text-xs bg-gray-55/70 hover:bg-gray-50 border border-gray-100 p-2.5 rounded-xl font-mono">
                    <div className="flex items-center gap-2 truncate pr-2">
                      <span className={`text-[9px] font-black px-1.5 py-0.5 rounded ${
                        req.method === 'POST' ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-800'
                      }`}>
                        {req.method}
                      </span>
                      <span className="text-gray-800 font-semibold text-[11px] truncate">{req.url}</span>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <span className={`font-black text-[10px] ${req.status >= 400 ? 'text-red-500' : 'text-emerald-600'}`}>{req.status}</span>
                      <span className="text-[10px] text-gray-400">|</span>
                      <strong className="text-gray-700 text-[10px] font-bold">{req.latencyMs}ms</strong>
                    </div>
                  </div>
                ))
              ) : (
                <div className="py-12 text-center text-xs text-gray-400 font-mono">
                  No recent global transactions recorded on server side logs list yet.
                </div>
              )}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
