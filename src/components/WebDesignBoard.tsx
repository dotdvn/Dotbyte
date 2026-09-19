import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { RefreshCw, Monitor, Tablet, Phone, Sparkles, Trophy, Flame } from 'lucide-react';

interface WebDesignBoardProps {
  compact?: boolean;
}

export default function WebDesignBoard({ compact = false }: WebDesignBoardProps) {
  const [deviceMode, setDeviceMode] = useState<'desktop' | 'tablet' | 'phone'>('desktop');
  const [currentTheme, setCurrentTheme] = useState<'cyber' | 'glass' | 'royal'>('cyber');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [hoverMetric, setHoverMetric] = useState<string | null>(null);

  const [scores, setScores] = useState({ performance: 99, seo: 100, access: 100 });

  const triggerRefresh = () => {
    setIsRefreshing(true);
    setScores({ performance: 0, seo: 0, access: 0 });
    setTimeout(() => {
      setScores({ performance: 99, seo: 100, access: 100 });
      setIsRefreshing(false);
    }, 1200);
  };

  return (
    <div className="relative flex flex-col h-full w-full select-none text-white overflow-hidden bg-[#070707]">
      {!compact && (
        <div className="flex flex-wrap items-center justify-between gap-3 bg-[#0d0d0d] border border-white/10 p-3 rounded-t-xl text-xs select-none z-10">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-gold-light shrink-0" />
            <span className="font-mono text-[10px] tracking-wider text-gray-400">VE-WEB-ENGINE v3.8 // INTERACTIVE RE-RENDER</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="font-mono text-[9px] text-gray-400 mr-1">THEMIFY:</span>
            {(['cyber', 'glass', 'royal'] as const).map(th => (
              <button
                key={th}
                onClick={() => setCurrentTheme(th)}
                className={`px-2 py-1 rounded text-[8px] font-sans font-extrabold uppercase transition-all tracking-wider ${currentTheme === th ? 'bg-gold-base text-black border border-gold-light' : 'bg-white/[0.03] text-gray-300 hover:bg-white/[0.08] border border-white/5'}`}
              >
                {th}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-1.5 border-l border-white/10 pl-3">
            <button
              onClick={() => setDeviceMode('desktop')}
              className={`p-1.5 rounded transition-all ${deviceMode === 'desktop' ? 'bg-gold-base/15 text-gold-light' : 'text-gray-400 hover:text-white'}`}
              title="Desktop Mode"
            >
              <Monitor className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setDeviceMode('tablet')}
              className={`p-1.5 rounded transition-all ${deviceMode === 'tablet' ? 'bg-gold-base/15 text-gold-light' : 'text-gray-400 hover:text-white'}`}
              title="Tablet Mode"
            >
              <Tablet className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setDeviceMode('phone')}
              className={`p-1.5 rounded transition-all ${deviceMode === 'phone' ? 'bg-gold-base/15 text-gold-light' : 'text-gray-400 hover:text-white'}`}
              title="Mobile Mode"
            >
              <Phone className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={triggerRefresh}
              disabled={isRefreshing}
              className="p-1.5 rounded text-gray-400 hover:text-white transition-all hover:bg-white/[0.04]"
              title="Recompile page state"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin text-gold-base' : ''}`} />
            </button>
          </div>
        </div>
      )}

      <div className={`relative flex flex-col justify-center items-center overflow-auto flex-1 bg-[#050505] transition-all border ${compact ? 'rounded-xl aspect-[4/3] border-white/5 p-4' : 'border-t-0 p-6 border-white/10 rounded-b-xl min-h-[260px]'}`}>
        
        <motion.div
          layout
          animate={{
            width: compact 
              ? '100%' 
              : deviceMode === 'desktop' 
                ? '90%' 
                : deviceMode === 'tablet' 
                  ? '65%' 
                  : '40%',
            height: compact ? '85%' : '80%',
            opacity: isRefreshing ? 0.4 : 1
          }}
          transition={{ type: 'spring', damping: 25, stiffness: 180 }}
          className="relative rounded-lg border border-white/10 bg-[#0d0d0d] flex flex-col shadow-2xl overflow-hidden min-h-[170px]"
        >
          <div className="flex items-center justify-between border-b border-white/5 bg-[#141414] px-3 py-2 shrink-0">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-red-500/80" />
              <span className="w-2 h-2 rounded-full bg-yellow-500/80" />
              <span className="w-2 h-2 rounded-full bg-green-500/80" />
            </div>
            <div className="bg-[#050505] rounded-full text-center px-4 py-0.5 text-[8px] text-gray-400 font-mono flex items-center gap-1.5 border border-white/5 truncate max-w-[200px]">
              <span className="text-gold-base font-bold animate-pulse">https://</span>
              <span className="truncate">dotprojects.in/preview-{currentTheme}</span>
            </div>
            <div className="w-10" />
          </div>

          <div className="flex-1 p-3.5 flex flex-col gap-3 font-sans overflow-hidden bg-[#0a0a0a]">
            <div className="flex items-center justify-between border-b border-white/5 pb-2">
              <div className="flex items-center gap-1.5">
                <div className={`w-3 h-3 rounded-full ${currentTheme === 'cyber' ? 'bg-gold-base' : currentTheme === 'glass' ? 'bg-indigo-400' : 'bg-amber-600'}`} />
                <span className="font-sans text-[9px] font-extrabold tracking-wide uppercase">V-COGNITIVE</span>
              </div>
              <div className="flex gap-2 text-[6px] text-gray-400 uppercase font-bold tracking-wider">
                <span>PORTFOLIO</span>
                <span>METRICS</span>
                <span>CONTACT</span>
              </div>
            </div>

            <div className={`p-4 rounded-xl text-center flex flex-col gap-1 border transition-all duration-700 ${
              currentTheme === 'cyber' 
                ? 'bg-gradient-to-r from-gold-base/10 via-amber-950/20 to-black border-gold-base/20' 
                : currentTheme === 'glass' 
                  ? 'bg-white/[0.02] backdrop-blur-md border-white/10 shadow-lg' 
                  : 'bg-gradient-to-br from-indigo-950/20 via-black to-slate-900 border-indigo-500/20'
            }`}>
              <span className="font-mono text-[6px] tracking-widest text-[#ffd700] uppercase font-bold animate-pulse">CYBER LAYOUT ACTIVE</span>
              <h4 className="font-sans text-[11px] md:text-xs font-black tracking-tight text-white uppercase leading-tight">
                Engineering Custom Tech Interfaces
              </h4>
              <p className="font-sans text-[7px] text-gray-400 max-w-[260px] mx-auto leading-normal">
                Bespoke electronics meets premium interactive visual designs for high-grade performance feedback.
              </p>
              
              <div className="flex justify-center gap-2 mt-2">
                <div className="px-2 py-0.5 rounded-full text-[6px] font-extrabold tracking-wider bg-[#f59e0b] text-black">
                  EXPLORE MODULES
                </div>
                <div className="px-2 py-0.5 rounded-full text-[6px] font-bold tracking-wider border border-white/10 text-gray-300">
                  DOCUMENTATION
                </div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2 mt-1">
              {[
                { title: '99%', label: 'CORE METRIC', color: 'text-green-400' },
                { title: '24H', label: 'DELIVERY TIME', color: 'text-gold-light' },
                { title: '1-ON-1', label: 'DEV SUPPORT', color: 'text-cyan-400' }
              ].map((box, i) => (
                <div key={i} className="bg-white/[0.01] border border-white/5 p-2 rounded-lg text-center flex flex-col justify-center">
                  <span className={`font-sans text-[10px] font-extrabold ${box.color}`}>{box.title}</span>
                  <span className="font-mono text-[5px] text-gray-500 font-bold tracking-wider uppercase mt-0.5">{box.label}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        <div className="absolute right-3 bottom-3 flex flex-col gap-2 bg-black/90 p-2.5 rounded-xl border border-white/15 shadow-xl select-none max-w-[150px] z-20 font-mono">
          <span className="text-[7.5px] uppercase tracking-widest text-gray-400 flex items-center gap-1">
            <Trophy className="w-3 h-3 text-gold-base shrink-0" />
            LIGHTHOUSE INTEGRITY
          </span>

          <div className="flex items-center gap-3 mt-1.5">
            <div 
              onMouseEnter={() => setHoverMetric('perf')} 
              onMouseLeave={() => setHoverMetric(null)}
              className="flex flex-col items-center cursor-pointer hover:scale-105 transition-transform"
            >
              <div className="w-8 h-8 rounded-full border-2 border-emerald-500 flex items-center justify-center text-[10px] font-bold text-emerald-400 bg-emerald-500/10">
                {scores.performance}
              </div>
              <span className="text-[6px] text-gray-400 uppercase mt-1 font-bold">PERF</span>
            </div>

            <div 
              onMouseEnter={() => setHoverMetric('seo')} 
              onMouseLeave={() => setHoverMetric(null)}
              className="flex flex-col items-center cursor-pointer hover:scale-105 transition-transform"
            >
              <div className="w-8 h-8 rounded-full border-2 border-emerald-500 flex items-center justify-center text-[10px] font-bold text-emerald-400 bg-emerald-500/10">
                {scores.seo}
              </div>
              <span className="text-[6px] text-gray-400 uppercase mt-1 font-bold">SEO</span>
            </div>

            <div 
              onMouseEnter={() => setHoverMetric('access')} 
              onMouseLeave={() => setHoverMetric(null)}
              className="flex flex-col items-center cursor-pointer hover:scale-105 transition-transform"
            >
              <div className="w-8 h-8 rounded-full border-2 border-emerald-500 flex items-center justify-center text-[10px] font-bold text-emerald-400 bg-emerald-500/10">
                {scores.access}
              </div>
              <span className="text-[6px] text-gray-400 uppercase mt-1 font-bold">A11Y</span>
            </div>
          </div>

          <AnimatePresence>
            {hoverMetric && (
              <motion.div
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 5 }}
                className="text-[6.5px] text-yellow-400 mt-1 border-t border-white/5 pt-1 leading-normal uppercase font-bold"
              >
                {hoverMetric === 'perf' && '🚀 Speed Index <0.3s. Clean modular bundles.'}
                {hoverMetric === 'seo' && '🔍 Highly compliant semantic HTML structure.'}
                {hoverMetric === 'access' && '♿ Fully keyboard nav ready. High contrast ratio.'}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {!compact && (
          <div className="absolute top-4 left-4 flex items-center gap-1.5 bg-[#0a0a0a] border border-white/10 px-2 py-1 rounded font-mono text-[7px] tracking-wider text-green-400 shadow-md">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-ping shrink-0" />
            <span>CSS ENGINE: OK // TAILWIND COMPILING</span>
          </div>
        )}
      </div>
    </div>
  );
}
