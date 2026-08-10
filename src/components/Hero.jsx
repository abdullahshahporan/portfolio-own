import { useEffect, useMemo, useRef, useState } from 'react';
import { motion, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion';
import { FaGithub, FaLinkedinIn, FaFacebookF } from 'react-icons/fa';
import { HiArrowRight, HiMail, HiOutlineLocationMarker } from 'react-icons/hi';
import { usePortfolioData } from '../context/DataContext';
import { TiltCard } from './VisualEffects';

const reveal = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.75, ease: [0.16, 1, 0.3, 1] } },
};

export default function Hero() {
  const { data } = usePortfolioData();
  const { personal, social, about } = data;
  const ref = useRef(null);
  const reduceMotion = useReducedMotion();
  const [compactLayout, setCompactLayout] = useState(() => typeof window !== 'undefined' && window.matchMedia('(max-width: 1023px)').matches);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 140]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.72], [1, 0]);
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const sceneX = useSpring(pointerX, { stiffness: 80, damping: 24 });
  const sceneY = useSpring(pointerY, { stiffness: 80, damping: 24 });

  useEffect(() => {
    const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    if (!finePointer || reduceMotion) return undefined;
    const onMove = (event) => {
      pointerX.set((event.clientX / window.innerWidth - 0.5) * 24);
      pointerY.set((event.clientY / window.innerHeight - 0.5) * 18);
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    return () => window.removeEventListener('pointermove', onMove);
  }, [pointerX, pointerY, reduceMotion]);

  useEffect(() => {
    const compactQuery = window.matchMedia('(max-width: 1023px)');
    const syncLayout = (event) => setCompactLayout(event.matches);
    compactQuery.addEventListener('change', syncLayout);
    return () => compactQuery.removeEventListener('change', syncLayout);
  }, []);

  const socialItems = useMemo(() => [
    social.github && { label: 'GitHub', href: social.github, icon: <FaGithub /> },
    social.linkedin && { label: 'LinkedIn', href: social.linkedin, icon: <FaLinkedinIn /> },
    social.facebook && { label: 'Facebook', href: social.facebook, icon: <FaFacebookF /> },
    personal.email && { label: 'Email', href: `mailto:${personal.email}`, icon: <HiMail /> },
  ].filter(Boolean), [personal.email, social]);

  const specialties = ['FULL-STACK SYSTEMS', 'MOBILE EXPERIENCES', 'AI-POWERED PRODUCTS', 'SCALABLE BACKENDS'];

  return (
    <section id="home" ref={ref} className="relative overflow-hidden pt-24 sm:pt-32 lg:min-h-[100svh]">
      <motion.div className="section-container relative z-10" style={compactLayout ? undefined : { y: contentY, opacity: contentOpacity }}>
        <div className="grid items-center gap-10 pb-12 sm:gap-14 sm:pb-16 lg:min-h-[calc(100svh-9rem)] lg:grid-cols-[1.12fr_.88fr] lg:gap-16">
          <motion.div initial="hidden" animate="visible" transition={{ staggerChildren: 0.1 }} className="relative z-20 text-center lg:text-left">
            <motion.div variants={reveal} className="mb-6 flex flex-wrap items-center justify-center gap-3 sm:mb-8 lg:justify-start">
              <span className="glass-panel inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold text-zinc-200">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-lime-300 opacity-60" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-lime-300" />
                </span>
                Available for ambitious projects
              </span>
              <span className="hidden text-xs font-medium uppercase tracking-[.18em] text-zinc-500 sm:inline">Based in Bangladesh · Working globally</span>
            </motion.div>

            <motion.p variants={reveal} className="mb-3 font-mono text-xs font-semibold uppercase tracking-[.22em] text-primary-300">
              Hello, I’m {personal.name.split(' ')[0]}
            </motion.p>
            <motion.h1 variants={reveal} className="mx-auto max-w-4xl text-balance font-display text-[clamp(2.75rem,13.5vw,7.4rem)] font-semibold leading-[.92] tracking-[-.06em] text-white sm:leading-[.88] sm:tracking-[-.07em] lg:mx-0">
              I build digital
              <span className="block bg-gradient-to-r from-white via-primary-300 to-cyan-300 bg-clip-text text-transparent">products that feel</span>
              <span className="relative inline-block italic font-light text-zinc-500">
                alive.
                <svg className="absolute -bottom-2 left-0 h-3 w-full" viewBox="0 0 300 12" preserveAspectRatio="none" aria-hidden="true">
                  <motion.path d="M2 8 C70 1, 220 1, 298 7" fill="none" stroke="url(#heroLine)" strokeWidth="3" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 1, duration: 1.1 }} />
                  <defs><linearGradient id="heroLine"><stop stopColor="#8b5cf6"/><stop offset="1" stopColor="#67e8f9"/></linearGradient></defs>
                </svg>
              </span>
            </motion.h1>

            <motion.p variants={reveal} className="mx-auto mt-7 max-w-xl text-[15px] leading-7 text-zinc-400 sm:mt-8 sm:text-lg sm:leading-8 lg:mx-0">
              {personal.title} turning complex ideas into refined web, mobile, and intelligent experiences—engineered for real people and real impact.
            </motion.p>

            <motion.div variants={reveal} className="mt-8 grid gap-3 sm:mt-9 sm:flex sm:flex-wrap lg:justify-start">
              <a href="#projects" className="primary-button w-full sm:w-auto" onClick={(e) => { e.preventDefault(); document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' }); }}>
                Explore selected work <HiArrowRight className="text-lg" />
              </a>
              <a href="#contact" className="secondary-button w-full sm:w-auto" onClick={(e) => { e.preventDefault(); document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' }); }}>
                Start a conversation
              </a>
            </motion.div>

            <motion.div variants={reveal} className="mt-8 flex items-center justify-center gap-3 sm:mt-10 lg:justify-start">
              <span className="mr-2 text-[10px] font-bold uppercase tracking-[.2em] text-zinc-600">Connect</span>
              {socialItems.map((item) => (
                <motion.a key={item.label} href={item.href} target={item.href.startsWith('mailto:') ? undefined : '_blank'} rel="noreferrer" aria-label={item.label}
                  whileHover={{ y: -4, scale: 1.05 }} whileTap={{ scale: .95 }}
                  className="glass-panel flex h-11 w-11 items-center justify-center rounded-full text-zinc-400 transition-colors hover:text-white">
                  {item.icon}
                </motion.a>
              ))}
            </motion.div>
          </motion.div>

          <motion.div style={{ x: sceneX, y: sceneY }} className="relative mx-auto w-full max-w-[360px] sm:max-w-[500px] lg:mx-0 lg:ml-auto">
            <div className="absolute -inset-20 rounded-full bg-primary-500/10 blur-[90px]" />
            <motion.div className="absolute left-0 top-12 hidden h-28 w-28 rounded-3xl border border-white/10 bg-primary-500/10 backdrop-blur-xl sm:block"
              animate={{ rotate: [8, 14, 8], y: [0, -12, 0] }} transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }} />
            <motion.div className="absolute -right-5 bottom-24 hidden h-20 w-20 rounded-full border border-cyan-300/20 bg-cyan-300/10 backdrop-blur-xl sm:block"
              animate={{ y: [0, 14, 0], scale: [1, 1.08, 1] }} transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }} />

            <TiltCard intensity={8} className="glass-panel-strong edge-glow relative z-10 overflow-hidden rounded-[1.75rem] p-2.5 sm:rounded-[2.4rem] sm:p-3">
              <div className="relative aspect-[4/5] overflow-hidden rounded-[1.35rem] bg-zinc-900 sm:rounded-[1.85rem]">
                <img src={personal.avatar} alt={personal.name} className="h-full w-full object-cover object-top grayscale-[12%] contrast-[1.04]" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0c0c12] via-transparent to-primary-500/5" />
                <div className="absolute inset-x-3 bottom-3 rounded-2xl border border-white/10 bg-black/50 p-3 text-left backdrop-blur-xl sm:inset-x-5 sm:bottom-5 sm:p-4" data-depth="2">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-[.16em] text-primary-300">Currently</p>
                      <p className="mt-1 font-display text-sm font-semibold text-white sm:text-lg">Building meaningful software</p>
                    </div>
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white text-zinc-950 sm:h-11 sm:w-11">↗</span>
                  </div>
                </div>
              </div>
            </TiltCard>

            <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: .8, duration: .7 }}
              className="glass-panel absolute -right-3 top-14 z-20 hidden rounded-2xl px-4 py-3 sm:-right-12 sm:block" data-depth="2">
              <p className="text-[10px] font-bold uppercase tracking-[.16em] text-zinc-500">Focus</p>
              <p className="mt-1 text-sm font-semibold text-white">Full-stack × AI</p>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1, duration: .7 }}
              className="glass-panel absolute -left-3 bottom-16 z-20 hidden rounded-2xl px-4 py-3 sm:-left-12 sm:block" data-depth="2">
              <p className="flex items-center gap-2 text-xs font-medium text-zinc-300"><HiOutlineLocationMarker className="text-cyan-300" /> {personal.location}</p>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      <div className="relative z-20 overflow-hidden border-y border-white/[.06] bg-white/[.018] py-3 backdrop-blur-md sm:py-4">
        <div className="marquee-track">
          {[...specialties, ...specialties].map((item, index) => (
            <div key={`${item}-${index}`} className="flex items-center">
              <span className="px-5 font-mono text-[9px] font-semibold tracking-[.18em] text-zinc-500 sm:px-7 sm:text-[11px] sm:tracking-[.2em]">{item}</span>
              <span className="text-primary-400">✦</span>
            </div>
          ))}
        </div>
      </div>

      <div className="section-container relative z-20 grid grid-cols-2 border-b border-white/[.06] sm:grid-cols-4">
        {about.stats.map((stat, index) => (
          <div key={`${stat.label}-${index}`} className={`py-6 text-center sm:py-7 ${index % 2 ? 'border-l border-white/[.06]' : ''} ${index >= 2 ? 'border-t border-white/[.06]' : ''} ${index % 4 ? 'sm:border-l sm:border-white/[.06]' : 'sm:border-l-0'} ${index < 4 ? 'sm:border-t-0' : ''}`}>
            <p className="font-display text-2xl font-semibold text-white sm:text-3xl">{stat.value}</p>
            <p className="mt-1 text-[10px] font-bold uppercase tracking-[.15em] text-zinc-600">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
