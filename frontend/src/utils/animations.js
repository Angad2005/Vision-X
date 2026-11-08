// Reusable motion variants used across pages
export const fadeInUp = {
  hidden: { opacity: 1, y: 16, clipPath: 'inset(100% 0 0 0)' },
  visible: {
    opacity: 1,
    y: 0,
    clipPath: 'inset(-8% 0 0 0)',
    transition: { duration: 0.52, ease: [0.22, 1, 0.36, 1] },
  },
};

export const staggerContainer = {
  hidden: { opacity: 1 },
  visible: {
    transition: { staggerChildren: 0.07, delayChildren: 0.12 },
  },
};

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};
