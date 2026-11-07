import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Clock3, MapPin, Presentation, RadioTower } from 'lucide-react';
import { fadeInUp, staggerContainer } from '../utils/animations';
import PageHero from '../components/shared/PageHero';
import SectionHeading from '../components/shared/SectionHeading';

export default function SchedulePage() {
  const [selectedDay, setSelectedDay] = useState('day1');
  const dayInfo = useMemo(
    () => ({
      day1: { label: 'DAY 01', date: '27 NOVEMBER 2026', title: 'Day one programme', roman: 'XXVII' },
      day2: { label: 'DAY 02', date: '28 NOVEMBER 2026', title: 'Day two programme', roman: 'XXVIII' },
    }),
    []
  );

  const scheduleItems = [
    { icon: RadioTower, label: 'Sessions', title: 'Session timings and details', status: 'TO BE ANNOUNCED' },
    { icon: Presentation, label: 'Competitions', title: 'Competition slots and rounds', status: 'TO BE ANNOUNCED' },
    { icon: Clock3, label: 'Breaks', title: 'Refreshment and break intervals', status: 'TO BE ANNOUNCED' },
    { icon: MapPin, label: 'Venues', title: 'Day-wise venue information', status: 'TO BE ANNOUNCED' },
  ];

  return (
    <main className="subpage">
      <PageHero
        kicker="THE EVENT TIMELINE"
        title={<>Two days. <br /><em>Many perspectives.</em></>}
        description="An interactive overview of the two-day VISION X programme. Detailed timings, venues, sessions, competition slots and breaks will be published once finalised."
        footer="27 NOVEMBER · 28 NOVEMBER 2026"
        note={['ΧΡΟΝΟΣ', 'chrónos · time']}
      />

      <section className="section-block shell schedule-section">
        <SectionHeading
          eyebrow="SELECT A DAY"
          title={<>The programme <em>at a glance.</em></>}
          text="Switch between Day 01 and Day 02. The detailed schedule will be added after the event plan is confirmed."
        />

        <div className="schedule-day-switch" role="tablist" aria-label="Select event day">
          <motion.button type="button" role="tab" aria-selected={selectedDay === 'day1'} className={selectedDay === 'day1' ? 'is-active' : ''} onClick={() => setSelectedDay('day1')} whileTap={{ scale: 0.97 }}>
            <span>DAY 01</span>
            <strong>27 NOV</strong>
          </motion.button>
          <motion.button type="button" role="tab" aria-selected={selectedDay === 'day2'} className={selectedDay === 'day2' ? 'is-active' : ''} onClick={() => setSelectedDay('day2')} whileTap={{ scale: 0.97 }}>
            <span>DAY 02</span>
            <strong>28 NOV</strong>
          </motion.button>
        </div>

        <AnimatePresence mode="wait">
          <motion.div className="schedule-board" key={selectedDay} role="tabpanel" initial={{ opacity: 0, y: 20, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -20, scale: 0.98 }} transition={{ duration: 0.3 }}>
            <div className="schedule-board-heading">
              <div>
                <span>{dayInfo[selectedDay].label} / VISION X 2026</span>
                <h3>{dayInfo[selectedDay].title}</h3>
                <p>{dayInfo[selectedDay].date}</p>
              </div>
              <strong>{dayInfo[selectedDay].roman}</strong>
            </div>
            <motion.div className="schedule-items" initial="hidden" animate="visible" variants={staggerContainer}>
              {scheduleItems.map(({ icon: Icon, label, title, status }, index) => (
                <motion.div className="schedule-item" key={label} variants={fadeInUp} whileHover={{ x: 8, scale: 1.02 }} transition={{ type: 'spring', stiffness: 300 }}>
                  <div className="schedule-item-icon"><Icon size={19} /></div>
                  <div className="schedule-item-copy">
                    <small>0{index + 1} · {label}</small>
                    <strong>{title}</strong>
                  </div>
                  <span className="schedule-status">{status}</span>
                </motion.div>
              ))}
            </motion.div>
            <p className="schedule-note">
              <i /> Confirmed event timings and venue assignments will appear here.
            </p>
          </motion.div>
        </AnimatePresence>
      </section>
    </main>
  );
}