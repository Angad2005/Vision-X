import { useEffect, useState } from 'react';
import { motion } from 'motion/react';

const TILT = '.competition-card,.team-card,.home-intro-card,.about-pillar,.detail-card,.prize-detail-card,.gallery-card,.schedule-item,.journey-card,.lineage-card,.lexicon-card,.award-card';
const COUNT = '.prize-total-card>div>strong';
const RIPPLE = '.button,.nav-cta,.competition-link,.faq-item>button,.gallery-filters button,.schedule-day-switch button,.footer-end>button';
const calm = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function countUp(el) {
  const text = el.textContent;
  const m = text.match(/^(\d+)(.*)$/);
  if (!m) return;
  const end = +m[1], t0 = performance.now();
  const step = (t) => {
    const p = Math.min(1, (t - t0) / 1600);
    el.textContent = Math.round(end * (1 - Math.pow(1 - p, 4))) + m[2];
    if (p < 1) requestAnimationFrame(step); else el.textContent = text;
  };
  requestAnimationFrame(step);
}

function Curtain() {
  const [k, setK] = useState(0);
  useEffect(() => {
    const orig = window.history.pushState;
    window.history.pushState = function (...a) { const r = orig.apply(this, a); window.dispatchEvent(new Event('vx-nav')); return r; };
    const on = () => setK((x) => x + 1);
    window.addEventListener('vx-nav', on);
    return () => { window.history.pushState = orig; window.removeEventListener('vx-nav', on); };
  }, []);
  if (!k) return null;
  return (
    <motion.div key={k} className="fx-curtain" initial={{ scaleY: 0, originY: 1 }} animate={{ scaleY: [0, 1, 1, 0], originY: [1, 1, 0, 0] }} transition={{ duration: 1.05, times: [0, 0.4, 0.55, 1], ease: 'easeInOut' }}>
      <div className="fx-curtain-word" aria-label="Vision X">
        {'VISION'.split('').map((letter, index) => (
          <motion.span
            key={`${letter}-${index}`}
            className="fx-curtain-letter"
            aria-hidden="true"
            initial={{ opacity: 0, y: 14, rotateX: -24 }}
            animate={{ opacity: 1, y: 0, rotateX: 0 }}
            transition={{ delay: 0.08 + index * 0.04, duration: 0.34, ease: [0.22, 1, 0.36, 1] }}
          >
            {letter}
          </motion.span>
        ))}
        <motion.b
          className="fx-curtain-x"
          aria-hidden="true"
          initial={{ opacity: 0, y: 12, scale: 1.25, rotate: -18 }}
          animate={{ opacity: 1, y: 0, scale: 1, rotate: 0 }}
          transition={{ delay: 0.28, duration: 0.4, type: 'spring', stiffness: 180, damping: 18 }}
        >
          X
        </motion.b>
      </div>
    </motion.div>
  );
}

function useDomMagic() {
  useEffect(() => {
    const root = document.getElementById('root');
    const reduce = calm();
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (!en.isIntersecting) return;
        io.unobserve(en.target);
        if (en.target.matches(COUNT)) countUp(en.target);
      });
    }, { threshold: 0.6 });

    const scan = (el) => {
      if (el.nodeType !== 1) return;
      const all = [el, ...el.querySelectorAll(`${TILT},${COUNT}`)];
      all.forEach((n) => {
        if (!n.matches) return;
        if (n.matches(TILT) && !n.querySelector(':scope>.fx-sheen')) {
          const s = document.createElement('span');
          s.className = 'fx-sheen'; s.setAttribute('aria-hidden', 'true');
          n.appendChild(s);
        }
        if (!reduce && n.matches(COUNT) && !n.dataset.fx) { n.dataset.fx = '1'; io.observe(n); }
      });
    };
    scan(root);
    const mo = new MutationObserver((list) => list.forEach((m) => m.addedNodes.forEach(scan)));
    mo.observe(root, { childList: true, subtree: true });

    let raf = 0;
    const move = (e) => {
      const c = e.target.closest?.(TILT);
      if (c) {
        const r = c.getBoundingClientRect();
        c.style.setProperty('--mx', `${e.clientX - r.left}px`);
        c.style.setProperty('--my', `${e.clientY - r.top}px`);
      }
      if (reduce || raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        document.documentElement.style.setProperty('--px', (e.clientX / innerWidth - 0.5).toFixed(3));
        document.documentElement.style.setProperty('--py', (e.clientY / innerHeight - 0.5).toFixed(3));
      });
    };
    const down = (e) => {
      const b = e.target.closest?.(RIPPLE);
      if (!b || reduce) return;
      const r = b.getBoundingClientRect(), d = Math.max(r.width, r.height) * 2;
      const s = document.createElement('span');
      s.className = 'fx-ripple';
      s.style.cssText = `width:${d}px;height:${d}px;left:${e.clientX - r.left - d / 2}px;top:${e.clientY - r.top - d / 2}px`;
      b.appendChild(s);
      setTimeout(() => s.remove(), 750);
    };
    window.addEventListener('pointermove', move, { passive: true });
    window.addEventListener('pointerdown', down, { passive: true });
    return () => { io.disconnect(); mo.disconnect(); window.removeEventListener('pointermove', move); window.removeEventListener('pointerdown', down); };
  }, []);
}

export default function FxExtras() {
  useDomMagic();
  return <Curtain />;
}
