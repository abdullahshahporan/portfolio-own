import { useEffect, useRef, useState } from 'react';
import { motion, useInView, useMotionValueEvent, useScroll, useSpring, useTransform } from 'framer-motion';
import { HiArrowNarrowRight, HiCode, HiDeviceMobile, HiLightBulb, HiTemplate } from 'react-icons/hi';
import { usePortfolioData } from '../context/DataContext';
import { SectionHeading, TiltCard } from './VisualEffects';

const serviceIcons = { web: HiTemplate, mobile: HiDeviceMobile, backend: HiCode, design: HiLightBulb };

function ServiceCard({ service, index, compact = false }) {
  const Icon = serviceIcons[service.icon] || HiCode;

  return (
    <TiltCard className={`glass-panel group flex h-full flex-col rounded-3xl p-5 transition-colors hover:border-white/20 sm:p-6 ${compact ? '' : 'md:min-h-0'}`} intensity={6}>
      <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/[.06] text-xl text-primary-300 transition-all group-hover:bg-primary-500 group-hover:text-white" data-depth="2"><Icon /></div>
      <p className="mt-7 font-mono text-[10px] font-bold tracking-[.18em] text-zinc-600">0{index + 1}</p>
      <h4 className="mt-2 font-display text-xl font-semibold text-white" data-depth="1">{service.title}</h4>
      <p className="mt-3 text-sm leading-6 text-zinc-500">{service.description}</p>
      <HiArrowNarrowRight className="mt-auto pt-6 text-2xl text-zinc-600 transition-all group-hover:translate-x-2 group-hover:text-cyan-300" />
    </TiltCard>
  );
}

function MobileServicesRail({ services }) {
  const railRef = useRef(null);
  const trackRef = useRef(null);
  const [travel, setTravel] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const { scrollYProgress } = useScroll({ target: railRef, offset: ['start start', 'end end'] });
  const rawX = useTransform(scrollYProgress, [0, 1], [0, -travel]);
  const x = useSpring(rawX, { stiffness: 150, damping: 28, mass: .35 });
  const progressScale = useSpring(scrollYProgress, { stiffness: 140, damping: 28 });

  useEffect(() => {
    const measure = () => {
      if (!railRef.current || !trackRef.current) return;
      setTravel(Math.max(0, trackRef.current.scrollWidth - railRef.current.clientWidth));
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(railRef.current);
    observer.observe(trackRef.current);
    window.addEventListener('orientationchange', measure);
    return () => {
      observer.disconnect();
      window.removeEventListener('orientationchange', measure);
    };
  }, [services.length]);

  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    setActiveIndex(Math.min(services.length - 1, Math.max(0, Math.round(latest * (services.length - 1)))));
  });

  return (
    <div ref={railRef} className="relative mt-12 md:hidden" style={{ height: `${Math.max(220, services.length * 58 + 42)}svh` }}>
      <div className="sticky top-0 flex h-[100svh] flex-col justify-center overflow-hidden pb-5 pt-20">
        <div className="mb-6 flex items-end justify-between gap-5">
          <div>
            <p className="font-mono text-[10px] font-bold uppercase tracking-[.18em] text-primary-300">Capabilities</p>
            <h3 className="mt-2 max-w-[15rem] font-display text-2xl font-semibold leading-tight tracking-tight text-white">What I bring to the table</h3>
          </div>
          <div className="text-right">
            <p className="font-mono text-[10px] font-bold text-primary-300">0{activeIndex + 1} / 0{services.length}</p>
            <p className="mt-1 text-[8px] font-bold uppercase tracking-[.15em] text-zinc-700">Scroll</p>
          </div>
        </div>

        <div className="overflow-visible">
          <motion.div ref={trackRef} style={{ x }} className="flex w-max gap-4 will-change-transform">
            {services.map((service, index) => (
              <div key={service.id} className="h-[clamp(275px,48svh,360px)] w-[calc(100vw-2.75rem)] max-w-[430px] shrink-0">
                <ServiceCard service={service} index={index} compact />
              </div>
            ))}
          </motion.div>
        </div>

        <div className="mt-6 flex items-center gap-3">
          <span className="font-mono text-[8px] font-bold uppercase tracking-[.15em] text-zinc-700">Progress</span>
          <div className="h-px flex-1 overflow-hidden bg-white/[.08]">
            <motion.div style={{ scaleX: progressScale }} className="h-full origin-left bg-gradient-to-r from-primary-400 to-cyan-300" />
          </div>
          <div className="flex gap-1.5">
            {services.map((service, index) => <span key={service.id} className={`h-1.5 rounded-full transition-all duration-300 ${index === activeIndex ? 'w-5 bg-primary-300' : 'w-1.5 bg-white/15'}`} />)}
          </div>
        </div>
      </div>
    </div>
  );
}

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

        <div className="grid gap-4 sm:gap-6 lg:grid-cols-[1.15fr_.85fr]">
          <motion.div initial={{ opacity: 0, x: -30 }} animate={visible ? { opacity: 1, x: 0 } : {}} transition={{ duration: .75, delay: .15 }}
            className="glass-panel edge-glow relative overflow-hidden rounded-[1.5rem] p-5 sm:rounded-[2rem] sm:p-10 lg:p-12">
            <div className="absolute -right-24 -top-24 h-64 w-64 rounded-full bg-primary-500/10 blur-3xl" />
            <div className="relative max-w-2xl">
              <span className="mb-8 inline-flex rounded-full border border-white/10 bg-white/5 px-3 py-1 font-mono text-[10px] uppercase tracking-[.18em] text-zinc-400">The person behind the code</span>
              <p className="font-display text-xl font-medium leading-[1.5] tracking-[-.02em] text-zinc-100 sm:text-3xl sm:leading-[1.45]">
                {about.description}
              </p>
              <div className="mt-10 grid gap-3 sm:grid-cols-2">
                {about.highlights.map((highlight, index) => (
                  <motion.div key={highlight} initial={{ opacity: 0, y: 16 }} animate={visible ? { opacity: 1, y: 0 } : {}} transition={{ delay: .3 + index * .08 }}
                    className="flex gap-3 rounded-xl border border-white/[.06] bg-black/20 p-3.5 text-[13px] leading-6 text-zinc-400 sm:rounded-2xl sm:p-4 sm:text-sm">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gradient-to-r from-primary-400 to-cyan-300 shadow-[0_0_12px_rgba(103,232,249,.65)]" />
                    {highlight}
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 30 }} animate={visible ? { opacity: 1, x: 0 } : {}} transition={{ duration: .75, delay: .22 }} className="grid gap-6">
            <TiltCard className="glass-panel-strong overflow-hidden rounded-[1.5rem] p-5 sm:rounded-[2rem] sm:p-8" intensity={7}>
              <div className="flex items-center justify-between" data-depth="1">
                <span className="text-xs font-bold uppercase tracking-[.18em] text-zinc-500">My approach</span>
                <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-primary-300">✦</span>
              </div>
              <p className="mt-9 font-display text-[1.7rem] font-semibold leading-tight tracking-[-.04em] text-white sm:mt-12 sm:text-3xl" data-depth="2">
                Useful first.<br />Beautiful always.<br /><span className="text-zinc-600">Built to last.</span>
              </p>
              <div className="mt-10 h-px bg-gradient-to-r from-primary-400/50 via-cyan-300/20 to-transparent" />
              <p className="mt-5 text-sm leading-7 text-zinc-500">Every interface should earn attention through clarity, craft, and a little bit of delight.</p>
            </TiltCard>

            <div className="glass-panel rounded-[1.5rem] p-5 sm:rounded-[2rem] sm:p-8">
              <p className="text-xs font-bold uppercase tracking-[.18em] text-zinc-500">Currently studying</p>
              <p className="mt-3 font-display text-xl font-semibold text-white">{personal.department}</p>
              <p className="mt-2 text-sm leading-6 text-zinc-500">{personal.university}</p>
            </div>
          </motion.div>
        </div>

        <MobileServicesRail services={services} />

        <div className="mt-20 hidden items-end justify-between gap-6 md:flex">
          <div>
            <p className="font-mono text-xs font-bold uppercase tracking-[.18em] text-primary-300">Capabilities</p>
            <h3 className="mt-3 font-display text-4xl font-semibold tracking-tight text-white">What I bring to the table</h3>
          </div>
          <span className="text-xs font-bold uppercase tracking-[.18em] text-zinc-600">End-to-end product thinking</span>
        </div>

        <div className="mt-7 hidden gap-4 md:grid md:grid-cols-2 lg:grid-cols-4">
          {services.map((service, index) => (
            <motion.div key={service.id} initial={{ opacity: 0, y: 28 }} animate={visible ? { opacity: 1, y: 0 } : {}} transition={{ delay: .3 + index * .1 }}>
              <ServiceCard service={service} index={index} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
