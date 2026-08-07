import { motion } from 'framer-motion';
import { HiArrowUp } from 'react-icons/hi';
import { usePortfolioData } from '../context/DataContext';

export default function Footer() {
  const { data } = usePortfolioData();
  const { personal } = data;
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-white/[.06] bg-black/20">
      <div className="section-container py-8">
        <div className="flex flex-col items-center justify-between gap-5 sm:flex-row">
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="order-2 text-center text-[10px] font-semibold uppercase tracking-[.14em] text-zinc-600 sm:order-1 sm:text-left"
          >
            © {currentYear} {personal.name} · Designed & engineered with care
          </motion.p>

          <motion.button
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="order-1 flex items-center gap-3 rounded-full border border-white/[.08] bg-white/[.03] px-4 py-2 text-[10px] font-bold uppercase tracking-[.15em] text-zinc-500 transition-all hover:border-white/20 hover:text-white sm:order-2"
          >
            Back to top <HiArrowUp />
          </motion.button>
        </div>
      </div>
    </footer>
  );
}
