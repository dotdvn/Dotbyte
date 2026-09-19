import HeroModePreview from './HeroModePreview';
import { motion, useReducedMotion } from 'motion/react';
import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, ArrowDown, Power, Cpu, Code2, Smartphone, Layers } from 'lucide-react';
const modes = [
  { name:'IoT', label:'ESP32', sub:'SENSE + CONNECT', result:'Sensor → firmware → something useful.', Icon:Cpu },
  { name:'Web', label:'</>', sub:'DESIGN + DEVELOP', result:'An idea → a website → your next chapter.', Icon:Code2 },
  { name:'Apps', label:'APP', sub:'BUILD + INTERACT', result:'A tap → a connection → a better experience.', Icon:Smartphone },
  { name:'PCB', label:'PCB', sub:'ROUTE + CREATE', result:'A schematic → a circuit → a working board.', Icon:Layers }
];
const traces='M205 164V96H105V57M230 164V57M255 164V112H366V58M280 164V136H433V212M308 188H389V267H451M308 213H354V327H409M308 238H331V369M280 264V305H257V366M255 264V292H167V356M230 264V279H100V316M205 264V252H49V198M179 238H122V175H53M179 213H146V120H65M179 188H162V54';
export default function StudioHero({onInquiry}:{onInquiry:()=>void}) {
  const [mode,setMode]=useState(0), [powered,setPowered]=useState(true), [signal,setSignal]=useState(false);
  const reducedMotion=useReducedMotion();
  const still=!!reducedMotion;
  const timer=useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(()=>()=>{if(timer.current)clearTimeout(timer.current)},[]);
  const spark=()=>{if(!powered)return;setSignal(true);if(timer.current)clearTimeout(timer.current);timer.current=setTimeout(()=>setSignal(false),1800)};
  return <>
    <section className="studio-wrap hero-shell" aria-labelledby="hero-heading">
      <div className="studio-hero"><div className="hero-blueprint-grid" aria-hidden="true"/>
        <div className="hero-top micro"><span><i/> DOTBYTE SYSTEMS / THE TECHNOLOGY WORKSHOP</span><span>HARDWARE + SOFTWARE + CURIOSITY</span></div>
        <div className="studio-hero-grid"><div className="hero-story"><p className="micro">FOR STUDENTS, MAKERS & GROWING BUSINESSES</p><h1 id="hero-heading"><span className="headline-line">From an idea.</span><span className="headline-line">To <em>it works.</em></span></h1><p className="hero-summary">Thoughtful websites. Smarter electronics.<br/>We bring your ideas to life with custom software, apps, PCB design, and IoT — at a price that makes sense.</p><div className="hero-ctas"><button className="studio-button lime" onClick={onInquiry}>Start your project <ArrowUpRight size={17}/></button><a href="#services">Explore our services <ArrowDown size={15}/></a></div></div>
        <div className={`studio-circuit ${powered?'':'circuit-off'} ${signal?'sending':''}`}>
          <div className="hero-preview-stage">{mode === 0 ? (
          <div className="circuit-face"><div className="circuit-orbit" aria-hidden="true"/><svg viewBox="0 0 500 410" fill="none" aria-hidden="true"><path d={traces} stroke="#829a6e" strokeWidth="2"/><path className="signal-path" d={traces} stroke="#e3edc6" strokeWidth="3" strokeDasharray="9 85"/>{[[105,57],[230,57],[366,58],[433,212],[451,267],[409,327],[331,369],[257,366],[167,356],[100,316],[49,198],[53,175],[65,120],[162,54]].map(([cx,cy])=><circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="5" fill="#183c32" stroke="#a9bd8d" strokeWidth="2"/>)}<rect x="177" y="160" width="135" height="108" rx="5" fill="#122c24" stroke="#94a977"/><rect x="185" y="168" width="119" height="92" rx="3" stroke="#506748"/><text x="244" y="207" textAnchor="middle" fill="#e3edc6" fontSize="24" fontFamily="monospace">{modes[mode].label}</text><text x="244" y="233" textAnchor="middle" fill="#a9bd8d" fontSize="8" fontFamily="monospace" letterSpacing="1">{modes[mode].sub}</text><circle cx="295" cy="178" r="3" fill={powered?'#e3edc6':'#53664b'}/></svg><button className="circuit-chip" aria-label={`Send a ${modes[mode].name} signal`} onClick={spark} disabled={!powered}/></div>
          ) : <HeroModePreview mode={mode} powered={powered} onAction={spark}/>}</div>
          <div className="circuit-controls controls-only"><button aria-label="Toggle preview power" aria-pressed={powered} onClick={()=>{setPowered(!powered);setSignal(false)}}><Power size={19}/></button></div>
        </div></div>
        <div className="hero-bottom-row"><div className="hero-mode-list" role="group" aria-label="Circuit mode">{modes.map(({name,Icon},i)=><button key={name} aria-pressed={mode===i} onClick={()=>{setMode(i);setSignal(false);if(timer.current)clearTimeout(timer.current)}}>{mode===i && <motion.span className="mode-selection" layoutId="hero-mode-selection" transition={still ? {duration:0} : {type:"spring",stiffness:380,damping:30}} aria-hidden="true"/>}<Icon size={13}/><span>{name}</span></button>)}</div><a className="micro" href="#services">FOUR WAYS TO BUILD <ArrowDown size={13}/></a></div>
      </div><div className="hero-foot"><span>Big possibilities. Student-friendly budgets.</span><a href="#services" className="micro">TAKE A LOOK AROUND ↓</a></div>
    </section>
    <div className="studio-ticker"><div className="ticker-motion" aria-hidden="true">{[0,1].map(n=><div key={n}>{['IMAGINE','DESIGN','BUILD','CONNECT','REPEAT'].map(word=><span key={word}>{word}<b>✳</b></span>)}</div>)}</div><span className="sr-only">Imagine, design, build, connect, repeat.</span></div>
  </>;
}
