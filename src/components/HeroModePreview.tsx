import { useState } from 'react';
import { Monitor, Smartphone, Palette, Home, Activity, Lightbulb, Wifi, Layers, Check } from 'lucide-react';

type Props = { mode: number; powered: boolean; onAction: () => void };

export default function HeroModePreview({ mode, powered, onAction }: Props) {
  const [mobile, setMobile] = useState(false);
  const [blue, setBlue] = useState(true);
  const [tab, setTab] = useState('home');
  const [light, setLight] = useState(false);
  const [bottom, setBottom] = useState(false);
  const [routed, setRouted] = useState(false);

  return <fieldset disabled={!powered} className={`mode-preview preview-${mode}`} aria-label={`${['IoT', 'Website', 'Mobile app', 'PCB'][mode]} interactive demo`}>
    {mode === 1 && <>
      <div className="preview-toolbar controls-only"><div><button aria-label="Desktop website preview" aria-pressed={!mobile} onClick={() => { setMobile(false); onAction(); }}><Monitor size={15}/></button><button aria-label="Mobile website preview" aria-pressed={mobile} onClick={() => { setMobile(true); onAction(); }}><Smartphone size={15}/></button></div></div>
      <div className={`browser-demo ${mobile ? 'browser-mobile' : ''} ${blue ? '' : 'browser-lime'}`}>
        <div className="browser-chrome"><span>● ● ●</span><span>your-next-idea.site</span></div>
        <div className="browser-content"><div className="mini-nav"><b>hello<span>.</span></b><span>DESIGN STUDIO ↗</span></div><div className="mini-hero"><div><span className="mini-eyebrow">SMALL STARTS. BIG IDEAS.</span><h3>Make something<br/><em>worth a click.</em></h3><p>A little personality.<br/>On every screen.</p><span className="mini-cta">Let’s make it happen ↗</span></div><div className="mini-art" aria-hidden="true"><i/><i/><i/></div></div><div className="mini-cards"><span>01 / CREATE</span><span>02 / CONNECT</span><span>03 / GROW</span></div></div>
      </div>
      <div className="preview-bottom controls-only"><button onClick={() => { setBlue(!blue); onAction(); }}><Palette size={14}/>Change palette</button></div>
    </>}
    {mode === 2 && <>
      <div className="phone-stage"><div className="phone-demo"><div className="phone-status"><span>9:41</span><i/><Wifi size={11}/></div><div className="phone-screen">
        <span className="mini-eyebrow">DOTBYTE HOME</span><h3>{tab === 'home' ? 'Your space.' : 'Your activity.'}</h3><p>{tab === 'home' ? 'A little smarter.' : 'A little more connected.'}</p>
        {tab === 'home' ? <><div className={`phone-device ${light ? 'device-on' : ''}`}><Lightbulb size={31}/><span>Studio light</span><button aria-label="Toggle demo studio light" aria-pressed={light} onClick={() => {setLight(!light); onAction();}}><span/>{light ? 'On' : 'Off'}</button></div><div className="phone-stat"><span>Room temperature</span><b>24°<small>DEMO</small></b></div></> : <div className="phone-activity"><span><Check size={15}/>Device connected<small>JUST NOW</small></span><span><Lightbulb size={15}/>Light {light ? 'turned on' : 'turned off'}<small>DEMO SESSION</small></span><div className="activity-bars" aria-hidden="true">{[35,55,40,80,65,100,75].map((h,i)=><i key={i} style={{height:`${h}%`}}/>)}</div><small>Illustrative activity</small></div>}
      </div><div className="phone-tabs"><button aria-label="App home tab" aria-pressed={tab==='home'} onClick={()=>{setTab('home');onAction();}}><Home size={17}/>Home</button><button aria-label="App activity tab" aria-pressed={tab==='activity'} onClick={()=>{setTab('activity');onAction();}}><Activity size={17}/>Activity</button></div></div></div>
    </>}
    {mode === 3 && <>
      <div className="preview-toolbar controls-only"><button aria-pressed={bottom} onClick={()=>{setBottom(!bottom);onAction();}}><Layers size={14}/>{bottom?'Bottom copper':'Top copper'}</button></div>
      <div className={`pcb-demo ${bottom?'bottom-layer':''} ${routed?'board-routed':''}`}><svg viewBox="0 0 440 310" aria-label={`${bottom?'Bottom':'Top'} layer of a demonstration printed circuit board`} role="img"><rect x="18" y="16" width="404" height="278" rx="14" fill="#153c37" stroke="#577a61" strokeWidth="2"/>{[[33,31],[407,31],[33,279],[407,279]].map(([x,y])=><circle key={`${x}-${y}`} cx={x} cy={y} r="7" fill="#152f2a" stroke="#9da988" strokeWidth="3"/>)}
        <g className="pcb-grid" fill="#6b977942">{Array.from({length:11},(_,x)=>Array.from({length:7},(_,y)=><circle key={`${x}-${y}`} cx={55+x*32} cy={57+y*32} r="1"/>))}</g>
        <g fill="none" stroke={bottom?'#80ceff':'#d7b874'} strokeWidth="3" className="pcb-tracks"><path d={bottom?'M83 85H130L158 113H245L310 178V237M80 222H122L175 169H300L348 121V78M204 76V42H366V247H260L235 222H185':'M85 82H150L185 117H260L294 83H352M85 222H146L185 183H260L306 229H353M220 68V115M220 189V248H348M83 125H125L155 155H185M260 154H306L352 110'}/></g>
        <g fill="#192a29" stroke="#9db699"><rect x="180" y="112" width="86" height="81" rx="3"/><rect x="53" y="62" width="46" height="92" rx="2"/><rect x="326" y="62" width="46" height="70" rx="2"/></g>
        <g fill="#dabd78">{Array.from({length:7},(_,i)=><g key={i}><rect x={187+i*11} y="104" width="5" height="8"/><rect x={187+i*11} y="193" width="5" height="8"/></g>)}{[0,1,2,3].map(i=><g key={i}><circle cx={69+i*8} cy="222" r="4"/><circle cx={329+i*8} cy="235" r="4"/></g>)}</g>
        <g fill="#c8d8b3" fontFamily="monospace" fontSize="9"><text x="193" y="147">DOTBYTE</text><text x="196" y="164">MCU / U1</text><text x="58" y="177">USB / J1</text><text x="321" y="155">PWR / J2</text><text x="48" y="269">DB-01 · {bottom?'BOTTOM':'TOP'} COPPER</text></g></svg></div>
      <div className="preview-bottom controls-only"><button onClick={()=>{setRouted(!routed);onAction();}}>{routed?<Check size={14}/>:<Layers size={14}/>} {routed?'Reset routing':'Connect traces'}</button></div>
    </>}
  </fieldset>;
}
