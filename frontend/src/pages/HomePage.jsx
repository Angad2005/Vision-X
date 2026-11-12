import { motion } from 'motion/react';
import { ArrowRight, ArrowUpRight, Atom, Microscope, Network, BookOpen } from 'lucide-react';
import { fadeInUp, staggerContainer, scaleIn } from '../utils/animations';
import SectionHeading from '../components/shared/SectionHeading';
import MagneticButton from '../components/shared/MagneticButton';
import GreekKey from '../components/shared/GreekKey';
import HeroEmblem from '../components/shared/HeroEmblem';
import Countdown from '../components/shared/Countdown';
import { CalendarDays, MapPin } from 'lucide-react';

export default function HomePage({ onNavigate }) {
  return (
    <main>
      <section className="hero-section">
        <div className="hero-noise" />
        <div className="hero-grid-overlay" />
        <div className="hero-sweep" aria-hidden="true" />
        <div className="hero-inner shell">
          <motion.div className="hero-copy" initial="hidden" animate="visible" variants={staggerContainer}>
            <motion.div className="hero-pretitle" variants={fadeInUp}>
              <span className="pretitle-line" />
              CHITKARA RESEARCH CLUB PRESENTS
              <span className="pretitle-line" />
            </motion.div>
            <motion.div className="hero-overline" variants={fadeInUp}>
              AN ENCOUNTER WITH <em>WHAT'S NEXT.</em>
            </motion.div>
            <motion.h1 variants={fadeInUp}>
              VISION <span className="hero-x">X</span>
            </motion.h1>
            <motion.div className="hero-subtitle" variants={fadeInUp}>
              FROM CURIOSITY <i>TO</i> IMPACT
            </motion.div>
            <motion.p className="hero-description" variants={fadeInUp}>
              A meeting ground for ideas, research and innovation <br/>
              where questions become conversations, evidence becomes insight, <br/>and curiosity moves towards impact.
            </motion.p>
            <motion.div className="hero-event-meta" variants={fadeInUp}>
              <span><CalendarDays size={16} /> 27–28 NOVEMBER 2026</span>
              <i />
              <span><MapPin size={16} /> CHITKARA UNIVERSITY, PUNJAB</span>
            </motion.div>
            <motion.div className="hero-actions" variants={fadeInUp}>
              <MagneticButton className="button button-primary" onClick={() => onNavigate('competitions')} strength={0.25}>
                EXPLORE EVENTS <ArrowUpRight size={17} />
              </MagneticButton>
              <MagneticButton className="button button-ghost" onClick={() => onNavigate('competitions', 'event-showcase')} strength={0.25}>
                REGISTER NOW <ArrowRight size={16} />
              </MagneticButton>
            </motion.div>
            <motion.div className="hero-countdown-wrap" variants={fadeInUp}>
              <Countdown />
            </motion.div>
          </motion.div>
          <HeroEmblem />
          <div className="hero-sidecode">
            <span>VX / INSTITUTE</span>
            <span>IDEAS IN MOTION</span>
            <span>EST. MMXXVI</span>
          </div>
          <div className="greek-relief" aria-hidden="true" />
        </div>
        <div className="hero-bottom-rule"><GreekKey /></div>
      </section>

      <section className="section-block shell home-intro-section">
        <SectionHeading
          eyebrow="BEYOND BOUNDARIES · BEYOND ORDINARY"
          title={<>Ideas become impact. <em>Begin here.</em></>}
          text="VISION X brings the spirit of inquiry into a shared experience — connecting research, communication and original thinking."
        />
        <motion.div className="home-intro-grid" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={staggerContainer}>
          <motion.article className="home-intro-card" variants={scaleIn} whileHover={{ y: -6, scale: 1.015 }}>
            <span className="intro-card-index">01 / INQUIRE</span>
            <Microscope size={27} />
            <h3>Research with purpose.</h3>
            <p>Ask better questions, examine evidence and make space for new perspectives.</p>
          </motion.article>
          <motion.article className="home-intro-card" variants={scaleIn} whileHover={{ y: -6, scale: 1.015 }}>
            <span className="intro-card-index">02 / EXCHANGE</span>
            <Network size={27} />
            <h3>Ideas in conversation.</h3>
            <p>Share knowledge, debate thoughtfully and learn from different disciplines.</p>
          </motion.article>
          <motion.article className="home-intro-card" variants={scaleIn} whileHover={{ y: -6, scale: 1.015 }}>
            <span className="intro-card-index">03 / CREATE</span>
            <Atom size={27} />
            <h3>Curiosity in motion.</h3>
            <p>Move from exploration to communication, collaboration and meaningful work.</p>
          </motion.article>
        </motion.div>
        <div className="intro-about-link">
          <MagneticButton className="text-link" onClick={() => onNavigate('about')} strength={0.2}>
            DISCOVER THE VISION <ArrowUpRight size={15} />
          </MagneticButton>
        </div>
      </section>

      <section className="blueprint-section research-atlas" aria-labelledby="research-atlas-title">
        <div className="shell blueprint-layout">
          <motion.div className="blueprint-copy" initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.6 }}>
            <span className="eyebrow"><span /> ΕΠΙΣΤΗΜΗ · RESEARCH & TECHNOLOGY</span>
            <h2 id="research-atlas-title">Ancient questions.<br /><em>New frontiers.</em></h2>
            <p>The Greek tradition of inquiry meets the tools of modern research. VISION X brings people together to examine evidence, share ideas and explore what technology makes possible.</p>
            <div className="blueprint-points research-principles">
              <div><span>Α</span><p><b>Ask with purpose</b><small>Start with curiosity, clear questions and an open mind.</small></p></div>
              <div><span>Β</span><p><b>Follow the evidence</b><small>Connect observation, research and critical thought.</small></p></div>
              <div><span>Γ</span><p><b>Share what you discover</b><small>Turn knowledge into conversation and future ideas.</small></p></div>
            </div>
          </motion.div>
          <motion.div className="blueprint-console research-console" initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.65, delay: 0.1 }}>
            <div className="console-head">
              <span><i /> VISION X / KNOWLEDGE SYSTEM</span>
              <span>ΜΕΘΟΔΟΣ · 01</span>
            </div>
            <div className="console-body research-console-body">
              <div className="console-diagram research-diagram" role="img" aria-label="A connected research map: question, evidence, dialogue and discovery">
                <span className="diagram-ring ring-one" />
                <span className="diagram-ring ring-two" />
                <span className="diagram-ring ring-three" />
                <span className="research-crosshair research-crosshair-one" />
                <span className="research-crosshair research-crosshair-two" />
                <div className="diagram-core">
                  <Atom size={34} strokeWidth={1.2} />
                  <small>IDEA → IMPACT</small>
                </div>
                <span className="diagram-node research-node research-node-a"><Microscope size={15} /></span>
                <span className="diagram-node research-node research-node-b"><Network size={15} /></span>
                <span className="diagram-node research-node research-node-c"><BookOpen size={15} /></span>
                <span className="diagram-label research-label-a">QUESTION</span>
                <span className="diagram-label research-label-b">EVIDENCE</span>
                <span className="diagram-label research-label-c">DISCOVERY</span>
                <span className="research-diagram-greek" aria-hidden="true">ΓΝΩΣΙΣ</span>
              </div>
              <div className="console-readout research-readout">
                <span className="readout-title">THE RESEARCH CYCLE</span>
                <div className="research-cycle-step"><span>01</span><div><b>Observe</b><small>Notice what needs to be understood.</small></div></div>
                <div className="research-cycle-step"><span>02</span><div><b>Investigate</b><small>Explore evidence and perspectives.</small></div></div>
                <div className="research-cycle-step"><span>03</span><div><b>Communicate</b><small>Present, debate and build on ideas.</small></div></div>
                <div className="readout-terminal"><i /> OPEN SYSTEM <b>READY FOR QUESTIONS</b></div>
              </div>
            </div>
            <div className="console-foot">
              <span>ΑΘΗΝΑ · KNOWLEDGE / VX—2026</span>
              <span><Network size={13} /> IDEAS, CONNECTED</span>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="question-section">
        <div className="question-inner shell">
          <motion.div className="question-orbit" aria-hidden="true" animate={{ y: [0, -10, 0], rotate: [0, 5, 0] }} transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}>
            <span>?</span>
            <i />
            <b className="question-eureka">ΕΥΡΗΚΑ!</b>
          </motion.div>
          <motion.div className="question-copy" initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
            <span className="eyebrow"><span /> THE QUESTION</span>
            <h2>What if <em>you</em><br />changed everything?</h2>
            <p>Every breakthrough begins with a question. Bring yours to a space built around curiosity, research and the exchange of ideas.</p>
            <MagneticButton className="button button-light" onClick={() => onNavigate('competitions')} strength={0.25}>
              FIND YOUR EVENT <ArrowUpRight size={17} />
            </MagneticButton>
          </motion.div>
          <div className="question-side-note">
            27—28 NOVEMBER<br />
            CHITKARA UNIVERSITY<br />
            PUNJAB · INDIA
          </div>
        </div>
      </section>
    </main>
  );
}
