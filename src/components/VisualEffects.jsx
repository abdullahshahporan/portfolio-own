import { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

export function TiltCard({ children, className = '', intensity = 10, ...props }) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [intensity, -intensity]), {
    stiffness: 220,
    damping: 24,
  });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-intensity, intensity]), {
    stiffness: 220,
    damping: 24,
  });
  const glareX = useTransform(x, [-0.5, 0.5], ['15%', '85%']);
  const glareY = useTransform(y, [-0.5, 0.5], ['15%', '85%']);

  const handleMove = (event) => {
    if (!ref.current || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((event.clientX - rect.left) / rect.width - 0.5);
    y.set((event.clientY - rect.top) / rect.height - 0.5);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onPointerMove={handleMove}
      onPointerLeave={reset}
      style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
      className={`tilt-card ${className}`}
      {...props}
    >
      <motion.div
        aria-hidden="true"
        className="tilt-glare"
        style={{ backgroundPositionX: glareX, backgroundPositionY: glareY }}
      />
      {children}
    </motion.div>
  );
}

export function SectionHeading({ eyebrow, title, accent, description, align = 'center' }) {
  const centered = align === 'center';

  return (
    <div className={`section-heading ${centered ? 'text-center mx-auto' : ''}`}>
      <div className={`section-kicker ${centered ? 'justify-center' : ''}`}>
        <span className="section-kicker-line" />
        <span>{eyebrow}</span>
      </div>
      <h2 className="section-title">
        {title} <span>{accent}</span>
      </h2>
      {description && <p className={`section-description ${centered ? 'mx-auto' : ''}`}>{description}</p>}
    </div>
  );
}

export function AmbientBackground() {
  return (
    <div className="ambient-scene" aria-hidden="true">
      <div className="ambient-grid" />
      <div className="aurora aurora-one" />
      <div className="aurora aurora-two" />
      <div className="aurora aurora-three" />
      <div className="orbital orbital-one" />
      <div className="orbital orbital-two" />
    </div>
  );
}
