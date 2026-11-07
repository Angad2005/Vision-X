import { motion, useScroll, useTransform } from 'motion/react';
import { Atom } from 'lucide-react';

export default function HeroEmblem() {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 10]);

  return (
    <motion.div
      className="hero-emblem"
      aria-label="Classical Greek columns with a scientific orbital diagram"
      style={{ y, rotate }}
      animate={{ y: [0, -12, 0] }}
      transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
    >
      <div className="emblem-orbit orbit-a"><span /></div>
      <div className="emblem-orbit orbit-b"><span /></div>
      <div className="emblem-crosshair crosshair-one" />
      <div className="emblem-crosshair crosshair-two" />
      <div className="emblem-plate">
        <div className="plate-topline">
          <span>ΑΘΗΝΑ · ATHENA</span>
          <span>FIG. 01 / VX26</span>
        </div>
        <svg className="temple-svg" viewBox="0 0 520 480" role="img" aria-label="Illustration of a classical Greek temple integrated with a scientific diagram">
          <defs>
            <linearGradient id="marbleStone" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#fffaf0" />
              <stop offset=".42" stopColor="#d7c8ad" />
              <stop offset="1" stopColor="#827765" />
            </linearGradient>
            <linearGradient id="stoneSide" x1="0" x2="1">
              <stop offset="0" stopColor="#8f8069" />
              <stop offset=".3" stopColor="#eee2cd" />
              <stop offset=".75" stopColor="#b5a58c" />
              <stop offset="1" stopColor="#706452" />
            </linearGradient>
            <linearGradient id="redGlass" x1="0" x2="1">
              <stop offset="0" stopColor="#8c1728" />
              <stop offset="1" stopColor="#d14a4a" />
            </linearGradient>
          </defs>
          <g fill="none" stroke="#c8a96d" opacity=".7">
            <path d="M54 405H466M72 423H448M98 440H422" strokeWidth="2" />
            <path d="M115 116H405M134 96H386M155 77H365" strokeWidth="1" />
          </g>
          <path d="M105 150L260 44L415 150Z" fill="url(#marbleStone)" stroke="#f2e6d3" strokeWidth="3" />
          <path d="M140 142L260 66L380 142Z" fill="#292126" stroke="#9a835d" strokeWidth="2" />
          <path d="M232 140L260 91L288 140Z" fill="url(#redGlass)" opacity=".9" />
          <path d="M92 151H428V173H92Z" fill="url(#stoneSide)" />
          <path d="M79 178H441V196H79Z" fill="url(#marbleStone)" />
          {[125, 187, 249, 311, 373].map((x) => (
            <g key={x}>
              <path d={`M${x - 19} 210H${x + 19}L${x + 13} 370H${x - 13}Z`} fill="url(#stoneSide)" stroke="#e8d9c0" strokeWidth="1.5" />
              <path d={`M${x - 23} 204H${x + 23}V212H${x - 23}ZM${x - 16} 370H${x + 16}V381H${x - 16}Z`} fill="url(#marbleStone)" />
              <path d={`M${x - 9} 220V360M${x} 220V360M${x + 9} 220V360`} stroke="#f5ead8" opacity=".45" />
            </g>
          ))}
          <path d="M90 386H430V402H90Z" fill="url(#stoneSide)" />
          <path d="M70 404H450V421H70Z" fill="url(#marbleStone)" />
          <g stroke="#b99a63" fill="none" opacity=".92">
            <circle cx="260" cy="260" r="118" strokeDasharray="4 8" />
            <ellipse cx="260" cy="260" rx="155" ry="57" transform="rotate(-28 260 260)" />
            <ellipse cx="260" cy="260" rx="155" ry="57" transform="rotate(48 260 260)" />
            <circle cx="260" cy="260" r="7" fill="#b99a63" />
            <circle cx="366" cy="191" r="5" fill="#c63b45" stroke="none" />
            <circle cx="148" cy="321" r="4" fill="#c63b45" stroke="none" />
          </g>
          <g stroke="#d9c7a8" strokeWidth="1.2" opacity=".75">
            <path d="M260 132V170M260 350V391M132 260H175M345 260H388" />
            <path d="M245 260H275M260 245V275" />
          </g>
        </svg>
        <div className="plate-bottomline">
          <span>LOGOS · SCIENTIA · PROGRESSUS</span>
          <span>CHITKARA / 2026</span>
        </div>
      </div>
      <div className="emblem-greek greek-left">ΑΡΕΤΗ</div>
      <div className="emblem-greek greek-right">ΓΝΩΣΙΣ</div>
      <motion.div
        className="emblem-stamp"
        animate={{ rotate: [10, 12, 10] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      >
        <span>EST.</span>
        <strong>20</strong>
        <b>26</b>
        <i>THE NEXT IDEA</i>
      </motion.div>
      <div className="emblem-caption">
        <span /> ANCIENT CURIOSITY. FUTURE TECHNOLOGY.
      </div>
      <div className="emblem-coordinate">CHITKARA UNIVERSITY · PUNJAB</div>
    </motion.div>
  );
}