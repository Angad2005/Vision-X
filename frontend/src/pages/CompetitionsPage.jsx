import { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, ArrowRight, ArrowUpRight, CalendarDays, UsersRound, X } from 'lucide-react';
import { scaleIn, staggerContainer } from '../utils/animations';
import PageHero from '../components/shared/PageHero';
import MagneticButton from '../components/shared/MagneticButton';
import { competitions } from '../data/competitions';

const eventGuidelines = {
  '01': {
    title: 'Vox Sphere',
    description: 'An engaging speaker interaction platform bringing students closer to inspiring ideas, experiences and perspectives through conversations with distinguished speakers.',
    format: 'Open interactive session',
    teamSize: 'No team entry',
    rules: [
      'Open-for-all interactive session for eligible students attending VISION X 2026.',
      'Attendance is mandatory for all registered VISION X participants.',
      'Students can interact with invited speakers, ask questions and take part in meaningful discussions.',
      'This is a non-competitive event: there is no individual or team entry, evaluation, ranking or winner declaration.',
      'The session encourages curiosity, intellectual exchange and learning beyond the classroom.',
    ],
  },
  '02': {
    title: 'Innovista',
    description: 'Research Presentation and Poster Making Challenge',
    format: 'Individual or team presentation',
    teamSize: '2–3 per team',
    rules: [
      'Participants may register individually or as a team of 2–3 members.',
      'All team members must contribute to the research and presentation; one member serves as the primary presenter.',
      'Research must be original or appropriately referenced. Plagiarism and misrepresentation are prohibited.',
      'Participants must be able to explain and defend their work.',
    ],
  },
  '03': {
    title: 'Battle of Wits',
    description: 'Debate Challenge',
    format: 'Team debate challenge',
    teamSize: '2 speakers per team',
    rules: [
      'Participation is strictly team-based; each team must have exactly 2 registered speakers.',
      'Both speakers must actively participate in the debate.',
      'Teams compete according to the prescribed debate format and rules.',
      'Respectful debate and professional conduct are mandatory.',
    ],
  },
  '04': {
    title: 'Visionathon',
    description: 'Overnight Review Paper Making Challenge',
    format: 'Team review paper challenge',
    teamSize: '2–4 overview / 2–3 registered members',
    rules: [
      'Participation is team-based. The format overview lists teams of 2–4; the event-specific eligibility requirement is 2–3 registered members.',
      'All members must contribute to the literature review, analysis, academic writing and final submission.',
      'Each team must submit one review paper within the allotted duration.',
      'Participants must follow academic referencing and citation standards.',
      'AI-generated content, if used, must comply with the event’s declared AI-use policy.',
      'Plagiarism must remain below the prescribed threshold of 30%, subject to the organising committee’s verification procedure.',
    ],
  },
};

export default function CompetitionsPage({ onNavigate, guidelinesRequest = 0 }) {
  const [selectedNumber, setSelectedNumber] = useState(competitions[0].number);
  const guidelinesDialogRef = useRef(null);
  const selectedEvent = competitions.find((event) => event.number === selectedNumber);
  const selectedIndex = competitions.findIndex((event) => event.number === selectedNumber);
  const showPreviousEvent = () => setSelectedNumber(competitions[(selectedIndex - 1 + competitions.length) % competitions.length].number);
  const showNextEvent = () => setSelectedNumber(competitions[(selectedIndex + 1) % competitions.length].number);
  const openGuidelines = () => {
    guidelinesDialogRef.current?.showModal();
  };
  const selectedGuidelines = eventGuidelines[selectedNumber];
  const selectedEventFormat = {
    event: selectedGuidelines.title,
    format: selectedGuidelines.format,
    teamSize: selectedGuidelines.teamSize,
  };

  useEffect(() => {
    if (guidelinesRequest > 0) openGuidelines();
  }, [guidelinesRequest]);

  return (
    <main className="subpage">
      <PageHero
        kicker="THE VISION X EVENTS"
        title={<>Four events. <br /><em>One curious mind.</em></>}
        description="Talks, research communication, debate and an overnight academic writing challenge."
        footer="04 EVENTS · 27–28 NOVEMBER 2026"
        note={['ΑΓΩΝ', 'agṓn · a contest, a gathering']}
      />

      <section className="event-showcase" id="event-showcase">
        <div className="shell event-showcase-inner">
          <div className="competition-intro">
            <div>
              <span className="eyebrow"><span /> FIND YOUR EVENT</span>
              <h2>Choose your <em>folder.</em></h2>
            </div>
            <p>Pick an event to see what it’s about, when it takes place and how to register.</p>
          </div>

          <motion.div className="event-folder-grid" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }} variants={staggerContainer} role="group" aria-label="Choose an event">
            {competitions.map((item) => {
              const isSelected = item.number === selectedNumber;
              return (
                <motion.button
                  type="button"
                  className={`event-folder ${isSelected ? 'is-selected' : ''}`}
                  key={item.number}
                  variants={scaleIn}
                  whileHover={{ y: -6 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setSelectedNumber(item.number)}
                  aria-pressed={isSelected}
                  aria-controls="selected-event-details"
                >
                  <span className="event-folder-category">{item.detail}</span>
                  <strong>{item.name}</strong>
                  <span className="event-folder-dot" />
                  <span className="event-folder-art" aria-hidden="true">
                    <img className="event-folder-poster" src={item.image} alt="" loading="lazy" />
                  </span>
                </motion.button>
              );
            })}
          </motion.div>

          <motion.article
            className="event-detail-panel"
            id="selected-event-details"
            key={selectedEvent.number}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
            aria-labelledby="selected-event-title"
          >
            <button type="button" className="event-carousel-arrow event-carousel-previous" onClick={showPreviousEvent} aria-label="Previous event">
              <ArrowLeft size={20} />
            </button>
            <button type="button" className="event-carousel-arrow event-carousel-next" onClick={showNextEvent} aria-label="Next event">
              <ArrowRight size={20} />
            </button>
            <div className="event-detail-art">
              <img src={selectedEvent.image} alt={`${selectedEvent.name} event poster`} />
            </div>
            <div className="event-detail-copy">
              <span className="event-detail-category">{selectedEvent.type}</span>
              <h2 id="selected-event-title">{selectedEvent.name}</h2>
              <p className="event-detail-subtitle">{selectedEvent.detail}</p>
              <div className="event-facts">
                <div><CalendarDays size={18} /><span><b>Event date</b>{selectedEvent.date}</span></div>
                <div className="event-primary-outcome"><UsersRound size={18} /><span>{selectedEvent.primaryOutcome}</span></div>
              </div>
              <p className="event-detail-description">{selectedEvent.description}</p>
              <div className="event-detail-actions">
                {selectedNumber !== '01' && (
                  <>
                    <MagneticButton className="button button-primary" onClick={() => onNavigate('register')} strength={0.2}>
                      REGISTER NOW <ArrowUpRight size={16} />
                    </MagneticButton>
                    <button type="button" className="event-guidelines-trigger" onClick={openGuidelines}>
                      EXPLORE GUIDELINES <ArrowUpRight size={15} />
                    </button>
                  </>
                )}
              </div>
            </div>
          </motion.article>
        </div>
      </section>

      <dialog
        className="event-guidelines-dialog"
        ref={guidelinesDialogRef}
        aria-labelledby="event-guidelines-title"
        onClick={(event) => {
          if (event.target === guidelinesDialogRef.current) guidelinesDialogRef.current.close();
        }}
      >
        <div className="event-guidelines-modal">
          <div className="event-guidelines-modal-head">
            <div>
              <span className="event-detail-category">PARTICIPANT INFORMATION</span>
              <h2 id="event-guidelines-title">Participation guidelines</h2>
              <p>Participation format, eligibility and rules for {selectedEvent.name}.</p>
            </div>
            <button type="button" autoFocus className="event-guidelines-close" onClick={() => guidelinesDialogRef.current?.close()} aria-label="Close guidelines">
              <X size={20} />
            </button>
          </div>

          <div className="event-guidelines-content">
            <section>
              <h3>1. Event details</h3>
              <p className="event-guidelines-lead">{selectedEvent.description}</p>
              <p className="event-guidelines-lead">{selectedGuidelines.description}</p>
            </section>

            <section>
              <h3>2. Participation format &amp; team composition</h3>
              <div className="event-guidelines-table-wrap">
                <table className="event-guidelines-table">
                  <thead><tr><th>Event</th><th>Format</th><th>Team size</th></tr></thead>
                  <tbody>
                    <tr>
                      <td>{selectedEventFormat.event}</td>
                      <td>{selectedEventFormat.format}</td>
                      <td>{selectedEventFormat.teamSize}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <h4>General participation &amp; eligibility</h4>
              <ol>
                <li>Participation is open to Chitkara students across its schools and academic branches, as well as other eligible students subject to each event’s criteria. School students may participate where permitted.</li>
                <li>Complete official registration by the prescribed deadline and provide accurate academic and institutional details.</li>
                <li>Team members must register together under one team entry, and each member must meet the event’s eligibility requirements.</li>
                <li>All participants are expected to contribute actively. Duplicate registrations in the same competition are not permitted.</li>
                <li>Carry a valid institutional ID or other accepted student identification.</li>
                <li>Changes to team composition require prior organising committee approval.</li>
                <li>Follow competition-specific rules, instructions and the code of conduct. The organising committee may establish additional event regulations.</li>
              </ol>
            </section>

            <section>
              <h3>3. Competition-specific requirements</h3>
              <h4>{selectedGuidelines.title}</h4>
              <ul>
                {selectedGuidelines.rules.map((rule) => <li key={rule}>{rule}</li>)}
              </ul>
            </section>
          </div>
        </div>
      </dialog>

      <section className="competition-cta">
        <div className="shell competition-cta-inner">
          <div>
            <span className="eyebrow"><span /> YOUR NEXT IDEA STARTS HERE</span>
            <h2>Take your place <em>at VISION X.</em></h2>
            <p>27–28 November 2026 · Chitkara University, Punjab.</p>
          </div>
          <MagneticButton className="button button-light" onClick={() => onNavigate('competitions', 'event-showcase')} strength={0.25}>
            REGISTER NOW <ArrowUpRight size={17} />
          </MagneticButton>
        </div>
      </section>
    </main>
  );
}