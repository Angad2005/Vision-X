import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useScroll, useSpring } from 'motion/react';

const TILT = '.competition-card,.team-card,.home-intro-card,.about-pillar,.prize-detail-card,.gallery-card,.journey-card,.schedule-item';
const MAGNET = '.button,.nav-cta,.competition-link,.footer-end>button,.text-link,.back-to-top';
const fine = () => window.matchMedia('(hover:hover) and (pointer:fine)').matches;
const calm = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function Intro({ onDone }) {
  useEffect(() => { const t = setTimeout(onDone, 3100); return () => clearTimeout(t); }, [onDone]);
  return (
    <motion.div className="fx-intro" exit={{ opacity: 0, scale: 1.08, filter: 'blur(14px)' }} transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}>
      <div className="fx-intro-word">
        {'VISION'.split('').map((l, i) => (
          <motion.span key={i} initial={{ opacity: 0, y: 34, filter: 'blur(20px)' }} animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }} transition={{ delay: 0.3 + i * 0.12, duration: 1, ease: [0.22, 1, 0.36, 1] }}>{l}</motion.span>
        ))}
        <motion.b initial={{ opacity: 0, scale: 2.8, rotate: -35 }} animate={{ opacity: 1, scale: 1, rotate: 0 }} transition={{ delay: 1.3, type: 'spring', stiffness: 130, damping: 11 }}>X</motion.b>
      </div>
      <motion.i className="fx-intro-line" initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: 1.5, duration: 1.1, ease: 'easeInOut' }} />
      <motion.p initial={{ opacity: 0, letterSpacing: '1px' }} animate={{ opacity: 1, letterSpacing: '6px' }} transition={{ delay: 1.9, duration: 1.1 }}>FROM CURIOSITY TO IMPACT</motion.p>
    </motion.div>
  );
}

function Particles() {
  const ref = useRef(null);
  useEffect(() => {
    if (calm()) return;
    const c = ref.current, ctx = c.getContext('2d');
    const m = { x: -999, y: -999 };
    let w, h, raf, pts = [];
    const size = () => {
      w = c.width = innerWidth; h = c.height = innerHeight;
      pts = Array.from({ length: Math.min(70, Math.floor(w / 22)) }, () => ({
        x: Math.random() * w, y: Math.random() * h, vx: (Math.random() - .5) * .35, vy: (Math.random() - .5) * .35,
        r: Math.random() * 1.6 + .5, red: Math.random() < .18,
      }));
    };
    const move = (e) => { m.x = e.clientX; m.y = e.clientY; };
    const tick = () => {
      ctx.clearRect(0, 0, w, h);
      pts.forEach((p, i) => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;
        const dx = p.x - m.x, dy = p.y - m.y, d = Math.hypot(dx, dy);
        if (d < 130) { p.x += dx / d * 1.3; p.y += dy / d * 1.3; }
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, 6.283);
        ctx.fillStyle = p.red ? 'rgba(224,90,99,.9)' : 'rgba(224,193,139,.75)'; ctx.fill();
        for (let j = i + 1; j < pts.length; j++) {
          const q = pts[j], dd = Math.hypot(p.x - q.x, p.y - q.y);
          if (dd < 120) { ctx.strokeStyle = `rgba(224,193,139,${.16 * (1 - dd / 120)})`; ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(q.x, q.y); ctx.stroke(); }
        }
      });
      raf = requestAnimationFrame(tick);
    };
    size(); tick();
    addEventListener('resize', size); addEventListener('pointermove', move);
    return () => { cancelAnimationFrame(raf); removeEventListener('resize', size); removeEventListener('pointermove', move); };
  }, []);
  return <canvas ref={ref} className="fx-particles" aria-hidden="true" />;
}

function Cursor() {
  const dot = useRef(null), ring = useRef(null);
  useEffect(() => {
    if (!fine() || calm()) return;
    const t = { x: innerWidth / 2, y: innerHeight / 2 }, r = { ...t };
    let raf;
    const move = (e) => {
      t.x = e.clientX; t.y = e.clientY;
      dot.current.style.transform = `translate(${t.x}px,${t.y}px)`;
      ring.current.classList.toggle('is-hot', !!e.target.closest('button,a,input,iframe'));
    };
    const loop = () => { r.x += (t.x - r.x) * .16; r.y += (t.y - r.y) * .16; ring.current.style.transform = `translate(${r.x}px,${r.y}px)`; raf = requestAnimationFrame(loop); };
    loop(); addEventListener('pointermove', move);
    return () => { cancelAnimationFrame(raf); removeEventListener('pointermove', move); };
  }, []);
  if (typeof window !== 'undefined' && !fine()) return null;
  return <><div ref={ring} className="fx-ring" /><div ref={dot} className="fx-dot" /></>;
}

function useInteractions() {
  useEffect(() => {
    if (!fine() || calm()) return;
    let card = null, mag = null;
    const release = (el, prop, from) => { if (!el) return; el.animate([{ [prop]: from }, { [prop]: prop === 'rotate' ? '0 0 0 0deg' : '0px 0px' }], { duration: 420, easing: 'cubic-bezier(.22,1,.36,1)' }); el.style[prop] = ''; };
    const move = (e) => {
      const c = e.target.closest?.(TILT), b = e.target.closest?.(MAGNET);
      if (card && card !== c) release(card, 'rotate', card.style.rotate);
      if (mag && mag !== b) release(mag, 'translate', mag.style.translate);
      card = c; mag = b;
      if (c) {
        const r = c.getBoundingClientRect(), px = (e.clientX - r.left) / r.width - .5, py = (e.clientY - r.top) / r.height - .5;
        c.style.rotate = `${-py} ${px} 0 ${Math.min(7, Math.hypot(px, py) * 14)}deg`;
      }
      if (b) {
        const r = b.getBoundingClientRect();
        b.style.translate = `${(e.clientX - r.left - r.width / 2) * .22}px ${(e.clientY - r.top - r.height / 2) * .35}px`;
      }
    };
    addEventListener('pointermove', move, { passive: true });
    return () => removeEventListener('pointermove', move);
  }, []);
}

export default function FxLayer() {
  const [intro, setIntro] = useState(() => { try { return !sessionStorage.getItem('vx-intro'); } catch { return true; } });
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 24, restDelta: 0.001 });
  useInteractions();
  const done = () => { try { sessionStorage.setItem('vx-intro', '1'); } catch { /* ignore */ } setIntro(false); };
  return (
    <>
      <AnimatePresence>{intro && <Intro onDone={done} />}</AnimatePresence>
      <motion.div className="fx-progress" style={{ scaleX }} />
      <Particles />
      <Cursor />
    </>
  );
}
