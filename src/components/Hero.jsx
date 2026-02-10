import { motion } from 'framer-motion';
import { FaGithub, FaLinkedinIn, FaFacebookF, FaArrowDown } from 'react-icons/fa';
import { HiMail } from 'react-icons/hi';
import { usePortfolioData } from '../context/DataContext';

export default function Hero() {
  const { data } = usePortfolioData();
  const { personal, social } = data;

  const scrollToAbout = () => {
    document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-grid-pattern bg-[size:60px_60px]" />
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-primary-500/10 rounded-full blur-[128px]" />
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-accent-coral/10 rounded-full blur-[128px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-radial from-primary-500/5 to-transparent rounded-full" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex-1 text-center lg:text-left"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-primary-500/10 border border-primary-500/20 rounded-full text-primary-300 text-sm font-medium mb-6"
            >
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              Available for opportunities
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-4xl sm:text-5xl lg:text-7xl font-display font-bold leading-tight mb-4"
            >
              Hi, I'm{' '}
              <span className="bg-gradient-to-r from-primary-400 via-accent-gold to-accent-coral bg-clip-text text-transparent">
                {personal.name}
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-xl sm:text-2xl text-gray-400 font-light mb-3"
            >
              {personal.title}
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45 }}
              className="text-base text-gray-500 mb-8 max-w-lg mx-auto lg:mx-0"
            >
              {personal.subtitle}
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-wrap items-center justify-center lg:justify-start gap-4 mb-8"
            >
              <a
                href="#projects"
                onClick={(e) => { e.preventDefault(); document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' }); }}
                className="px-8 py-3.5 bg-gradient-to-r from-accent-deep to-primary-500 hover:from-primary-600 hover:to-primary-400 text-white font-medium rounded-xl shadow-lg shadow-primary-500/25 hover:shadow-primary-500/40 transition-all duration-300 hover:-translate-y-0.5"
              >
                View My Work
              </a>
              <a
                href="#contact"
                onClick={(e) => { e.preventDefault(); document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' }); }}
                className="px-8 py-3.5 bg-white/5 border border-white/10 hover:border-white/20 hover:bg-white/10 text-white font-medium rounded-xl transition-all duration-300 hover:-translate-y-0.5"
              >
                Get In Touch
              </a>
            </motion.div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex items-center justify-center lg:justify-start gap-4"
            >
              {social.github && (
                <a href={social.github} target="_blank" rel="noreferrer"
                  className="w-11 h-11 flex items-center justify-center rounded-xl bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all duration-300 hover:-translate-y-1">
                  <FaGithub size={18} />
                </a>
              )}
              {social.linkedin && (
                <a href={social.linkedin} target="_blank" rel="noreferrer"
                  className="w-11 h-11 flex items-center justify-center rounded-xl bg-white/5 border border-white/10 text-gray-400 hover:text-[#0077b5] hover:bg-[#0077b5]/10 hover:border-[#0077b5]/30 transition-all duration-300 hover:-translate-y-1">
                  <FaLinkedinIn size={18} />
                </a>
              )}
              {social.facebook && (
                <a href={social.facebook} target="_blank" rel="noreferrer"
                  className="w-11 h-11 flex items-center justify-center rounded-xl bg-white/5 border border-white/10 text-gray-400 hover:text-[#1877f2] hover:bg-[#1877f2]/10 hover:border-[#1877f2]/30 transition-all duration-300 hover:-translate-y-1">
                  <FaFacebookF size={18} />
                </a>
              )}
              {personal.email && (
                <a href={`mailto:${personal.email}`}
                  className="w-11 h-11 flex items-center justify-center rounded-xl bg-white/5 border border-white/10 text-gray-400 hover:text-accent-coral hover:bg-accent-coral/10 hover:border-accent-coral/30 transition-all duration-300 hover:-translate-y-1">
                  <HiMail size={20} />
                </a>
              )}
            </motion.div>
          </motion.div>

          {/* Avatar */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex-shrink-0"
          >
            <div className="relative">
              {/* Decorative rings */}
              <div className="absolute inset-0 -m-4 rounded-full border border-primary-500/20 animate-pulse" />
              <div className="absolute inset-0 -m-8 rounded-full border border-accent-gold/10" />

              <div className="w-64 h-64 sm:w-80 sm:h-80 rounded-full overflow-hidden border-2 border-primary-500/30 shadow-2xl shadow-primary-500/20 animate-float">
                <img
                  src={personal.avatar}
                  alt={personal.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Floating badges */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity, repeatType: 'loop' }}
                className="absolute -top-4 -right-4 px-4 py-2 bg-dark-100 border border-white/10 rounded-xl shadow-xl"
              >
                <span className="text-sm font-medium text-primary-400">💻 Full-Stack</span>
              </motion.div>

              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 3.5, repeat: Infinity, repeatType: 'loop' }}
                className="absolute -bottom-4 -left-4 px-4 py-2 bg-dark-100 border border-white/10 rounded-xl shadow-xl"
              >
                <span className="text-sm font-medium text-accent-gold">🎓 KUET CSE</span>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Scroll Down Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <button onClick={scrollToAbout} className="flex flex-col items-center gap-2 text-gray-500 hover:text-primary-400 transition-colors">
            <span className="text-xs font-medium">Scroll Down</span>
            <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
              <FaArrowDown size={14} />
            </motion.div>
          </button>
        </motion.div>
      </div>
    </section>
  );
}
