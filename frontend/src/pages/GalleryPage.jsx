import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BookOpen, Image as ImageIcon, RadioTower, Video } from 'lucide-react';
import PageHero from '../components/shared/PageHero';
import SectionHeading from '../components/shared/SectionHeading';

export default function GalleryPage() {
  const [filter, setFilter] = useState('all');
  const items = [
    { id: 'photos', category: 'photos', title: 'Event photographs', tag: 'PHOTOGRAPHY', icon: ImageIcon, code: 'IMG / 001', shape: 'gallery-visual-one' },
    { id: 'videos', category: 'videos', title: 'Video highlights', tag: 'MOTION PICTURE', icon: Video, code: 'VID / 002', shape: 'gallery-visual-two' },
    { id: 'behind', category: 'behind', title: 'Behind the scenes', tag: 'THE MAKING OF VX', icon: RadioTower, code: 'BTS / 003', shape: 'gallery-visual-three' },
    { id: 'updates', category: 'updates', title: 'Event updates', tag: 'FIELD NOTES', icon: BookOpen, code: 'LOG / 004', shape: 'gallery-visual-four' },
  ];
  const visibleItems = filter === 'all' ? items : items.filter((item) => item.category === filter);

  return (
    <main className="subpage">
      <PageHero
        kicker="GALLERY & HIGHLIGHTS"
        title={<>Ideas leave a trace. <br /><em>Moments tell stories.</em></>}
        description="Photographs, videos, behind-the-scenes moments and event updates will be collected here."
        footer="THE VISION X ARCHIVE · 2026"
        note={['ΕΙΚΩΝ', 'eikṓn · an image, a likeness']}
      />

      <section className="section-block shell gallery-section">
        <SectionHeading
          eyebrow="THE VISION X ARCHIVE"
          title={<>A record of <em>curiosity in action.</em></>}
          text="The gallery will grow as official event media and updates become available."
        />

        <div className="gallery-filters" role="group" aria-label="Filter gallery content">
          {[['all', 'ALL'], ['photos', 'PHOTOGRAPHS'], ['videos', 'VIDEOS'], ['behind', 'BEHIND THE SCENES'], ['updates', 'UPDATES']].map(([value, label]) => (
            <motion.button type="button" key={value} className={filter === value ? 'is-active' : ''} onClick={() => setFilter(value)} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} layout>
              {label}
            </motion.button>
          ))}
        </div>

        <motion.div className="gallery-grid" layout>
          <AnimatePresence mode="popLayout">
            {visibleItems.map(({ id, title, tag, icon: Icon, code, shape }) => (
              <motion.article className="gallery-card" key={id} layout initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} transition={{ duration: 0.3 }} whileHover={{ y: -8, scale: 1.02 }}>
                <div className={`gallery-visual ${shape}`}>
                  <span className="gallery-code">{code}</span>
                  <Icon size={38} strokeWidth={1.1} />
                  <span className="gallery-watermark">X</span>
                  <small>MEDIA SLOT / READY</small>
                </div>
                <div className="gallery-card-copy">
                  <span>{tag}</span>
                  <h3>{title}</h3>
                  <p>Official content will be added here when available.</p>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>
      </section>
    </main>
  );
}