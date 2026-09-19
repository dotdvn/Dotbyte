import { useDialog } from '../hooks/useDialog';

import { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Layers,
  Cpu,
  Smartphone,
  Globe,
  Search,
  ArrowUpRight,
  Tag,
  Sparkles,
  X,
  Coins,
  Settings,
  Eye,
  CheckCircle2,
  FolderDot
} from 'lucide-react';

interface Project {
  id: string;
  title: string;
  category: 'pcb' | 'web' | 'app' | 'iot';
  categoryLabel: string;
  tag: string;
  description: string;
  longDescription: string;
  imageUrl: string;
  budgetEst: string;
  metric: string;
  specs: { label: string; value: string }[];
  stack: string[];
}

const GALLERY_PROJECTS: Project[] = [
  {
    id: 'proj-rfid-node',
    title: 'Secure RFID Attendance',
    category: 'iot',
    categoryLabel: 'IoT Hardware',
    tag: 'RFID RC522',
    description: 'Cryptographically secure building access node featuring MFRC522 communication and real-time database verification via WebSocket.',
    longDescription: 'High-speed authentication terminal developed for restricted facility zones. Utilizes encrypted payload transmission, offline credential caching for up to 500 users, and immediate status feedback through localized OLED and auditory cues.',
    imageUrl: '/rfid.webp',
    budgetEst: '₹1700+',
    metric: '0.2s Auth Speed',
    specs: [
      { label: 'RFID Module', value: 'MFRC522 13.56MHz SPI' },
      { label: 'Data Encryption', value: 'AES-256 Payload Security' },
      { label: 'Fallback Logic', value: 'Offline SQLite Cache Node' },
      { label: 'Status Display', value: '128x64 I2C OLED Panel' }
    ],
    stack: ['ESP32', 'MFRC522 Library', 'WebSockets', 'C++']
  },
  {
    id: 'proj-cnc-grbl',
    title: 'Precision GRBL CNC',
    category: 'pcb',
    categoryLabel: 'PCB Design',
    tag: 'GRBL Shield',
    description: 'Compact 4-axis stepper motor control circuit and 3D files engineered for precision .',
    longDescription: 'A fully integrated GRBL compatible shield designed to eliminate wiring clutter. Features robust power decoupling, dedicated spindle/laser PWM channels, and interference-resistant limit switch inputs to ensure reliable, micron-level machining.',
    imageUrl: '/cnc.webp',
    budgetEst: '₹1299+',
    metric: '4-Axis Control',
    specs: [
      { label: 'Driver Support', value: '4x A4988 / DRV8825 Sockets' },
      { label: 'Microcontroller', value: 'ATmega328P Core' },
      { label: 'Noise Rejection', value: 'RC Filtered Limit Pins' },
      { label: 'Power Input', value: '12-36V DC High Current Bus' }
    ],
    stack: ['KiCad', 'GRBL 1.1', 'G-Code', 'CNC Milling']
  },
  {
    id: 'proj-dotdvn',
    title: 'Personal Portfolio (dotdvn.me)',
    category: 'web',
    categoryLabel: 'Web Revolution',
    tag: 'Portfolio',
    description: 'A personal portfolio website showcasing projects, skills, and contact information with a modern aesthetic.',
    longDescription: 'A highly responsive, custom-built personal portfolio. It features smooth animations, an interactive projects gallery, and a clean user interface that highlights creative work and professional experience.',
    imageUrl: '/dotdvn.me.webp',
    budgetEst: 'Custom',
    metric: 'Personal Brand',
    specs: [
      { label: 'Deployment', value: 'Vercel' },
      { label: 'Design System', value: 'Custom UI/UX' },
      { label: 'Responsiveness', value: 'Mobile-first Grid' },
      { label: 'Animations', value: 'Framer Motion' }
    ],

    stack: ['React', 'TypeScript', 'Tailwind CSS', 'Vite']
  },
  {
    id: 'proj-custom-pcb',
    title: 'Advanced Custom PCB',
    category: 'pcb',
    categoryLabel: 'PCB Design',
    tag: 'Custom Board',
    description: 'High-performance printed circuit board designed for rapid prototyping and robust industrial applications.',
    longDescription: 'A multi-layer custom PCB engineered for high signal integrity, featuring advanced ground planes and efficient power routing. Perfect for embedded systems and complex microcontroller configurations.',
    imageUrl: '/pcb.webp',
    budgetEst: '₹499+',
    metric: 'Custom Layers',
    specs: [
      { label: 'Layer Count', value: '2-6 Layer Options' },
      { label: 'Routing', value: 'Impedance Controlled' },
      { label: 'Power', value: 'High Efficiency Planes' },
      { label: 'Design Tool', value: 'KiCad/Altium' }
    ],
    stack: ['KiCad', 'SMD', 'Prototyping', 'Circuit Design']
  }
];

export default function ProjectsGallery() {
  const [activeCategory, setActiveCategory] = useState<'all' | 'pcb' | 'web' | 'app' | 'iot'>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const closeModal = () => {
    setSelectedProject(null);
    if (window.location.hash) {
      window.history.pushState(null, '', window.location.pathname + window.location.search);
      document.title = "DotByte Systems — IoT, Electronics & Technology Projects";
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) {
        metaDesc.setAttribute(
          'content',
          "DotByte Systems designs affordable IoT systems, custom PCB layouts, Arduino & ESP32 firmware, and high-performance websites and mobile apps. Tailored for student prototypes and growing startups."
        );
      }
      let canonical = document.querySelector('link[rel="canonical"]');
      if (canonical) {
        canonical.setAttribute('href', "https://dotbyte.dotdvn.me/");
      }
    }
  };

  useDialog(!!selectedProject, '#project-dialog', closeModal);

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      const project = GALLERY_PROJECTS.find((p) => p.id === hash);
      if (project) {
        setSelectedProject(project);
        document.title = `${project.title} — ${project.categoryLabel} Spec | DotByte Systems`;
        const metaDesc = document.querySelector('meta[name="description"]');
        if (metaDesc) {
          metaDesc.setAttribute(
            'content',
            `${project.title} (${project.categoryLabel}) - ${project.description} Custom hardware & software stack: ${project.stack.join(', ')}.`
          );
        }
        let canonical = document.querySelector('link[rel="canonical"]');
        if (canonical) {
          canonical.setAttribute('href', `https://dotbyte.dotdvn.me/#${project.id}`);
        }
      } else {
        setSelectedProject(null);
        document.title = "DotByte Systems — IoT, Electronics & Technology Projects";
        const metaDesc = document.querySelector('meta[name="description"]');
        if (metaDesc) {
          metaDesc.setAttribute(
            'content',
            "DotByte Systems designs affordable IoT systems, custom PCB layouts, Arduino & ESP32 firmware, and high-performance websites and mobile apps. Tailored for student prototypes and growing startups."
          );
        }
        let canonical = document.querySelector('link[rel="canonical"]');
        if (canonical) {
          canonical.setAttribute('href', "https://dotbyte.dotdvn.me/");
        }
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  const filteredProjects = useMemo(() => {
    return GALLERY_PROJECTS.filter((proj) => {
      const matchesCategory = activeCategory === 'all' || proj.category === activeCategory;
      const matchesSearch =
        proj.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        proj.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        proj.tag.toLowerCase().includes(searchQuery.toLowerCase()) ||
        proj.stack.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  return (
    <section id="gallery" className="py-24 relative w-full border-t border-white/5 bg-[#080808]">
      <div className="absolute top-1/4 right-[10%] w-96 h-96 rounded-full bg-gold-base/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-[8%] w-80 h-80 rounded-full bg-gold-base/[0.03] blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 text-left">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-3">
              <FolderDot className="w-4 h-4 text-gold-light animate-pulse" />
              <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-gold-base">
                02 / SELECTED WORK
              </span>
            </div>
            <h2 className="font-sans text-3xl lg:text-4xl font-extrabold text-white tracking-tight uppercase">
              Ideas, <span className="text-gold-light">made real.</span>
            </h2>
            <p className="font-sans text-xs text-gray-400 mt-2 leading-relaxed">
              Inspect working setups, real schematic specifications, microcontroller logic parameters, and web platforms built for students and budget-conscious developers. All architectures can be replicated or fully customized.
            </p>
          </div>

          <div className="relative w-full md:w-72 shrink-0">
            <input
              type="text"
              aria-label="Search projects" placeholder="Search projects or technologies…"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 rounded-full bg-white/[0.02]/85 border border-white/10 text-white placeholder-gray-500 font-sans text-xs focus:border-gold-base/60 focus:outline-none focus:bg-white/[0.04] transition-all"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors"
                title="Clear Search"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2 mb-12 border-b border-white/5 pb-6">
          <button
            onClick={() => setActiveCategory('all')}
            className={`px-4 py-2 rounded-full font-sans text-[11px] font-extrabold uppercase tracking-widest transition-all duration-300 flex items-center gap-1.5 cursor-pointer border ${activeCategory === 'all'
              ? 'bg-gold-base text-black border-gold-light shadow-lg'
              : 'bg-white/[0.02] text-gray-400 border-white/5 hover:border-white/10 hover:text-white'
              }`}
          >
            All Work
          </button>
          <button
            onClick={() => setActiveCategory('pcb')}
            className={`px-4 py-2 rounded-full font-sans text-[11px] font-extrabold uppercase tracking-widest transition-all duration-300 flex items-center gap-1.5 cursor-pointer border ${activeCategory === 'pcb'
              ? 'bg-gold-base text-black border-gold-light shadow-lg'
              : 'bg-white/[0.02] text-gray-400 border-white/5 hover:border-white/10 hover:text-white'
              }`}
          >
            <Layers className="w-3.5 h-3.5" />
            PCB Layouts
          </button>
          <button
            onClick={() => setActiveCategory('web')}
            className={`px-4 py-2 rounded-full font-sans text-[11px] font-extrabold uppercase tracking-widest transition-all duration-300 flex items-center gap-1.5 cursor-pointer border ${activeCategory === 'web'
              ? 'bg-gold-base text-black border-gold-light shadow-lg'
              : 'bg-white/[0.02] text-gray-400 border-white/5 hover:border-white/10 hover:text-white'
              }`}
          >
            <Globe className="w-3.5 h-3.5" />
            Websites
          </button>
          <button
            onClick={() => setActiveCategory('app')}
            className={`px-4 py-2 rounded-full font-sans text-[11px] font-extrabold uppercase tracking-widest transition-all duration-300 flex items-center gap-1.5 cursor-pointer border ${activeCategory === 'app'
              ? 'bg-gold-base text-black border-gold-light shadow-lg'
              : 'bg-white/[0.02] text-gray-400 border-white/5 hover:border-white/10 hover:text-white'
              }`}
          >
            <Smartphone className="w-3.5 h-3.5" />
            Mobile Apps
          </button>
          <button
            onClick={() => setActiveCategory('iot')}
            className={`px-4 py-2 rounded-full font-sans text-[11px] font-extrabold uppercase tracking-widest transition-all duration-300 flex items-center gap-1.5 cursor-pointer border ${activeCategory === 'iot'
              ? 'bg-gold-base text-black border-gold-light shadow-lg'
              : 'bg-white/[0.02] text-gray-400 border-white/5 hover:border-white/10 hover:text-white'
              }`}
          >
            <Cpu className="w-3.5 h-3.5" />
            IoT Mesh
          </button>
        </div>

        {filteredProjects.length === 0 ? (
          <div className="py-20 text-center rounded-2xl border border-dashed border-white/10 bg-white/[0.01]">
            <X className="w-8 h-8 text-gray-600 mx-auto mb-3" />
            <h4 className="font-sans font-extrabold text-sm text-gray-300">No matching projects found</h4>
            <p className="font-sans text-[11px] text-gray-500 mt-1">Try resetting the keyword query or search parameters.</p>
            <button
              onClick={() => { setActiveCategory('all'); setSearchQuery(''); }}
              className="mt-4 px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white font-sans text-[10px] uppercase font-bold tracking-widest hover:bg-white/10 transition-colors cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project) => (
                <motion.div
                  layout
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4 }}
                  className="glass-panel group p-4.5 rounded-[24px] border border-white/10 hover:border-gold-base/40 bg-white/[0.012] hover:bg-white/[0.025] flex flex-col justify-between transition-all duration-500 hover:translate-y-[-4px]"
                >
                  <div className="text-left w-full">
                    <div className="relative aspect-[16/10.5] w-full rounded-xl overflow-hidden mb-4 bg-neutral-900 border border-white/5 select-none">
                      <img
                        src={project.imageUrl}
                        alt={`DotByte Systems - ${project.title} - ${project.categoryLabel}`}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />

                      <div className="absolute bottom-3 left-3 flex flex-wrap gap-1.5 z-10">
                        <span className="font-mono text-[8px] font-extrabold uppercase tracking-wider text-black bg-gold-light py-0.5 px-2 rounded-full">
                          {project.categoryLabel}
                        </span>
                        <span className="font-mono text-[8px] font-semibold tracking-wider text-gray-300 bg-black/60 backdrop-blur-md py-0.5 px-2 rounded-full border border-white/10">
                          {project.tag}
                        </span>
                      </div>

                      <div className="absolute top-3 right-3 bg-black/80 backdrop-blur-md px-2.5 py-1 rounded border border-gold-base/20 z-10 font-mono text-[10px] text-gold-light font-bold">
                        {project.budgetEst}
                      </div>
                    </div>

                    <div className="flex items-center justify-between mb-2">
                      <span className="font-mono text-[8.5px] uppercase tracking-widest text-[#a78b71]">
                        {project.metric}
                      </span>
                      <span className="bg-green-500/10 border border-green-500/20 text-green-400 font-mono text-[7px] font-bold px-1.5 py-0.5 rounded tracking-widest uppercase">
                        PROJECT
                      </span>
                    </div>

                    <h3 className="font-sans font-bold text-sm lg:text-base text-white group-hover:text-gold-light transition-colors duration-300 uppercase leading-snug">
                      {project.title}
                    </h3>

                    <p className="font-sans text-[11px] text-gray-400 mt-2 leading-relaxed">
                      {project.description}
                    </p>

                    <div className="flex flex-wrap gap-1.5 mt-4">
                      {project.stack.slice(0, 3).map((item, idx) => (
                        <div key={idx} className="flex items-center gap-1 text-[8.5px] text-gray-500 font-mono bg-white/[0.02] border border-white/5 py-0.5 px-1.5 rounded">
                          <Tag className="w-2.5 h-2.5 text-gold-base/50" />
                          {item}
                        </div>
                      ))}
                      {project.stack.length > 3 && (
                        <div className="text-[8.5px] text-gray-600 font-mono py-0.5 px-1.5">
                          +{project.stack.length - 3} more
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center mt-6 pt-4 border-t border-white/5 w-full">
                    <a
                      href={`#${project.id}`}
                      onClick={(e) => {
                        e.preventDefault();
                        window.location.hash = project.id;
                      }}
                      className="w-full py-2 rounded-lg bg-white/[0.03] hover:bg-white/[0.08] text-white border border-white/5 font-sans text-[10px] font-bold uppercase tracking-widest transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <Eye className="w-3.5 h-3.5 text-gold-base" />
                      Explore project
                    </a>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>

      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-sm p-4 cursor-zoom-out"
            onClick={closeModal}
          >
            <motion.div
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="w-full max-w-2xl bg-[#0c0c0c] border border-white/10 rounded-3xl p-6 md:p-8 relative shadow-2xl overflow-y-auto max-h-[90vh] cursor-default text-left scrollbar-all"
              onClick={(e) => e.stopPropagation()}
              id="project-dialog" role="dialog" aria-modal="true" aria-label={selectedProject.title}
            >
              <div className="absolute top-0 left-0 w-72 h-72 rounded-full bg-gold-base/5 blur-[80px] pointer-events-none" />

              <button
                onClick={closeModal}
                aria-label="Close project details"
                className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-gray-400 hover:text-white flex items-center justify-center transition-colors cursor-pointer select-none"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="flex gap-2 items-center mb-3">
                <span className="font-mono text-[9px] uppercase tracking-widest text-[#a78b71] bg-white/[0.02] border border-white/10 py-1 px-2.5 rounded-full">
                  MODEL: {selectedProject.id.toUpperCase()}
                </span>
                <span className="font-mono text-[9px] uppercase tracking-widest text-gold-light bg-gold-base/10 border border-gold-base/20 py-1 px-2.5 rounded-full">
                  {selectedProject.categoryLabel}
                </span>
              </div>

              <h3 className="font-sans text-xl md:text-2xl font-black text-white uppercase tracking-tight mb-2">
                {selectedProject.title}
              </h3>

              <div className="flex items-center gap-1 mt-1 text-xs text-gold-base font-mono font-bold mb-6">
                <Coins className="w-3.5 h-3.5" />
                Est. Construction Budget: {selectedProject.budgetEst}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="rounded-xl overflow-hidden aspect-[16/11] border border-white/5 bg-neutral-950 relative select-none">
                  <img
                    src={selectedProject.imageUrl}
                    alt={`DotByte Systems - Detailed spec diagram of ${selectedProject.title} (${selectedProject.categoryLabel})`}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                </div>

                <div className="flex flex-col justify-between">
                  <div>
                    <h4 className="font-mono text-[9px] uppercase tracking-widest text-gray-500 mb-2">✦ Architectural System Spec</h4>
                    <p className="font-sans text-xs text-gray-300 leading-relaxed">
                      {selectedProject.longDescription}
                    </p>
                  </div>

                  <div className="mt-4">
                    <h4 className="font-mono text-[9px] uppercase tracking-widest text-gray-500 mb-2">✦ Direct Dependencies</h4>
                    <div className="flex flex-wrap gap-1.5">
                      {selectedProject.stack.map((item, idx) => (
                        <span key={idx} className="font-mono text-[9px] text-[#dac4b1] border border-white/10 bg-white/[0.02] px-2 py-0.5 rounded">
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white/[0.01]/80 border border-white/5 rounded-2xl p-4.5 mb-8 text-left">
                <h4 className="font-mono text-[9px] uppercase tracking-widest text-gold-base mb-3 flex items-center gap-1.5">
                  <Settings className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: '6s' }} />
                  Validated Hardware Calibration Parameters
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {selectedProject.specs.map((spec, idx) => (
                    <div key={idx} className="flex justify-between items-center text-[11px] py-1 border-b border-white/[0.03] last:border-0">
                      <span className="text-gray-400 font-sans">{spec.label}</span>
                      <span className="text-white font-mono font-medium text-right ml-2">{spec.value}</span>
                    </div>
                  ))}
                </div>
              </div>


            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
