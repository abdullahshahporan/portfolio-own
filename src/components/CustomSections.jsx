import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { HiArrowNarrowRight } from 'react-icons/hi';
import { usePortfolioData } from '../context/DataContext';
import { SectionHeading, TiltCard } from './VisualEffects';

function CustomSection({ section, index }) {
  const ref = useRef(null);
  const visible = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id={`section-${section.id}`} ref={ref} className="section-shell soft-divider">
      <div className="section-container">
        <motion.div initial={{ opacity: 0, y: 28 }} animate={visible ? { opacity: 1, y: 0 } : {}} transition={{ duration: .7 }}>
          <SectionHeading eyebrow={`${section.subtitle || 'More'} / ${String(index + 5).padStart(2, '0')}`} title={section.title.split(' ').slice(0, -1).join(' ') || section.title} accent={section.title.split(' ').length > 1 ? section.title.split(' ').slice(-1)[0] : ''} description={section.description} />
        </motion.div>

        {section.items?.length > 0 && (
          <div className={`grid gap-5 ${section.layout === 'list' ? 'mx-auto max-w-4xl' : section.items.length > 2 ? 'md:grid-cols-2 lg:grid-cols-3' : 'md:grid-cols-2'}`}>
            {section.items.map((item, itemIndex) => (
              <motion.div key={item.id || itemIndex} initial={{ opacity: 0, y: 25 }} animate={visible ? { opacity: 1, y: 0 } : {}} transition={{ delay: .15 + itemIndex * .09 }}>
                <TiltCard className="glass-panel group h-full rounded-[2rem] p-7" intensity={5}>
                  <div className="flex items-start justify-between" data-depth="2">
                    <span className="text-3xl">{item.icon || '✦'}</span>
                    <span className="font-mono text-[10px] text-zinc-600">{String(itemIndex + 1).padStart(2, '0')}</span>
                  </div>
                  <h3 className="mt-8 font-display text-xl font-semibold text-white" data-depth="1">{item.title}</h3>
                  {item.description && <p className="mt-3 text-sm leading-7 text-zinc-500">{item.description}</p>}
                  {item.link && <a href={item.link} target="_blank" rel="noreferrer" className="mt-6 inline-flex items-center gap-2 text-xs font-bold text-primary-300 transition-colors hover:text-white">Learn more <HiArrowNarrowRight /></a>}
                </TiltCard>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default function CustomSections() {
  const { data } = usePortfolioData();
  return (data.customSections || []).filter((section) => section.enabled !== false).map((section, index) => <CustomSection key={section.id} section={section} index={index} />);
}
