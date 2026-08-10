import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { HiSparkles } from 'react-icons/hi';
import { usePortfolioData } from '../context/DataContext';
import { SectionHeading, TiltCard } from './VisualEffects';

const accents = [
  { gradient: 'from-primary-500 to-violet-300', text: 'text-primary-300', glow: 'bg-primary-500/10' },
  { gradient: 'from-cyan-400 to-blue-500', text: 'text-cyan-300', glow: 'bg-cyan-400/10' },
  { gradient: 'from-lime-300 to-emerald-500', text: 'text-lime-300', glow: 'bg-lime-300/10' },
];

export default function Skills() {
  const { data } = usePortfolioData();
  const ref = useRef(null);
  const visible = useInView(ref, { once: true, margin: '-90px' });
  const skillNames = data.skills.flatMap((group) => group.items.map((item) => item.name));

  return (
    <section id="skills" ref={ref} className="section-shell soft-divider overflow-hidden">
      <div className="section-container">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={visible ? { opacity: 1, y: 0 } : {}} transition={{ duration: .7 }}>
          <SectionHeading eyebrow="Expertise / 02" title="Tools are temporary." accent="Thinking scales." description="A modern toolkit backed by strong fundamentals, product judgment, and the ability to learn fast." />
        </motion.div>

        <p className="mb-3 text-right font-mono text-[9px] font-bold uppercase tracking-[.16em] text-zinc-600 md:hidden">Swipe to explore →</p>
        <div className="mobile-scroll flex gap-4 overflow-x-auto pb-3 md:grid md:grid-cols-2 md:overflow-visible md:pb-0 lg:grid-cols-3">
          {data.skills.map((category, categoryIndex) => {
            const accent = accents[categoryIndex % accents.length];
            return (
              <motion.div key={category.category} initial={{ opacity: 0, y: 35 }} animate={visible ? { opacity: 1, y: 0 } : {}} transition={{ duration: .65, delay: categoryIndex * .12 }} className="mobile-snap min-w-[86%] md:min-w-0">
                <TiltCard className="glass-panel group h-full min-h-[360px] overflow-hidden rounded-[1.5rem] p-5 sm:min-h-[390px] sm:rounded-[2rem] sm:p-8 lg:min-h-[410px]" intensity={6}>
                  <div className={`absolute -right-16 -top-16 h-44 w-44 rounded-full ${accent.glow} blur-3xl transition-transform duration-700 group-hover:scale-150`} />
                  <div className="relative flex items-center justify-between" data-depth="2">
                    <span className={`flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${accent.gradient} text-lg font-black text-zinc-950 shadow-xl`}>
                      {String(categoryIndex + 1).padStart(2, '0')}
                    </span>
                    <HiSparkles className={`text-xl ${accent.text}`} />
                  </div>
                  <h3 className="relative mt-9 max-w-[12rem] font-display text-[1.35rem] font-semibold leading-tight text-white sm:mt-12 sm:text-2xl" data-depth="1">{category.category}</h3>
                  <p className="relative mt-3 text-sm text-zinc-600">{category.items.length} technologies in active use</p>

                  <div className="relative mt-8 flex flex-wrap gap-2">
                    {category.items.map((skill, skillIndex) => (
                      <motion.span key={skill.name} initial={{ opacity: 0, scale: .85 }} animate={visible ? { opacity: 1, scale: 1 } : {}} transition={{ delay: .3 + categoryIndex * .1 + skillIndex * .035 }}
                        whileHover={{ y: -3, scale: 1.04 }}
                        className="rounded-full border border-white/[.07] bg-black/25 px-3.5 py-2 text-xs font-semibold text-zinc-400 transition-colors hover:border-white/20 hover:bg-white/[.07] hover:text-white">
                        {skill.name}
                      </motion.span>
                    ))}
                  </div>

                  <div className={`absolute bottom-0 left-0 h-1 w-full bg-gradient-to-r ${accent.gradient} opacity-35`} />
                </TiltCard>
              </motion.div>
            );
          })}
        </div>
      </div>

      <div className="mt-20 hidden rotate-[-1.5deg] border-y border-white/[.08] bg-white/[.025] py-5 backdrop-blur-sm sm:block">
        <div className="marquee-track">
          {[...skillNames, ...skillNames].map((skill, index) => (
            <div key={`${skill}-${index}`} className="flex items-center">
              <span className="px-7 font-display text-xl font-semibold text-zinc-500 sm:text-2xl">{skill}</span>
              <span className="text-primary-400">✦</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
