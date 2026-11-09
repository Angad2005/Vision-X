import { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, ArrowRight, ArrowUpRight, CalendarDays, ChevronDown, UsersRound, X } from 'lucide-react';
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

const submissionRequirements = {
  '01': {
    title: 'Vox Sphere – TEDx-style Speaker Interaction',
    intro: 'Vox Sphere does not require any competition-related submission. It is a mandatory, open-for-all interactive session where students attend and engage with invited speakers.',
    items: [],
  },
  '02': {
    title: 'Innovista – Research Presentation & Poster Making Challenge',
    items: [
      { label: 'Abstract', detail: 'Submit as PDF or DOCX. Recommended length: 250–300 words.' },
      { label: 'Research poster', detail: 'Submit as PDF, PNG or JPG. Recommended poster size: A1.' },
      { label: 'Presentation slides', detail: 'Submit as PPTX or PDF.' },
      { label: 'Supporting research documentation', detail: 'Submit as PDF or DOCX, wherever applicable.' },
    ],
  },
  '03': {
    title: 'Battle of Wits – Debate Challenge',
    items: [
      { label: 'Team registration', detail: 'Register the team through the official registration platform.' },
      { label: 'Team details', detail: 'Provide complete details for both team members.' },
      { label: 'Supporting research and references', detail: 'Submit as PDF or DOCX, if requested.' },
      { label: 'Arguments and rebuttals', detail: 'These will be delivered orally during the event.' },
    ],
  },
  '04': {
    title: 'Visionathon – Overnight Review Paper Making Challenge',
    items: [
      { label: 'Final review paper', detail: 'Submit as PDF or DOCX. Recommended length: 2,500–4,000 words.' },
      { label: 'Language and formatting', detail: 'Write in English using Times New Roman, 12 pt, with 1.5 line spacing.' },
      { label: 'Citation style', detail: 'Use APA 7th Edition.' },
      { label: 'Abstract and keywords', detail: 'Include both in the final paper.' },
      { label: 'Plagiarism report', detail: 'Submit as PDF.' },
      { label: 'AI-use disclosure', detail: 'Provide wherever applicable.' },
    ],
  },
};

export default function CompetitionsPage({ onNavigate, guidelinesRequest = 0 }) {
  const [selectedNumber, setSelectedNumber] = useState(competitions[0].number);
  const [submissionDetailsOpen, setSubmissionDetailsOpen] = useState(false);
  const guidelinesDialogRef = useRef(null);
  const selectedEvent = competitions.find((event) => event.number === selectedNumber);
  const selectedIndex = competitions.findIndex((event) => event.number === selectedNumber);
  const showPreviousEvent = () => setSelectedNumber(competitions[(selectedIndex - 1 + competitions.length) % competitions.length].number);
  const showNextEvent = () => setSelectedNumber(competitions[(selectedIndex + 1) % competitions.length].number);
  const openGuidelines = () => {
    setSubmissionDetailsOpen(false);
    guidelinesDialogRef.current?.showModal();
  };
  const selectedGuidelines = eventGuidelines[selectedNumber];
  const selectedSubmissionRequirements = submissionRequirements[selectedNumber];

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
                <div><CalendarDays size={18} /><span><b>Event date</b>27–28 November 2026</span></div>
                <div className="event-primary-outcome"><UsersRound size={18} /><span>{selectedEvent.primaryOutcome}</span></div>
              </div>
              <p className="event-detail-description">{selectedEvent.description}</p>
              <div className="event-detail-actions">
                {selectedNumber !== '01' && (
                  <MagneticButton className="button button-primary" onClick={() => onNavigate('register')} strength={0.2}>
                    REGISTER NOW <ArrowUpRight size={16} />
                  </MagneticButton>
                )}
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
            <button
              type="button"
              className="submission-details-toggle"
              aria-expanded={submissionDetailsOpen}
              aria-controls="submission-details-panel"
              onClick={() => setSubmissionDetailsOpen((open) => !open)}
            >
              SUBMISSION GUIDELINES
              <ChevronDown size={17} className={submissionDetailsOpen ? 'is-expanded' : ''} />
            </button>
            {submissionDetailsOpen && (
              <section className="submission-details-panel" id="submission-details-panel" aria-labelledby="submission-details-title">
                <h3 id="submission-details-title">Submission requirements &amp; accepted formats</h3>
                <p className="event-guidelines-lead">All participants must follow the submission requirements and accepted file formats for their selected competition.</p>
                <h4>{selectedSubmissionRequirements.title}</h4>
                {selectedSubmissionRequirements.intro && <p className="event-guidelines-lead">{selectedSubmissionRequirements.intro}</p>}
                {selectedSubmissionRequirements.items.length > 0 && (
                  <ul className="submission-requirements-list">
                    {selectedSubmissionRequirements.items.map(({ label, detail }) => (
                      <li key={label}><strong>{label}:</strong> {detail}</li>
                    ))}
                  </ul>
                )}
                <h4>General submission conditions</h4>
                <ul>
                  <li>Complete all submissions within the prescribed deadline.</li>
                  <li>Submit files in the specified formats.</li>
                  <li>Ensure originality and proper referencing.</li>
                  <li>Incomplete, corrupted or inaccessible files may be rejected.</li>
                  <li>Late submissions require approval from the organising committee.</li>
                  <li>The organising committee may verify submissions and enforce academic integrity requirements.</li>
                </ul>
              </section>
            )}
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
              <p className="event-guidelines-footnote">*Visionathon’s event-specific eligibility requirement lists 2–3 registered members; see section 3.</p>
              <h4>General participation &amp; eligibility</h4>
              <ol>
                <li>Participation is open to Chitkara students across its schools and academic branches, as well as other eligible students subject to each event’s criteria. School students may participate where permitted.</li>
                <li>Complete official registration by the prescribed deadline and provide accurate academic and institutional details.</li>
                <li>Team members must register together under one team entry, and each member must meet the event’s eligibility requirements.</li>
                <li>All participants are expected to contribute actively. Duplicate registrations in the same competition are not permitted.</li>
                <li>Carry a valid institutional ID or other accepted student identification.</li>
                <li>Changes to team composition require prior organising committee approval.</li>
                <li>Follow competition-specific rules, submission guidelines, instructions and the code of conduct. The organising committee may establish additional event regulations.</li>
              </ol>
            </section>

            <section>
              <h3>2. Competition-wise eligibility</h3>
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
              <h3>3. Additional eligibility requirements</h3>
              <h4>{selectedGuidelines.title}</h4>
              <p className="event-guidelines-lead">{selectedGuidelines.description}</p>
              <ul>
                {selectedGuidelines.rules.map((rule) => <li key={rule}>{rule}</li>)}
              </ul>
            </section>

            <section>
              <h3>4. Academic integrity &amp; conduct</h3>
              <ul>
                <li>Ensure all submitted work is original, accurate and ethically produced.</li>
                <li>Acknowledge all external sources, references and supporting materials appropriately.</li>
                <li>Maintain professional and respectful conduct throughout the event.</li>
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