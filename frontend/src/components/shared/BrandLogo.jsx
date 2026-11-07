import { motion } from 'motion/react';
import { VISION_X_LOGO_SRC } from '../../utils/constants';

export default function BrandLogo({ alt = '' }) {
  return (
    <motion.img
      className="brand-logo"
      src={VISION_X_LOGO_SRC}
      alt={alt}
      aria-hidden={alt ? undefined : true}
      whileHover={{ scale: 1.05 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    />
  );
}