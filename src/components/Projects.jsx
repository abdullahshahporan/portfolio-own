import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useInView } from 'framer-motion';
import { FaExternalLinkAlt, FaGithub } from 'react-icons/fa';
import { HiArrowNarrowRight } from 'react-icons/hi';
import { usePortfolioData } from '../context/DataContext';
import { SectionHeading, TiltCard } from './VisualEffects';
import ProjectPreview from './ProjectPreview';

export default function Projects() {
  const { data } = usePortfolioData();
  const [filter, setFilter] = useState('all');
  const [expanded, setExpanded] = useState(false);
  const [isMobile, setIsMobile] = useState(() => typeof window !== 'undefined' && window.matchMedia('(max-width: 639px)').matches);
  const ref = useRef(null);
  const visible = useInView(ref, { once: true, margin: '-80px' });
  const tags = ['all', ...new Set(data.projects.flatMap((project) => project.tags))].slice(0, 7);
  const filtered = filter === 'all' ? data.projects : data.projects.filter((project) => project.tags.includes(filter));
  const visibleLimit = isMobile ? 4 : 6;
  const projects = expanded ? filtered : filtered.slice(0, visibleLimit);

  useEffect(() => {
    const mobileQuery = window.matchMedia('(max-width: 639px)');
    const syncViewport = (event) => setIsMobile(event.matches);
    mobileQuery.addEventListener('change', syncViewport);
    return () => mobileQuery.removeEventListener('change', syncViewport);
  }, []);

  return (
    <section id="projects" ref={ref} className="section-shell soft-divider">
      <div className="section-container">
        <div className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-end">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={visible ? { opacity: 1, y: 0 } : {}} transition={{ duration: .7 }}>
            <SectionHeading eyebrow="Selected work / 03" title="Built for the" accent="real world." description="A selection of systems, products, and experiments shaped by real problems—not placeholder briefs." align="left" />
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={visible ? { opacity: 1, y: 0 } : {}} transition={{ delay: .2 }} className="mobile-scroll flex w-full max-w-xl flex-nowrap gap-2 overflow-x-auto pb-2 lg:mb-12 lg:w-auto lg:flex-wrap lg:justify-end lg:overflow-visible lg:pb-0">
            {tags.map((tag) => (
              <button key={tag} onClick={() => { setFilter(tag); setExpanded(false); }}
                className={`shrink-0 rounded-full border px-4 py-2.5 text-xs font-bold transition-all ${filter === tag ? 'border-white bg-white text-zinc-950' : 'border-white/[.08] bg-white/[.03] text-zinc-500 hover:border-white/20 hover:text-white'}`}>
                {tag === 'all' ? 'All work' : tag}
              </button>
            ))}
          </motion.div>
        </div>

        <div className="mt-7 grid gap-4 sm:mt-10 sm:gap-5 md:grid-cols-2 lg:mt-0">
          <AnimatePresence mode="popLayout">
            {projects.map((project, index) => (
              <motion.article key={project.id} layout initial={{ opacity: 0, y: 28, scale: .98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, scale: .96 }} transition={{ duration: .55, delay: index * .055 }}
                className={index === 0 || index === 3 ? 'md:col-span-2' : ''}>
                <TiltCard className={`glass-panel group overflow-hidden rounded-[1.5rem] sm:rounded-[2rem] ${index === 0 || index === 3 ? 'lg:grid lg:grid-cols-[1.1fr_.9fr]' : ''}`} intensity={4}>
                  <div className={`relative overflow-hidden ${index === 0 || index === 3 ? 'h-[245px] sm:h-[380px] lg:h-auto lg:min-h-[430px]' : 'h-[235px] sm:h-[320px]'}`}>
                    <ProjectPreview project={project} index={Math.max(0, data.projects.findIndex((item) => item.id === project.id))} />
                    {project.featured && <span className="absolute bottom-4 left-4 z-20 rounded-full border border-white/15 bg-black/45 px-3 py-1.5 text-[9px] font-bold uppercase tracking-[.16em] text-white backdrop-blur-lg">Featured</span>}
                  </div>

                  <div className={`flex flex-col p-5 sm:p-8 ${index === 0 || index === 3 ? 'justify-center lg:p-10' : ''}`} data-depth="1">
                    <div className="flex flex-wrap gap-2">
                      {project.tags.slice(0, 4).map((tag) => <span key={tag} className="font-mono text-[9px] font-bold uppercase tracking-[.15em] text-zinc-500">{tag}</span>)}
                    </div>
                    <h3 className={`mt-4 font-display font-semibold leading-tight tracking-[-.03em] text-white sm:mt-5 ${index === 0 || index === 3 ? 'text-[1.65rem] sm:text-4xl' : 'text-[1.4rem] sm:text-2xl'}`}>{project.title}</h3>
                    <p className="mt-3 text-[13px] leading-6 text-zinc-500 sm:mt-4 sm:text-sm sm:leading-7">{project.description}</p>
                    <div className="mt-7 flex flex-wrap items-center gap-3">
                      {project.github && <a href={project.github} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[.04] px-4 py-2 text-xs font-bold text-zinc-300 transition-colors hover:bg-white hover:text-zinc-950"><FaGithub /> Source</a>}
                      {project.live && <a href={project.live} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full bg-primary-500/15 px-4 py-2 text-xs font-bold text-primary-200 transition-colors hover:bg-primary-500 hover:text-white"><FaExternalLinkAlt className="text-[10px]" /> Live product</a>}
                      <HiArrowNarrowRight className="ml-auto hidden text-xl text-zinc-700 transition-all group-hover:translate-x-2 group-hover:text-cyan-300 sm:block" />
                    </div>
                  </div>
                </TiltCard>
              </motion.article>
            ))}
          </AnimatePresence>
        </div>

        {filtered.length > visibleLimit && (
          <div className="mt-10 text-center">
            <button onClick={() => setExpanded((value) => !value)} className="secondary-button">{expanded ? 'Show fewer projects' : `Explore all ${filtered.length} projects`}</button>
          </div>
        )}
      </div>
    </section>
  );
}
