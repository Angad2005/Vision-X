import { motion } from 'motion/react';
import { Atom, FlaskConical, Landmark } from 'lucide-react';
import { fadeInUp, staggerContainer, scaleIn } from '../utils/animations';
import PageHero from '../components/shared/PageHero';
import SectionHeading from '../components/shared/SectionHeading';
import MeanderDivider from '../components/shared/MeanderDivider';
import FloatingSymbols from '../components/shared/FloatingSymbols';
import { lexicon } from '../data/lexicon';

export default function AboutPage() {
  return (
    <main className="subpage">
      <PageHero
        kicker="ABOUT VISION X · 2026"
        title={<>From Curiosity <br /><em>To Impact</em></>}
        description="A research and ideas-led gathering at Chitkara University, Punjab."
        footer="27–28 NOVEMBER 2026 · CHITKARA UNIVERSITY"
        note={['ΕΠΙΣΤΗΜΗ', 'epistḗmē · knowledge that can be justified']}
      />

      <section className="section-block shell about-overview">
        <SectionHeading
          eyebrow="WHAT IS VISION X?"
          title={<>A place for the <em>next question.</em></>}
          text="VISION X is a platform for ideas, research presentation, debate and scholarly writing. It brings different ways of thinking into one shared event."
        />
        <motion.div className="about-pillar-grid" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={staggerContainer}>
          <motion.article className="about-pillar" variants={scaleIn} whileHover={{ y: -6 }}>
            <span>01</span>
            <Landmark size={28} />
            <h3>Ancient curiosity</h3>
            <p>Inspired by the long tradition of asking questions, examining ideas and seeking understanding.</p>
            <small>INQUIRY · ΓΝΩΣΙΣ</small>
          </motion.article>
          <motion.article className="about-pillar" variants={scaleIn} whileHover={{ y: -6 }}>
            <span>02</span>
            <FlaskConical size={28} />
            <h3>Research culture</h3>
            <p>Making room for research presentations, posters and careful engagement with existing work.</p>
            <small>EVIDENCE · ΕΡΕΥΝΑ</small>
          </motion.article>
          <motion.article className="about-pillar" variants={scaleIn} whileHover={{ y: -6 }}>
            <span>03</span>
            <Atom size={28} />
            <h3>Future thinking</h3>
            <p>Encouraging communication, debate and new perspectives across areas of knowledge.</p>
            <small>IDEAS · ΜΕΛΛΟΝ</small>
          </motion.article>
        </motion.div>
      </section>

      <MeanderDivider glyph="Λ" label="ΛΟΓΟΣ · WORD & REASON" />

      <section className="section-block shell lexicon-section">
        <SectionHeading
          eyebrow="ΛΕΞΙΚΟΝ · THE LANGUAGE OF SCIENCE"
          title={<>Words we <em>inherited.</em></>}
          text="Much of the vocabulary of research comes straight from Greek. Every time you form a hypothesis or run an analysis, you are speaking it."
        />
        <motion.div className="lexicon-grid" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.15 }} variants={staggerContainer}>
          {lexicon.map((w) => (
            <motion.article className="lexicon-card" key={w.english} variants={fadeInUp} whileHover={{ y: -5 }}>
              <strong lang="el">{w.greek}</strong>
              <em>{w.roman}</em>
              <p>“{w.meaning}”</p>
              <span>→ {w.english}</span>
            </motion.article>
          ))}
        </motion.div>
      </section>

      <section className="about-mission-section">
        <FloatingSymbols count={6} />
        <div className="shell mission-grid">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <span className="eyebrow"><span /> OUR VISION · DRAFT</span>
            <h2>Make curiosity <br /><em>a catalyst.</em></h2>
            <p>To create a space where curiosity, research and open exchange can move people towards new possibilities.</p>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <span className="eyebrow"><span /> OUR MISSION · DRAFT</span>
            <h2>Question. Share. <br /><em>Understand.</em></h2>
            <p>To bring people together through talks, research communication, debate and collaborative academic challenges.</p>
          </motion.div>
        </div>
      </section>

      <section className="section-block shell why-research-section">
        <SectionHeading
          eyebrow="WHY RESEARCH & INNOVATION MATTER"
          title={<>Progress begins with <em>evidence.</em></>}
          text="Research helps us examine what we know. Innovation invites us to explore what might be possible. Both depend on curiosity and thoughtful exchange."
        />
        <motion.div className="research-steps" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={staggerContainer}>
          <motion.div variants={fadeInUp}><strong>01</strong><span>QUESTION</span><p>Recognise what is not yet understood.</p></motion.div>
          <motion.div variants={fadeInUp}><strong>02</strong><span>INVESTIGATE</span><p>Explore evidence, literature and perspectives.</p></motion.div>
          <motion.div variants={fadeInUp}><strong>03</strong><span>COMMUNICATE</span><p>Present findings and test ideas through dialogue.</p></motion.div>
          <motion.div variants={fadeInUp}><strong>04</strong><span>MOVE FORWARD</span><p>Carry new insight into future work.</p></motion.div>
        </motion.div>
      </section>
    </main>
  );
}