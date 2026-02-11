import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { usePortfolioData } from '../context/DataContext';

const categoryIcons = ['⚡', '🚀', '🛠️', '🔬', '📊', '🎯'];
const categoryColors = [
  { border: 'border-primary-500/30', bg: 'bg-primary-500/5', tagBg: 'bg-primary-500/10', tagText: 'text-primary-300', tagBorder: 'border-primary-500/20', hover: 'hover:border-primary-500/50 hover:bg-primary-500/10', glow: 'group-hover:shadow-primary-500/5' },
  { border: 'border-[#E9C46A]/30', bg: 'bg-[#E9C46A]/5', tagBg: 'bg-[#E9C46A]/10', tagText: 'text-[#E9C46A]', tagBorder: 'border-[#E9C46A]/20', hover: 'hover:border-[#E9C46A]/50 hover:bg-[#E9C46A]/10', glow: 'group-hover:shadow-[#E9C46A]/5' },
  { border: 'border-[#E76F51]/30', bg: 'bg-[#E76F51]/5', tagBg: 'bg-[#E76F51]/10', tagText: 'text-[#E76F51]', tagBorder: 'border-[#E76F51]/20', hover: 'hover:border-[#E76F51]/50 hover:bg-[#E76F51]/10', glow: 'group-hover:shadow-[#E76F51]/5' },
  { border: 'border-cyan-500/30', bg: 'bg-cyan-500/5', tagBg: 'bg-cyan-500/10', tagText: 'text-cyan-300', tagBorder: 'border-cyan-500/20', hover: 'hover:border-cyan-500/50 hover:bg-cyan-500/10', glow: 'group-hover:shadow-cyan-500/5' },
  { border: 'border-violet-500/30', bg: 'bg-violet-500/5', tagBg: 'bg-violet-500/10', tagText: 'text-violet-300', tagBorder: 'border-violet-500/20', hover: 'hover:border-violet-500/50 hover:bg-violet-500/10', glow: 'group-hover:shadow-violet-500/5' },
  { border: 'border-rose-500/30', bg: 'bg-rose-500/5', tagBg: 'bg-rose-500/10', tagText: 'text-rose-300', tagBorder: 'border-rose-500/20', hover: 'hover:border-rose-500/50 hover:bg-rose-500/10', glow: 'group-hover:shadow-rose-500/5' },
];

export default function Skills() {
  const { data } = usePortfolioData();
  const { skills } = data;
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  // Dynamic grid: 1 col for 1, 2 for 2, 3 for 3+
  const gridCols = skills.length === 1 ? 'lg:grid-cols-1 max-w-xl mx-auto' : skills.length === 2 ? 'lg:grid-cols-2 max-w-4xl mx-auto' : 'lg:grid-cols-3';

  return (
    <section id="skills" className="relative py-24 lg:py-32" ref={ref}>
      <div className="absolute inset-0 bg-dark-100/30" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary-400 font-mono text-sm font-medium tracking-wider uppercase">My Skills</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold mt-3 mb-4">
            Tech{' '}
            <span className="bg-gradient-to-r from-primary-400 to-accent-gold bg-clip-text text-transparent">Stack</span>
          </h2>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="w-20 h-1 bg-gradient-to-r from-primary-500 to-accent-gold mx-auto rounded-full origin-center"
          />
        </motion.div>

        {/* Skills Categories */}
        <div className={`grid ${gridCols} gap-8`}>
          {skills.map((category, catIndex) => {
            const colors = categoryColors[catIndex % categoryColors.length];
            return (
              <motion.div
                key={catIndex}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: catIndex * 0.12 }}
                whileHover={{ y: -6 }}
                className={`group p-6 ${colors.bg} border ${colors.border} rounded-2xl transition-all duration-300 hover:shadow-xl ${colors.glow}`}
              >
                <h3 className="text-lg font-display font-semibold text-white mb-6 flex items-center gap-3">
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={isInView ? { scale: 1 } : {}}
                    transition={{ type: 'spring', delay: catIndex * 0.12 + 0.2, stiffness: 300 }}
                    className="text-xl"
                  >
                    {category.icon || categoryIcons[catIndex % categoryIcons.length]}
                  </motion.span>
                  {category.category}
                  <span className="ml-auto text-xs text-gray-600 font-mono">{category.items.length}</span>
                </h3>

                <div className="flex flex-wrap gap-2.5">
                  {category.items.map((skill, skillIndex) => (
                    <motion.span
                      key={skillIndex}
                      initial={{ opacity: 0, scale: 0.6 }}
                      animate={isInView ? { opacity: 1, scale: 1 } : {}}
                      transition={{ type: 'spring', delay: catIndex * 0.12 + skillIndex * 0.04 + 0.3, stiffness: 300, damping: 20 }}
                      whileHover={{ scale: 1.08, y: -2 }}
                      className={`px-4 py-2 ${colors.tagBg} ${colors.tagText} border ${colors.tagBorder} ${colors.hover} rounded-xl text-sm font-medium transition-all duration-200 cursor-default`}
                    >
                      {skill.name}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
