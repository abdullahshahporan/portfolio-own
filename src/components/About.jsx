import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { HiArrowNarrowRight, HiCode, HiDeviceMobile, HiLightBulb, HiTemplate } from 'react-icons/hi';
import { usePortfolioData } from '../context/DataContext';
import { SectionHeading, TiltCard } from './VisualEffects';

const serviceIcons = { web: HiTemplate, mobile: HiDeviceMobile, backend: HiCode, design: HiLightBulb };

export default function About() {
  const { data } = usePortfolioData();
  const { about, personal, services } = data;
  const ref = useRef(null);
  const visible = useInView(ref, { once: true, margin: '-90px' });

  return (
    <section id="about" ref={ref} className="section-shell">
      <div className="section-container">
        <motion.div initial={{ opacity: 0, y: 35 }} animate={visible ? { opacity: 1, y: 0 } : {}} transition={{ duration: .75 }}>
          <SectionHeading eyebrow="About / 01" title="Engineering with" accent="intent." description="I care about the entire product experience—from the first idea and interface detail to the architecture that keeps it reliable." align="left" />
        </motion.div>

        <div className="grid gap-6 lg:grid-cols-[1.15fr_.85fr]">
          <motion.div initial={{ opacity: 0, x: -30 }} animate={visible ? { opacity: 1, x: 0 } : {}} transition={{ duration: .75, delay: .15 }}
            className="glass-panel edge-glow relative overflow-hidden rounded-[2rem] p-7 sm:p-10 lg:p-12">
            <div className="absolute -right-24 -top-24 h-64 w-64 rounded-full bg-primary-500/10 blur-3xl" />
            <div className="relative max-w-2xl">
              <span className="mb-8 inline-flex rounded-full border border-white/10 bg-white/5 px-3 py-1 font-mono text-[10px] uppercase tracking-[.18em] text-zinc-400">The person behind the code</span>
              <p className="font-display text-2xl font-medium leading-[1.45] tracking-[-.025em] text-zinc-100 sm:text-3xl">
                {about.description}
              </p>
              <div className="mt-10 grid gap-3 sm:grid-cols-2">
                {about.highlights.map((highlight, index) => (
                  <motion.div key={highlight} initial={{ opacity: 0, y: 16 }} animate={visible ? { opacity: 1, y: 0 } : {}} transition={{ delay: .3 + index * .08 }}
                    className="flex gap-3 rounded-2xl border border-white/[.06] bg-black/20 p-4 text-sm leading-6 text-zinc-400">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gradient-to-r from-primary-400 to-cyan-300 shadow-[0_0_12px_rgba(103,232,249,.65)]" />
                    {highlight}
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 30 }} animate={visible ? { opacity: 1, x: 0 } : {}} transition={{ duration: .75, delay: .22 }} className="grid gap-6">
            <TiltCard className="glass-panel-strong overflow-hidden rounded-[2rem] p-7 sm:p-8" intensity={7}>
              <div className="flex items-center justify-between" data-depth="1">
                <span className="text-xs font-bold uppercase tracking-[.18em] text-zinc-500">My approach</span>
                <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-primary-300">✦</span>
              </div>
              <p className="mt-12 font-display text-3xl font-semibold leading-tight tracking-[-.04em] text-white" data-depth="2">
                Useful first.<br />Beautiful always.<br /><span className="text-zinc-600">Built to last.</span>
              </p>
              <div className="mt-10 h-px bg-gradient-to-r from-primary-400/50 via-cyan-300/20 to-transparent" />
              <p className="mt-5 text-sm leading-7 text-zinc-500">Every interface should earn attention through clarity, craft, and a little bit of delight.</p>
            </TiltCard>

            <div className="glass-panel rounded-[2rem] p-7 sm:p-8">
              <p className="text-xs font-bold uppercase tracking-[.18em] text-zinc-500">Currently studying</p>
              <p className="mt-3 font-display text-xl font-semibold text-white">{personal.department}</p>
              <p className="mt-2 text-sm leading-6 text-zinc-500">{personal.university}</p>
            </div>
          </motion.div>
        </div>

        <div className="mt-20 flex items-end justify-between gap-6">
          <div>
            <p className="font-mono text-xs font-bold uppercase tracking-[.18em] text-primary-300">Capabilities</p>
            <h3 className="mt-3 font-display text-3xl font-semibold tracking-tight text-white sm:text-4xl">What I bring to the table</h3>
          </div>
          <span className="hidden text-xs uppercase tracking-[.18em] text-zinc-600 sm:block">End-to-end product thinking</span>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {services.map((service, index) => {
            const Icon = serviceIcons[service.icon] || HiCode;
            return (
              <motion.div key={service.id} initial={{ opacity: 0, y: 28 }} animate={visible ? { opacity: 1, y: 0 } : {}} transition={{ delay: .3 + index * .1 }}>
                <TiltCard className="glass-panel group h-full rounded-3xl p-6 transition-colors hover:border-white/20" intensity={6}>
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/[.06] text-xl text-primary-300 transition-all group-hover:bg-primary-500 group-hover:text-white" data-depth="2"><Icon /></div>
                  <p className="mt-8 font-mono text-[10px] font-bold tracking-[.18em] text-zinc-600">0{index + 1}</p>
                  <h4 className="mt-2 font-display text-xl font-semibold text-white" data-depth="1">{service.title}</h4>
                  <p className="mt-3 text-sm leading-6 text-zinc-500">{service.description}</p>
                  <HiArrowNarrowRight className="mt-7 text-xl text-zinc-600 transition-all group-hover:translate-x-2 group-hover:text-cyan-300" />
                </TiltCard>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
