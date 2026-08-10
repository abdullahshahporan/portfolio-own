import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { HiAcademicCap, HiBriefcase, HiCheck, HiOutlineCalendar } from 'react-icons/hi';
import { usePortfolioData } from '../context/DataContext';
import { SectionHeading } from './VisualEffects';

function JourneyColumn({ title, icon: Icon, items, visible, accent }) {
  return (
    <div>
      <div className="mb-7 flex items-center gap-3">
        <span className={`flex h-11 w-11 items-center justify-center rounded-2xl border ${accent === 'cyan' ? 'border-cyan-300/20 bg-cyan-300/10 text-cyan-300' : 'border-primary-400/20 bg-primary-500/10 text-primary-300'}`}><Icon size={21} /></span>
        <div><p className="font-display text-xl font-semibold text-white">{title}</p><p className="text-xs text-zinc-600">{items.length} active chapter{items.length === 1 ? '' : 's'}</p></div>
      </div>

      <div className="relative space-y-4 pl-4 before:absolute before:bottom-6 before:left-[4px] before:top-6 before:w-px before:bg-gradient-to-b before:from-white/20 before:to-transparent sm:space-y-5 sm:pl-5 sm:before:left-[5px]">
        {items.map((item, index) => {
          const details = item.achievements || item.responsibilities || [];
          return (
            <motion.article key={item.id} initial={{ opacity: 0, x: accent === 'cyan' ? 24 : -24 }} animate={visible ? { opacity: 1, x: 0 } : {}} transition={{ duration: .6, delay: .2 + index * .12 }}
              className="glass-panel group relative rounded-[1.35rem] p-5 sm:rounded-[1.75rem] sm:p-7">
              <span className={`absolute -left-[.95rem] top-8 h-2.5 w-2.5 rounded-full ring-4 ring-[#09090d] sm:-left-[1.25rem] sm:top-9 ${accent === 'cyan' ? 'bg-cyan-300 shadow-[0_0_15px_rgba(103,232,249,.7)]' : 'bg-primary-400 shadow-[0_0_15px_rgba(139,92,246,.7)]'}`} />
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <h4 className="font-display text-lg font-semibold tracking-tight text-white transition-colors group-hover:text-primary-200 sm:text-xl">{item.degree || item.role}</h4>
                  <p className="mt-1 text-sm font-medium text-zinc-400">{item.institution || item.company}</p>
                </div>
                <span className="flex shrink-0 items-center gap-2 rounded-full border border-white/[.07] bg-black/25 px-3 py-1.5 font-mono text-[10px] text-zinc-500"><HiOutlineCalendar />{item.duration}</span>
              </div>
              <p className="mt-4 text-[13px] leading-6 text-zinc-500 sm:mt-5 sm:text-sm sm:leading-7">{item.description}</p>
              {details.length > 0 && <div className="mt-5 grid gap-2">{details.map((detail) => <p key={detail} className="flex items-start gap-2.5 text-xs leading-5 text-zinc-500"><HiCheck className={`mt-1 shrink-0 ${accent === 'cyan' ? 'text-cyan-400' : 'text-primary-400'}`} />{detail}</p>)}</div>}
            </motion.article>
          );
        })}
      </div>
    </div>
  );
}

export default function Education() {
  const { data } = usePortfolioData();
  const ref = useRef(null);
  const visible = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="education" ref={ref} className="section-shell soft-divider">
      <div className="section-container">
        <motion.div initial={{ opacity: 0, y: 28 }} animate={visible ? { opacity: 1, y: 0 } : {}} transition={{ duration: .7 }}>
          <SectionHeading eyebrow="Journey / 04" title="Learning, building," accent="evolving." description="My path combines computer science fundamentals with the practical lessons that only shipping real products can teach." />
        </motion.div>
        <div className="grid gap-10 sm:gap-12 lg:grid-cols-2 lg:gap-8">
          <JourneyColumn title="Education" icon={HiAcademicCap} items={data.education} visible={visible} accent="violet" />
          <JourneyColumn title="Experience" icon={HiBriefcase} items={data.experience} visible={visible} accent="cyan" />
        </div>
      </div>
    </section>
  );
}
