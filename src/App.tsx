import { useStudioMotion } from './hooks/useStudioMotion';
import { lazy, Suspense, useState } from 'react';
import { MotionConfig } from 'motion/react';
import { ArrowUpRight, Cpu, Globe, Smartphone, Layers } from 'lucide-react';
import Navbar from './components/Navbar';
import StudioHero from './components/StudioHero';
import FeaturesGrid from './components/FeaturesGrid';
import PricingSection from './components/PricingSection';
import Footer from './components/Footer';
import SubscriptionModal from './components/SubscriptionModal';
import DotAIChatbot from './components/DotAIChatbot';
import ProjectMatcher from './components/ProjectMatcher';
import Works from './components/Works';
import ElectronicsArcade from './components/ElectronicsArcade';
const HeroNodeGraph=lazy(()=>import('./components/HeroNodeGraph'));
const services=[
 {name:'Electronics & IoT',tag:'01 / THE PHYSICAL',description:'Custom firmware, connected sensors, and working prototypes. Built around ESP32, ESP8266, and Arduino.',price:'From ₹399',Icon:Cpu,plan:'Custom IoT Code Plan'},
 {name:'Websites',tag:'02 / THE DIGITAL',description:'Thoughtful interfaces, responsive layouts, and a home on the web that feels like your brand.',price:'From ₹1,299',Icon:Globe,plan:'Website Plan'},
 {name:'Mobile apps',tag:'03 / THE EVERYDAY',description:'Native-feel mobile experiences with custom features, API integrations, and intuitive dashboards.',price:'From ₹1,699',Icon:Smartphone,plan:'App Plan'},
 {name:'PCB design',tag:'04 / THE FOUNDATION',description:'From the first schematic to fabrication-ready Gerber files. Custom boards with carefully considered routing.',price:'From ₹499',Icon:Layers,plan:'Custom PCB Plan'}
];
export default function App(){
 useStudioMotion(false);
 const [modalOpen,setModalOpen]=useState(false),[selectedPlan,setSelectedPlan]=useState('Website Plan'),[labOpen,setLabOpen]=useState(false),[notice,setNotice]=useState('');
 const selectPlan=(plan:string,price='')=>{setSelectedPlan(price?`${plan} (${price})`:plan);setModalOpen(true)};
 return <MotionConfig reducedMotion="user"><div className="studio-page"><div className="reading-progress" aria-hidden="true"/><a className="skip-content" href="#main">Skip to content</a><Navbar/><main id="main">
 <StudioHero onInquiry={()=>selectPlan('Custom project')}/>
 <section id="services" className="studio-wrap studio-section"><div className="section-index micro"><span>01 / WHAT WE MAKE</span><span>ONE WORKSHOP. MANY POSSIBILITIES.</span></div><div className="studio-heading"><h2>Different tools.<br/><span>Same thoughtful approach.</span></h2><p>From your first prototype to your next business idea.<br/>A little expertise, exactly where you need it.</p></div><div className="service-grid">{services.map(({name,tag,description,price,Icon,plan})=><article className="service-card" key={name}><span className="micro">{tag}</span><Icon className="service-icon" strokeWidth={1}/><h3>{name}</h3><p>{description}</p><button onClick={()=>selectPlan(plan,price)}><span>{price}</span><ArrowUpRight size={18}/><span className="sr-only"> — inquire about {name}</span></button></article>)}</div>
 <ProjectMatcher onSelectPlan={selectPlan}/>
 <details className="workshop-details" onToggle={e=>setLabOpen(e.currentTarget.open)}><summary><span><b>Curious how it comes together?</b><small>Explore our interactive design boards and project estimator.</small></span><span className="workshop-toggle">OPEN THE WORKSHOP ↗</span></summary>{labOpen&&<div className="workshop-dark"><Suspense fallback={<p className="p-10">Opening the workshop…</p>}><HeroNodeGraph onStartTrial={()=>selectPlan('Custom project')} onSynthesize={()=>setNotice('Demo simulation complete. Explore the design boards or request a project.')}/></Suspense>{notice&&<p role="status" className="p-6 text-center">{notice}</p>}</div>}</details></section>
 <Works/>
 <FeaturesGrid/>
 <section id="philosophy" className="studio-philosophy studio-wrap"><span className="micro">OUR BELIEF</span><blockquote>Good technology should open doors.<br/><em>Not stretch your budget.</em></blockquote><p>We believe that digital platforms and core electronics can be designed with exceptional aesthetic quality while remaining highly affordable and accessible for student prototypes and growing businesses.</p><span className="micro">DOTBYTE SYSTEMS / BUILT WITH INTENTION</span></section>
 <ElectronicsArcade/>
 <PricingSection onSelectPlan={selectPlan}/>
 </main><Footer/><div className="paper-surface">{modalOpen && <SubscriptionModal isOpen={modalOpen} onClose={()=>setModalOpen(false)} selectedPlan={selectedPlan}/>}</div><DotAIChatbot/></div></MotionConfig>;
}
