import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { EVENT_START, EVENT_END } from '../../utils/constants';
import FlipUnit from './FlipUnit';

export default function Countdown() {
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    const timer = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(timer);
  }, []);

  const remaining = Math.max(0, EVENT_START.getTime() - now);
  const units = [
    ['DAYS', Math.floor(remaining / 86400000), 'ΗΜΕΡΕΣ'],
    ['HOURS', Math.floor((remaining / 3600000) % 24), 'ΩΡΕΣ'],
    ['MINUTES', Math.floor((remaining / 60000) % 60), 'ΛΕΠΤΑ'],
    ['SECONDS', Math.floor((remaining / 1000) % 60), 'ΔΕΥΤΕΡΟΛΕΠΤΑ'],
  ];

  const eventOver = now >= EVENT_END.getTime();
  const eventStarted = now >= EVENT_START.getTime() && !eventOver;

  return (
    <motion.div
      className="countdown-panel"
      aria-live="off"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
    >
      <div className="countdown-heading">
        <span className="countdown-pulse" />
        {eventOver
          ? 'THE 2026 EDITION HAS CONCLUDED'
          : eventStarted
          ? 'VISION X IS UNDERWAY'
          : 'COUNTDOWN TO VISION X'}
      </div>
      {eventStarted || eventOver ? (
        <motion.div
          className="countdown-live-copy"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {eventOver
            ? '27–28 NOVEMBER 2026 · THANK YOU FOR BEING PART OF THE JOURNEY'
            : '27–28 NOVEMBER 2026 · THE EXPERIENCE IS LIVE'}
        </motion.div>
      ) : (
        <div className="countdown-units">
          {units.map(([label, value, greek]) => (
            <FlipUnit key={label} label={label} value={value} greek={greek} />
          ))}
        </div>
      )}
    </motion.div>
  );
}