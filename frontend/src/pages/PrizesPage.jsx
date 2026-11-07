import { motion } from 'motion/react';
import { Award, Medal, Trophy } from 'lucide-react';
import { staggerContainer, scaleIn } from '../utils/animations';
import PageHero from '../components/shared/PageHero';
import LaurelWreath from '../components/shared/LaurelWreath';

export default function PrizesPage() {
  const prizeItems = [
    { name: 'Competition-wise prizes', text: 'Prize allocation for each competition will be published once finalised.', icon: Trophy },
    { name: 'Certificates', text: 'Certificate information will be shared with the final event guidelines.', icon: Medal },
    { name: 'Awards & recognition', text: 'Recognition categories and award details will be announced.', icon: Award },
  ];

  return (
    <main className="subpage">
      <PageHero
        kicker="PRIZES & RECOGNITION"
        title={<>Celebrate the work. <br /><em>Recognise the ideas.</em></>}
        description="A platform to recognise curiosity, research communication and thoughtful participation."
        footer="TOTAL PRIZE POOL · 30K"
        note={['ΝΙΚΗ', 'níkē · victory']}
      />

      <section className="section-block shell prize-section">
        <motion.div className="prize-total-card" initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.6 }} whileHover={{ scale: 1.02 }}>
          <motion.div className="prize-total-orbit" animate={{ rotate: 360 }} transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}>
            <Trophy size={48} strokeWidth={1.1} />
          </motion.div>
          <LaurelWreath />
          <div>
            <span className="eyebrow"><span /> VISION X 2026</span>
            <motion.strong initial={{ scale: 0 }} whileInView={{ scale: 1 }} viewport={{ once: true }} transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}>
              30K
            </motion.strong>
            <h2>Total prize pool</h2>
            <p>Competition-wise distribution and individual prize details will be announced once finalised.</p>
          </div>
          <span className="prize-card-mark">VX / 2026</span>
        </motion.div>

        <motion.div className="prize-detail-grid" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={staggerContainer}>
          {prizeItems.map(({ name, text, icon: Icon }, index) => (
            <motion.article className="prize-detail-card" key={name} variants={scaleIn} whileHover={{ y: -8, scale: 1.03 }}>
              <span>0{index + 1}</span>
              <Icon size={27} />
              <h3>{name}</h3>
              <p>{text}</p>
            </motion.article>
          ))}
        </motion.div>
      </section>
    </main>
  );
}