import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react';

export default function HeroEmblem() {
  const ref = useRef(null);
  const reducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], ['0px', reducedMotion ? '0px' : '16px']);
  const rotate = useTransform(scrollYProgress, [0, 1], ['0deg', reducedMotion ? '0deg' : '3.5deg']);

  return (
    <motion.div
      ref={ref}
      className="hero-emblem"
      style={{ '--hero-parallax-y': y, '--hero-parallax-rotate': rotate }}
    >
      <motion.div
        className="hero-emblem-float"
        animate={reducedMotion ? undefined : { scale: [1, 1.015, 1] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      >
        <div className="hero-sculpture-scene" role="img" aria-label="A marble statue of Zeus framed by crimson energy and orbital rings">
          <div className="hero-sculpture-aura" aria-hidden="true" />
          <div className="hero-sculpture-orbit hero-sculpture-orbit-vertical" aria-hidden="true" />
          <img
            className="hero-figure"
            src="/images/WhatsApp%20Image%202026-11-09%20at%204.26.23%20PM.jpeg"
            alt=""
            draggable={false}
          />
          <div className="hero-sculpture-orbit hero-sculpture-orbit-horizontal" aria-hidden="true" />
          <span className="hero-sculpture-marker hero-sculpture-marker-one" aria-hidden="true" />
          <span className="hero-sculpture-marker hero-sculpture-marker-two" aria-hidden="true" />
        </div>
      </motion.div>
    </motion.div>
  );
}
