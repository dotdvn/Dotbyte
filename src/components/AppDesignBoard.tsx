import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Phone, Wifi, Battery, Smartphone, Activity, Zap, Layers, RefreshCw } from 'lucide-react';

interface AppDesignBoardProps {
  compact?: boolean;
}

export default function AppDesignBoard({ compact = false }: AppDesignBoardProps) {
  const [activeTab, setActiveTab] = useState<'dash' | 'perf' | 'config'>('dash');
  const [payloadCount, setPayloadCount] = useState(4);
  const [frameRate, setFrameRate] = useState(120);
  const [isSimulating, setIsSimulating] = useState(true);

  useEffect(() => {
    if (!isSimulating) return;
    const interval = setInterval(() => {
      setFrameRate(Math.floor(118 + Math.random() * 3));
    }, 400);
    return () => clearInterval(interval);
  }, [isSimulating]);

  return (
    <div className="relative flex flex-col h-full w-full select-none text-white overflow-hidden bg-[#070707]">
      
      {!compact && (
        <div className="flex flex-wrap items-center justify-between gap-3 bg-[#0d0d0d] border border-white/10 p-3 rounded-t-xl text-xs select-none z-10">
          <div className="flex items-center gap-2">
            <Smartphone className="w-4 h-4 text-gold-light shrink-0" />
            <span className="font-mono text-[10px] tracking-wider text-gray-400">NATIVE-PIPELINE // CROSS-PLATFORM SDK</span>
          </div>

          <div className="flex items-center gap-3">
            <span className="font-mono text-[9px] text-gray-500">OPTIMIZATION ENGINE:</span>
            <button
              onClick={() => setIsSimulating(!isSimulating)}
              className={`px-2 py-1 rounded text-[8px] font-sans font-bold uppercase transition-all tracking-wider ${isSimulating ? 'bg-green-500/15 text-green-400 border border-green-500/30' : 'bg-red-500/15 text-red-400 border border-red-500/30'}`}
            >
              {isSimulating ? 'SIM ACTIVE' : 'SIM PAUSED'}
            </button>
            <button
              onClick={() => {
                setPayloadCount(4);
                setActiveTab('dash');
              }}
              className="p-1 px-2 rounded bg-white/[0.03] text-gray-300 border border-white/5 hover:bg-white/[0.08]"
              title="Reset Simulated DB State"
            >
              <RefreshCw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      <div className={`relative flex flex-col justify-center items-center overflow-auto flex-1 bg-[#050505] transition-all border ${compact ? 'rounded-xl aspect-[4/3] border-white/5 p-4' : 'border-t-0 p-6 border-white/10 rounded-b-xl min-h-[260px]'}`}>
        
        <motion.div
          layout
          animate={{
            scale: compact ? 0.95 : 1,
            rotateY: compact ? -5 : 0
          }}
          transition={{ type: 'spring', damping: 20 }}
          className="relative w-[190px] h-[330px] rounded-[32px] border-[5px] border-[#181818] bg-[#0d0d0d] flex flex-col shadow-[0_0_60px_rgba(0,0,0,0.8)] overflow-hidden scale-95 md:scale-100"
          style={{ transformStyle: 'preserve-3d' }}
        >
          <div className="absolute top-1.5 left-1/2 -translate-x-1/2 w-[70px] h-[16px] rounded-full bg-[#181818] z-30 flex items-center justify-center gap-1.5 px-3">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-900/60" />
            <span className="w-4 h-1 rounded-full bg-gray-800" />
          </div>

          <div className="flex items-center justify-between text-[7px] text-gray-400 font-mono pt-4 pb-1.5 px-4 bg-[#0d0d0d] z-20 shrink-0">
            <span>09:41</span>
            <div className="flex items-center gap-1">
              <Wifi className="w-2.5 h-2.5" />
              <Battery className="w-3 h-3 text-green-400" />
            </div>
          </div>

          <div className="flex-1 p-2.5 flex flex-col gap-2.5 bg-[#080808] overflow-hidden select-none">
            <div className="flex items-center justify-between pt-1">
              <span className="font-sans text-[9px] font-black tracking-tight text-white uppercase">V-CORE Companion</span>
              <span className="font-mono text-[7px] text-green-400 font-bold bg-green-500/10 px-1.5 py-0.5 rounded animate-pulse">
                {frameRate} FPS
              </span>
            </div>

            <div className="flex-1 overflow-hidden relative">
              <AnimatePresence mode="wait">
                {activeTab === 'dash' && (
                  <motion.div
                    key="tab-dash"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    className="h-full flex flex-col justify-between"
                  >
                    <div className="flex flex-col gap-1.5">
                      <div className="bg-white/[0.02] border border-white/5 p-2 rounded-xl flex items-center justify-between">
                        <div className="flex items-center gap-1.5">
                          <Activity className="w-3.5 h-3.5 text-gold-base" />
                          <span className="font-mono text-[7px] text-gray-400">BENCHMARK RATIO</span>
                        </div>
                        <span className="font-mono text-[8.5px] text-white font-black">98.7%</span>
                      </div>

                      <button
                        onClick={() => setPayloadCount(prev => (prev < 12 ? prev + 1 : 4))}
                        className="bg-gold-base hover:bg-gold-light active:scale-95 transition-all text-black p-2 rounded-xl text-center flex flex-col items-center justify-center gap-0.5 relative group cursor-pointer"
                      >
                        <Zap className="w-4 h-4 text-black animate-bounce" />
                        <span className="font-sans text-[7.5px] font-black uppercase text-black tracking-wider">TRIGGER SYNAPSE</span>
                        <span className="font-mono text-[5.5px] text-black/60 font-bold">CLICK TO ADD PAYLOAD</span>
                      </button>
                    </div>

                    <div className="border border-white/5 bg-[#101010] p-2 rounded-xl flex-1 mt-2 flex flex-col gap-1 overflow-auto">
                      <span className="font-mono text-[6px] text-gray-400 font-bold tracking-widest uppercase">PIPELINE QUEUE ({payloadCount})</span>
                      <div className="flex flex-col gap-1">
                        {Array.from({ length: payloadCount }).map((_, idx) => (
                          <div key={idx} className="bg-white/[0.03] p-1.5 rounded flex items-center justify-between text-[6px] border-l-2 border-gold-base">
                            <span className="font-sans text-white/90">TRANSACTION_NET_#{1020 + idx}</span>
                            <span className="font-mono text-green-400">RESOLVED</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}

                {activeTab === 'perf' && (
                  <motion.div
                    key="tab-perf"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    className="h-full flex flex-col gap-2 font-mono text-[7px] text-gray-300"
                  >
                    <div className="bg-white/[0.02] border border-white/5 p-2 rounded-xl">
                      <div className="flex justify-between items-center mb-1">
                        <span>CPU UTILIZATION</span>
                        <span className="text-gold-light font-bold">14.2%</span>
                      </div>
                      <div className="h-10 w-full overflow-hidden flex items-end">
                        <svg className="w-full h-full" viewBox="0 0 160 40">
                          <path
                            d="M 0 35 Q 20 {Math.sin(1)*10+20} 40 18 T 80 25 T 120 15 T 160 22 L 160 40 L 0 40 Z"
                            fill="url(#app-chart-grad)"
                            stroke="#ca8a04"
                            strokeWidth="1.5"
                          />
                          <defs>
                            <linearGradient id="app-chart-grad" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="0%" stopColor="#caca04" stopOpacity="0.4"/>
                              <stop offset="100%" stopColor="#caca04" stopOpacity="0"/>
                            </linearGradient>
                          </defs>
                        </svg>
                      </div>
                    </div>

                    <div className="bg-white/[0.02] border border-white/5 p-2 rounded-xl">
                      <div className="flex justify-between items-center mb-1">
                        <span>SYS MEMALLOC</span>
                        <span className="text-blue-400 font-bold">24.8 MB</span>
                      </div>
                      <div className="h-1.5 w-full bg-white/[0.05] rounded-full overflow-hidden">
                        <div className="h-full bg-blue-500 rounded-full" style={{ width: '28%' }} />
                      </div>
                    </div>

                    <p className="text-[6px] text-gray-500 leading-normal text-center uppercase">
                      *Compiled using high-fidelity native Swift & Kotlin compilers.
                    </p>
                  </motion.div>
                )}

                {activeTab === 'config' && (
                  <motion.div
                    key="tab-config"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    className="h-full flex flex-col gap-2"
                  >
                    <span className="font-mono text-[6.5px] uppercase text-gray-500 tracking-wider">HARDWARE INTERFACES</span>
                    
                    <div className="flex flex-col gap-1.5">
                      {[
                        { name: 'WIFI DIRECT LINK', state: 'CONNECTED', color: 'text-green-400' },
                        { name: 'BLUETOOTH 5.3', state: 'READY', color: 'text-cyan-400' },
                        { name: 'SECURE ENCLAVE', state: 'ENCRYPTED', color: 'text-purple-400' }
                      ].map((cfg, i) => (
                        <div key={i} className="bg-white/[0.02] border border-white/5 p-2 rounded-lg flex items-center justify-between text-[7px] font-mono">
                          <span>{cfg.name}</span>
                          <span className={`font-bold ${cfg.color}`}>{cfg.state}</span>
                        </div>
                      ))}
                    </div>

                    <div className="bg-gold-base/10 border border-gold-base/20 p-2 rounded-xl">
                      <p className="font-sans text-[6px] text-gold-light leading-snug uppercase font-bold text-center">
                        Secure Sandbox Shielding Active. No external listeners found.
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="flex items-center justify-around border-t border-white/5 pt-1.5 shrink-0 bg-[#0d0d0d] pb-1 px-1">
              <button
                onClick={() => setActiveTab('dash')}
                className={`flex flex-col items-center gap-0.5 transition-all cursor-pointer ${activeTab === 'dash' ? 'text-gold-light' : 'text-gray-500 hover:text-white'}`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span className="font-sans text-[5.5px] font-bold uppercase">PAYLOADS</span>
              </button>

              <button
                onClick={() => setActiveTab('perf')}
                className={`flex flex-col items-center gap-0.5 transition-all cursor-pointer ${activeTab === 'perf' ? 'text-gold-light' : 'text-gray-500 hover:text-white'}`}
              >
                <Activity className="w-3.5 h-3.5" />
                <span className="font-sans text-[5.5px] font-bold uppercase">PERFORM</span>
              </button>

              <button
                onClick={() => setActiveTab('config')}
                className={`flex flex-col items-center gap-0.5 transition-all cursor-pointer ${activeTab === 'config' ? 'text-gold-light' : 'text-gray-500 hover:text-white'}`}
              >
                <Phone className="w-3.5 h-3.5" />
                <span className="font-sans text-[5.5px] font-bold uppercase">CONFIG</span>
              </button>
            </div>
          </div>

          <div className="w-[60px] h-[3px] bg-white/40 rounded-full mx-auto mb-1.5 shrink-0" />
        </motion.div>
        
        {!compact && (
          <div className="absolute right-4 top-4 bg-black/90 p-2 rounded border border-white/10 text-[7px] font-mono tracking-wider flex items-center gap-1 px-2 py-1 text-cyan-400 shadow-md">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
            <span>NATIVE WRAPPER: NATIVECORE_LOADED // NO EMULATION CPU</span>
          </div>
        )}
      </div>
    </div>
  );
}
