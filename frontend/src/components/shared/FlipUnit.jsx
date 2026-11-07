import { motion, AnimatePresence } from 'motion/react';

export default function FlipUnit({ label, value, greek }) {
  const displayValue = String(value).padStart(2, '0');
  return (
    <div className="countdown-unit">
      <AnimatePresence mode="popLayout">
        <motion.strong
          key={displayValue}
          className="flip"
          initial={{ y: '100%', opacity: 0, rotateX: -90 }}
          animate={{ y: 0, opacity: 1, rotateX: 0 }}
          exit={{ y: '-100%', opacity: 0, rotateX: 90 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        >
          {displayValue}
        </motion.strong>
      </AnimatePresence>
      <span>{label}</span>
      {greek && (
        <em className="unit-greek" aria-hidden="true">
          {greek}
        </em>
      )}
    </div>
  );
}