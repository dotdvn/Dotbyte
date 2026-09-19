import { useState } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';
export default function Navbar() {
  const [open, setOpen] = useState(false);
  return <header className="studio-nav" id="top">
    <div className="studio-wrap studio-nav-inner">
      <a href="#top" className="studio-brand" aria-label="DotByte Systems home"><span>dotbyte<span className="brand-period">.</span><small>SYSTEMS</small></span></a>
      <button className="menu-toggle" aria-expanded={open} aria-controls="studio-navigation" aria-label={open ? 'Close navigation' : 'Open navigation'} onClick={() => setOpen(!open)}>{open ? <X/> : <Menu/>}</button>
      <nav id="studio-navigation" className={open ? 'nav-open' : ''} aria-label="Main navigation">
        {[['Services','#services'],['Pricing','#pricing']].map(([label,href])=><a key={href} href={href} onClick={()=>setOpen(false)}>{label}</a>)}
        <a className="portfolio-link" href="https://dotdvn.me" target="_blank" rel="noopener noreferrer">DOTDVN <ArrowUpRight size={13}/></a>
        <a className="nav-inquiry" href="#contact" onClick={()=>setOpen(false)}>Let’s build <ArrowUpRight size={15}/></a>
      </nav>
    </div>
  </header>;
}
