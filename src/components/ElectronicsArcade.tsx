import { useState } from 'react';
import { Cpu, Zap, RotateCcw, ArrowRight } from 'lucide-react';
import './ElectronicsArcade.css';

const circuits = [
  { gate: 'AND', target: true, hint: 'AND needs both inputs high.', initial: [false, false] },
  { gate: 'XOR', target: true, hint: 'XOR needs exactly one input high.', initial: [true, true] },
  { gate: 'OR', target: false, hint: 'OR is low only when both inputs are low.', initial: [true, false] },
  { gate: 'NAND', target: false, hint: 'NAND is the inverse of AND.', initial: [false, true] },
];
const resistors = [
  { bands: ['brown', 'black', 'red'], colors: ['#97582f', '#171717', '#ec4949'], answer: '1 kΩ', options: ['100 Ω', '1 kΩ', '10 kΩ'], reason: '10 × 100 = 1,000 Ω' },
  { bands: ['red', 'red', 'brown'], colors: ['#ec4949', '#ec4949', '#97582f'], answer: '220 Ω', options: ['22 Ω', '2.2 kΩ', '220 Ω'], reason: '22 × 10 = 220 Ω' },
  { bands: ['yellow', 'violet', 'red'], colors: ['#ffd550', '#a26bde', '#ec4949'], answer: '4.7 kΩ', options: ['4.7 kΩ', '470 Ω', '47 kΩ'], reason: '47 × 100 = 4,700 Ω' },
  { bands: ['orange', 'orange', 'brown'], colors: ['#ef9a45', '#ef9a45', '#97582f'], answer: '330 Ω', options: ['3.3 kΩ', '330 Ω', '33 Ω'], reason: '33 × 10 = 330 Ω' },
  { bands: ['blue', 'gray', 'red'], colors: ['#478fe0', '#999', '#ec4949'], answer: '6.8 kΩ', options: ['680 Ω', '68 kΩ', '6.8 kΩ'], reason: '68 × 100 = 6,800 Ω' },
];
export default function ElectronicsArcade() {
  const [game, setGame] = useState<'logic' | 'resistor'>('logic');
  const [level, setLevel] = useState(0);
  const [inputs, setInputs] = useState([false, false]);
  const [solved, setSolved] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [round, setRound] = useState(0);
  const [choice, setChoice] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [guide, setGuide] = useState(false);
  const circuit = circuits[level];
  const output = circuit.gate === 'AND' ? inputs[0] && inputs[1] : circuit.gate === 'OR' ? inputs[0] || inputs[1] : circuit.gate === 'XOR' ? inputs[0] !== inputs[1] : !(inputs[0] && inputs[1]);
  const resistor = resistors[round];
  const reset = () => { setLevel(0); setInputs([false, false]); setSolved(false); setFeedback(''); setRound(0); setChoice(null); setScore(0); setFinished(false); };
  return <section className="studio-wrap studio-section" id="arcade" aria-labelledby="arcade-title">
    <div className="section-index micro"><span>THE PLAYGROUND</span><span>SMALL CIRCUITS. BIG CURIOSITY.</span></div>
    <div className="studio-heading"><h2 id="arcade-title">Take a little<br/><span>brain break.</span></h2><p>Flip a bit. Read a resistor. Two tiny challenges for the engineer in you.</p></div>
    <div className="electronics-arcade">
      <div className="arcade-menu" role="group" aria-label="Choose a mini game">
        <button aria-pressed={game === 'logic'} onClick={() => setGame('logic')}><Cpu size={20}/><span><b>Logic lab</b><small>Make the right connection</small></span><ArrowRight size={16}/></button>
        <button aria-pressed={game === 'resistor'} onClick={() => setGame('resistor')}><Zap size={20}/><span><b>Ohm sweet ohm</b><small>Crack the color code</small></span><ArrowRight size={16}/></button>
        <p>No timer. No pressure.<br/>Just a little hands-on curiosity.</p>
      </div>
      <div className="arcade-stage">
        <div className="arcade-top"><span className="micro">{game === 'logic' ? `CIRCUIT ${level + 1} / ${circuits.length}` : `RESISTOR ${round + 1} / ${resistors.length}`}</span><button onClick={reset} aria-label="Restart games"><RotateCcw size={16}/> Reset</button></div>
        {game === 'logic' ? <>
          <h3>Can you turn the LED {circuit.target ? 'on' : 'off'}?</h3><p>Toggle the inputs, then test your circuit.</p>
          <div className="logic-board"><div className="logic-inputs">{inputs.map((on, i) => <button key={i} disabled={solved} aria-pressed={on} aria-label={`Input ${i === 0 ? 'A' : 'B'}`} onClick={() => { setInputs(inputs.map((v, n) => n === i ? !v : v)); setFeedback(''); }}><span>{i === 0 ? 'A' : 'B'}</span><i/>{on ? '1' : '0'}</button>)}</div><span className="logic-wire"/><div className="logic-gate">{circuit.gate}</div><span className={`logic-wire ${output ? 'live' : ''}`}/><div className={`logic-led ${output ? 'on' : ''}`}><i/><span>LED {output ? 'ON' : 'OFF'}</span></div></div>
          <div className="arcade-feedback" role="status">{feedback || 'HIGH = 1 · LOW = 0'}</div>
          <div className="arcade-actions">{!solved ? <button className="arcade-primary" onClick={() => { setSolved(output === circuit.target); setFeedback(output === circuit.target ? `Connected! ${circuit.hint}` : `Not quite. ${circuit.hint}`); }}>Test circuit <Zap size={15}/></button> : <button className="arcade-primary" onClick={() => { const next = (level + 1) % circuits.length; setLevel(next); setInputs([...circuits[next].initial]); setSolved(false); setFeedback(''); }}>{level === circuits.length - 1 ? 'Play again' : 'Next circuit'} <ArrowRight size={15}/></button>}<span>{solved && level === circuits.length - 1 ? 'All four circuits solved ✳' : '4 gates to master'}</span></div>
        </> : <>
          <h3>{finished ? 'Nicely decoded.' : 'What’s the resistance?'}</h3><p>{finished ? `You scored ${score} out of ${resistors.length}. Ready for another round?` : 'Read the first two digits, then the multiplier. Gold means ±5%.'}</p>
          <div className="resistor-visual" role="img" aria-label={`${resistor.bands.join(', ')}, gold resistor bands`}><div className="resistor-body">{resistor.colors.map((color, i) => <i key={i} style={{background: color}}/>)}<i className="gold-band"/></div></div>
          <div className="resistor-labels">{resistor.bands.join(' / ')} / gold</div>
          {!finished && <div className="resistor-options">{resistor.options.map(option => <button key={option} disabled={choice !== null} className={choice !== null && option === resistor.answer ? 'correct' : choice === option ? 'incorrect' : ''} onClick={() => { setChoice(option); if (option === resistor.answer) setScore(score + 1); }}>{option}</button>)}</div>}
          <div className="arcade-feedback" role="status">{finished ? `${score === 5 ? 'Perfect signal!' : 'Keep experimenting.'} Every band tells a story.` : choice ? `${choice === resistor.answer ? 'Correct!' : `Answer: ${resistor.answer}.`} ${resistor.reason}.` : 'Choose one answer above.'}</div>
          <div className="arcade-actions">{finished ? <button className="arcade-primary" onClick={reset}>Play again <RotateCcw size={15}/></button> : choice && <button className="arcade-primary" onClick={() => { if (round === resistors.length - 1) setFinished(true); else { setRound(round + 1); setChoice(null); } }}>{round === resistors.length - 1 ? 'See score' : 'Next resistor'} <ArrowRight size={15}/></button>}<button className="arcade-guide" aria-expanded={guide} onClick={() => setGuide(!guide)}>{guide ? 'Hide' : 'Show'} color key</button></div>
          {guide && <p className="color-key">Black 0 · Brown 1 · Red 2 · Orange 3 · Yellow 4 · Green 5 · Blue 6 · Violet 7 · Gray 8 · White 9<br/>Band 3 multiplies by 10 to that power. Red = ×100.</p>}
        </>}
      </div>
    </div>
  </section>;
}
