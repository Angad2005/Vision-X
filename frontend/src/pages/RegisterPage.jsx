import { motion } from 'motion/react';
import { ArrowUpRight, Landmark } from 'lucide-react';
import PageHero from '../components/shared/PageHero';
import MagneticButton from '../components/shared/MagneticButton';
import { REGISTRATION_QR_SRC } from '../utils/constants';

export default function RegisterPage({ onNavigate }) {
  const registrationOptions = [
    { label: 'For university', href: 'https://forms.gle/NFwxVXPLp4dCearQ6' },
    { label: 'For school', href: 'https://forms.gle/truroakCErv2YvZs7' },
  ];

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
          <div className="registration-aside-seal">
            <Landmark size={20} />
            <span>ACADEMIA · RESEARCH · INNOVATION</span>
          </div>
        </motion.div>

        <motion.div className="registration-form-panel" initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <div className="form-panel-head">
            <div>
              <h3>Participant registration</h3>
            </div>
          </div>
          <div className="registration-cta">
            <p>Choose your category and scan the QR code to register.</p>
            <div className="registration-qr-grid">
              {registrationOptions.map(({ label, href }) => (
                <figure className="registration-qr" key={label}>
                  <MagneticButton className="button button-primary" onClick={() => window.open(href, '_blank', 'noopener,noreferrer')} strength={0.25}>
                    {label} <ArrowUpRight size={16} />
                  </MagneticButton>
                  <a href={href} target="_blank" rel="noopener noreferrer" aria-label={`Open registration form for ${label}`}>
                    <img src={REGISTRATION_QR_SRC} alt={`QR code linking to the VISION X 2026 registration form for ${label}`} width="220" height="220" />
                  </a>
                </figure>
              ))}
            </div>
          </div>
        </motion.div>
      </section>
    </main>
  );
}