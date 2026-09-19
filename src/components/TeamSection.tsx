
import { motion } from 'motion/react';
import { Mail, Linkedin, Quote } from 'lucide-react';
import { TEAM_MEMBERS_DOT } from '../data';

export default function TeamSection() {
  return (
    <section id="guild" className="py-20 lg:py-28 relative w-full border-t border-white/5 bg-black/10">
      
      <div className="absolute top-1/2 left-10 w-96 h-96 rounded-full bg-gold-base/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 rounded-full bg-gold-base/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        
        <div className="text-left mb-16 max-w-2xl">
          <span className="font-mono text-[10px] font-bold text-gold-base tracking-[0.25em] uppercase block mb-3">
            THE TECHNICAL GUILD / FOUNDERS
          </span>
          <h2 className="font-serif italic text-3xl md:text-5xl text-white tracking-tight leading-tight">
            Curated by engineers, <br />trusted by academic & business pioneers.
          </h2>
        </div>

        <div className={`grid grid-cols-1 ${TEAM_MEMBERS_DOT.length > 1 ? 'md:grid-cols-2 lg:gap-16' : 'max-w-2xl mx-auto'} gap-10 items-start`}>
          {TEAM_MEMBERS_DOT.map((member) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: [0.4, 0, 0.2, 1] }}
              className="glass-panel group p-5 rounded-[32px] bg-white/[0.015] hover:shadow-[0_0_60px_rgba(167,139,113,0.15)] hover:border-gold-base/30 transition-all duration-700"
              id={`team_profile_${member.id}`}
            >
              <div className="relative aspect-[4/5] w-full rounded-[24px] overflow-hidden mb-6 border border-white/5 bg-zinc-900 group-hover:border-gold-base/20 transition-all duration-700">
                <img
                  src={member.imageUrl}
                  alt={member.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-[750ms] ease-out scale-103 group-hover:scale-100"
                />
                
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 p-6 flex flex-col justify-end">
                  <Quote className="w-8 h-8 text-gold-base/60 mb-2.5" />
                  <p className="font-sans italic text-xs text-gray-200 leading-relaxed tracking-wider mb-4 text-left">
                    "{member.quote}"
                  </p>
                  
                  <div className="flex gap-3">
                    <span className="w-8 h-8 rounded-full border border-white/10 hover:border-gold-base/50 flex items-center justify-center bg-black/60 cursor-pointer hover:bg-gold-base/10 transition-all">
                      <Linkedin className="w-3.5 h-3.5 text-gray-400 hover:text-white" />
                    </span>
                    <span className="w-8 h-8 rounded-full border border-white/10 hover:border-gold-base/50 flex items-center justify-center bg-black/60 cursor-pointer hover:bg-gold-base/10 transition-all">
                      <Mail className="w-3.5 h-3.5 text-gray-400 hover:text-white" />
                    </span>
                  </div>
                </div>
              </div>

              <div className="px-2 text-left">
                <span className="font-sans font-light text-[11px] uppercase text-gold-base tracking-[0.25em] block mb-2">
                  {member.role}
                </span>

                <h3 className="font-serif italic text-2xl font-bold text-white tracking-tight mb-4">
                  {member.name}
                </h3>

                <hr className="border-white/5 my-4" />

                <ul className="space-y-2">
                  {member.details.map((detail, idx) => (
                    <li key={idx} className="flex items-center gap-2 font-sans text-xs text-gray-500 tracking-wide">
                      <span className="w-1.5 h-1.5 rounded-full bg-gold-base" />
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
