import { motion } from 'motion/react';
import { ArrowUpRight, Landmark } from 'lucide-react';
import PageHero from '../components/shared/PageHero';
import MagneticButton from '../components/shared/MagneticButton';
import { REGISTRATION_URL, REGISTRATION_QR_SRC } from '../utils/constants';

export default function RegisterPage({ onNavigate }) {
  return (
    <main className="subpage register-page">
      <PageHero
        kicker="YOUR NEXT CHAPTER STARTS HERE"
        title={<>Step into <br /><em>the vision.</em></>}
        description="Your next idea could become your biggest impact. Take the first step."
        footer="VISION X 2026 · 27–28 NOVEMBER"
        note={['ΑΡΧΗ', 'archḗ · the beginning']}
      />

      <section className="section-block shell compact-top registration-section">
        <motion.div className="registration-aside" initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <span className="eyebrow"><span /> OFFICIAL REGISTRATION</span>
          <h2>One step closer <br />to <em>what's next.</em></h2>
          <p>Choose one of the four events before registering, or scan the QR code to open the form. VISION X 2026 takes place on 27–28 November at Chitkara University, Punjab.</p>
          <MagneticButton className="button button-primary registration-more-details" onClick={() => onNavigate('competitions', 'event-showcase', { openGuidelines: true })} strength={0.2}>
            MORE DETAILS <ArrowUpRight size={16} />
          </MagneticButton>
          <div className="registration-aside-seal">
            <Landmark size={20} />
            <span>ACADEMIA · RESEARCH · INNOVATION</span>
          </div>
        </motion.div>

        <motion.div className="registration-form-panel" initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <div className="form-panel-head">
            <div>
              <span>APPLICATION / 2026</span>
              <h3>Participant registration</h3>
            </div>
            <span className="form-live"><i /> OPEN NOW</span>
          </div>
          <div className="registration-cta">
            <p>Choose an event to see its details and registration options, or scan the QR code from your phone.</p>
            <MagneticButton className="button button-primary" onClick={() => onNavigate('competitions', 'event-showcase')} strength={0.25}>
              REGISTER NOW <ArrowUpRight size={16} />
            </MagneticButton>
            <figure className="registration-qr">
              <a href={REGISTRATION_URL} target="_blank" rel="noopener noreferrer" aria-label="Open VISION X 2026 registration form">
                <img src={REGISTRATION_QR_SRC} alt="QR code linking to the VISION X 2026 Google Form" width="220" height="220" />
              </a>
              <figcaption>SCAN TO REGISTER</figcaption>
            </figure>
          </div>
        </motion.div>
      </section>
    </main>
  );
}