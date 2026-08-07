import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useInView } from 'framer-motion';
import { FaFacebookF, FaGithub, FaInstagram, FaLinkedinIn } from 'react-icons/fa';
import { HiArrowNarrowRight, HiLocationMarker, HiMail, HiPhone, HiX } from 'react-icons/hi';
import { usePortfolioData } from '../context/DataContext';
import { TiltCard } from './VisualEffects';

export default function Contact() {
  const { data } = usePortfolioData();
  const { personal, social } = data;
  const ref = useRef(null);
  const visible = useInView(ref, { once: true, margin: '-80px' });
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [state, setState] = useState('idle');
  const [isOpen, setIsOpen] = useState(false);
  const nameInputRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return undefined;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const focusTimer = window.setTimeout(() => nameInputRef.current?.focus(), 350);
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') setIsOpen(false);
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      window.clearTimeout(focusTimer);
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  const submit = async (event) => {
    event.preventDefault();
    if (!data.web3formsKey) {
      window.location.href = `mailto:${personal.email}?subject=${encodeURIComponent(form.subject || 'Portfolio enquiry')}&body=${encodeURIComponent(`Hi Abdullah,\n\n${form.message}\n\nFrom: ${form.name} (${form.email})`)}`;
      setState('sent');
      return;
    }
    setState('sending');
    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ access_key: data.web3formsKey, ...form, from_name: 'Portfolio Contact Form' }),
      });
      const result = await response.json();
      if (!result.success) throw new Error('Submission failed');
      setState('sent');
      setForm({ name: '', email: '', subject: '', message: '' });
    } catch { setState('error'); }
  };

  const update = (field) => (event) => setForm((current) => ({ ...current, [field]: event.target.value }));
  const contacts = [
    { icon: HiMail, label: 'Email', value: personal.email, href: `mailto:${personal.email}` },
    { icon: HiLocationMarker, label: 'Location', value: personal.location },
    ...(personal.phone ? [{ icon: HiPhone, label: 'Phone', value: personal.phone, href: `tel:${personal.phone}` }] : []),
  ];
  const socials = [
    { icon: FaGithub, label: 'GitHub', href: social.github }, { icon: FaLinkedinIn, label: 'LinkedIn', href: social.linkedin },
    { icon: FaFacebookF, label: 'Facebook', href: social.facebook }, { icon: FaInstagram, label: 'Instagram', href: social.instagram },
  ].filter((item) => item.href);
  const socialStyles = {
    GitHub: 'hover:border-white/35 hover:bg-white/10 hover:text-white hover:shadow-[0_0_30px_rgba(255,255,255,.14)]',
    LinkedIn: 'hover:border-[#5aa7ff]/45 hover:bg-[#0a66c2]/20 hover:text-[#7db9ff] hover:shadow-[0_0_32px_rgba(10,102,194,.28)]',
    Facebook: 'hover:border-[#6ca8ff]/45 hover:bg-[#1877f2]/20 hover:text-[#8bbaff] hover:shadow-[0_0_32px_rgba(24,119,242,.28)]',
    Instagram: 'hover:border-[#d777ff]/45 hover:bg-fuchsia-500/15 hover:text-[#ee9cff] hover:shadow-[0_0_32px_rgba(217,70,239,.25)]',
  };

  return (
    <>
      <section id="contact" ref={ref} className="section-shell soft-divider overflow-hidden">
        <div className="section-container">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={visible ? { opacity: 1, y: 0 } : {}} transition={{ duration: .75 }}
          className="relative mb-8 overflow-hidden rounded-[2.5rem] border border-white/10 bg-gradient-to-br from-primary-600/25 via-white/[.04] to-cyan-400/10 px-6 py-14 text-center shadow-2xl shadow-primary-950/30 sm:px-10 sm:py-20">
          <div className="absolute left-1/2 top-0 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary-400/25 blur-[90px]" />
          <p className="relative font-mono text-xs font-bold uppercase tracking-[.2em] text-primary-200">Have an idea in mind?</p>
          <h2 className="relative mx-auto mt-5 max-w-4xl font-display text-[clamp(2.8rem,7vw,6.4rem)] font-semibold leading-[.94] tracking-[-.065em] text-white">Let’s make something <span className="font-light italic text-zinc-400">remarkable.</span></h2>
          <p className="relative mx-auto mt-6 max-w-xl text-sm leading-7 text-zinc-400 sm:text-base">I’m open to thoughtful collaborations, internships, freelance work, and conversations about technology that can move people forward.</p>
          <button type="button" onClick={() => setIsOpen(true)} className="primary-button relative mt-8">Start with an email <HiArrowNarrowRight className="text-lg" /></button>
        </motion.div>
        </div>
      </section>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-start overflow-y-auto bg-black/75 p-3 backdrop-blur-xl sm:p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: .25 }}
            onMouseDown={(event) => { if (event.target === event.currentTarget) setIsOpen(false); }}
          >
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby="contact-dialog-title"
              initial={{ opacity: 0, y: 35, scale: .97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 24, scale: .98 }}
              transition={{ duration: .38, ease: [0.16, 1, 0.3, 1] }}
              className="glass-panel-strong relative mx-auto my-auto max-w-6xl overflow-hidden rounded-[2rem] border-white/10 p-3 shadow-[0_30px_120px_rgba(0,0,0,.7)] sm:rounded-[2.5rem] sm:p-5"
            >
              <div className="pointer-events-none absolute -left-24 -top-24 h-80 w-80 rounded-full bg-primary-500/15 blur-[100px]" />
              <div className="pointer-events-none absolute -bottom-32 right-0 h-80 w-80 rounded-full bg-cyan-400/10 blur-[100px]" />
              <button type="button" onClick={() => setIsOpen(false)} aria-label="Close contact form"
                className="absolute right-5 top-5 z-20 flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-black/35 text-zinc-400 backdrop-blur-xl transition-all hover:rotate-90 hover:border-white/25 hover:text-white sm:right-7 sm:top-7">
                <HiX size={20} />
              </button>

              <div className="relative grid gap-4 pt-14 lg:grid-cols-[.78fr_1.22fr] lg:pt-0">
                <div className="grid gap-4">
                  <TiltCard className="rounded-[1.75rem] border border-white/[.07] bg-black/20 p-6 sm:p-8" intensity={4}>
                    <p className="font-mono text-[10px] font-bold uppercase tracking-[.18em] text-zinc-600">Direct line</p>
                    <div className="mt-7 grid gap-5">
                      {contacts.map(({ icon: Icon, ...item }) => (
                        <div key={item.label} className="flex items-start gap-4">
                          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-white/[.08] bg-white/[.04] text-primary-300"><Icon /></span>
                          <div className="min-w-0"><p className="text-[10px] font-bold uppercase tracking-[.15em] text-zinc-600">{item.label}</p>{item.href ? <a href={item.href} className="mt-1 block break-all text-sm text-zinc-300 hover:text-white">{item.value}</a> : <p className="mt-1 text-sm text-zinc-300">{item.value}</p>}</div>
                        </div>
                      ))}
                    </div>
                  </TiltCard>
                  <div className="relative min-h-[210px] overflow-hidden rounded-[1.75rem] border border-white/[.09] bg-black/25 p-7 shadow-[inset_0_1px_0_rgba(255,255,255,.05)] sm:min-h-[235px] sm:p-9">
                    <motion.div aria-hidden="true" className="absolute -left-16 -top-20 h-56 w-56 rounded-full bg-primary-500/20 blur-[70px]"
                      animate={{ opacity: [.45, .85, .45], scale: [1, 1.12, 1] }} transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }} />
                    <motion.div aria-hidden="true" className="absolute -bottom-24 right-0 h-52 w-52 rounded-full bg-cyan-400/15 blur-[70px]"
                      animate={{ opacity: [.35, .7, .35], x: [0, -16, 0] }} transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }} />
                    <div aria-hidden="true" className="absolute inset-x-10 bottom-0 h-px bg-gradient-to-r from-transparent via-primary-400/60 to-transparent shadow-[0_0_18px_rgba(139,92,246,.55)]" />

                    <div className="relative">
                      <p className="font-mono text-[11px] font-bold uppercase tracking-[.2em] text-zinc-400">Find me online</p>
                      <p className="mt-2 text-xs leading-5 text-zinc-600">Follow my work, experiments, and latest builds.</p>
                    </div>
                    <div className="relative mt-7 flex flex-wrap gap-3 sm:gap-4">
                      {socials.map(({ icon: Icon, ...item }, index) => (
                        <motion.a key={item.label} href={item.href} target="_blank" rel="noreferrer"
                          initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .18 + index * .07 }}
                          whileHover={{ y: -6, scale: 1.06 }} whileTap={{ scale: .94 }}
                          className={`flex h-14 w-14 items-center justify-center rounded-2xl border border-white/[.11] bg-white/[.055] text-xl text-zinc-400 shadow-[inset_0_1px_0_rgba(255,255,255,.06),0_12px_28px_rgba(0,0,0,.22)] backdrop-blur-xl transition-colors duration-300 sm:h-16 sm:w-16 ${socialStyles[item.label]}`}
                          aria-label={item.label} title={item.label}>
                          <Icon />
                        </motion.a>
                      ))}
                    </div>
                  </div>
                </div>

                <form onSubmit={submit} className="rounded-[1.75rem] border border-white/[.07] bg-black/20 p-6 sm:p-9">
                  <div className="mb-8 flex items-start justify-between gap-14">
                    <div><p id="contact-dialog-title" className="font-display text-2xl font-semibold text-white">Tell me about your project</p><p className="mt-2 text-sm text-zinc-500">I usually reply within 24–48 hours.</p></div>
                    <span className="mt-1 hidden h-3 w-3 shrink-0 rounded-full bg-lime-300 shadow-[0_0_18px_rgba(190,242,100,.65)] sm:block" />
                  </div>
                  <div className="grid gap-5 sm:grid-cols-2">
                    <label className="grid gap-2 text-[10px] font-bold uppercase tracking-[.16em] text-zinc-600">Name<input ref={nameInputRef} required value={form.name} onChange={update('name')} placeholder="Your name" className="contact-input" /></label>
                    <label className="grid gap-2 text-[10px] font-bold uppercase tracking-[.16em] text-zinc-600">Email<input required type="email" value={form.email} onChange={update('email')} placeholder="you@example.com" className="contact-input" /></label>
                  </div>
                  <label className="mt-5 grid gap-2 text-[10px] font-bold uppercase tracking-[.16em] text-zinc-600">Subject<input value={form.subject} onChange={update('subject')} placeholder="What are we building?" className="contact-input" /></label>
                  <label className="mt-5 grid gap-2 text-[10px] font-bold uppercase tracking-[.16em] text-zinc-600">Message<textarea required rows="5" value={form.message} onChange={update('message')} placeholder="Share a few details, goals, and your timeline..." className="contact-input resize-none" /></label>
                  <div className="mt-6 flex flex-wrap items-center gap-4">
                    <button disabled={state === 'sending'} className="primary-button disabled:cursor-wait disabled:opacity-60">{state === 'sending' ? 'Sending…' : state === 'sent' ? 'Message ready ✓' : 'Send message'} <HiArrowNarrowRight /></button>
                    {state === 'error' && <p className="text-xs text-rose-300">Something went wrong. Please email me directly.</p>}
                  </div>
                </form>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
