import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import { Layers, Activity, Grid3X3, Eye, Zap, Crosshair } from 'lucide-react';

interface PcbDesignBoardProps {
  compact?: boolean;
}

export default function PcbDesignBoard({ compact = false }: PcbDesignBoardProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const [showGrid, setShowGrid] = useState(true);
  const [activeLayers, setActiveLayers] = useState({
    topCopper: true,
    bottomCopper: true,
    silkscreen: true,
  });
  const [activeTraceNet, setActiveTraceNet] = useState<string | null>(null);
  
  const [coords, setCoords] = useState({ x: 0, y: 0, px: 0, py: 0 });
  const [isInside, setIsInside] = useState(false);

  const [signalPoints, setSignalPoints] = useState<number[]>([]);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setSignalPoints(prev => {
        const next = [...prev, Math.sin(Date.now() / 150) * 12 + Math.random() * 4];
        if (next.length > 30) next.shift();
        return next;
      });
    }, 100);
    return () => clearInterval(interval);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const boardWidthMm = 100.0;
    const boardHeightMm = 60.0;
    const px = Math.min(boardWidthMm, Math.max(0, (x / rect.width) * boardWidthMm));
    const py = Math.min(boardHeightMm, Math.max(0, (y / rect.height) * boardHeightMm));
    
    setCoords({ x, y, px, py });
    
    if (px > 70 && py < 25) {
      setActiveTraceNet('ESP32_GPIO_I2C');
    } else if (px > 25 && px < 65 && py < 40) {
      setActiveTraceNet('GPS_UART_RX_TX');
    } else if (px < 20 && py < 20) {
      setActiveTraceNet('12V_POWER_IN_FILTER');
    } else if (px > 55 && px < 75 && py > 35) {
      setActiveTraceNet('SIGNAL_LED_ARGB');
    } else {
      setActiveTraceNet('GND_PLANE');
    }
  };

  return (
    <div className="relative flex flex-col h-full w-full select-none text-white overflow-hidden">
      
      {!compact && (
        <div className="flex flex-wrap items-center justify-between gap-3 bg-[#0d0d0d] border border-white/10 p-3 rounded-t-xl text-xs select-none">
          <div className="flex items-center gap-2">
            <Activity className="w-4 h-4 text-gold-light shrink-0 animate-pulse" />
            <span className="font-mono text-[10px] tracking-wider text-gray-400">GEOBUS CAD v1.4 // ACTIVE VIEWER</span>
          </div>
          
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowGrid(!showGrid)}
              className={`p-1.5 rounded flex items-center gap-1.5 transition-colors ${showGrid ? 'bg-gold-base/15 text-gold-light border border-gold-base/30' : 'bg-white/[0.02] text-gray-400 border border-transparent hover:border-white/10'}`}
              title="Toggle Construction Grid"
            >
              <Grid3X3 className="w-3.5 h-3.5" />
              <span className="font-sans text-[9px] uppercase font-bold">GRID</span>
            </button>

            <button
              onClick={() => setActiveLayers(prev => ({ ...prev, topCopper: !prev.topCopper }))}
              className={`p-1.5 rounded flex items-center gap-1.5 transition-colors ${activeLayers.topCopper ? 'bg-red-500/15 text-red-400 border border-red-500/30' : 'bg-white/[0.02] text-gray-400 border border-transparent hover:border-white/10'}`}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
              <span className="font-sans text-[9px] uppercase font-bold">TOP LAYER</span>
            </button>

            <button
              onClick={() => setActiveLayers(prev => ({ ...prev, bottomCopper: !prev.bottomCopper }))}
              className={`p-1.5 rounded flex items-center gap-1.5 transition-colors ${activeLayers.bottomCopper ? 'bg-blue-500/15 text-blue-400 border border-blue-500/30' : 'bg-white/[0.02] text-gray-400 border border-transparent'}`}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
              <span className="font-sans text-[9px] uppercase font-bold">BOTTOM LAYER</span>
            </button>

            <button
              onClick={() => setActiveLayers(prev => ({ ...prev, silkscreen: !prev.silkscreen }))}
              className={`p-1.5 rounded flex items-center gap-1.5 transition-colors ${activeLayers.silkscreen ? 'bg-gold-base/15 text-gold-light border border-gold-base/30' : 'bg-white/[0.02] text-gray-400 border border-transparent'}`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span className="font-sans text-[9px] uppercase font-bold">SILKSCREEN</span>
            </button>
          </div>
        </div>
      )}

      <div 
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsInside(true)}
        onMouseLeave={() => {
          setIsInside(false);
          setActiveTraceNet(null);
        }}
        className={`relative w-full overflow-hidden bg-[#070707] transition-all cursor-crosshair border ${compact ? 'rounded-xl aspect-[4/3] border-white/5' : 'border-t-0 p-1 border-white/10 rounded-b-xl flex-1 min-h-[260px]'}`}
      >
        {showGrid && (
          <div className="absolute inset-0 pointer-events-none opacity-[0.16] mix-blend-screen" style={{
            backgroundImage: `
              linear-gradient(to right, #ffffff 1px, transparent 1px),
              linear-gradient(to bottom, #ffffff 1px, transparent 1px)
            `,
            backgroundSize: `${compact ? '12px 12px' : '16px 16px'}`
          }} />
        )}

        <svg
          viewBox="0 0 500 300"
          className="w-full h-full p-2 select-none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            x="12"
            y="12"
            width="476"
            height="276"
            rx="18"
            fill="none"
            stroke="#a21caf"
            strokeWidth="2.5"
            strokeOpacity="0.8"
            className="animate-pulse"
            style={{ animationDuration: '4s' }}
          />
          <rect
            x="14"
            y="14"
            width="472"
            height="272"
            rx="16"
            fill="none"
            stroke="#111"
            strokeWidth="1.5"
          />

          {activeLayers.bottomCopper && (
            <g id="bottom-copper" className="opacity-75 stroke-cyan-500 stroke-[1.5] fill-none stroke-linejoin-round">
              <path d="M 28 45 L 85 45 L 85 105 L 125 105" />
              <path d="M 140 160 L 220 160 L 250 190" />
              <path d="M 380 40 L 320 100 L 280 100 L 240 140" />
              <path d="M 360 150 L 325 150 L 290 185 L 290 240" />
              <path d="M 390 195 L 435 195 L 435 240" strokeWidth="2.5" className="stroke-blue-400" />
              <path d="M 120 220 L 240 220 L 280 260 L 320 260" />
            </g>
          )}

          {activeLayers.topCopper && (
            <g id="top-copper" className="stroke-red-500 stroke-[1.8] fill-none stroke-linejoin-round">
              <path d="M 105 50 L 135 50 M 105 110 L 135 110" />
              <path d="M 100 80 L 100 135 L 220 135 L 220 105" />
              <circle cx="138" cy="100" r="2.5" fill="#ef4444" className="stroke-white stroke-[0.5]" />
              <path d="M 138 100 L 235 100 L 285 150 L 360 150" />
              <path d="M 138 115 L 250 115 L 295 160 L 360 160" />
              <path d="M 138 130 L 265 130 L 305 170 L 360 170" />
              <path d="M 300 215 L 300 180 L 345 140 L 360 140" />
              <path d="M 283 205 L 260 205 L 200 265 H 145" />
              <path d="M 28 175 L 85 175 C 105 175, 105 210, 125 210" strokeWidth="2.5" className="stroke-red-600" />
              <path d="M 400 235 L 460 235" strokeWidth="3" className="stroke-red-600 animate-pulse" />
            </g>
          )}

          {activeLayers.silkscreen && (
            <g id="silkscreen">
              <rect x="350" y="35" width="120" height="110" rx="6" fill="#1b1b1b" fillOpacity="0.4" stroke="#e0e0e0" strokeWidth="1" strokeDasharray="3 3" />
              <text x="410" y="50" textAnchor="middle" className="fill-gray-400 font-mono font-bold text-[9px] tracking-widest">ESP32-S3</text>
              <rect x="360" y="115" width="100" height="18" rx="2" fill="#2d2d2d" stroke="#666" strokeWidth="0.5" />
              <text x="410" y="127" textAnchor="middle" className="fill-gold-light font-mono text-[7px] font-bold tracking-widest">WIFI-BLE EMBED</text>
              
              {[365, 377, 389, 401, 413, 425, 437, 449, 461].map((pos, idx) => (
                <g key={`pin-${idx}`}>
                  <circle cx={pos} cy="70" r="2" className="fill-gold-base stroke-white/50" />
                  <text x={pos} y="82" textAnchor="middle" className="fill-gray-500 font-mono text-[5px] select-none scale-[0.9]">
                    {['TX', 'SCL', 'SDA', 'D2', 'D1', '3V3', 'GND', 'RX', '5V'][idx]}
                  </text>
                </g>
              ))}

              <rect x="135" y="32" width="202" height="152" rx="4" fill="none" stroke="#ca8a04" strokeWidth="1.2" strokeOpacity="0.8" />
              <text x="236" y="26" textAnchor="middle" className="fill-yellow-500 font-mono text-[8px] font-bold tracking-[0.25em]">GPS COMPASS MODULE</text>
              <circle cx="145" cy="40" r="5" className="fill-none stroke-yellow-600 stroke-[1]" />
              <circle cx="327" cy="40" r="5" className="fill-none stroke-yellow-600 stroke-[1]" />
              <circle cx="145" cy="176" r="5" className="fill-none stroke-yellow-600 stroke-[1]" />
              <circle cx="327" cy="176" r="5" className="fill-none stroke-yellow-600 stroke-[1]" />

              <circle cx="55" cy="55" r="22" fill="none" stroke="#e0e0e0" strokeWidth="1" />
              <line x1="55" y1="40" x2="55" y2="70" stroke="#888" strokeWidth="0.5" />
              <text x="55" y="58" textAnchor="middle" className="fill-gray-400 font-mono text-[7px] font-bold">1MH COIL</text>

              <circle cx="55" cy="115" r="20" fill="none" stroke="#ca8a04" strokeWidth="1" />
              <text x="55" y="118" textAnchor="middle" className="fill-yellow-500 font-mono text-[6px] font-bold">220UF FLTR</text>

              <circle cx="52" cy="178" r="16" fill="none" stroke="#e0e0e0" strokeWidth="1" />
              <line x1="42" y1="178" x2="62" y2="178" stroke="#ca8a04" strokeWidth="1" />
              <text x="52" y="181" textAnchor="middle" className="fill-gray-400 font-mono text-[6.5px] font-bold">100UF</text>

              <rect x="290" y="195" width="85" height="60" rx="3" className="fill-red-700/80 stroke-red-500 stroke-[1]" />
              <text x="332.5" y="230" textAnchor="middle" className="fill-white font-mono font-bold text-[9px] tracking-wider">U4: STM32</text>
              {[198, 206, 214, 222, 230, 238, 246, 252].map((y, idx) => (
                <rect key={`ic-pin-${idx}`} x="284" y={y} width="6" height="3" className="fill-gray-400 stroke-white/40" />
              ))}

              <rect x="42" y="240" width="30" height="30" rx="2" fill="none" stroke="#e0e0e0" strokeWidth="0.8" />
              <circle cx="50" cy="255" r="1.5" className="fill-none stroke-yellow-500" />
              <circle cx="57" cy="255" r="1.5" className="fill-none stroke-yellow-500" />
              <circle cx="64" cy="255" r="1.5" className="fill-none stroke-yellow-500" />
              <text x="57" y="248" textAnchor="middle" className="fill-gray-500 font-mono text-[5px]">ARGB</text>

              <rect x="390" y="185" width="84" height="75" rx="3" fill="none" stroke="#ca8a04" strokeWidth="1" />
              <circle cx="410" cy="222" r="5" className="fill-none stroke-yellow-600" />
              <circle cx="452" cy="222" r="5" className="fill-none stroke-yellow-600" />
              <text x="432" y="198" textAnchor="middle" className="fill-yellow-500 font-mono text-[7px] font-bold">12V - 36V DC</text>

              <rect x="94" y="32" width="28" height="28" rx="2" fill="none" stroke="#999" />
              <circle cx="108" cy="46" r="6" className="fill-gray-700 stroke-gray-400" />
              <text x="108" y="26" textAnchor="middle" className="fill-gray-400 font-sans text-[6px] font-bold">RESET</text>

              <rect x="94" y="86" width="28" height="28" rx="2" fill="none" stroke="#999" />
              <circle cx="108" cy="100" r="6" className="fill-red-800 stroke-red-400" />
              <text x="108" y="80" textAnchor="middle" className="fill-red-400 font-sans text-[6px] font-bold uppercase tracking-wider">SOS</text>

              <g transform="translate(160, 115)" className="scale-[0.80]">
                <path d="M 40 2 L 65 17 Q 68 19, 62 35 L 50 30" fill="none" stroke="#ca8a04" strokeWidth="1.5" />
                <rect x="42" y="12" width="23" height="15" rx="1.5" fill="#ca8a04" fillOpacity="0.1" stroke="#ca8a04" strokeWidth="1" />
                <circle cx="50" cy="23" r="1.5" className="fill-yellow-500" />
                <circle cx="58" cy="23" r="1.5" className="fill-yellow-500" />

                <text x="52" y="39" textAnchor="middle" className="fill-white font-sans text-[10px] font-extrabold tracking-[0.25em]">GEOBUS</text>
                <text x="52" y="47" textAnchor="middle" className="fill-yellow-500 font-mono text-[5.5px] tracking-widest font-bold uppercase">TRACK • CONNECT • PROTECT</text>
              </g>

              <g transform="translate(195, 60)">
                <path d="M 12 10 L 22 25 L 32 10 Z" fill="#22c55e" fillOpacity="0.25" stroke="#22c55e" strokeWidth="1.2" />
                <path d="M 17 10 L 22 18 L 27 10 Z" fill="#15803d" fillOpacity="0.4" stroke="#22c55e" strokeWidth="0.8" />
                <text x="22" y="36" textAnchor="middle" className="fill-green-400/80 font-sans font-extrabold text-[12px] tracking-[0.22em]">AЯOJV</text>
                <text x="22" y="45" textAnchor="middle" className="fill-green-300/60 font-sans font-bold text-[7px] tracking-[0.16em]">YTILI8OM</text>
              </g>
            </g>
          )}

          <circle r="4" fill="#ffd700" className="blur-[1px] shadow-[0_0_10px_#ffd700] mix-blend-screen pointer-events-none">
            <animateMotion 
              dur="2.5s" 
              repeatCount="indefinite" 
              path="M 138 100 L 235 100 L 285 150 L 360 150" 
            />
          </circle>

          {isInside && !compact && (
            <g id="focus-scope" className="pointer-events-none">
              <line
                x1={coords.x * (500 / (containerRef.current?.getBoundingClientRect().width || 500))}
                y1="12"
                x2={coords.x * (500 / (containerRef.current?.getBoundingClientRect().width || 500))}
                y2="288"
                stroke="#ca8a04"
                strokeWidth="0.5"
                strokeDasharray="4 4"
                strokeOpacity="0.6"
              />
              <line
                x1="12"
                y1={coords.y * (300 / (containerRef.current?.getBoundingClientRect().height || 300))}
                x2="488"
                y2={coords.y * (300 / (containerRef.current?.getBoundingClientRect().height || 300))}
                stroke="#ca8a04"
                strokeWidth="0.5"
                strokeDasharray="4 4"
                strokeOpacity="0.6"
              />
              <circle
                cx={coords.x * (500 / (containerRef.current?.getBoundingClientRect().width || 500))}
                cy={coords.y * (300 / (containerRef.current?.getBoundingClientRect().height || 300))}
                r="7"
                fill="none"
                stroke="#ca8a04"
                strokeWidth="1"
                className="animate-ping"
              />
            </g>
          )}
        </svg>

        {isInside && (
          <div className="absolute bottom-3 left-3 bg-black/95 border border-white/10 px-3 py-1.5 rounded font-mono text-[8px] flex flex-col gap-0.5 tracking-wider pointer-events-none shadow-xl">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-yellow-400 animate-ping" />
              <span className="text-gray-400">PROBING WORKSPACE</span>
            </div>
            <div className="text-white">
              X: <span className="text-gold-light font-bold">{coords.px.toFixed(2)} mm</span> | Y: <span className="text-gold-light font-bold">{coords.py.toFixed(2)} mm</span>
            </div>
            {activeTraceNet && (
              <div className="text-[7.5px] uppercase text-green-400 font-bold border-t border-white/5 mt-1 pt-1 flex items-center gap-1.5">
                <Crosshair className="w-2.5 h-2.5 text-green-400 shrink-0" />
                NET: {activeTraceNet}
              </div>
            )}
          </div>
        )}

        {!compact && (
          <div className="absolute top-3 left-3 bg-[#0c0c0c]/90 border border-white/10 px-3 py-2 rounded pointer-events-none select-none max-w-[130px] shadow-lg">
            <span className="font-mono text-[7px] text-gray-400 block tracking-widest uppercase mb-1">SIGNAL SCOPE</span>
            
            <div className="h-6 flex items-end gap-[1px] bg-black/40 border border-white/5 rounded px-1.5 py-0.5 animate-pulse" style={{ animationDuration: '6s' }}>
              {signalPoints.map((pt, idx) => (
                <div
                  key={`signal-${idx}`}
                  className="w-[3px] bg-gold-base rounded-t-[1px]"
                  style={{ height: `${Math.max(10, Math.min(100, Math.floor(((pt + 16) / 32) * 100)))}%` }}
                />
              ))}
            </div>
            
            <span className="font-mono text-[6px] text-green-400 mt-1 block tracking-widest font-bold">● FREQ: 384 MHz</span>
          </div>
        )}
      </div>
    </div>
  );
}
