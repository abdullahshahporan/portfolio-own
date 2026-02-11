import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { HiAcademicCap, HiBriefcase } from 'react-icons/hi';
import { usePortfolioData } from '../context/DataContext';

export default function Education() {
  const { data } = usePortfolioData();
  const { education, experience } = data;
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="education" className="relative py-24 lg:py-32" ref={ref}>
      <div className="absolute inset-0 bg-dark-100/30" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary-400 font-mono text-sm font-medium tracking-wider uppercase">Background</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold mt-3 mb-4">
            Education &{' '}
            <span className="bg-gradient-to-r from-primary-400 to-accent-gold bg-clip-text text-transparent">Experience</span>
          </h2>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="w-20 h-1 bg-gradient-to-r from-primary-500 to-accent-gold mx-auto rounded-full origin-center"
          />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Education */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="flex items-center gap-3 mb-8">
              <motion.div
                initial={{ scale: 0 }}
                animate={isInView ? { scale: 1 } : {}}
                transition={{ type: 'spring', delay: 0.3, stiffness: 300 }}
                className="w-10 h-10 flex items-center justify-center rounded-xl bg-primary-500/10 text-primary-400"
              >
                <HiAcademicCap size={22} />
              </motion.div>
              <h3 className="text-xl font-display font-bold">Education</h3>
            </div>

            <div className="space-y-6 relative">
              {/* Animated timeline line */}
              <motion.div
                initial={{ scaleY: 0 }}
                animate={isInView ? { scaleY: 1 } : {}}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="absolute left-[7px] top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary-500/40 to-primary-500/5 origin-top"
              />
              {education.map((edu, i) => (
                <motion.div
                  key={edu.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.4 + i * 0.15 }}
                  className="relative pl-8"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={isInView ? { scale: 1 } : {}}
                    transition={{ type: 'spring', delay: 0.5 + i * 0.15, stiffness: 300 }}
                    className="absolute left-0 top-5 -translate-x-0 w-4 h-4 rounded-full bg-primary-500 border-4 border-dark-950 z-10"
                  />
                  <motion.div
                    whileHover={{ x: 4 }}
                    className="p-5 bg-dark-100/50 border border-white/5 rounded-xl hover:border-primary-500/20 transition-all duration-300"
                  >
                    <span className="text-xs font-mono text-primary-400 mb-1 block">{edu.duration}</span>
                    <h4 className="text-lg font-semibold text-white mb-1">{edu.degree}</h4>
                    <p className="text-sm text-gray-400 mb-3">{edu.institution}</p>
                    <p className="text-sm text-gray-500 mb-3">{edu.description}</p>
                    {edu.achievements && edu.achievements.length > 0 && (
                      <ul className="space-y-1">
                        {edu.achievements.map((ach, j) => (
                          <li key={j} className="flex items-start gap-2 text-xs text-gray-400">
                            <span className="text-primary-400 mt-0.5">▹</span>
                            {ach}
                          </li>
                        ))}
                      </ul>
                    )}
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Experience */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="flex items-center gap-3 mb-8">
              <motion.div
                initial={{ scale: 0 }}
                animate={isInView ? { scale: 1 } : {}}
                transition={{ type: 'spring', delay: 0.4, stiffness: 300 }}
                className="w-10 h-10 flex items-center justify-center rounded-xl bg-accent-coral/10 text-accent-coral"
              >
                <HiBriefcase size={22} />
              </motion.div>
              <h3 className="text-xl font-display font-bold">Experience</h3>
            </div>

            <div className="space-y-6 relative">
              <motion.div
                initial={{ scaleY: 0 }}
                animate={isInView ? { scaleY: 1 } : {}}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="absolute left-[7px] top-0 bottom-0 w-0.5 bg-gradient-to-b from-accent-coral/40 to-accent-coral/5 origin-top"
              />
              {experience.map((exp, i) => (
                <motion.div
                  key={exp.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.5 + i * 0.15 }}
                  className="relative pl-8"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={isInView ? { scale: 1 } : {}}
                    transition={{ type: 'spring', delay: 0.6 + i * 0.15, stiffness: 300 }}
                    className="absolute left-0 top-5 -translate-x-0 w-4 h-4 rounded-full bg-accent-coral border-4 border-dark-950 z-10"
                  />
                  <motion.div
                    whileHover={{ x: 4 }}
                    className="p-5 bg-dark-100/50 border border-white/5 rounded-xl hover:border-accent-coral/20 transition-all duration-300"
                  >
                    <span className="text-xs font-mono text-accent-coral mb-1 block">{exp.duration}</span>
                    <h4 className="text-lg font-semibold text-white mb-1">{exp.role}</h4>
                    <p className="text-sm text-gray-400 mb-3">{exp.company}</p>
                    <p className="text-sm text-gray-500 mb-3">{exp.description}</p>
                    {exp.responsibilities && exp.responsibilities.length > 0 && (
                      <ul className="space-y-1">
                        {exp.responsibilities.map((resp, j) => (
                          <li key={j} className="flex items-start gap-2 text-xs text-gray-400">
                            <span className="text-accent-coral mt-0.5">▹</span>
                            {resp}
                          </li>
                        ))}
                      </ul>
                    )}
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
