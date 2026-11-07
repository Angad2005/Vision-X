import { motion } from 'motion/react';
import { ArrowUpRight, Sparkles } from 'lucide-react';
import { scaleIn, staggerContainer } from '../utils/animations';
import PageHero from '../components/shared/PageHero';
import MagneticButton from '../components/shared/MagneticButton';
import { competitions, competitionGreek } from '../data/competitions';

export default function CompetitionsPage({ onNavigate }) {
  return (
    <main className="subpage">
      <PageHero
        kicker="THE VISION X COMPETITIONS"
        title={<>Four arenas. <br /><em>One curious mind.</em></>}
        description="Talks, research communication, debate and an overnight academic writing challenge."
        footer="04 COMPETITIONS · 27–28 NOVEMBER 2026"
        note={['ΑΓΩΝ', 'agṓn · a contest, a gathering']}
      />

      <section className="section-block shell compact-top">
        <div className="competition-intro">
          <div>
            <span className="eyebrow"><span /> FIND YOUR ARENA</span>
            <h2>Make your ideas <br /><em>count.</em></h2>
          </div>
          <p>Explore the four competition formats planned for VISION X 2026. Further participation guidelines and details can be added as they are finalised.</p>
        </div>

        <motion.div className="competition-grid competition-grid-four" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }} variants={staggerContainer}>
          {competitions.map((item) => {
            const Icon = item.icon;
            return (
              <motion.article
                className={`competition-card tone-${item.number}`}
                key={item.number}
                variants={scaleIn}
                whileHover={{ y: -10, scale: 1.02 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              >
                <div className="competition-visual" style={{ background: item.gradient }}>
                  <span className="competition-number">{item.number}</span>
                  <motion.div className="competition-icon" whileHover={{ rotate: -8, scale: 1.1 }} transition={{ type: 'spring', stiffness: 300 }}>
                    <Icon size={42} strokeWidth={1.2} />
                  </motion.div>
                  <span className="competition-orbit" />
                  <span className="competition-greek">{item.greek}</span>
                </div>
                <div className="competition-content">
                  <span className="competition-type">{item.type}</span>
                  <h3>{item.name}</h3>
                  <div className="competition-etymon" aria-hidden="true">
                    <b>{competitionGreek[item.number][0]}</b>
                    <small>{competitionGreek[item.number][1]}</small>
                  </div>
                  <p>{item.description}</p>
                  <div className="competition-meta">
                    <span><Sparkles size={13} /> {item.detail}</span>
                  </div>
                  <MagneticButton className="competition-link" onClick={() => onNavigate('register')} strength={0.3}>
                    REGISTER NOW <ArrowUpRight size={16} />
                  </MagneticButton>
                </div>
              </motion.article>
            );
          })}
        </motion.div>
      </section>

      <section className="competition-cta">
        <div className="shell competition-cta-inner">
          <div>
            <span className="eyebrow"><span /> YOUR NEXT IDEA STARTS HERE</span>
            <h2>Take your place <em>at VISION X.</em></h2>
            <p>27–28 November 2026 · Chitkara University, Punjab.</p>
          </div>
          <MagneticButton className="button button-light" onClick={() => onNavigate('register')} strength={0.25}>
            REGISTER NOW <ArrowUpRight size={17} />
          </MagneticButton>
        </div>
      </section>
    </main>
  );
}