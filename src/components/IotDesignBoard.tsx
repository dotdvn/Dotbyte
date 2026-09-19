import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Cpu, Thermometer, Radio, Wifi, ToggleLeft, ToggleRight, Sun } from 'lucide-react';

interface IotDesignBoardProps {
  compact?: boolean;
}

export default function IotDesignBoard({ compact = false }: IotDesignBoardProps) {
  const [ledStatus, setLedStatus] = useState(true);
  const [tempCelsius, setTempCelsius] = useState(24.5);
  const [wifiStrength, setWifiStrength] = useState(-55);
  const [temperatureHistory, setTemperatureHistory] = useState<number[]>([23.8, 24.0, 24.1, 24.3, 24.5, 24.4, 24.5]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTempCelsius(prev => {
        const delta = (Math.random() - 0.5) * 0.4;
        const nextVal = Math.min(32, Math.max(15, prev + delta));
        setTemperatureHistory(hist => {
          const arr = [...hist, nextVal];
          if (arr.length > 15) arr.shift();
          return arr;
        });
        return nextVal;
      });
      setWifiStrength(prev => {
        const nextRssi = prev + Math.floor((Math.random() - 0.5) * 6);
        return Math.min(-45, Math.max(-85, nextRssi));
      });
    }, 1500);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative flex flex-col h-full w-full select-none text-white overflow-hidden bg-[#070707]">
      {!compact && (
        <div className="flex flex-wrap items-center justify-between gap-3 bg-[#0d0d0d] border border-white/10 p-3 rounded-t-xl text-xs select-none z-10">
          <div className="flex items-center gap-2">
            <Cpu className="w-4 h-4 text-gold-light shrink-0" />
            <span className="font-mono text-[10px] tracking-wider text-gray-400">ESP32 // DHT22 SENSOR INTERFACE CORE</span>
          </div>

          <div className="flex items-center gap-3">
            <span className="font-mono text-[9px] text-gray-500">I2C BUS STATUS:</span>
            <span className="text-green-400 font-bold bg-green-500/10 px-1.5 py-0.5 rounded text-[8px] uppercase tracking-wider font-mono">
              ● OK // ADDRESS 0x27
            </span>
          </div>
        </div>
      )}

      <div className={`relative flex flex-col justify-center items-center overflow-auto flex-1 bg-[#050505] transition-all border ${compact ? 'rounded-xl aspect-[4/3] border-white/5 p-4' : 'border-t-0 p-6 border-white/10 rounded-b-xl min-h-[260px]'}`}>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-[420px] relative z-10">
          
          <div className="bg-[#0b0b0b] border border-white/5 rounded-xl p-3 flex flex-col justify-between">
            <div className="flex items-center justify-between border-b border-white/5 pb-2 mb-2">
              <span className="font-mono text-[7px] text-gray-400 font-bold uppercase tracking-widest">HARDWARE SIMULATOR</span>
              <span className="text-red-500 font-bold text-[6px] animate-pulse">● V-SYS VCC 3.3V</span>
            </div>

            <div className="bg-neutral-900 border border-neutral-700/60 rounded-lg p-2.5 flex flex-col gap-2 relative">
              <div className="flex items-center justify-between">
                <span className="font-sans text-[8px] text-neutral-400 font-bold uppercase">ESP32-WROOM</span>
                <span className="w-1.5 h-1.5 rounded-full bg-red-400" />
              </div>

              <div className="flex items-center justify-between p-2 rounded-lg bg-black/40 border border-white/5">
                <div className="flex items-center gap-1.5">
                  <motion.div 
                    animate={{ 
                      backgroundColor: ledStatus ? '#ffd700' : '#1f2937',
                      boxShadow: ledStatus ? '0 0 15px #ffd700' : 'none'
                    }}
                    transition={{ duration: 0.3 }}
                    className="w-4 h-4 rounded-full border border-white/20" 
                  />
                  <span className="font-mono text-[7px] text-gray-300">D2 RGB PIN</span>
                </div>
                
                <button
                  onClick={() => setLedStatus(!ledStatus)}
                  className="p-1 text-gold-base hover:text-white transition-colors cursor-pointer"
                  title="Toggle Pin state"
                >
                  {ledStatus ? <ToggleRight className="w-6 h-6" /> : <ToggleLeft className="w-6 h-6 text-gray-500" />}
                </button>
              </div>

              <div className="flex justify-between gap-[2px] mt-1 select-none">
                {Array.from({ length: 8 }).map((_, idx) => (
                  <div key={idx} className="flex flex-col items-center gap-0.5">
                    <span className="w-1.5 h-1.5 bg-yellow-500/80 rounded-[1px] border border-black/40" />
                    <span className="font-mono text-[5px] text-gray-500">G{idx * 2}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-[#0b0b0b] border border-white/5 rounded-xl p-3 flex flex-col justify-between">
            <div className="flex items-center justify-between border-b border-white/5 pb-2 mb-2">
              <span className="font-mono text-[7px] text-gray-400 font-bold uppercase tracking-widest">DHT22 TELEMETRY</span>
              <span className="font-mono text-[7px] text-cyan-400 flex items-center gap-1 font-bold">
                <Radio className="w-2.5 h-2.5 animate-pulse" />
                RSSI: {wifiStrength}dBm
              </span>
            </div>

            <div className="flex items-center gap-3 py-1 bg-black/20 p-2.5 rounded-lg border border-white/5">
              <Thermometer className="w-6 h-6 text-yellow-500/80 shrink-0" />
              <div className="flex flex-col">
                <span className="font-mono text-[14px] text-white font-extrabold tracking-tight">
                  {tempCelsius.toFixed(1)}°C
                </span>
                <span className="font-sans text-[6px] text-gray-500 uppercase tracking-wider font-bold">SENSOR CONVERGENCE TEMP</span>
              </div>
            </div>

            <div className="h-12 w-full mt-2 relative flex items-end">
              <svg className="w-full h-full" viewBox="0 0 160 40">
                <path
                  d={`M ${temperatureHistory.map((val, idx) => {
                    const x = (idx / (temperatureHistory.length - 1)) * 160;
                    // Scale temperatures from 5°C to 40°C in box height 40
                    const y = 35 - ((val - 15) / 20) * 30;
                    return `${x} ${y}`;
                  }).join(' L ')}`}
                  fill="none"
                  stroke="#ef4444"
                  strokeWidth="1.2"
                />
              </svg>
              <div className="absolute top-0 right-0 font-mono text-[5px] text-gray-500 uppercase flex flex-col items-end gap-1 select-none leading-none">
                <span>MAX 32°C</span>
                <span>MIN 15°C</span>
              </div>
            </div>
          </div>
        </div>

        {!compact && (
          <div className="absolute top-4 left-4 bg-black/90 p-2 rounded border border-white/10 text-[7px] font-mono tracking-wider flex items-center gap-1.5 text-blue-400 shadow-md">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-ping" />
            <span>SENSOR BUS: CONNECTED // PROTOCOL SIGNALS VALID</span>
          </div>
        )}
      </div>
    </div>
  );
}
