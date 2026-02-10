import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { HiCode, HiAcademicCap, HiLightBulb, HiGlobe } from 'react-icons/hi';
import { usePortfolioData } from '../context/DataContext';

export default function About() {
  const { data } = usePortfolioData();
  const { about, personal, services } = data;
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const iconMap = {
    web: <HiGlobe className="w-6 h-6" />,
    mobile: <HiCode className="w-6 h-6" />,
    backend: <HiLightBulb className="w-6 h-6" />,
    design: <HiAcademicCap className="w-6 h-6" />,
  };

  return (
    <section id="about" className="relative py-24 lg:py-32" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary-400 font-mono text-sm font-medium tracking-wider uppercase">About Me</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold mt-3 mb-4">
            Know Who{' '}
            <span className="bg-gradient-to-r from-primary-400 to-accent-gold bg-clip-text text-transparent">I Am</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary-500 to-accent-gold mx-auto rounded-full" />
        </motion.div>

        {/* About Content */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 mb-20">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <p className="text-gray-300 text-lg leading-relaxed mb-6">
              {about.description}
            </p>
            <ul className="space-y-3">
              {about.highlights.map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-gray-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary-500 mt-2.5 flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Stats Grid */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="grid grid-cols-2 gap-4"
          >
            {about.stats.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.4, delay: 0.4 + i * 0.1 }}
                className="p-6 bg-dark-100/50 border border-white/5 rounded-2xl hover:border-primary-500/30 transition-all duration-300 group"
              >
                <div className="text-3xl sm:text-4xl font-display font-bold bg-gradient-to-r from-primary-400 to-accent-gold bg-clip-text text-transparent mb-2 group-hover:scale-105 transition-transform">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-500 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Services */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h3 className="text-2xl font-display font-bold text-center mb-10">
            What I <span className="text-accent-gold">Do</span>
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, i) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.5 + i * 0.1 }}
                className="group p-6 bg-dark-100/30 border border-white/5 rounded-2xl hover:border-primary-500/30 hover:bg-dark-100/60 transition-all duration-300"
              >
                <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-primary-500/10 text-primary-400 mb-4 group-hover:bg-primary-500/20 group-hover:scale-110 transition-all duration-300">
                  {iconMap[service.icon] || <HiCode className="w-6 h-6" />}
                </div>
                <h4 className="text-lg font-semibold text-white mb-2">{service.title}</h4>
                <p className="text-sm text-gray-400 leading-relaxed">{service.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
