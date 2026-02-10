import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { usePortfolioData } from '../context/DataContext';

const categoryIcons = ['⚡', '🚀', '🛠️'];
const categoryColors = [
  { border: 'border-primary-500/30', bg: 'bg-primary-500/5', dot: 'bg-primary-500', tagBg: 'bg-primary-500/10', tagText: 'text-primary-300', tagBorder: 'border-primary-500/20', hover: 'hover:border-primary-500/50 hover:bg-primary-500/10' },
  { border: 'border-[#E9C46A]/30', bg: 'bg-[#E9C46A]/5', dot: 'bg-[#E9C46A]', tagBg: 'bg-[#E9C46A]/10', tagText: 'text-[#E9C46A]', tagBorder: 'border-[#E9C46A]/20', hover: 'hover:border-[#E9C46A]/50 hover:bg-[#E9C46A]/10' },
  { border: 'border-[#E76F51]/30', bg: 'bg-[#E76F51]/5', dot: 'bg-[#E76F51]', tagBg: 'bg-[#E76F51]/10', tagText: 'text-[#E76F51]', tagBorder: 'border-[#E76F51]/20', hover: 'hover:border-[#E76F51]/50 hover:bg-[#E76F51]/10' },
];

export default function Skills() {
  const { data } = usePortfolioData();
  const { skills } = data;
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="skills" className="relative py-24 lg:py-32" ref={ref}>
      {/* Background accent */}
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
          <div className="w-20 h-1 bg-gradient-to-r from-primary-500 to-accent-gold mx-auto rounded-full" />
        </motion.div>

        {/* Skills Categories */}
        <div className="grid lg:grid-cols-3 gap-8">
          {skills.map((category, catIndex) => {
            const colors = categoryColors[catIndex % categoryColors.length];
            return (
              <motion.div
                key={catIndex}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: catIndex * 0.15 }}
                className={`p-6 ${colors.bg} border ${colors.border} rounded-2xl transition-all duration-300 group`}
              >
                <h3 className="text-lg font-display font-semibold text-white mb-6 flex items-center gap-3">
                  <span className="text-xl">{categoryIcons[catIndex % categoryIcons.length]}</span>
                  {category.category}
                </h3>

                <div className="flex flex-wrap gap-3">
                  {category.items.map((skill, skillIndex) => (
                    <motion.span
                      key={skillIndex}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={isInView ? { opacity: 1, scale: 1 } : {}}
                      transition={{ duration: 0.3, delay: catIndex * 0.15 + skillIndex * 0.04 }}
                      className={`px-4 py-2 ${colors.tagBg} ${colors.tagText} border ${colors.tagBorder} ${colors.hover} rounded-xl text-sm font-medium transition-all duration-300 cursor-default`}
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
