import { useRef, useState } from 'react';
import { AnimatePresence, motion, useInView } from 'framer-motion';
import { FaExternalLinkAlt, FaGithub } from 'react-icons/fa';
import { HiArrowNarrowRight } from 'react-icons/hi';
import { usePortfolioData } from '../context/DataContext';
import { SectionHeading, TiltCard } from './VisualEffects';

const palettes = [
  { glow: 'from-violet-600/55 via-indigo-500/20 to-cyan-400/30', chip: 'bg-violet-400', ink: 'text-violet-200' },
  { glow: 'from-cyan-500/45 via-blue-600/20 to-emerald-400/30', chip: 'bg-cyan-300', ink: 'text-cyan-200' },
  { glow: 'from-lime-400/35 via-emerald-500/15 to-cyan-500/25', chip: 'bg-lime-300', ink: 'text-lime-200' },
  { glow: 'from-rose-500/40 via-fuchsia-600/20 to-violet-500/25', chip: 'bg-rose-300', ink: 'text-rose-200' },
];

function ProjectVisual({ project, index }) {
  const palette = palettes[index % palettes.length];

  if (project.image) {
    return <img src={project.image} alt="" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />;
  }

  return (
    <div className={`relative h-full w-full overflow-hidden bg-gradient-to-br ${palette.glow}`}>
      <div className="absolute inset-0 opacity-20 [background-image:linear-gradient(rgba(255,255,255,.12)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.12)_1px,transparent_1px)] [background-size:38px_38px]" />
      <div className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-white/10 blur-3xl" />
      <motion.div className="absolute inset-x-[12%] bottom-[-8%] top-[18%] origin-bottom rounded-t-2xl border border-white/15 bg-[#0d0d13]/85 p-2 shadow-2xl shadow-black/60 backdrop-blur-xl"
        whileHover={{ rotateX: -4, rotateY: 3, y: -8 }} style={{ transformPerspective: 900 }}>
        <div className="flex h-7 items-center gap-1.5 border-b border-white/[.07] px-2">
          <span className="h-1.5 w-1.5 rounded-full bg-rose-400/70" /><span className="h-1.5 w-1.5 rounded-full bg-amber-300/70" /><span className="h-1.5 w-1.5 rounded-full bg-emerald-400/70" />
          <span className="ml-auto h-1.5 w-20 rounded-full bg-white/[.08]" />
        </div>
        <div className="grid h-[calc(100%_-_1.75rem)] grid-cols-[.36fr_.64fr] gap-2 p-3">
          <div className="rounded-lg border border-white/[.06] bg-white/[.035] p-2">
            <div className={`h-6 w-6 rounded-md ${palette.chip} opacity-80`} />
            <div className="mt-5 h-1.5 w-full rounded bg-white/10" /><div className="mt-2 h-1.5 w-3/4 rounded bg-white/[.06]" /><div className="mt-2 h-1.5 w-4/5 rounded bg-white/[.06]" />
          </div>
          <div className="grid grid-rows-[.65fr_.35fr] gap-2">
            <div className="rounded-lg border border-white/[.06] bg-white/[.04] p-3">
              <div className={`h-full rounded-md bg-gradient-to-br ${palette.glow}`} />
            </div>
            <div className="grid grid-cols-2 gap-2"><div className="rounded-lg bg-white/[.05]"/><div className="rounded-lg bg-white/[.05]"/></div>
          </div>
        </div>
      </motion.div>
      <span className={`absolute left-5 top-5 font-mono text-[10px] font-bold tracking-[.16em] ${palette.ink}`}>CASE STUDY · {String(index + 1).padStart(2, '0')}</span>
    </div>
  );
}

export default function Projects() {
  const { data } = usePortfolioData();
  const [filter, setFilter] = useState('all');
  const [expanded, setExpanded] = useState(false);
  const ref = useRef(null);
  const visible = useInView(ref, { once: true, margin: '-80px' });
  const tags = ['all', ...new Set(data.projects.flatMap((project) => project.tags))].slice(0, 7);
  const filtered = filter === 'all' ? data.projects : data.projects.filter((project) => project.tags.includes(filter));
  const projects = expanded ? filtered : filtered.slice(0, 6);

  return (
    <section id="projects" ref={ref} className="section-shell soft-divider">
      <div className="section-container">
        <div className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-end">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={visible ? { opacity: 1, y: 0 } : {}} transition={{ duration: .7 }}>
            <SectionHeading eyebrow="Selected work / 03" title="Built for the" accent="real world." description="A selection of systems, products, and experiments shaped by real problems—not placeholder briefs." align="left" />
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={visible ? { opacity: 1, y: 0 } : {}} transition={{ delay: .2 }} className="mb-12 flex max-w-xl flex-wrap gap-2 lg:justify-end">
            {tags.map((tag) => (
              <button key={tag} onClick={() => { setFilter(tag); setExpanded(false); }}
                className={`rounded-full border px-4 py-2 text-xs font-bold transition-all ${filter === tag ? 'border-white bg-white text-zinc-950' : 'border-white/[.08] bg-white/[.03] text-zinc-500 hover:border-white/20 hover:text-white'}`}>
                {tag === 'all' ? 'All work' : tag}
              </button>
            ))}
          </motion.div>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          <AnimatePresence mode="popLayout">
            {projects.map((project, index) => (
              <motion.article key={project.id} layout initial={{ opacity: 0, y: 28, scale: .98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, scale: .96 }} transition={{ duration: .55, delay: index * .055 }}
                className={index === 0 || index === 3 ? 'md:col-span-2' : ''}>
                <TiltCard className={`glass-panel group overflow-hidden rounded-[2rem] ${index === 0 || index === 3 ? 'lg:grid lg:grid-cols-[1.1fr_.9fr]' : ''}`} intensity={4}>
                  <div className={`relative overflow-hidden ${index === 0 || index === 3 ? 'min-h-[310px] lg:min-h-[430px]' : 'h-[290px]'}`}>
                    <ProjectVisual project={project} index={index} />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                    {project.featured && <span className="absolute right-4 top-4 rounded-full border border-white/15 bg-black/35 px-3 py-1.5 text-[9px] font-bold uppercase tracking-[.16em] text-white backdrop-blur-lg">Featured</span>}
                  </div>

                  <div className={`flex flex-col p-6 sm:p-8 ${index === 0 || index === 3 ? 'justify-center lg:p-10' : ''}`} data-depth="1">
                    <div className="flex flex-wrap gap-2">
                      {project.tags.slice(0, 4).map((tag) => <span key={tag} className="font-mono text-[9px] font-bold uppercase tracking-[.15em] text-zinc-500">{tag}</span>)}
                    </div>
                    <h3 className={`mt-5 font-display font-semibold leading-tight tracking-[-.035em] text-white ${index === 0 || index === 3 ? 'text-3xl sm:text-4xl' : 'text-2xl'}`}>{project.title}</h3>
                    <p className="mt-4 text-sm leading-7 text-zinc-500">{project.description}</p>
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

        {filtered.length > 6 && (
          <div className="mt-10 text-center">
            <button onClick={() => setExpanded((value) => !value)} className="secondary-button">{expanded ? 'Show selected projects' : `Explore all ${filtered.length} projects`}</button>
          </div>
        )}
      </div>
    </section>
  );
}
