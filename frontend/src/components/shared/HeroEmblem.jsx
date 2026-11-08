import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react';

export default function HeroEmblem() {
  const ref = useRef(null);
  const reducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], ['0px', reducedMotion ? '0px' : '30px']);
  const rotate = useTransform(scrollYProgress, [0, 1], ['0deg', reducedMotion ? '0deg' : '6deg']);

  return (
    <motion.div
      ref={ref}
      className="hero-emblem"
      style={{ '--hero-parallax-y': y, '--hero-parallax-rotate': rotate }}
    >
      <motion.div
        className="hero-emblem-float"
        animate={reducedMotion ? undefined : { y: [0, -12, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      >
        <div className="hero-sculpture-scene" role="img" aria-label="A marble winged figure surrounded by crimson orbital rings">
          <div className="hero-sculpture-aura" aria-hidden="true" />
          <div className="hero-sculpture-orbit hero-sculpture-orbit-vertical" aria-hidden="true" />
          <img
            className="hero-figure"
            src="/images/winged-marble-statue.jpg"
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
