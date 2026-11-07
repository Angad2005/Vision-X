import { motion } from 'motion/react';
import { ArrowDown } from 'lucide-react';

export default function PageHero({ kicker, title, description, footer, note }) {
  return (
    <motion.section
      className="page-hero shell"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.65 }}
    >
      <div className="greek-relief" aria-hidden="true" />
      <div className="page-hero-kicker">
        <span /> {kicker}
      </div>
      <h1>{title}</h1>
      <p>{description}</p>
      <div className="page-hero-foot">
        <span>{footer}</span>
        <ArrowDown size={16} />
      </div>
      {note && (
        <div className="page-hero-note" aria-hidden="true">
          <b>{note[0]}</b>
          <span>{note[1]}</span>
        </div>
      )}
    </motion.section>
  );
}