import { motion } from 'motion/react';
import { ArrowUpRight, MapPin } from 'lucide-react';
import BrandLogo from './BrandLogo';
import GreekKey from './GreekKey';
import MagneticButton from './MagneticButton';

export default function Footer({ onNavigate }) {
  const links = [
    ['about', 'About VISION X'],
    ['competitions', 'Competitions'],
    // ['schedule', 'Event schedule'],
    // ['prizes', 'Prizes & recognition'],
    // ['gallery', 'Gallery & highlights'],
    ['team', 'Team VISION X'],
    ['contact', 'Contact & FAQs'],
    ['register', 'Registration'],
  ];

  return (
    <footer className="site-footer">
      <GreekKey className="footer-key" />
      <div className="shell footer-main">
        <div className="footer-brand">
          <div className="footer-logo">
            <BrandLogo alt="Vision X" />
          </div>
          <p>FROM CURIOSITY TO IMPACT</p>
          <small>A flagship initiative by Chitkara Research Club.</small>
          <div className="footer-greek">
            ΓΝΩΘΙ ΣΕΑΥΤΟΝ <i>·</i> KNOW THYSELF
          </div>
          <div className="footer-venue">
            <MapPin size={13} /> CHITKARA UNIVERSITY, PUNJAB
          </div>
        </div>

        <div className="footer-links">
          <span>EXPLORE VISION X</span>
          {links.map(([page, label]) => (
            <motion.button key={page} onClick={() => onNavigate(page)} whileHover={{ x: 4 }}>
              {label}
            </motion.button>
          ))}
        </div>

        <div className="footer-end">
          <span>27–28 NOVEMBER 2026</span>
          <h3>
            THE NEXT IDEA <br />
            <em>STARTS WITH YOU.</em>
          </h3>
          <MagneticButton onClick={() => onNavigate('register')} strength={0.2}>
            TAKE YOUR PLACE <ArrowUpRight size={15} />
          </MagneticButton>
          <small>© 2026 CHITKARA RESEARCH CLUB</small>
        </div>
      </div>

      <div className="footer-bottom shell">
        <span>VISION X <i>·</i> 2026</span>
        <span className="footer-constants">
          π 3.14159 <i>·</i> φ 1.61803 <i>·</i> e 2.71828 <i>·</i> ΠΑΝΤΑ ΡΕΙ
        </span>
        <motion.button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          whileHover={{ y: -2 }}
        >
          BACK TO TOP ↑
        </motion.button>
      </div>
    </footer>
  );
}