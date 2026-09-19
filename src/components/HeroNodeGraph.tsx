
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Cpu, 
  Sparkles, 
  Flame, 
  Compass, 
  ArrowRight,
  SlidersHorizontal,
  CirclePlay,
  RotateCw,
  Phone,
  Mail,
  Layers,
  Code2,
  Share2,
  BookmarkCheck,
  Terminal,
  Copy,
  FileCode,
  Check
} from 'lucide-react';
import { INITIAL_SATELLITES } from '../data';
import { SatelliteCard } from '../types';
import PcbDesignBoard from './PcbDesignBoard';
import WebDesignBoard from './WebDesignBoard';
import AppDesignBoard from './AppDesignBoard';
import IotDesignBoard from './IotDesignBoard';

const BLUEPRINT_SPECS: Record<string, { code: string, filename: string, language: string, specs: { label: string, value: string }[], bom: { part: string, qty: string, estPrice: string }[] }> = {
  'satellite-pcb': {
    filename: 'ESP32_GeoBus_v1.4_gerber.cad',
    language: 'Gerber / RS-274X',
    code: `G04 * GeoBus Embedded Controller Board Spec *
G04 * Created by DotByte Systems CAD Engine *
%FSLAX34Y34*%
%MOIN*%
%G54D11*%
G01*
X012500Y008200D02*
X012500Y051800D01*
X087500Y051800D01*
X087500Y008200D01*
X012500Y008200D01*
G04 * Drills & Trace Vias *
M30*`,
    specs: [
      { label: 'Layer Count', value: '2 Layers (Top & Bottom Copper)' },
      { label: 'Physical Dimensions', value: '100 mm x 60 mm' },
      { label: 'Active Trace Width', value: '0.254 mm (10 mil)' },
      { label: 'Solder Mask Finish', value: 'Matte Jet Black (Liquid Photoimageable)' },
      { label: 'Surface Plating', value: 'HASL Lead-Free (RoHS Compliant)' },
      { label: 'Drill Hole Precision', value: '±0.05 mm tolerance limit' }
    ],
    bom: [
      { part: 'ESP32-WROOM-32E (Integrated WiFi/BLE SOC)', qty: '1', estPrice: '₹180' },
      { part: 'AMS1117-3.3S (Linear Voltage Regulator)', qty: '1', estPrice: '₹25' },
      { part: 'CP2102-GMR (USB-to-UART Bridge Controller)', qty: '1', estPrice: '₹110' },
      { part: 'Passive SMD Resistors & Capacitors (0805 Pack)', qty: '18', estPrice: '₹35' },
      { part: 'External 2-Pin Screw Power Terminals', qty: '2', estPrice: '₹20' }
    ]
  },
  'satellite-iot': {
    filename: 'Esp32SensorMesh.ino',
    language: 'C++ / ESP32 Arduino Core',
    code: `#include <WiFi.h>
#include <DHT.h>
#include <PubSubClient.h> // MQTT client

#define DHTPIN 4
#define DHTTYPE DHT22
#define STATUS_LED 2

DHT dht(DHTPIN, DHTTYPE);
WiFiClient espClient;
PubSubClient client(espClient);

void setup_wifi() {
  Serial.print("Connecting to Local Mesh...");
  WiFi.begin("DOT_LAN", "sec_net_2026");
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("\\nWiFi Secured Connected!");
}

void setup() {
  Serial.begin(115200);
  pinMode(STATUS_LED, OUTPUT);
  dht.begin();
  setup_wifi();
}

void loop() {
  float temp = dht.readTemperature();
  float hum = dht.readHumidity();
  
  if (isnan(temp) || isnan(hum)) {
    Serial.println("DHT Sensor Read Fault!");
    return;
  }
  
  Serial.printf("Temp: %.1f°C | Hum: %.1f%%\\n", temp, hum);
  
  // Flash status indicator
  digitalWrite(STATUS_LED, HIGH);
  delay(100);
  digitalWrite(STATUS_LED, LOW);
  
  delay(2000); // 2 second frequency telemetry
}`,
    specs: [
      { label: 'Microcontroller Core', value: 'Tensilica 32-bit Xtensa Dual-Core' },
      { label: 'Wireless Protocol', value: 'IEEE 802.11 b/g/n & BLE 4.2' },
      { label: 'Sensor Interface', value: 'Single-wire DHT Sensor Protocol' },
      { label: 'Bus Speeds', value: '400KHz I2C High Speed Bus' },
      { label: 'Deep Sleep Mode', value: '15 µA ultra-low power retention' }
    ],
    bom: [
      { part: 'ESP32 NodeMCU Dev Board (Pre-soldered)', qty: '1', estPrice: '₹280' },
      { part: 'DHT22 AM2302 Precision Air Sensor', qty: '1', estPrice: '₹140' },
      { part: 'Active Piezo Alarm Piezo-Buzzer', qty: '2', estPrice: '₹30' },
      { part: 'Mini-Breadboard Solid Prototype Platform400', qty: '1', estPrice: '₹45' },
      { part: 'Dual-Color SMD Status LED Panel', qty: '2', estPrice: '₹10' }
    ]
  },
  'satellite-web': {
    filename: 'CyberpunkGridSection.tsx',
    language: 'TypeScript / React / Tailwind',
    code: `import React, { useState } from 'react';
import { motion } from 'framer-motion';

export default function TechGridWidget() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const items = [
    { title: 'Neural Compute Core', val: '99.8% Speed' },
    { title: 'Gerber Auto-Route', val: '12-Layer Spec' },
    { title: 'Telemetry Bridge', val: 'MQTT Direct' }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-black/60 p-6 border border-white/10 rounded-2xl">
      {items.map((item, idx) => (
        <motion.div
          key={item.title}
          onMouseEnter={() => setHoveredIndex(idx)}
          onMouseLeave={() => setHoveredIndex(null)}
          className="relative p-5 bg-white/[0.02] hover:bg-[#a78b71]/10 rounded-xl border border-white/5 transition-colors duration-300 pointer-events-auto"
        >
          <div className="text-gold-light font-mono text-[9px] tracking-widest uppercase">NODE_SYS_0\${idx+1}</div>
          <h4 className="text-white font-sans text-xs font-bold mt-2 uppercase">{item.title}</h4>
          <span className="text-gray-400 font-mono text-[10px] mt-1 block">{item.val}</span>
        </motion.div>
      ))}
    </div>
  );
}`,
    specs: [
      { label: 'UI Framework', value: 'React 18 with Vite Bundler' },
      { label: 'Styling Engine', value: 'Tailwind CSS utility matrix structure' },
      { label: 'Animation Suite', value: 'Framer Motion Hardware-Accelerated transitions' },
      { label: 'Responsive Viewports', value: 'Fluid flex layouts down to 320px width' },
      { label: 'SEO Lighthouse Score', value: 'Lighthouse perfect 100 on performance & accessibility' }
    ],
    bom: [
      { part: 'Custom Frontend React Development', qty: '1 System', estPrice: 'Included' },
      { part: 'Clean Asset / Royalty-Free Media Compilation', qty: '1 Collection', estPrice: 'Included' },
      { part: 'Responsive UI Design & Testing Framework', qty: '1 Portfolio', estPrice: 'Included' },
      { part: 'Technical SEO Optimization Meta Stack', qty: '1 Protocol', estPrice: 'Included' }
    ]
  },
  'satellite-app': {
    filename: 'dashboardStateModel.json',
    language: 'JSON / Application Schema',
    code: `{
  "systemConfig": {
    "appName": "GeoPulse App Companion",
    "version": "1.2.0-RoHS",
    "themePreset": "Neo-MorphicGold",
    "networkInterface": "HTTP2_SSLPro"
  },
  "sensorNodes": [
    { "nodeId": "ESP32_CORE_01", "registerAddress": "0x2F", "active": true, "telemetryFrequencyMs": 500 },
    { "nodeId": "ESP32_HUMID_02", "registerAddress": "0x3A", "active": true, "telemetryFrequencyMs": 1000 }
  ],
  "localStoreDefaults": {
    "offlineRetentionPeriodHours": 72,
    "maxDatabaseMemoryRetentionMb": 32,
    "lowLatencySyncAllowedOverCellular": true
  }
}`,
    specs: [
      { label: 'App Framework', value: 'React Native v0.72 Hybrid Pipeline' },
      { label: 'State Database', value: 'WatermelonDB / Local SQLite persistent memory' },
      { label: 'Bluetooth Protocol', value: 'BLE 5.0 Custom Attribute GATT Profiles' },
      { label: 'API Integrations', value: 'Standard TLS Secured REST APIs with compression' },
      { label: 'Package Weight', value: 'Minified Android Bundle size 11.2 MB' }
    ],
    bom: [
      { part: 'Cross-Platform React Native App Source Code', qty: '1 Suite', estPrice: 'Included' },
      { part: 'GATT Profile custom firmware BLE bridge specs', qty: '1 Scheme', estPrice: 'Included' },
      { part: 'Local SQLite Local State Cache System', qty: '1 System', estPrice: 'Included' },
      { part: 'Google Play & Apple Appstore deployment guides', qty: '1 Guide', estPrice: 'Included' }
    ]
  }
};

interface HeroNodeGraphProps {
  onStartTrial: () => void;
  onSynthesize: (params: any) => void;
}

export default function HeroNodeGraph({ onStartTrial, onSynthesize }: HeroNodeGraphProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const containerRef = useRef<HTMLDivElement>(null);
  const centerRef = useRef<HTMLDivElement>(null);
  const pcbRef = useRef<HTMLDivElement>(null);
  const webRef = useRef<HTMLDivElement>(null);
  const appRef = useRef<HTMLDivElement>(null);
  const iotRef = useRef<HTMLDivElement>(null);

  const [lineCoords, setLineCoords] = useState({
    center: { x: 500, y: 310 },
    pcb: { x: 140, y: 100 },
    web: { x: 860, y: 100 },
    app: { x: 160, y: 520 },
    iot: { x: 840, y: 520 }
  });

  const updateCoords = () => {
    if (!containerRef.current) return;
    const containerRect = containerRef.current.getBoundingClientRect();

    const getCenterOfRef = (elRef: React.RefObject<HTMLDivElement | null>) => {
      if (!elRef.current) return { x: 0, y: 0 };
      const rect = elRef.current.getBoundingClientRect();
      return {
        x: rect.left - containerRect.left + rect.width / 2,
        y: rect.top - containerRect.top + rect.height / 2
      };
    };

    setLineCoords({
      center: getCenterOfRef(centerRef),
      pcb: getCenterOfRef(pcbRef),
      web: getCenterOfRef(webRef),
      app: getCenterOfRef(appRef),
      iot: getCenterOfRef(iotRef)
    });
  };

  useEffect(() => {
    updateCoords();
    const timer = setTimeout(updateCoords, 100);

    if (typeof ResizeObserver !== 'undefined' && containerRef.current) {
      const observer = new ResizeObserver(() => {
        updateCoords();
      });
      observer.observe(containerRef.current);
      return () => {
        observer.disconnect();
        clearTimeout(timer);
      };
    } else {
      window.addEventListener('resize', updateCoords);
      return () => {
        window.removeEventListener('resize', updateCoords);
        clearTimeout(timer);
      };
    }
  }, []);

  const getPathD = (card: { x: number, y: number }) => {
    const cpX = (lineCoords.center.x + card.x) / 2;
    return `M ${lineCoords.center.x} ${lineCoords.center.y} C ${cpX} ${lineCoords.center.y}, ${cpX} ${card.y}, ${card.x} ${card.y}`;
  };

  const [scopeType, setScopeType] = useState<'iot' | 'web' | 'app' | 'pcb'>('web');
  const [deliverySpeed, setDeliverySpeed] = useState(1.5);

  const [isSimulating, setIsSimulating] = useState(false);
  const [simulationStep, setSimulationStep] = useState<string>('');
  const [satellites, setSatellites] = useState<SatelliteCard[]>(INITIAL_SATELLITES);
  const [selectedSatelliteId, setSelectedSatelliteId] = useState<string | null>(null);
  const [modalTab, setModalTab] = useState<'emu' | 'spec'>('emu');
  const [copied, setCopied] = useState<boolean>(false);

  const [activeLineGlow, setActiveLineGlow] = useState(false);

  useEffect(() => {
    if (!selectedSatelliteId) {
      setModalTab('emu');
      setCopied(false);
    }
  }, [selectedSatelliteId]);

  const handleCopyCode = (text: string) => {
    try {
      navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy to clipboard', err);
    }
  };

  const calculateEstimate = () => {
    let basePrice = 399;
    if (scopeType === 'iot') {
      basePrice = 399; // Starter Plan base
    } else if (scopeType === 'web') {
      basePrice = 1299; // Professional base
    } else if (scopeType === 'app') {
      basePrice = 1699; // Advanced base
    } else if (scopeType === 'pcb') {
      basePrice = 499; // PCB base
    }

    const deliveryMultiplier = deliverySpeed >= 1.8 ? 1.2 : 1.0;
    
    const estimate = Math.floor(basePrice * deliveryMultiplier);
    return `₹${estimate}+`;
  };

  const handleSimulateClick = () => {
    if (isSimulating) return;
    setIsSimulating(true);
    setActiveLineGlow(true);

    const steps = [
      { text: 'Checking circuit schematic integrity...', delay: 400 },
      { text: 'Compiling embedded C++ routines...', delay: 900 },
      { text: 'Generating high-contrast Gerber files...', delay: 1400 },
      { text: 'Optimizing web responsive bundle size...', delay: 1900 },
    ];

    steps.forEach((step, idx) => {
      setTimeout(() => {
        setSimulationStep(step.text);
        if (idx === steps.length - 1) {
          setTimeout(() => {
            setIsSimulating(false);
            setSimulationStep('');
            setActiveLineGlow(false);
            
            setSatellites(prev => prev.map(sat => ({
              ...sat,
              metric: sat.id === 'satellite-pcb' ? `${(2 + Math.random() * 2).toFixed(0)} Layers Verified` :
                      sat.id === 'satellite-web' ? `${(98 + Math.random() * 2).toFixed(1)}% Speed Rank` :
                      sat.id === 'satellite-app' ? `APK Bundle Built` :
                      `ESP32 OTA Calibrated`
            })));
          }, 600);
        }
      }, step.delay);
    });
  };

  const handleQuickScroll = (elementId: string) => {
    const element = document.getElementById(elementId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      id="engine" 
      className="relative w-full py-16 lg:py-24 flex flex-col items-center select-none overflow-hidden"
    >
      
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-gold-base/5 blur-[140px] pointer-events-none z-0" />
      
      <div className="w-full max-w-7xl mx-auto px-6 lg:px-12 text-center mb-12 relative z-10">
        
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 border border-gold-base/20 rounded-full bg-gold-base/5 mb-6 shadow-[0_0_20px_rgba(167,139,113,0.08)]"
        >
          <span className="w-2 h-2 rounded-full bg-gold-base animate-pulse" />
          <span className="text-[10px] font-sans font-bold uppercase tracking-[0.25em] text-gold-light">
            PREMIUM TECH SOLUTIONS FOR EVERYONE // ONLINE
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.4, 0, 0.2, 1], delay: 0.1 }}
          className="font-sans font-extrabold text-white leading-none tracking-tight mb-4"
          style={{ fontSize: 'clamp(2.5rem, 8vw, 6.5rem)' }}
        >
          DotByte Systems <span className="sr-only">— IoT, Electronics & Technology Projects</span>
        </motion.h2>

        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-serif italic text-gold-base font-normal mb-6"
          style={{ fontSize: 'clamp(1.5rem, 4vw, 2.75rem)' }}
        >
          Affordable Tech Solutions
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.35 }}
          className="max-w-3xl mx-auto font-mono text-[10px] md:text-xs text-gray-400 uppercase tracking-[0.18em] leading-relaxed mb-10"
        >
          <span className="text-gold-light hover:text-white transition-colors cursor-default">PCB Designing</span> 
          <span className="mx-2.5 opacity-30 text-gold-base">|</span> 
          <span className="text-gold-light hover:text-white transition-colors cursor-default">Premium Websites</span> 
          <span className="mx-2.5 opacity-30 text-gold-base">|</span> 
          <span className="text-gold-light hover:text-white transition-colors cursor-default">App Development</span> 
          <span className="mx-2.5 opacity-30 text-gold-base">|</span> 
          <span className="text-gold-light hover:text-white transition-colors cursor-default">IoT Coding</span>
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
        >
          <button
            onClick={() => handleQuickScroll('pricing')}
            className="w-full sm:w-auto px-8 py-4 bg-white text-black hover:bg-gold-hover hover:shadow-[0_0_30px_rgba(167,139,113,0.35)] font-sans text-xs font-bold uppercase tracking-widest rounded-md transition-all duration-300 transform active:scale-95"
            id="btn_get_started"
          >
            Get Started
          </button>
          <button
            onClick={() => handleQuickScroll('contact')}
            className="w-full sm:w-auto px-8 py-4 border border-white/10 hover:border-gold-base/50 bg-white/2 hover:bg-white/5 font-sans text-xs font-bold uppercase tracking-widest rounded-md text-gray-300 hover:text-white transition-all duration-300 text-center"
            id="btn_contact_us"
          >
            Contact Us
          </button>
        </motion.div>
      </div>

      <div className="w-full max-w-4xl mx-auto px-6 mb-16 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="glass-panel p-8 md:p-10 rounded-2xl border border-white/10 relative overflow-hidden bg-white/[0.02] shadow-[0_0_50px_rgba(0,0,0,0.5)] text-center group"
          id="about_card"
        >
          <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-gold-base/10 to-transparent pointer-events-none rounded-tl-2xl" />
          <p className="font-serif italic text-gold-base text-lg md:text-xl leading-relaxed mb-4 max-w-3xl mx-auto">
            "DotByte Systems provides affordable technology solutions for students and businesses.
            We specialize in digital development and electronics project solutions."
          </p>
          <div className="flex items-center justify-center gap-3 mt-4">
            <span className="h-px w-8 bg-white/10" />
            <span className="font-mono text-[9px] uppercase tracking-widest text-gray-500">
              OUR MISSION & TECHNICAL PHILOSOPHY
            </span>
            <span className="h-px w-8 bg-white/10" />
          </div>
        </motion.div>
      </div>

      <div className="w-full max-w-7xl mx-auto px-6 lg:px-12 relative z-10 hidden lg:block">
        <div ref={containerRef} className="w-full h-[620px] relative border border-white/5 rounded-[32px] bg-black/40 backdrop-blur-3xl overflow-hidden shadow-2xl">
          
          <div className="absolute inset-0 bg-dots pointer-events-none" />

          <svg className="absolute inset-0 w-full h-full pointer-events-none z-10">
            <defs>
              <linearGradient id="glow-grad-1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#c9b8a0" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#a78b71" stopOpacity="0.2" />
              </linearGradient>
              <linearGradient id="glow-grad-2" x1="100%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#c9b8a0" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#a78b71" stopOpacity="0.2" />
              </linearGradient>
              <linearGradient id="active-gold-grad-1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ffd700" stopOpacity="1" />
                <stop offset="50%" stopColor="#f59e0b" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#a78b71" stopOpacity="0.4" />
              </linearGradient>
              <linearGradient id="active-gold-grad-2" x1="100%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#ffd700" stopOpacity="1" />
                <stop offset="50%" stopColor="#f59e0b" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#a78b71" stopOpacity="0.4" />
              </linearGradient>
            </defs>

            <path
              d={getPathD(lineCoords.pcb)}
              fill="none"
              stroke={scopeType === 'pcb' ? 'url(#active-gold-grad-1)' : 'url(#glow-grad-1)'}
              className="node-line transition-all duration-500"
              style={{ 
                strokeWidth: scopeType === 'pcb' ? '3' : '2', 
                opacity: scopeType === 'pcb' ? 1.0 : activeLineGlow ? 0.9 : 0.35 
              }}
            />
            <path
              d={getPathD(lineCoords.pcb)}
              fill="none"
              stroke={scopeType === 'pcb' ? '#ffd700' : '#a78b71'}
              strokeWidth={scopeType === 'pcb' ? '2.5' : '1.5'}
              strokeDasharray={scopeType === 'pcb' ? '12 8' : '6 18'}
              className="animate-dash"
              style={{ 
                opacity: scopeType === 'pcb' ? 1.0 : activeLineGlow ? 1 : 0.45,
                animationDuration: scopeType === 'pcb' ? '1.2s' : '3s'
              }}
            />
            {(scopeType === 'pcb' || isSimulating) && (
              <circle key={`pcb-particle-${lineCoords.pcb.x}-${lineCoords.pcb.y}`} r="4.5" fill="#ffffff" className="blur-[0.5px]">
                <animateMotion 
                  dur={isSimulating ? "1s" : "2s"} 
                  repeatCount="indefinite" 
                  path={getPathD(lineCoords.pcb)} 
                />
              </circle>
            )}

            <path
              d={getPathD(lineCoords.web)}
              fill="none"
              stroke={scopeType === 'web' ? 'url(#active-gold-grad-2)' : 'url(#glow-grad-2)'}
              className="node-line transition-all duration-500"
              style={{ 
                strokeWidth: scopeType === 'web' ? '3' : '2', 
                opacity: scopeType === 'web' ? 1.0 : activeLineGlow ? 0.9 : 0.35 
              }}
            />
            <path
              d={getPathD(lineCoords.web)}
              fill="none"
              stroke={scopeType === 'web' ? '#ffd700' : '#a78b71'}
              strokeWidth={scopeType === 'web' ? '2.5' : '1.5'}
              strokeDasharray={scopeType === 'web' ? '12 8' : '6 18'}
              className="animate-dash"
              style={{ 
                opacity: scopeType === 'web' ? 1.0 : activeLineGlow ? 1 : 0.45,
                animationDuration: scopeType === 'web' ? '1.2s' : '3s'
              }}
            />
            {(scopeType === 'web' || isSimulating) && (
              <circle key={`web-particle-${lineCoords.web.x}-${lineCoords.web.y}`} r="4.5" fill="#ffffff" className="blur-[0.5px]">
                <animateMotion 
                  dur={isSimulating ? "1s" : "2s"} 
                  repeatCount="indefinite" 
                  path={getPathD(lineCoords.web)} 
                />
              </circle>
            )}

            <path
              d={getPathD(lineCoords.app)}
              fill="none"
              stroke={scopeType === 'app' ? 'url(#active-gold-grad-1)' : 'url(#glow-grad-1)'}
              className="node-line transition-all duration-500"
              style={{ 
                strokeWidth: scopeType === 'app' ? '3' : '2', 
                opacity: scopeType === 'app' ? 1.0 : activeLineGlow ? 0.9 : 0.35 
              }}
            />
            <path
              d={getPathD(lineCoords.app)}
              fill="none"
              stroke={scopeType === 'app' ? '#ffd700' : '#a78b71'}
              strokeWidth={scopeType === 'app' ? '2.5' : '1.5'}
              strokeDasharray={scopeType === 'app' ? '12 8' : '6 18'}
              className="animate-dash"
              style={{ 
                opacity: scopeType === 'app' ? 1.0 : activeLineGlow ? 1 : 0.45,
                animationDuration: scopeType === 'app' ? '1.2s' : '3s'
              }}
            />
            {(scopeType === 'app' || isSimulating) && (
              <circle key={`app-particle-${lineCoords.app.x}-${lineCoords.app.y}`} r="4.5" fill="#ffffff" className="blur-[0.5px]">
                <animateMotion 
                  dur={isSimulating ? "1s" : "2s"} 
                  repeatCount="indefinite" 
                  path={getPathD(lineCoords.app)} 
                />
              </circle>
            )}

            <path
              d={getPathD(lineCoords.iot)}
              fill="none"
              stroke={scopeType === 'iot' ? 'url(#active-gold-grad-2)' : 'url(#glow-grad-2)'}
              className="node-line transition-all duration-500"
              style={{ 
                strokeWidth: scopeType === 'iot' ? '3' : '2', 
                opacity: scopeType === 'iot' ? 1.0 : activeLineGlow ? 0.9 : 0.35 
              }}
            />
            <path
              d={getPathD(lineCoords.iot)}
              fill="none"
              stroke={scopeType === 'iot' ? '#ffd700' : '#a78b71'}
              strokeWidth={scopeType === 'iot' ? '2.5' : '1.5'}
              strokeDasharray={scopeType === 'iot' ? '12 8' : '6 18'}
              className="animate-dash"
              style={{ 
                opacity: scopeType === 'iot' ? 1.0 : activeLineGlow ? 1 : 0.45,
                animationDuration: scopeType === 'iot' ? '1.2s' : '3s'
              }}
            />
            {(scopeType === 'iot' || isSimulating) && (
              <circle key={`iot-particle-${lineCoords.iot.x}-${lineCoords.iot.y}`} r="4.5" fill="#ffffff" className="blur-[0.5px]">
                <animateMotion 
                  dur={isSimulating ? "1s" : "2s"} 
                  repeatCount="indefinite" 
                  path={getPathD(lineCoords.iot)} 
                />
              </circle>
            )}
          </svg>

          <div ref={centerRef} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[420px] aspect-[16/10.5] z-20 flex flex-col bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-2xl p-5 shadow-2xl hover:border-gold-base/50 transition-all duration-700 group/core" id="pricing_simulator_desktop">
            <div className="absolute inset-0 bg-gradient-to-br from-gold-base/5 via-transparent to-transparent rounded-2xl pointer-events-none" />
            
            <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-gold-base/10 to-gold-light/10 opacity-0 group-hover/core:opacity-100 blur transition-all duration-700 pointer-events-none" />

            <div className="flex items-center justify-between mb-4 relative z-10">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded bg-gold-base/10 border border-gold-base/30 flex items-center justify-center">
                  <Cpu className="w-4 h-4 text-gold-light" />
                </div>
                <div>
                  <h4 className="font-sans text-xs font-bold uppercase tracking-widest text-white">DOT Estimator</h4>
                  <p className="font-mono text-[9px] text-gold-base">STUDENT FRIENDLY COST INDEX</p>
                </div>
              </div>
              <div className="text-right">
                <span className="font-mono text-[8.5px] uppercase tracking-wider text-green-400 bg-green-950/45 px-2 py-0.5 rounded border border-green-500/20">
                  REALTIME INDEX
                </span>
              </div>
            </div>

            <div className="grid grid-cols-4 gap-1 bg-black/40 p-0.5 rounded-lg border border-white/5 mb-4 relative z-10">
              {([
                { key: 'iot', label: 'IoT' },
                { key: 'web', label: 'Web' },
                { key: 'app', label: 'App' },
                { key: 'pcb', label: 'PCB' }
              ] as const).map((item) => (
                <button
                  key={item.key}
                  onClick={() => setScopeType(item.key)}
                  className={`py-1 rounded text-center font-sans font-bold text-[9px] uppercase tracking-wider transition-all duration-300 ${
                    scopeType === item.key
                      ? 'bg-gold-base text-black shadow-lg'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            <div className="space-y-4 flex-1 relative z-10 mb-3">
              <div>
                <div className="flex justify-between font-mono text-[9.5px] text-gray-400 mb-1">
                  <span className="flex items-center gap-1">
                    <Flame className="w-3 h-3 text-gold-base" /> DELIVERY EXPEDITE
                  </span>
                  <span className="text-white font-bold">
                    {deliverySpeed >= 1.8 ? 'Express Delivery (24h)' : 'Regular (3-5 Days)'}
                  </span>
                </div>
                <input
                  type="range"
                  min="1.0"
                  max="2.0"
                  step="0.2"
                  value={deliverySpeed}
                  onChange={(e) => setDeliverySpeed(parseFloat(e.target.value))}
                  className="w-full accent-gold-base bg-white/5 rounded-lg h-1 appearance-none cursor-ew-resize"
                />
              </div>

              <div className="mt-3.5 bg-black/35 rounded-lg p-2 px-3 border border-white/5 flex items-center justify-between">
                <div>
                  <span className="font-mono text-[8.5px] text-gray-500 uppercase block">Affordable Estimate</span>
                  <span className="font-sans text-lg font-bold text-white tracking-tight">{calculateEstimate()}</span>
                </div>
                <div className="text-right">
                  <span className="font-mono text-[8.5px] text-gold-base block uppercase">Deliverables included</span>
                  <span className="text-[10px] text-gray-400 font-sans font-medium">Source Codes + Guides</span>
                </div>
              </div>
            </div>

            <button
              onClick={handleSimulateClick}
              disabled={isSimulating}
              className={`w-full py-2.5 rounded-lg transition-all duration-300 font-sans text-[10px] font-bold uppercase tracking-widest relative overflow-hidden flex items-center justify-center gap-2 ${
                isSimulating
                  ? 'bg-gold-base/15 text-gold-light border border-gold-base/30 cursor-wait'
                  : 'bg-gradient-to-r from-gold-base to-gold-light text-black hover:brightness-110 active:scale-95 cursor-pointer shadow-lg shadow-gold-base/15'
              }`}
              id="simulate_pipeline_button"
            >
              <AnimatePresence mode="wait">
                {isSimulating ? (
                  <motion.div
                    key="syncing"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center gap-2"
                  >
                    <RotateCw className="w-3.5 h-3.5 animate-spin" />
                    <span>{simulationStep || 'Compiling blueprints...'}</span>
                  </motion.div>
                ) : (
                  <motion.div
                    key="ready"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center gap-2"
                  >
                    <CirclePlay className="w-3.5 h-3.5" />
                    <span>Run Verification Simulation</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          </div>


          <div
            ref={pcbRef}
            className="absolute z-20 cursor-pointer"
            style={{ left: '40px', top: '25px', width: '230px' }}
            onClick={() => setSelectedSatelliteId(satellites[0].id)}
            id="floating_card_pcb"
          >
            <SatelliteMediaCard card={satellites[0]} />
          </div>

          <div
            ref={webRef}
            className="absolute z-20 cursor-pointer"
            style={{ right: '40px', top: '25px', width: '230px' }}
            onClick={() => setSelectedSatelliteId(satellites[1].id)}
            id="floating_card_web"
          >
            <SatelliteMediaCard card={satellites[1]} />
          </div>

          <div
            ref={appRef}
            className="absolute z-20 cursor-pointer"
            style={{ left: '60px', bottom: '25px', width: '230px' }}
            onClick={() => setSelectedSatelliteId(satellites[2].id)}
            id="floating_card_app"
          >
            <SatelliteMediaCard card={satellites[2]} />
          </div>

          <div
            ref={iotRef}
            className="absolute z-20 cursor-pointer"
            style={{ right: '60px', bottom: '25px', width: '230px' }}
            onClick={() => setSelectedSatelliteId(satellites[3].id)}
            id="floating_card_iot"
          >
            <SatelliteMediaCard card={satellites[3]} />
          </div>
        </div>
      </div>

      <div className="w-full max-w-lg mx-auto px-6 lg:hidden flex flex-col gap-6 relative z-10" id="pricing_simulator_mobile">
        <div className="w-full bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-2xl p-5 shadow-xl">
          <div className="flex items-center gap-2 mb-4">
            <div className="p-2 rounded bg-gold-base/10 border border-gold-base/20">
              <Cpu className="w-4 h-4 text-gold-light" />
            </div>
            <div>
              <h4 className="font-sans text-sm font-bold uppercase tracking-widest text-white">DOT Estimator</h4>
              <p className="font-mono text-[9px] text-gold-base">PORTABLE SYSTEM CONTROLS</p>
            </div>
          </div>

          <div className="grid grid-cols-4 gap-1 bg-black/40 p-0.5 rounded-lg border border-white/5 mb-5">
            {([
              { key: 'iot', label: 'IoT' },
              { key: 'web', label: 'Web' },
              { key: 'app', label: 'App' },
              { key: 'pcb', label: 'PCB' }
            ] as const).map((item) => (
              <button
                key={item.key}
                onClick={() => setScopeType(item.key)}
                className={`py-1.5 rounded text-center font-sans font-bold text-[10px] uppercase tracking-wider transition-colors ${
                  scopeType === item.key
                    ? 'bg-gold-base text-black font-extrabold'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="space-y-4 mb-5">
            <div>
              <div className="flex justify-between font-mono text-[10px] text-gray-400 mb-1">
                <span>DELIVERY EXPEDITE</span>
                <span className="text-white font-bold">
                  {deliverySpeed >= 1.8 ? 'Express (24h)' : 'Regular (3-5 Days)'}
                </span>
              </div>
              <div className="py-2">
                <input
                  type="range"
                  min="1.0"
                  max="2.0"
                  step="0.2"
                  value={deliverySpeed}
                  onChange={(e) => setDeliverySpeed(parseFloat(e.target.value))}
                  className="w-full accent-gold-base bg-white/5 rounded-lg h-1.5 cursor-pointer"
                />
              </div>
            </div>

            <div className="mt-3 bg-black/45 rounded-lg p-3 border border-white/5 flex items-center justify-between">
              <div>
                <span className="font-mono text-[8px] text-gray-500 uppercase block">Affordable Cost Range</span>
                <span className="font-sans text-base font-bold text-white tracking-tight">{calculateEstimate()}</span>
              </div>
              <div className="text-right">
                <span className="font-mono text-[8px] text-gold-base block uppercase">Deliverables</span>
                <span className="text-[9.5px] text-gray-400">Codes + Guides</span>
              </div>
            </div>
          </div>

          <button
            onClick={handleSimulateClick}
            disabled={isSimulating}
            className={`w-full py-3 rounded-xl transition-all duration-300 font-sans text-[11px] font-bold uppercase tracking-widest flex items-center justify-center gap-2 ${
              isSimulating
                ? 'bg-gold-base/10 text-gold-light border border-gold-base/20'
                : 'bg-white text-black hover:bg-gold-hover shadow-lg'
            }`}
          >
            {isSimulating ? (
              <>
                <RotateCw className="w-4 h-4 animate-spin text-gold-base" />
                <span>{simulationStep || 'SENSING COMPONENT CHANNELS...'}</span>
              </>
            ) : (
              <>
                <CirclePlay className="w-4 h-4" />
                <span>VERIFY PLATFORM</span>
              </>
            )}
          </button>
        </div>

        <div className="mt-4">
          <p className="font-mono text-[9.5px] uppercase tracking-[0.15em] text-gold-base/80 mb-3.5 text-center">
            ✦ Tap a card below to view schematic & design blueprints ✦
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {satellites.map((card) => (
              <div key={card.id} onClick={() => setSelectedSatelliteId(card.id)} className="cursor-pointer">
                <SatelliteMediaCard card={card} />
              </div>
            ))}
          </div>
        </div>
      </div>

      <AnimatePresence>
        {selectedSatelliteId && (() => {
          const card = satellites.find(s => s.id === selectedSatelliteId);
          if (!card) return null;
          return (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/85 backdrop-blur-md"
              onClick={() => setSelectedSatelliteId(null)}
              id="satellite_lightbox_overlay"
            >
              <motion.div
                initial={{ scale: 0.95, y: 15 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.95, y: 15 }}
                className="w-full max-w-xl bg-[#0d0d0d] border border-white/10 rounded-2xl p-6 relative overflow-hidden shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-gold-base/5 blur-[80px] pointer-events-none" />

                <div className="flex justify-between items-start mb-4">
                  <div>
                    <span className="font-mono text-[9px] uppercase tracking-widest text-gold-base px-2.5 py-0.5 border border-gold-base/30 bg-gold-base/5 rounded">
                      {card.category}
                    </span>
                    <h3 className="font-sans font-extrabold text-2xl text-white mt-2">{card.title}</h3>
                    <p className="font-mono text-xs text-gray-400 mt-1">{card.subtitle}</p>
                  </div>
                  <button
                    onClick={() => setSelectedSatelliteId(null)}
                    className="p-1 px-3 border border-white/10 rounded-full hover:border-white/20 text-gray-400 hover:text-white transition-colors text-xs"
                    id="close_lightbox_button"
                  >
                    ✕
                  </button>
                </div>

                <div className="flex border-b border-white/10 mb-4 text-xs">
                  <button
                    onClick={() => setModalTab('emu')}
                    className={`pb-2.5 px-3 font-sans font-bold uppercase tracking-wider transition-colors border-b-2 flex items-center gap-1.5 cursor-pointer ${
                      modalTab === 'emu'
                        ? 'border-gold-base text-gold-light'
                        : 'border-transparent text-gray-400 hover:text-white'
                    }`}
                  >
                    <Cpu className="w-3.5 h-3.5" />
                    Interactive Sandbox
                  </button>
                  <button
                    onClick={() => {
                      setModalTab('spec');
                      setCopied(false);
                    }}
                    className={`pb-2.5 px-3 font-sans font-bold uppercase tracking-wider transition-colors border-b-2 flex items-center gap-1.5 cursor-pointer ${
                      modalTab === 'spec'
                        ? 'border-gold-base text-gold-light'
                        : 'border-transparent text-gray-400 hover:text-white'
                    }`}
                  >
                    <Terminal className="w-3.5 h-3.5" />
                    BOM & Technical Specs
                  </button>
                </div>

                {modalTab === 'emu' ? (
                  <div className="aspect-[16/10] w-full rounded-xl overflow-hidden mb-4 border border-white/5 bg-[#070707] flex flex-col justify-center items-center">
                    {card.id === 'satellite-pcb' ? (
                      <PcbDesignBoard compact={false} />
                    ) : card.id === 'satellite-web' ? (
                      <WebDesignBoard compact={false} />
                    ) : card.id === 'satellite-app' ? (
                      <AppDesignBoard compact={false} />
                    ) : card.id === 'satellite-iot' ? (
                      <IotDesignBoard compact={false} />
                    ) : (
                      <img
                        src={card.imageUrl}
                        alt={`DotByte Systems - ${card.title} - ${card.category}`}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover"
                      />
                    )}
                  </div>
                ) : (
                  <div className="w-full h-[320px] mb-4 overflow-y-auto scrollbar-all pr-1 flex flex-col gap-4 text-left">
                    {(() => {
                      const specDetails = BLUEPRINT_SPECS[card.id];
                      if (!specDetails) return <p className="text-xs text-gray-500">No blueprint specifications mapped.</p>;
                      return (
                        <>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="bg-[#090909] border border-white/5 rounded-xl p-3.5">
                              <h4 className="font-mono text-[9px] uppercase tracking-wider text-gold-base mb-2">✦ Realtime Spec Standards</h4>
                              <div className="space-y-2">
                                {specDetails.specs.map((item, idx) => (
                                  <div key={idx} className="flex justify-between items-center text-[10px] border-b border-white/[0.03] pb-1.5 last:border-0 last:pb-0">
                                    <span className="text-gray-400 font-sans">{item.label}</span>
                                    <span className="text-white font-mono font-medium text-right ml-2">{item.value}</span>
                                  </div>
                                ))}
                              </div>
                            </div>

                            <div className="bg-[#090909] border border-white/5 rounded-xl p-3.5">
                              <h4 className="font-mono text-[9px] uppercase tracking-wider text-gold-base mb-2">✦ Consumable BOM Details</h4>
                              <div className="space-y-1.5 max-h-[145px] overflow-y-auto scrollbar-all pr-1">
                                {specDetails.bom.map((item, idx) => (
                                  <div key={idx} className="text-[10px] bg-white/[0.01] border border-white/5 hover:bg-white/[0.03] p-1.5 rounded flex justify-between items-center">
                                    <span className="text-gray-300 truncate max-w-[140px] font-sans" title={item.part}>{item.part}</span>
                                    <div className="flex items-center gap-2 shrink-0 font-mono text-[9px]">
                                      <span className="text-gray-500">Qty:{item.qty}</span>
                                      <span className="text-gold-light font-bold">{item.estPrice}</span>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>

                          <div className="bg-black border border-white/10 rounded-xl overflow-hidden flex flex-col">
                            <div className="bg-neutral-900 border-b border-white/5 px-4 py-2 flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <FileCode className="w-4 h-4 text-gold-light" />
                                <span className="font-mono text-[10px] text-gray-300">{specDetails.filename}</span>
                                <span className="text-[8px] px-1.5 py-0.5 rounded bg-white/5 text-gray-500 uppercase font-mono font-bold">{specDetails.language}</span>
                              </div>
                              <button
                                onClick={() => handleCopyCode(specDetails.code)}
                                className="flex items-center gap-1.5 text-gray-400 hover:text-white transition-colors bg-white/5 hover:bg-white/10 px-2.5 py-1 rounded text-[9.5px] font-sans font-bold uppercase tracking-wider cursor-pointer active:scale-95"
                              >
                                {copied ? (
                                  <>
                                    <Check className="w-3 h-3 text-green-400" />
                                    <span className="text-green-400 text-[9px]">Copied!</span>
                                  </>
                                ) : (
                                  <>
                                    <Copy className="w-3 h-3" />
                                    <span className="text-[9px]">Copy Schema</span>
                                  </>
                                )}
                              </button>
                            </div>
                            <pre className="font-mono text-[9.5px] text-[#dac4b1] bg-black p-4 overflow-x-auto max-h-[220px] whitespace-pre select-all leading-relaxed scrollbar-all">
                              <code>{specDetails.code}</code>
                            </pre>
                          </div>
                        </>
                      );
                    })()}
                  </div>
                )}

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="p-3.5 rounded-lg border border-white/5 bg-white/[0.01]">
                    <div className="font-mono text-[9px] tracking-widest text-gray-500 uppercase">Blueprints Delivery</div>
                    <div className="text-white text-xs font-bold font-sans mt-1 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                      {card.status} (Verified Code)
                    </div>
                  </div>
                  <div className="p-3.5 rounded-lg border border-white/5 bg-white/[0.01]">
                    <div className="font-mono text-[9px] tracking-widest text-gray-500 uppercase">Verification Metric</div>
                    <div className="text-gold-light text-xs font-medium font-mono mt-1">
                      {card.metric}
                    </div>
                  </div>
                </div>

                <p className="font-sans text-xs text-gray-400 leading-relaxed tracking-wide mb-4">
                  Experience professional-grade {card.title} starting at extremely affordable prices. We serve both students preparing advanced technical submissions and small businesses demanding custom landing pages, circuit routing layouts, and functional microcontroller modules. Adjust Estimator variables on our dynamic workspace to preview cost boundaries in real-time.
                </p>

                <div className="flex gap-3">
                  <button
                    onClick={() => {
                      setSelectedSatelliteId(null);
                      handleQuickScroll('pricing');
                    }}
                    className="flex-1 py-3 bg-white text-black font-sans text-xs font-bold uppercase tracking-widest rounded-md hover:bg-gold-hover transition-colors flex items-center justify-center gap-2"
                  >
                    Explore Pricing Plans <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => {
                      setSelectedSatelliteId(null);
                      handleQuickScroll('contact');
                    }}
                    className="px-5 py-3 border border-white/10 hover:border-gold-base/30 rounded-md text-gray-300 hover:text-white transition-colors text-xs font-bold uppercase tracking-wider"
                  >
                    Contact Custom request
                  </button>
                </div>
              </motion.div>
            </motion.div>
          );
        })()}
      </AnimatePresence>
    </section>
  );
}

function SatelliteMediaCard({ card }: { card: SatelliteCard }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) return;
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    const mouseX = (e.clientX - rect.left) / width - 0.5;
    const mouseY = (e.clientY - rect.top) / height - 0.5;
    
    setRotateY(mouseX * 12);
    setRotateX(-mouseY * 12);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotateX(0);
    setRotateY(0);
  };

  const handleMouseEnter = () => {
    if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) return;
    setIsHovered(true);
  };

  return (
    <motion.div 
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      animate={{
        rotateX: rotateX,
        rotateY: rotateY,
        scale: isHovered ? 1.03 : 1.0,
        z: isHovered ? 20 : 0
      }}
      style={{
        transformStyle: 'preserve-3d',
        perspective: 1000
      }}
      transition={{ type: 'spring', damping: 25, stiffness: 220, mass: 0.4 }}
      className="glass-panel group p-3.5 rounded-[20px] select-none hover:shadow-[0_0_50px_rgba(167,139,113,0.18)] hover:border-gold-base/40 bg-white/[0.02]"
    >
      <div 
        className="relative aspect-[4/3] w-full rounded-[16px] overflow-hidden mb-3 border border-white/5 bg-[#050505] flex flex-col justify-center items-center"
        style={{ transform: 'translateZ(25px)', transformStyle: 'preserve-3d' }}
      >
        {card.id === 'satellite-pcb' ? (
          <PcbDesignBoard compact={true} />
        ) : card.id === 'satellite-web' ? (
          <WebDesignBoard compact={true} />
        ) : card.id === 'satellite-app' ? (
          <AppDesignBoard compact={true} />
        ) : card.id === 'satellite-iot' ? (
          <IotDesignBoard compact={true} />
        ) : (
          <img
            src={card.imageUrl}
            alt={`DotByte Systems - ${card.title} - ${card.category}`}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-[700ms] ease-out scale-103 group-hover:scale-100"
          />
        )}
        <div className="absolute top-2.5 right-2 tracking-widest font-mono text-[7px] text-white px-2 py-0.5 rounded bg-black/60 border border-white/10 font-bold z-30">
          {card.category}
        </div>
      </div>
      
      <div 
        className="flex items-center justify-between mb-1.5"
        style={{ transform: 'translateZ(15px)' }}
      >
        <h5 className="font-sans text-[11px] font-extrabold text-white tracking-wide truncate pr-2 uppercase">
          {card.title}
        </h5>
        <div className="flex items-center gap-1 shrink-0 bg-white/[0.03] border border-white/5 py-0.5 px-2 rounded-full">
          <span className="w-1.5 h-1.5 rounded-full bg-gold-base animate-pulse" />
          <span className="font-mono text-[7px] font-bold text-gold-light tracking-wider uppercase">ACTIVE</span>
        </div>
      </div>

      <div 
        className="flex items-center justify-between font-mono text-[8px] text-gray-400 border-t border-white/5 pt-1.5"
        style={{ transform: 'translateZ(10px)' }}
      >
        <span>DELIVERABLE METRIC</span>
        <span className="text-gold-base font-bold">{card.metric}</span>
      </div>
    </motion.div>
  );
}
