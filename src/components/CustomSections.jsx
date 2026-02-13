import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { usePortfolioData } from '../context/DataContext';

// Animation variants
const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0.2 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } 
  }
};

// Individual custom section component
function CustomSection({ section, index }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  // Alternate background for visual variety
  const hasBg = index % 2 === 1;

  return (
    <section
      id={`section-${section.id}`}
      ref={ref}
      className={`relative py-20 lg:py-28 overflow-hidden ${hasBg ? 'bg-dark-100/30' : ''}`}
    >
      {/* Background decorations */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 1 }}
        className="absolute top-1/4 -right-32 w-64 h-64 bg-primary-500/5 rounded-full blur-[80px] pointer-events-none"
      />
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 1, delay: 0.2 }}
        className="absolute bottom-1/4 -left-32 w-64 h-64 bg-accent-gold/5 rounded-full blur-[80px] pointer-events-none"
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-12"
        >
          {section.subtitle && (
            <motion.span
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="inline-block text-primary-400 font-mono text-sm font-medium tracking-wider uppercase mb-2"
            >
              {section.subtitle}
            </motion.span>
          )}
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold mb-4">
            {section.title.split(' ').slice(0, -1).join(' ')}{' '}
            <span className="bg-gradient-to-r from-primary-400 to-accent-gold bg-clip-text text-transparent">
              {section.title.split(' ').slice(-1)[0]}
            </span>
          </h2>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.7, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="w-20 h-1 bg-gradient-to-r from-primary-500 to-accent-gold mx-auto rounded-full origin-center"
          />
        </motion.div>

        {/* Section Description */}
        {section.description && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-gray-400 text-center max-w-3xl mx-auto mb-12 text-lg leading-relaxed"
          >
            {section.description}
          </motion.p>
        )}

        {/* Section Items */}
        {section.items && section.items.length > 0 && (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            className={`grid gap-6 ${
              section.layout === 'list' 
                ? 'grid-cols-1 max-w-3xl mx-auto' 
                : section.items.length === 1 
                  ? 'grid-cols-1 max-w-2xl mx-auto'
                  : section.items.length === 2
                    ? 'sm:grid-cols-2 max-w-4xl mx-auto'
                    : 'sm:grid-cols-2 lg:grid-cols-3'
            }`}
          >
            {section.items.map((item, itemIndex) => (
              <motion.div
                key={item.id || itemIndex}
                variants={itemVariants}
                whileHover={{ y: -6, transition: { duration: 0.3 } }}
                className="group p-6 bg-dark-100/50 border border-white/5 rounded-2xl hover:border-primary-500/30 hover:shadow-xl hover:shadow-primary-500/5 transition-all duration-500"
              >
                {item.icon && (
                  <motion.span 
                    className="text-3xl mb-4 block"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: 'spring', stiffness: 400 }}
                  >
                    {item.icon}
                  </motion.span>
                )}
                <h3 className="text-lg font-display font-semibold text-white mb-2 group-hover:text-primary-300 transition-colors">
                  {item.title}
                </h3>
                {item.description && (
                  <p className="text-sm text-gray-400 leading-relaxed">
                    {item.description}
                  </p>
                )}
                {item.link && (
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 mt-3 text-sm text-primary-400 hover:text-primary-300 transition-colors"
                  >
                    Learn more
                    <motion.span
                      animate={{ x: [0, 4, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      →
                    </motion.span>
                  </a>
                )}
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
}

// Main component that renders all custom sections
export default function CustomSections() {
  const { data } = usePortfolioData();
  const { customSections = [] } = data;

  if (!customSections || customSections.length === 0) return null;

  return (
    <>
      {customSections
        .filter(section => section.enabled !== false)
        .map((section, index) => (
          <CustomSection key={section.id} section={section} index={index} />
        ))}
    </>
  );
}
