import { useCallback, useEffect, useMemo, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { HiArrowNarrowRight, HiMenuAlt3, HiX } from 'react-icons/hi';
import { usePortfolioData } from '../context/DataContext';

const baseLinks = [
  { name: 'About', href: '#about' },
  { name: 'Expertise', href: '#skills' },
  { name: 'Work', href: '#projects' },
  { name: 'Journey', href: '#education' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState('home');
  const location = useLocation();
  const { data } = usePortfolioData();
  const isAdmin = location.pathname === '/admin';

  const links = useMemo(() => [
    ...baseLinks,
    ...(data.customSections || []).filter((item) => item.enabled).map((item) => ({ name: item.title, href: `#section-${item.id}` })),
  ], [data.customSections]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (isAdmin) return undefined;
    const ids = ['home', ...links.map((item) => item.href.slice(1)), 'contact'];
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => entry.isIntersecting && setActive(entry.target.id));
    }, { rootMargin: '-42% 0px -52% 0px' });
    ids.forEach((id) => { const node = document.getElementById(id); if (node) observer.observe(node); });
    return () => observer.disconnect();
  }, [isAdmin, links]);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  const navigate = useCallback((event, href) => {
    event.preventDefault();
    setOpen(false);
    if (isAdmin) { window.location.href = `/${href}`; return; }
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  }, [isAdmin]);

  const firstName = data.personal.name.split(' ')[0];

  return (
    <motion.header initial={{ y: -80, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: .7, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5 sm:pt-4">
      <nav className={`relative mx-auto flex h-16 max-w-[1240px] items-center justify-between rounded-2xl px-3 transition-all duration-500 sm:px-4 ${scrolled ? 'glass-panel shadow-2xl shadow-black/30' : 'border border-transparent bg-transparent'}`}>
        <Link to="/" className="group flex items-center gap-3 rounded-xl pr-3" aria-label={`${firstName} home`}>
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white font-display text-sm font-extrabold text-zinc-950 transition-transform duration-300 group-hover:rotate-[-6deg] group-hover:scale-105">
            {data.personal.name.split(' ').map((name) => name[0]).slice(0, 2).join('')}
          </span>
          <span className="hidden sm:block">
            <span className="block font-display text-sm font-semibold leading-none text-white">{firstName}</span>
            <span className="mt-1 block text-[9px] font-bold uppercase tracking-[.18em] text-zinc-600">Developer</span>
          </span>
        </Link>

        {!isAdmin && (
          <div className="absolute left-1/2 hidden h-11 -translate-x-1/2 items-center gap-1 rounded-2xl border border-white/[.07] bg-black/25 p-1 shadow-inner shadow-black/30 md:flex">
            {links.map((link) => {
              const selected = active === link.href.slice(1);
              return (
                <a key={link.href} href={link.href} onClick={(event) => navigate(event, link.href)}
                  className={`relative flex h-9 min-w-[82px] items-center justify-center rounded-xl px-3 text-center text-xs font-semibold transition-colors ${selected ? 'text-white' : 'text-zinc-500 hover:text-zinc-200'}`}>
                  {selected && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute inset-0 rounded-xl border border-white/[.07] bg-gradient-to-b from-white/[.12] to-white/[.065] shadow-[0_5px_18px_rgba(0,0,0,.24),inset_0_1px_0_rgba(255,255,255,.08)]"
                      transition={{ type: 'spring', stiffness: 360, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10 leading-none">{link.name}</span>
                </a>
              );
            })}
          </div>
        )}

        <div className="flex items-center gap-2">
          {isAdmin ? (
            <Link to="/" className="secondary-button !min-h-10 !px-4">View site</Link>
          ) : (
            <>
              <a href="#contact" onClick={(event) => navigate(event, '#contact')} className="hidden min-h-10 items-center gap-2 rounded-xl bg-white px-4 text-xs font-bold text-zinc-950 transition-transform hover:-translate-y-0.5 sm:flex">
                Let’s talk <HiArrowNarrowRight />
              </a>
              <button onClick={() => setOpen((value) => !value)} aria-label="Toggle navigation" aria-expanded={open}
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white md:hidden">
                {open ? <HiX size={20} /> : <HiMenuAlt3 size={20} />}
              </button>
            </>
          )}
        </div>
      </nav>

      <AnimatePresence>
        {open && !isAdmin && (
          <motion.div initial={{ opacity: 0, y: -14, scale: .98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -14, scale: .98 }}
            className="glass-panel-strong mx-auto mt-2 max-w-[1240px] overflow-hidden rounded-3xl p-4 md:hidden">
            <div className="grid gap-1">
              {[{ name: 'Home', href: '#home' }, ...links, { name: 'Contact', href: '#contact' }].map((link, index) => (
                <motion.a key={link.href} href={link.href} onClick={(event) => navigate(event, link.href)} initial={{ opacity: 0, x: -14 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * .045 }}
                  className={`flex items-center justify-between rounded-2xl px-5 py-4 font-display text-lg ${active === link.href.slice(1) ? 'bg-white/[.07] text-white' : 'text-zinc-400'}`}>
                  {link.name}<span className="text-xs text-zinc-600">0{index + 1}</span>
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
