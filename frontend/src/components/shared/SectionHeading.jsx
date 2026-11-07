import { motion } from 'motion/react';
import { fadeInUp, staggerContainer } from '../../utils/animations';

export default function SectionHeading({ eyebrow, title, text, align = 'center' }) {
  return (
    <motion.div
      className={`section-heading align-${align}`}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={staggerContainer}
    >
      <motion.span className="eyebrow" variants={fadeInUp}>
        <span />
        {eyebrow}
      </motion.span>
      <motion.h2 variants={fadeInUp}>{title}</motion.h2>
      {text && <motion.p variants={fadeInUp}>{text}</motion.p>}
    </motion.div>
  );
}