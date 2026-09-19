import { useDialog } from '../hooks/useDialog';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Shield, Award, ClipboardCheck } from 'lucide-react';

interface SubscriptionModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedPlan: string;
}

export default function SubscriptionModal({ isOpen, onClose, selectedPlan }: SubscriptionModalProps) {
  useDialog(isOpen, '#subscription_modal_container', onClose);
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    phone: '',
    discipline: 'Premium Web Platforms',
  });
  const [isSuccess, setIsSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [proposalId, setProposalId] = useState('');

  const specialties = [
    'PCB Designing & Routing',
    'Premium Web Platforms',
    'Mobile App Development',
    'IoT Microcontroller Coding',
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!profile.name || !profile.email) return;
    
    setIsSubmitting(true);
    setSubmitError('');

    const cleanEmail = profile.email.replace(/[^a-zA-Z0-9]/g, '').toUpperCase().slice(0, 4);
    const code = `DOT-${cleanEmail}-${Math.floor(1000 + Math.random() * 9000)}-PRJ`;
    
    try {
      const response = await fetch('https://formsubmit.co/ajax/dotdvn16@gmail.com', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          _subject: `New Plan Selection from ${profile.name}`,
          Name: profile.name,
          Email: profile.email,
          Phone: profile.phone,
          Discipline: profile.discipline,
          SelectedPlan: selectedPlan || 'Website Plan',
          ProposalCode: code
        })
      });
      const result = await response.json();
      if (!response.ok || result.success === false || result.success === 'false') throw new Error('Submission failed');
    } catch {
      setSubmitError('Your inquiry could not be sent. Please try again or email dotdvn16@gmail.com.');
      setIsSubmitting(false);
      return;
    }
    
    setProposalId(code);
    setIsSubmitting(false);
    setIsSuccess(true);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/85 backdrop-blur-md"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.95, y: 15 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.95, y: 15 }}
            transition={{ type: 'spring', stiffness: 350, damping: 30 }}
            className="w-full max-w-lg bg-[#0d0d0d] border border-white/10 rounded-[32px] p-6 lg:p-8 relative overflow-y-auto max-h-[90vh] shadow-2xl scrollbar-all"
            onClick={(e) => e.stopPropagation()}
            id="subscription_modal_container" role="dialog" aria-modal="true" aria-label="Project inquiry"
          >
            <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-gold-base/5 blur-[90px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-60 h-60 rounded-full bg-gold-base/5 blur-[80px] pointer-events-none" />

            <div className="flex justify-between items-start mb-6 relative z-10">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full border border-gold-base/30 flex items-center justify-center bg-gold-base/5">
                  <Sparkles className="w-3.5 h-3.5 text-gold-light" />
                </span>
                <span className="font-mono text-[9px] uppercase tracking-widest text-gold-base">
                  DOTBYTE SYSTEMS DISPATCH BLUEPRINT
                </span>
              </div>
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-full border border-white/5 hover:border-white/10 flex items-center justify-center text-gray-500 hover:text-white transition-opacity text-xs"
                id="close_modal_button" aria-label="Close inquiry"
              >
                ✕
              </button>
            </div>

            {submitError && <p role="alert" className="mb-4 text-sm text-red-700">{submitError}</p>}
            <AnimatePresence mode="wait">
              {!isSuccess ? (
                <motion.div
                  key="form-stage"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  className="relative z-10 text-left"
                >
                  <h3 className="font-serif italic text-2xl lg:text-3xl text-white tracking-tight mb-2">
                    Enter Project Sanctuary
                  </h3>
                  <p className="font-sans text-xs text-gray-400 leading-relaxed tracking-wide mb-6">
                    Initialize your custom technical requirements. You are configuring an inquiry draft under the <span className="text-gold-light font-bold">"{selectedPlan || 'Website Plan'}"</span> channel.
                  </p>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label htmlFor="input_modal_name" className="font-sans text-[10px] font-semibold text-gray-400 tracking-wider uppercase block mb-1.5">
                        Client or Student Name
                      </label>
                      <input
                        type="text"
                        required
                        value={profile.name}
                        onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                        placeholder="E.g. Devan"
                        className="w-full px-4 py-3 rounded-lg bg-white/[0.02] border border-white/10 text-white font-sans text-xs focus:border-gold-base focus:outline-none focus:bg-white/[0.04] transition-all"
                        id="input_modal_name"
                      />
                    </div>

                    <div>
                      <label htmlFor="input_modal_email" className="font-sans text-[10px] font-semibold text-gray-400 tracking-wider uppercase block mb-1.5">
                        Primary Email Address
                      </label>
                      <input
                        type="email"
                        required
                        value={profile.email}
                        onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                        placeholder="E.g. dotdvn16@gmail.com"
                        className="w-full px-4 py-3 rounded-lg bg-white/[0.02] border border-white/10 text-white font-sans text-xs focus:border-gold-base focus:outline-none focus:bg-white/[0.04] transition-all"
                        id="input_modal_email"
                      />
                    </div>

                    <div>
                      <label htmlFor="input_modal_phone" className="font-sans text-[10px] font-semibold text-gray-400 tracking-wider uppercase block mb-1.5">
                        Mobile Number
                      </label>
                      <input
                        type="tel"
                        required
                        value={profile.phone}
                        onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                        placeholder="E.g. +91 8921546426"
                        className="w-full px-4 py-3 rounded-lg bg-white/[0.02] border border-white/10 text-white font-sans text-xs focus:border-gold-base focus:outline-none focus:bg-white/[0.04] transition-all"
                        id="input_modal_phone"
                      />
                    </div>

                    <div>
                      <label className="font-sans text-[10px] font-semibold text-gray-400 tracking-wider uppercase block mb-1.5">
                        Targeted Technical Domain
                      </label>
                      <div className="grid grid-cols-1 gap-2">
                        {specialties.map((d) => (
                          <button
                            key={d}
                            type="button"
                            aria-pressed={profile.discipline === d}
                            onClick={() => setProfile({ ...profile, discipline: d })}
                            className={`px-4 py-2.5 rounded-lg border text-left font-sans text-xs transition-all flex items-center justify-between cursor-pointer ${
                              profile.discipline === d
                                ? 'bg-gold-base/10 border-gold-base text-gold-light font-bold'
                                : 'bg-white/[0.01] border-white/5 text-gray-400 hover:border-white/10 hover:text-white'
                            }`}
                          >
                            <span>{d}</span>
                            {profile.discipline === d && <span className="w-1.5 h-1.5 rounded-full bg-gold-base" />}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="pt-4">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full py-3.5 bg-gradient-to-r from-gold-base to-gold-light hover:brightness-110 active:scale-[0.98] transition-all duration-300 text-black font-sans text-[11px] font-bold uppercase tracking-widest rounded-md flex items-center justify-center gap-2 shadow-lg cursor-pointer disabled:opacity-75 disabled:cursor-wait"
                        id="btn_submit_modal_form"
                      >
                        {isSubmitting ? (
                          <span>Transmitting...</span>
                        ) : (
                          <>
                            <Shield className="w-3.5 h-3.5" />
                            <span>Submit</span>
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                </motion.div>
              ) : (
                <motion.div
                  key="success-stage"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="relative z-10 text-center py-6"
                >
                  <div className="w-16 h-16 rounded-full bg-gold-base/10 border border-gold-base/30 flex items-center justify-center mx-auto mb-6">
                    <Award className="w-8 h-8 text-gold-light animate-bounce" />
                  </div>

                  <h3 className="font-serif italic text-3xl text-white tracking-tight mb-2">
                    Proposal Registered
                  </h3>
                  
                  <span className="font-mono text-[9px] tracking-widest text-gold-base uppercase px-3 py-1 border border-gold-base/20 bg-gold-base/5 rounded">
                    PROPOSAL CHANNEL SECURED
                  </span>

                  <p className="font-sans text-xs text-gray-400 leading-relaxed tracking-wide mt-6 mb-8 max-w-sm mx-auto">
                    Welcome to DotByte Systems, <span className="text-white font-bold">{profile.name}</span>.<br /> Your draft environment has been locked in representing the <span className="text-white">{profile.discipline}</span> queue under the <span className="text-gold-light font-medium">{selectedPlan || 'Website Plan'} Tier</span>.
                  </p>

                  <div className="glass-panel p-5 rounded-2xl bg-white/[0.02]/80 border-gold-base/30 text-left relative overflow-hidden mb-8" id="modal_success_receipt">
                    <div className="absolute top-0 right-0 p-1 font-mono text-[6px] text-gray-700 select-none">
                      DOT // INQUID LEVEL 1
                    </div>
                    
                    <div className="font-mono text-[8px] text-gray-500 uppercase tracking-widest mb-1">
                      PROPOSAL REGISTRATION CODE
                    </div>
                    <div className="font-mono text-sm font-bold text-gold-light tracking-widest select-all bg-black/60 px-4 py-2 rounded-md border border-white/5 flex items-center justify-between">
                      {proposalId}
                      <ClipboardCheck className="w-4 h-4 text-gold-base/65 shrink-0 cursor-pointer hover:text-white" title="Copy card proposal index" />
                    </div>

                    <div className="flex justify-between items-center mt-4 pt-4 border-t border-white/5">
                      <div>
                        <div className="font-mono text-[7px] text-gray-500">CLIENT ALLOTMENT</div>
                        <div className="font-sans text-[10px] text-white font-bold mt-0.5">{profile.name.toUpperCase()}</div>
                      </div>
                      <div className="text-right">
                        <div className="font-mono text-[7px] text-gray-500">HOTLINE ACCESS</div>
                        <div className="font-sans text-[10.5px] text-gold-base font-bold mt-0.5">8921546426</div>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={onClose}
                    className="w-full py-3.5 bg-white text-black font-sans text-xs font-bold uppercase tracking-widest rounded-md hover:bg-gold-hover transition-colors cursor-pointer"
                  >
                    Return to Sandbox Workspace
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
