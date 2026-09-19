import { useMemo, useState } from 'react';
import { ArrowRight, Check, Clipboard, RotateCcw } from 'lucide-react';

const projectTypes = {
  website: { label: 'Website', plan: 'Website Plan', price: 'Starting ₹1299', outcome: 'A responsive website with a clear structure, polished interface, and launch-ready setup.' },
  app: { label: 'Mobile app', plan: 'App Plan', price: 'Starting ₹1699', outcome: 'A focused app experience with the right screens, interactions, and integrations for your idea.' },
  iot: { label: 'IoT prototype', plan: 'Custom IoT Code Plan', price: '₹399+', outcome: 'Working firmware and circuit guidance for sensors, controls, and connected devices.' },
  pcb: { label: 'Custom PCB', plan: 'Custom PCB Plan', price: 'Starting ₹499', outcome: 'A carefully planned schematic and fabrication-ready PCB design for your hardware.' }
} as const;

const stages = {
  idea: { label: 'I have an idea', step: 'We will shape the requirements and define a practical first version.' },
  existing: { label: 'Improve something', step: 'We will review what exists and focus on the highest-impact changes.' },
  ready: { label: 'Ready to build', step: 'We can begin with your prepared content, references, or technical requirements.' }
} as const;

type ProjectType = keyof typeof projectTypes;
type Stage = keyof typeof stages;

export default function ProjectMatcher({ onSelectPlan }: { onSelectPlan: (name: string, price: string) => void }) {
  const [project, setProject] = useState<ProjectType>('website');
  const [stage, setStage] = useState<Stage>('idea');
  const [copied, setCopied] = useState(false);
  const recommendation = projectTypes[project];
  const brief = useMemo(() => `Project: ${recommendation.label}\nStage: ${stages[stage].label}\nRecommended starting point: ${recommendation.plan} (${recommendation.price})`, [recommendation, stage]);

  const copyBrief = async () => {
    try {
      await navigator.clipboard.writeText(brief);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  };

  return <section className="project-matcher" aria-labelledby="matcher-title">
    <div className="matcher-intro">
      <span className="micro">PROJECT MATCHER / 30 SECONDS</span>
      <h3 id="matcher-title">Find your best starting point.</h3>
      <p>Choose what you are building and where you are now. We’ll suggest the most relevant service.</p>
    </div>
    <div className="matcher-controls">
      <fieldset>
        <legend>What are you building?</legend>
        <div className="matcher-options">{Object.entries(projectTypes).map(([key, item]) => <button type="button" key={key} aria-pressed={project === key} onClick={() => setProject(key as ProjectType)}>{item.label}</button>)}</div>
      </fieldset>
      <fieldset>
        <legend>Where are you now?</legend>
        <div className="matcher-options">{Object.entries(stages).map(([key, item]) => <button type="button" key={key} aria-pressed={stage === key} onClick={() => setStage(key as Stage)}>{item.label}</button>)}</div>
      </fieldset>
    </div>
    <div className="matcher-result" aria-live="polite">
      <span className="micro">YOUR RECOMMENDATION</span>
      <div className="matcher-result-heading"><h4>{recommendation.plan}</h4><strong>{recommendation.price}</strong></div>
      <p>{recommendation.outcome}</p>
      <p className="matcher-next"><Check size={16}/><span>{stages[stage].step}</span></p>
      <div className="matcher-actions">
        <button className="studio-button lime" onClick={() => onSelectPlan(recommendation.plan, recommendation.price)}>Discuss this project <ArrowRight size={16}/></button>
        <button className="matcher-copy" type="button" onClick={copyBrief}>{copied ? <Check size={15}/> : <Clipboard size={15}/>} {copied ? 'Brief copied' : 'Copy brief'}</button>
        <button className="matcher-reset" type="button" onClick={() => { setProject('website'); setStage('idea'); setCopied(false); }} aria-label="Reset project matcher"><RotateCcw size={15}/></button>
      </div>
    </div>
  </section>;
}
