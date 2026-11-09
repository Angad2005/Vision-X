import { useState } from 'react';
import { motion } from 'motion/react';
import { Instagram, Users } from 'lucide-react';

export default function TeamCard({ member, index }) {
  const [photoFailed, setPhotoFailed] = useState(false);

  return (
    <motion.article
      className="team-card"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.07 }}
      whileHover={{ y: -6, scale: 1.015 }}
    >
      <div className={`team-photo ${member.image ? 'has-photo' : ''}`}>
        {member.image && !photoFailed ? (
          <motion.img
            src={member.image}
            alt={member.name}
            loading="lazy"
            onError={() => setPhotoFailed(true)}
            initial={{ scale: 1.1 }}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.4 }}
          />
        ) : (
          <motion.div
            className="team-monogram"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <span>{member.initials}</span>
            <small>VISION X</small>
          </motion.div>
        )}
        <span className="team-photo-index">0{index + 1}</span>
        <span className="team-photo-rule" />
        <span className="team-photo-greek">ΓΝΩΣΙΣ</span>
      </div>
      <div className="team-card-copy">
        <span className="team-role">{member.role}</span>
        <h3>{member.name}</h3>
        <p>{member.description}</p>
        <div className="team-socials">
          <motion.span whileHover={{ scale: 1.1, rotate: 5 }}>
            <Instagram size={14} />
          </motion.span>
          <motion.span whileHover={{ scale: 1.1, rotate: -5 }}>
            <Users size={14} />
          </motion.span>
          <small>VISION X TEAM</small>
        </div>
      </div>
    </motion.article>
  );
}