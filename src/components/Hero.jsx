import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import { useRef, useEffect } from 'react';
import { FaGithub, FaLinkedinIn, FaFacebookF, FaArrowDown } from 'react-icons/fa';
import { HiMail } from 'react-icons/hi';
import { usePortfolioData } from '../context/DataContext';

const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.12 } } };
const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } } };

export default function Hero() {
  const { data } = usePortfolioData();
  const { personal, social } = data;
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end start'] });
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '40%']);
  const textOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const textY = useTransform(scrollYProgress, [0, 0.5], [0, 100]);

  // Mouse parallax for background elements
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = { damping: 25, stiffness: 150 };
  const orbX = useSpring(mouseX, springConfig);
  const orbY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      mouseX.set((clientX - innerWidth / 2) / 30);
      mouseY.set((clientY - innerHeight / 2) / 30);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  const scrollToAbout = () => {
    document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' });
  };

  const socialItems = [
    social.github && { href: social.github, icon: <FaGithub size={18} />, hoverClass: 'hover:text-white hover:bg-white/10 hover:border-white/20' },
    social.linkedin && { href: social.linkedin, icon: <FaLinkedinIn size={18} />, hoverClass: 'hover:text-[#0077b5] hover:bg-[#0077b5]/10 hover:border-[#0077b5]/30' },
    social.facebook && { href: social.facebook, icon: <FaFacebookF size={18} />, hoverClass: 'hover:text-[#1877f2] hover:bg-[#1877f2]/10 hover:border-[#1877f2]/30' },
    personal.email && { href: `mailto:${personal.email}`, icon: <HiMail size={20} />, hoverClass: 'hover:text-accent-coral hover:bg-accent-coral/10 hover:border-accent-coral/30' },
  ].filter(Boolean);

  return (
    <section id="home" ref={sectionRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Enhanced Parallax Background */}
      <motion.div className="absolute inset-0" style={{ y: bgY }}>
        <div className="absolute inset-0 bg-grid-pattern bg-[size:60px_60px]" />
        
        {/* Primary orb with mouse parallax */}
        <motion.div
          style={{ x: orbX, y: orbY }}
          animate={{ scale: [1, 1.15, 1], opacity: [0.12, 0.2, 0.12] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-1/4 -left-32 w-96 h-96 bg-primary-500 rounded-full blur-[128px]"
        />
        
        {/* Secondary orb with subtle animation */}
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.18, 0.1], x: [0, 20, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
          className="absolute bottom-1/4 -right-32 w-96 h-96 bg-accent-coral rounded-full blur-[128px]"
        />
        
        {/* Additional accent orb */}
        <motion.div
          animate={{ scale: [1, 1.1, 1], opacity: [0.08, 0.15, 0.08], x: [0, 30, 0], y: [0, -20, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          className="absolute top-1/3 right-1/4 w-64 h-64 bg-accent-gold rounded-full blur-[100px]"
        />
        
        {/* Central gradient */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-radial from-primary-500/5 to-transparent rounded-full" />
        
        {/* Subtle animated grid lines */}
        <motion.div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: 'linear-gradient(to right, #2A9D8F 1px, transparent 1px), linear-gradient(to bottom, #2A9D8F 1px, transparent 1px)',
            backgroundSize: '100px 100px'
          }}
          animate={{ backgroundPosition: ['0px 0px', '100px 100px'] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        />
      </motion.div>

      <motion.div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20" style={{ opacity: textOpacity, y: textY }}>
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          {/* Text Content */}
          <motion.div
            variants={stagger}
            initial="hidden"
            animate="visible"
            className="flex-1 text-center lg:text-left"
          >
            <motion.div variants={fadeUp}
              className="inline-flex items-center gap-2 px-4 py-2 bg-primary-500/10 border border-primary-500/20 rounded-full text-primary-300 text-sm font-medium mb-6"
            >
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              Available for opportunities
            </motion.div>

            <motion.h1 variants={fadeUp}
              className="text-4xl sm:text-5xl lg:text-7xl font-display font-bold leading-tight mb-4"
            >
              Hi, I'm{' '}
              <span className="bg-gradient-to-r from-primary-400 via-accent-gold to-accent-coral bg-clip-text text-transparent">
                {personal.name}
              </span>
            </motion.h1>

            <motion.p variants={fadeUp} className="text-xl sm:text-2xl text-gray-400 font-light mb-3">
              {personal.title}
            </motion.p>

            <motion.p variants={fadeUp} className="text-base text-gray-500 mb-8 max-w-lg mx-auto lg:mx-0">
              {personal.subtitle}
            </motion.p>

            {/* CTA Buttons - Enhanced */}
            <motion.div variants={fadeUp} className="flex flex-wrap items-center justify-center lg:justify-start gap-4 mb-8">
              <motion.a
                href="#projects"
                onClick={(e) => { e.preventDefault(); document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' }); }}
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="group relative px-8 py-3.5 bg-gradient-to-r from-accent-deep to-primary-500 text-white font-medium rounded-xl shadow-lg shadow-primary-500/25 hover:shadow-primary-500/40 transition-all duration-300 overflow-hidden"
              >
                {/* Shimmer effect */}
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                <span className="relative z-10 flex items-center gap-2">
                  View My Work
                  <motion.span
                    className="inline-block"
                    animate={{ x: [0, 4, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    →
                  </motion.span>
                </span>
              </motion.a>
              <motion.a
                href="#contact"
                onClick={(e) => { e.preventDefault(); document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' }); }}
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="group px-8 py-3.5 bg-white/5 border border-white/10 hover:border-primary-500/30 hover:bg-white/10 text-white font-medium rounded-xl transition-all duration-300 backdrop-blur-sm"
              >
                <span className="flex items-center gap-2">
                  Get In Touch
                  <span className="group-hover:rotate-12 transition-transform duration-300">✉️</span>
                </span>
              </motion.a>
            </motion.div>

            {/* Social Links */}
            <motion.div variants={fadeUp} className="flex items-center justify-center lg:justify-start gap-4">
              {socialItems.map((item, i) => (
                <motion.a
                  key={i}
                  href={item.href}
                  target={item.href.startsWith('mailto') ? undefined : '_blank'}
                  rel={item.href.startsWith('mailto') ? undefined : 'noreferrer'}
                  whileHover={{ y: -4, scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`w-11 h-11 flex items-center justify-center rounded-xl bg-white/5 border border-white/10 text-gray-400 transition-all duration-300 ${item.hoverClass}`}
                >
                  {item.icon}
                </motion.a>
              ))}
            </motion.div>
          </motion.div>

          {/* Avatar */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="flex-shrink-0"
          >
            <div className="relative">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                className="absolute inset-0 -m-4 rounded-full border border-dashed border-primary-500/20"
              />
              <div className="absolute inset-0 -m-8 rounded-full border border-accent-gold/10" />

              <div className="w-64 h-64 sm:w-80 sm:h-80 rounded-full overflow-hidden border-2 border-primary-500/30 shadow-2xl shadow-primary-500/20 animate-float">
                <img src={personal.avatar} alt={personal.name} className="w-full h-full object-cover" />
              </div>

              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute -top-4 -right-4 px-4 py-2 bg-dark-100/90 backdrop-blur-sm border border-white/10 rounded-xl shadow-xl"
              >
                <span className="text-sm font-medium text-primary-400">💻 Full-Stack</span>
              </motion.div>

              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 3.5, repeat: Infinity }}
                className="absolute -bottom-4 -left-4 px-4 py-2 bg-dark-100/90 backdrop-blur-sm border border-white/10 rounded-xl shadow-xl"
              >
                <span className="text-sm font-medium text-accent-gold">🎓 KUET CSE</span>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Scroll Down Indicator - Enhanced */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <button 
            onClick={scrollToAbout} 
            className="group flex flex-col items-center gap-3 text-gray-500 hover:text-primary-400 transition-colors duration-300"
          >
            <span className="text-xs font-medium tracking-wider uppercase">Scroll Down</span>
            <div className="relative w-6 h-10 border-2 border-gray-600 group-hover:border-primary-400 rounded-full transition-colors duration-300">
              <motion.div 
                className="absolute top-2 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-gray-500 group-hover:bg-primary-400 rounded-full transition-colors duration-300"
                animate={{ y: [0, 12, 0], opacity: [1, 0.3, 1] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
              />
            </div>
          </button>
        </motion.div>
      </motion.div>
    </section>
  );
}
