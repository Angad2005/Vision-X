import { useRef, useState } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, ArrowRight, ArrowUpRight, CalendarDays, Clock3, UsersRound, X } from 'lucide-react';
import { scaleIn, staggerContainer } from '../utils/animations';
import PageHero from '../components/shared/PageHero';
import MagneticButton from '../components/shared/MagneticButton';
import { competitions } from '../data/competitions';

const eventGuidelines = {
  '01': {
    title: 'Vox Sphere',
    description: 'An engaging speaker interaction platform bringing students closer to inspiring ideas, experiences and perspectives through conversations with distinguished speakers.',
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

export default function CompetitionsPage({ onNavigate }) {
  const [selectedNumber, setSelectedNumber] = useState(competitions[0].number);
  const guidelinesDialogRef = useRef(null);
  const selectedEvent = competitions.find((event) => event.number === selectedNumber);
  const SelectedIcon = selectedEvent.icon;
  const selectedIndex = competitions.findIndex((event) => event.number === selectedNumber);
  const showPreviousEvent = () => setSelectedNumber(competitions[(selectedIndex - 1 + competitions.length) % competitions.length].number);
  const showNextEvent = () => setSelectedNumber(competitions[(selectedIndex + 1) % competitions.length].number);
  const openGuidelines = () => guidelinesDialogRef.current?.showModal();
  const selectedGuidelines = eventGuidelines[selectedNumber];

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
              const Icon = item.icon;
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
                    <Icon className="event-folder-icon" size={42} strokeWidth={1.25} />
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
            <div className="event-detail-art" style={{ background: selectedEvent.gradient }} aria-hidden="true">
              <SelectedIcon size={76} strokeWidth={1} />
              <span>{selectedEvent.greek}</span>
            </div>
            <div className="event-detail-copy">
              <span className="event-detail-category">{selectedEvent.type}</span>
              <h2 id="selected-event-title">{selectedEvent.name}</h2>
              <p className="event-detail-subtitle">{selectedEvent.detail}</p>
              <div className="event-facts">
                <div><CalendarDays size={18} /><span><b>Event date</b>27–28 November 2026</span></div>
                <div><Clock3 size={18} /><span><b>Registration deadline</b>To be announced</span></div>
                <div><UsersRound size={18} /><span><b>Availability</b>See registration for updates</span></div>
              </div>
              <p className="event-detail-description">{selectedEvent.description}</p>
              <div className="event-detail-actions">
                <MagneticButton className="button button-primary" onClick={() => onNavigate('competitions', 'event-showcase')} strength={0.2}>
                  REGISTER NOW <ArrowUpRight size={16} />
                </MagneticButton>
                <button type="button" className="event-guidelines-trigger" onClick={openGuidelines}>
                  EXPLORE GUIDELINES <ArrowUpRight size={15} />
                </button>
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
              <h3>1. Participation format &amp; team composition</h3>
              <p className="event-guidelines-lead">VISION X 2026 welcomes individual and team-based participation. The format and team composition vary by event.</p>
              <div className="event-guidelines-table-wrap">
                <table className="event-guidelines-table">
                  <thead><tr><th>Event</th><th>Format</th><th>Team size</th></tr></thead>
                  <tbody>
                    <tr><td>Vox Sphere</td><td>Open interactive session</td><td>No team entry</td></tr>
                    <tr><td>Innovista</td><td>Individual or team</td><td>2–3 per team</td></tr>
                    <tr><td>Battle of Wits</td><td>Team</td><td>2</td></tr>
                    <tr><td>Visionathon</td><td>Team</td><td>2–4 overview*</td></tr>
                  </tbody>
                </table>
              </div>
              <p className="event-guidelines-footnote">*Visionathon’s event-specific eligibility requirement lists 2–3 registered members; see section 4.</p>
              <h4>General guidelines</h4>
              <ol>
                <li>Register through the official registration platform.</li>
                <li>Team members must be registered under a single team entry.</li>
                <li>All participants are expected to actively contribute to their respective competitions.</li>
                <li>Duplicate registrations in the same competition are not permitted.</li>
                <li>Changes to team composition after registration or the deadline require prior approval from the organising committee.</li>
                <li>Participants must comply with eligibility criteria and competition-specific guidelines. The organising committee may establish and enforce additional participation regulations.</li>
              </ol>
            </section>

            <section>
              <h3>2. General eligibility criteria</h3>
              <ol>
                <li>Participation is open to Chitkara students across its schools and academic branches.</li>
                <li>School students may participate where school-level participation is permitted.</li>
                <li>Provide accurate academic and institutional details during registration.</li>
                <li>Carry a valid institutional ID card or other accepted student identification.</li>
                <li>Complete official registration within the prescribed deadline.</li>
                <li>Each team member must individually meet the eligibility requirements of their event.</li>
                <li>Follow competition-specific rules, submission guidelines and the code of conduct.</li>
              </ol>
            </section>

            <section>
              <h3>3. Competition-wise eligibility</h3>
              <div className="event-guidelines-table-wrap">
                <table className="event-guidelines-table">
                  <thead><tr><th>Event</th><th>Category</th></tr></thead>
                  <tbody>
                    <tr><td>Vox Sphere</td><td>TEDx-style Speaker Interaction Session</td></tr>
                    <tr><td>Innovista</td><td>Research Presentation &amp; Poster Making Challenge</td></tr>
                    <tr><td>Battle of Wits</td><td>Debate Challenge</td></tr>
                    <tr><td>Visionathon</td><td>Overnight Review Paper Challenge</td></tr>
                  </tbody>
                </table>
              </div>
            </section>

            <section>
              <h3>4. Additional eligibility requirements</h3>
              <h4>{selectedGuidelines.title}</h4>
              <p className="event-guidelines-lead">{selectedGuidelines.description}</p>
              <ul>
                {selectedGuidelines.rules.map((rule) => <li key={rule}>{rule}</li>)}
              </ul>
            </section>

            <section>
              <h3>5. Common disqualification conditions</h3>
              <p className="event-guidelines-lead">Participants may be disqualified for:</p>
              <ul>
                <li>Plagiarism, fabricated data or academic misconduct.</li>
                <li>Providing false registration or institutional information.</li>
                <li>Violating competition-specific rules.</li>
                <li>Disruptive, discriminatory or inappropriate behaviour.</li>
                <li>Missing mandatory submissions or deadlines.</li>
                <li>Using unauthorised assistance or materials.</li>
              </ul>
            </section>

            <section>
              <h3>6. Brochure-ready official version</h3>
              <h4>Eligibility criteria</h4>
              <p className="event-guidelines-lead">VISION X 2026 welcomes enthusiastic students from Chitkara University, its academic schools and other eligible educational institutions, subject to competition-specific requirements.</p>
              <ol>
                <li>Participation is open to school and college students as permitted under individual competition guidelines.</li>
                <li>Participants must provide valid academic and institutional identification.</li>
                <li>All registrations must be completed through the official registration platform.</li>
                <li>Participants must adhere to the prescribed team composition and competition format.</li>
                <li>Submitted work must comply with academic integrity, originality and ethical research standards.</li>
                <li>Participants must follow instructions and deadlines established by the organising committee.</li>
              </ol>
              <h4>Academic integrity</h4>
              <ul>
                <li>Plagiarism, fabricated information and misrepresentation of work are strictly prohibited.</li>
                <li>All external sources, references and supporting materials must be appropriately acknowledged.</li>
                <li>Participants must maintain professional conduct throughout the event.</li>
              </ul>
              <h4>Disqualification</h4>
              <p className="event-guidelines-lead">The organising committee may disqualify any participant or team that violates eligibility requirements, competition rules or academic integrity standards. Its decision on eligibility and participation is final.</p>
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