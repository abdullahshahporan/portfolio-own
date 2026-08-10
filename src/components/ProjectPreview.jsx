import { useEffect, useRef, useState } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import { FaPause, FaPlay } from 'react-icons/fa';

const sceneAccents = [
  { primary: '#a78bfa', secondary: '#67e8f9', glow: 'rgba(139,92,246,.3)' },
  { primary: '#67e8f9', secondary: '#6ee7b7', glow: 'rgba(34,211,238,.26)' },
  { primary: '#bef264', secondary: '#67e8f9', glow: 'rgba(190,242,100,.2)' },
  { primary: '#fb7185', secondary: '#c084fc', glow: 'rgba(244,63,94,.24)' },
];

function DashboardScene({ playing, accent, index }) {
  const bars = [42, 68, 52, 86, 64, 91, 72];

  return (
    <div className="absolute inset-0 p-3 pt-12 sm:p-7 sm:pt-16">
      <div className="grid h-full grid-cols-[56px_1fr] overflow-hidden rounded-xl border border-white/10 bg-[#0b0b11]/88 shadow-2xl shadow-black/50 backdrop-blur-xl sm:grid-cols-[96px_1fr] sm:rounded-2xl">
        <div className="border-r border-white/[.07] p-2.5 sm:p-4">
          <motion.div className="h-7 w-7 rounded-lg sm:h-8 sm:w-8 sm:rounded-xl" style={{ backgroundColor: accent.primary }} animate={playing ? { rotate: [0, 6, -4, 0] } : {}} transition={{ duration: 4, repeat: Infinity }} />
          <div className="mt-5 grid gap-2.5 sm:mt-7 sm:gap-3">
            {[1, 2, 3, 4].map((item) => <div key={item} className={`h-2 rounded-full ${item === 1 ? 'w-full bg-white/20' : 'w-3/4 bg-white/[.06]'}`} />)}
          </div>
        </div>
        <div className="min-w-0 p-2.5 sm:p-5">
          <div className="flex items-center justify-between">
            <div><div className="h-2 w-20 rounded-full bg-white/20" /><div className="mt-2 h-1.5 w-12 rounded-full bg-white/[.06]" /></div>
            <motion.div className="h-8 w-8 rounded-full border border-white/10 bg-white/[.06]" animate={playing ? { boxShadow: [`0 0 0 ${accent.glow}`, `0 0 24px ${accent.glow}`, `0 0 0 ${accent.glow}`] } : {}} transition={{ duration: 2.6, repeat: Infinity }} />
          </div>
          <div className="mt-3 grid grid-cols-3 gap-1.5 sm:mt-5 sm:gap-3">
            {[64, 82, 47].map((value, cardIndex) => (
              <motion.div key={value} className="rounded-lg border border-white/[.07] bg-white/[.035] p-2 sm:rounded-xl sm:p-3"
                animate={playing ? { y: [0, cardIndex === 1 ? -3 : -1, 0] } : {}} transition={{ duration: 3 + cardIndex, repeat: Infinity }}>
                <div className="h-1.5 w-8 rounded-full bg-white/10" />
                <p className="mt-1.5 font-display text-xs font-semibold text-white sm:mt-2 sm:text-lg">{value + index}%</p>
              </motion.div>
            ))}
          </div>
          <div className="relative mt-2 h-[43%] overflow-hidden rounded-lg border border-white/[.07] bg-black/25 p-2 sm:mt-3 sm:h-[46%] sm:rounded-xl sm:p-3">
            <div className="absolute inset-0 opacity-20 [background-image:linear-gradient(rgba(255,255,255,.1)_1px,transparent_1px)] [background-size:100%_25%]" />
            <div className="relative flex h-full items-end gap-1.5 sm:gap-2">
              {bars.map((height, barIndex) => (
                <motion.div key={barIndex} className="flex-1 origin-bottom rounded-t-sm" style={{ height: `${height}%`, background: `linear-gradient(to top, ${accent.primary}40, ${accent.secondary})` }}
                  animate={playing ? { scaleY: [0.35, 1, 0.68, 1] } : { scaleY: .72 }} transition={{ duration: 3.2, delay: barIndex * .08, repeat: Infinity, repeatDelay: .35 }} />
              ))}
            </div>
            <motion.div className="absolute right-3 top-3 rounded-lg border border-white/10 bg-black/55 px-2 py-1 text-[8px] font-bold text-white backdrop-blur-md"
              animate={playing ? { opacity: [0, 1, 1, 0], y: [8, 0, 0, -5] } : { opacity: .7 }} transition={{ duration: 4, repeat: Infinity, times: [0, .15, .8, 1] }}>
              +{12 + index}% growth
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}

function MobileScene({ playing, accent, index }) {
  return (
    <div className="absolute inset-0 flex items-center justify-center px-5 pt-11">
      <motion.div className="absolute left-[9%] top-[28%] h-24 w-36 rounded-2xl border border-white/10 bg-white/[.05] backdrop-blur-xl"
        animate={playing ? { x: [0, 10, 0], y: [0, -8, 0], rotate: [-5, -2, -5] } : { rotate: -5 }} transition={{ duration: 5, repeat: Infinity }} />
      <motion.div className="relative h-[88%] w-[44%] max-w-[190px] rounded-[2rem] border border-white/15 bg-[#08080d] p-2 shadow-2xl shadow-black/60"
        animate={playing ? { y: [0, -7, 0] } : {}} transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}>
        <div className="absolute left-1/2 top-2 z-10 h-3 w-16 -translate-x-1/2 rounded-full bg-black" />
        <div className="relative h-full overflow-hidden rounded-[1.55rem] bg-gradient-to-b from-white/[.08] to-transparent p-3 pt-8">
          <div className="flex items-center justify-between"><div className="h-2 w-12 rounded-full bg-white/20" /><div className="h-6 w-6 rounded-full bg-white/10" /></div>
          <motion.div className="relative mt-4 aspect-square rounded-2xl border border-white/[.08] bg-black/25"
            animate={playing ? { boxShadow: [`0 0 0 ${accent.glow}`, `0 0 36px ${accent.glow}`, `0 0 0 ${accent.glow}`] } : {}} transition={{ duration: 3, repeat: Infinity }}>
            <motion.div className="absolute inset-[18%] rounded-full border" style={{ borderColor: accent.primary }} animate={playing ? { scale: [1, 1.14, 1], opacity: [.45, 1, .45] } : {}} transition={{ duration: 2.3, repeat: Infinity }} />
            <div className="absolute inset-[35%] rounded-full" style={{ backgroundColor: accent.secondary }} />
          </motion.div>
          <div className="mt-4 grid gap-2">
            {[78, 54, 88].map((width, itemIndex) => (
              <motion.div key={width} className="rounded-xl border border-white/[.06] bg-white/[.04] p-2"
                animate={playing ? { x: [0, itemIndex % 2 ? -2 : 2, 0] } : {}} transition={{ duration: 2.8 + itemIndex, repeat: Infinity }}>
                <div className="h-1.5 rounded-full bg-white/10" style={{ width: `${width}%` }} />
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
      <motion.div className="absolute bottom-[18%] right-[7%] rounded-xl border border-white/10 bg-[#111119]/85 px-3 py-2 text-[8px] font-bold uppercase tracking-wider text-white shadow-xl backdrop-blur-xl"
        animate={playing ? { opacity: [0, 1, 1, 0], x: [10, 0, 0, -5] } : { opacity: .8 }} transition={{ duration: 4.6, delay: .6, repeat: Infinity, times: [0, .15, .82, 1] }}>
        Sync complete · {96 + (index % 4)}%
      </motion.div>
    </div>
  );
}

function CodeScene({ playing, accent, index }) {
  const lines = [76, 48, 86, 62, 71, 39, 82];
  return (
    <div className="absolute inset-0 p-3 pt-12 sm:p-7 sm:pt-16">
      <div className="grid h-full overflow-hidden rounded-2xl border border-white/10 bg-[#09090e]/90 shadow-2xl shadow-black/50 md:grid-cols-[1fr_.42fr]">
        <div className="min-w-0 border-white/[.07] p-4 md:border-r sm:p-5">
          <div className="flex gap-1.5"><span className="h-2 w-2 rounded-full bg-rose-400/70"/><span className="h-2 w-2 rounded-full bg-amber-300/70"/><span className="h-2 w-2 rounded-full bg-emerald-400/70"/></div>
          <div className="mt-6 grid gap-3 font-mono">
            {lines.map((width, lineIndex) => (
              <motion.div key={lineIndex} className="flex items-center gap-3" initial={false}
                animate={playing ? { opacity: [0.28, 1, .72], x: [0, 3, 0] } : { opacity: .62 }} transition={{ duration: 2.5, delay: lineIndex * .13, repeat: Infinity }}>
                <span className="w-3 text-[7px] text-zinc-700">{lineIndex + 1}</span>
                <span className="h-1.5 rounded-full" style={{ width: `${width}%`, background: lineIndex % 3 === 0 ? accent.primary : 'rgba(255,255,255,.13)' }} />
              </motion.div>
            ))}
          </div>
        </div>
        <div className="hidden p-4 md:block">
          <p className="font-mono text-[8px] uppercase tracking-[.16em] text-zinc-600">Build pipeline</p>
          <div className="mt-5 grid gap-3">
            {['Compile', 'Test', 'Deploy'].map((label, itemIndex) => (
              <div key={label} className="rounded-xl border border-white/[.06] bg-white/[.035] p-3">
                <div className="flex items-center justify-between"><span className="text-[8px] text-zinc-500">{label}</span><motion.span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: accent.secondary }} animate={playing ? { opacity: [.25, 1, .25] } : {}} transition={{ delay: itemIndex * .4, duration: 1.6, repeat: Infinity }} /></div>
                <motion.div className="mt-2 h-1 origin-left rounded-full" style={{ backgroundColor: accent.primary }} animate={playing ? { scaleX: [0, 1] } : { scaleX: .75 }} transition={{ duration: 2.4, delay: itemIndex * .35, repeat: Infinity, repeatDelay: 1 }} />
              </div>
            ))}
          </div>
          <p className="mt-4 text-center font-mono text-[8px] text-zinc-700">build #{240 + index}</p>
        </div>
      </div>
    </div>
  );
}

export default function ProjectPreview({ project, index }) {
  const containerRef = useRef(null);
  const videoRef = useRef(null);
  const isInView = useInView(containerRef, { margin: '120px 0px 120px 0px' });
  const reduceMotion = useReducedMotion();
  const [enabled, setEnabled] = useState(() => typeof window !== 'undefined' && window.matchMedia('(min-width: 640px) and (prefers-reduced-motion: no-preference)').matches);
  const playing = enabled && isInView;
  const accent = sceneAccents[index % sceneAccents.length];
  const mediaVideo = project.video || (/\.(mp4|webm|ogg)(\?.*)?$/i.test(project.image || '') ? project.image : '');

  useEffect(() => {
    if (reduceMotion) setEnabled(false);
  }, [reduceMotion]);

  useEffect(() => {
    if (!videoRef.current) return;
    if (playing) videoRef.current.play().catch(() => setEnabled(false));
    else videoRef.current.pause();
  }, [playing]);

  const scene = index % 3;

  return (
    <div ref={containerRef} className="project-preview relative h-full w-full overflow-hidden" style={{ '--preview-primary': accent.primary, '--preview-secondary': accent.secondary }}>
      <div className="absolute inset-0 bg-[#0c0c13]" />
      <motion.div className="absolute -left-[10%] -top-[30%] h-[80%] w-[80%] rounded-full blur-[90px]" style={{ backgroundColor: accent.glow }} animate={playing ? { x: [0, 30, 0], scale: [1, 1.15, 1] } : {}} transition={{ duration: 8, repeat: Infinity }} />
      <div className="absolute inset-0 opacity-25 [background-image:linear-gradient(rgba(255,255,255,.07)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.07)_1px,transparent_1px)] [background-size:38px_38px] [mask-image:linear-gradient(to_bottom,black,transparent_90%)]" />

      {mediaVideo ? (
        <video ref={videoRef} src={mediaVideo} poster={project.video && project.image ? project.image : undefined} muted loop playsInline preload="metadata" className="absolute inset-0 h-full w-full object-cover" aria-label={`${project.title} project preview`} />
      ) : project.image ? (
        <motion.img src={project.image} alt={`${project.title} preview`} className="absolute inset-0 h-full w-full object-cover"
          animate={playing ? { scale: [1, 1.06], x: ['0%', '-1.5%'] } : { scale: 1.02 }} transition={{ duration: 7, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }} />
      ) : scene === 0 ? <DashboardScene playing={playing} accent={accent} index={index} /> : scene === 1 ? <MobileScene playing={playing} accent={accent} index={index} /> : <CodeScene playing={playing} accent={accent} index={index} />}

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/25" />
      <div className="absolute inset-x-4 top-4 z-10 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 rounded-full border border-white/10 bg-black/35 px-3 py-1.5 backdrop-blur-xl">
          <span className="relative flex h-1.5 w-1.5"><span className={`absolute inline-flex h-full w-full rounded-full bg-rose-400 ${playing ? 'animate-ping' : ''}`} /><span className="relative h-1.5 w-1.5 rounded-full bg-rose-400" /></span>
          <span className="font-mono text-[8px] font-bold uppercase tracking-[.16em] text-zinc-300">{mediaVideo ? 'Video demo' : 'Live preview'}</span>
        </div>
        <button type="button" onClick={(event) => { event.stopPropagation(); setEnabled((value) => !value); }} aria-label={enabled ? `Pause ${project.title} preview` : `Play ${project.title} preview`} aria-pressed={enabled}
          className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-black/40 text-[10px] text-white backdrop-blur-xl transition-all hover:scale-105 hover:border-white/30">
          {enabled ? <FaPause /> : <FaPlay className="ml-0.5" />}
        </button>
      </div>

      <div className="absolute inset-x-0 bottom-0 z-10 h-[3px] bg-white/10">
        <motion.div className="h-full origin-left" style={{ background: `linear-gradient(90deg, ${accent.primary}, ${accent.secondary})` }}
          animate={playing ? { scaleX: [0, 1] } : { scaleX: .35 }} transition={playing ? { duration: 6, repeat: Infinity, ease: 'linear' } : { duration: .2 }} />
      </div>
    </div>
  );
}
