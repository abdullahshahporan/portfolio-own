import { Navigate, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion, useMotionValue, useReducedMotion, useScroll, useSpring } from 'framer-motion';
import { Toaster } from 'react-hot-toast';
import { useEffect, useState } from 'react';
import { usePortfolioData } from './context/DataContext';

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Education from './components/Education';
import Contact from './components/Contact';
import Footer from './components/Footer';
import CustomSections from './components/CustomSections';
import Admin from './pages/Admin';
import { AmbientBackground } from './components/VisualEffects';

// Scroll Progress Bar Component
function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <motion.div
      className="scroll-progress"
      style={{ scaleX }}
    />
  );
}

// Custom Cursor Follower for desktop
function CursorFollower() {
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const reduceMotion = useReducedMotion();
  const rawX = useMotionValue(-100);
  const rawY = useMotionValue(-100);
  const x = useSpring(rawX, { stiffness: 650, damping: 42, mass: 0.18 });
  const y = useSpring(rawY, { stiffness: 650, damping: 42, mass: 0.18 });

  useEffect(() => {
    const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    if (!finePointer || reduceMotion) return undefined;

    const handleMouseMove = (e) => {
      rawX.set(e.clientX - 9);
      rawY.set(e.clientY - 9);
      setIsVisible(true);
    };
    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseLeave = () => setIsVisible(false);
    const handlePointerOver = (event) => setIsHovering(Boolean(event.target.closest('a, button, input, textarea, select, [role="button"]')));
    const handlePointerOut = (event) => setIsHovering(Boolean(event.relatedTarget?.closest?.('a, button, input, textarea, select, [role="button"]')));

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('pointerover', handlePointerOver);
    document.addEventListener('pointerout', handlePointerOut);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('pointerover', handlePointerOver);
      document.removeEventListener('pointerout', handlePointerOut);
    };
  }, [rawX, rawY, reduceMotion]);

  if (!isVisible) return null;

  return (
    <motion.div
      className={`cursor-follower ${isHovering ? 'hovering' : ''}`}
      style={{ x, y }}
    />
  );
}

// Scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [pathname]);
  return null;
}

// Portfolio page composed of all sections
function Portfolio() {
  return (
    <motion.main
      id="main-content"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Education />
      <CustomSections />
      <Contact />
      <Footer />
    </motion.main>
  );
}

function App() {
  const location = useLocation();
  const { loading } = usePortfolioData();
  const isAdmin = location.pathname.startsWith('/admin');

  if (loading) {
    return (
      <div className="min-h-screen bg-dark-950 flex items-center justify-center overflow-hidden">
        <motion.div 
          className="flex flex-col items-center gap-6"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          {/* Animated loader with glow */}
          <div className="relative">
            <motion.div 
              className="w-16 h-16 border-4 border-primary-500/30 border-t-primary-400 rounded-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
            />
            <motion.div
              className="absolute inset-0 rounded-full bg-primary-500/20 blur-xl"
              animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
          <motion.p 
            className="text-gray-400 text-sm font-medium"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            Loading portfolio...
          </motion.p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dark-950 noise-bg isolate">
      {!isAdmin && <a href="#main-content" className="skip-link">Skip to main content</a>}
      {/* Scroll Progress Indicator */}
      {!isAdmin && <ScrollProgress />}
      
      {/* Custom Cursor (desktop only) */}
      {!isAdmin && <CursorFollower />}
      
      {/* Persistent cinematic backdrop */}
      {!isAdmin && <AmbientBackground />}
      
      <Navbar />
      <ScrollToTop />

      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: 'rgba(23,23,31,.94)',
            color: '#f4f4f5',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: '16px',
            padding: '12px 16px',
            fontSize: '14px',
            backdropFilter: 'blur(20px)',
          },
          success: {
            iconTheme: {
              primary: '#BEF264',
              secondary: '#17171f',
            },
          },
          error: {
            iconTheme: {
              primary: '#FB7185',
              secondary: '#17171f',
            },
          },
        }}
      />

      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Portfolio />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AnimatePresence>
    </div>
  );
}

export default App;
