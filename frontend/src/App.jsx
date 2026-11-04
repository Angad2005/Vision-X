// App.jsx - Improved with better component structure
import React from 'react';
import { useEffect, useMemo, useState, lazy, Suspense } from 'react';
import { AnimatePresence, MotionConfig, motion, useScroll, useTransform } from 'motion/react';
import { Button as BootstrapButton } from 'react-bootstrap';
import {
  ArrowDown, ArrowRight, ArrowUpRight, Atom, Award, BookOpen, BookText,
  CalendarDays, Check, ChevronDown, ChevronRight, Clock3, FlaskConical,
  HelpCircle, Image as ImageIcon, Instagram, Landmark, Mail, MapPin, Menu,
  Mic2, Microscope, Network, Presentation, RadioTower, Trophy,
  Users, Video, X, MessagesSquare, Medal, Sparkles,
} from 'lucide-react';

// Lazy load heavy components
const FxLayer = lazy(() => import('./FxLayer.jsx'));
const FxExtras = lazy(() => import('./FxExtras.jsx'));

// Paste the public Google Form URL here (forms.gle or docs.google.com/forms/.../viewform).
const REGISTRATION_URL = 'https://forms.gle/YOUR_FORM_ID';
const REGISTRATION_QR_SRC = `https://api.qrserver.com/v1/create-qr-code/?size=280x280&margin=12&ecc=M&color=941f30&bgcolor=fffaf1&data=${encodeURIComponent(REGISTRATION_URL)}`;
const VISION_X_LOGO_SRC = '/images/WhatsApp%20Image%202026-11-04%20at%2011.19.35%20PM.jpeg';

function openRegistrationForm() {
  window.open(REGISTRATION_URL, '_blank', 'noopener,noreferrer');
}
const EVENT_START = new Date('2026-11-27T00:00:00+05:30');
const EVENT_END = new Date('2026-11-29T00:00:00+05:30');
const PAGES = ['home', 'about', 'competitions', 'schedule', 'prizes', 'gallery', 'team', 'contact', 'register'];

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 }
  }
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { 
    opacity: 1, 
    scale: 1, 
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] }
  },
};

// Competitions data
const competitions = [
  {
    number: '01', name: 'VOX SPHERE', type: 'TEDx-STYLE TALKS',
    description: 'A dedicated stage for ideas, perspectives and talks that invite audiences to think beyond the familiar.',
    detail: 'Talks', icon: Mic2, greek: 'Α',
    gradient: 'linear-gradient(135deg, #c63b45 0%, #8c1728 100%)'
  },
  {
    number: '02', name: 'INNOVISTA', type: 'RESEARCH PRESENTATION & POSTER MAKING',
    description: 'Present research and communicate discoveries through structured presentations and academic posters.',
    detail: 'Research', icon: Presentation, greek: 'Β',
    gradient: 'linear-gradient(135deg, #d4a574 0%, #8b6f47 100%)'
  },
  {
    number: '03', name: 'BATTLE OF WITS', type: 'DEBATE CHALLENGE',
    description: 'A forum for argument, evidence, critical thinking and the exchange of contrasting perspectives.',
    detail: 'Debate', icon: MessagesSquare, greek: 'Γ',
    gradient: 'linear-gradient(135deg, #6b7280 0%, #374151 100%)'
  },
  {
    number: '04', name: 'VISIONATHON', type: 'OVERNIGHT REVIEW PAPER MAKING CHALLENGE',
    description: 'An overnight challenge centred on reviewing research and developing a review paper.',
    detail: 'Research writing', icon: BookText, greek: 'Δ',
    gradient: 'linear-gradient(135deg, #a71925 0%, #5c1019 100%)'
  },
];

const teamGroups = [
  {
    id: 'core', eyebrow: 'CORE LEADERSHIP', title: 'The Visionaries', members: [
      { name: 'Lubhit Dureja', role: 'PRESIDENT — VISION X', description: 'Leading the vision, strategy and execution of Vision X.', image: '/images/lubhit-dureja.jpg', initials: 'LD' },
      { name: 'Anchit Phutela', role: 'VICE PRESIDENT', description: 'Driving coordination, leadership and team execution.', initials: 'AP' },
      { name: 'Secretary Name', role: 'GENERAL SECRETARY', description: 'Managing communication, documentation and coordination.', initials: 'SN' },
      { name: 'Treasurer Name', role: 'TREASURER', description: 'Managing financial planning and event resources.', initials: 'TN' },
    ],
  },
  {
    id: 'event', eyebrow: 'EVENT MANAGEMENT', title: 'The Executors', members: [
      { name: 'Event Head Name', role: 'HEAD — EVENT MANAGEMENT', description: 'Turning plans into seamless experiences.', initials: 'EH' },
      { name: 'Logistics Head Name', role: 'HEAD — LOGISTICS', description: 'Managing venues, movement and operational execution.', initials: 'LH' },
      { name: 'Hospitality Head Name', role: 'HEAD — HOSPITALITY', description: 'Creating a welcoming experience for guests and participants.', initials: 'HH' },
      { name: 'Sponsorship Head Name', role: 'HEAD — SPONSORSHIPS', description: 'Building partnerships that make the vision possible.', initials: 'SH' },
    ],
  },
  {
    id: 'creative', eyebrow: 'CREATIVE & MEDIA', title: 'The Storytellers', members: [
      { name: 'Design Head Name', role: 'HEAD — DESIGN', description: 'Creating the visual identity of Vision X.', initials: 'DH' },
      { name: 'Social Media Head', role: 'HEAD — SOCIAL MEDIA', description: 'Taking Vision X from campus to the digital world.', initials: 'SM' },
      { name: 'Photography Head', role: 'HEAD — PHOTOGRAPHY', description: 'Capturing moments that tell the Vision X story.', initials: 'PH' },
      { name: 'Videography Head', role: 'HEAD — VIDEOGRAPHY', description: 'Turning the Vision X experience into moving stories.', initials: 'VH' },
    ],
  },
  {
    id: 'tech', eyebrow: 'TECH & OPERATIONS', title: 'The Builders', members: [
      { name: 'Technical Head Name', role: 'HEAD — TECHNICAL', description: 'Building the digital infrastructure behind Vision X.', initials: 'TH' },
      { name: 'Web Developer Name', role: 'WEB DEVELOPMENT', description: 'Developing and maintaining the Vision X website.', initials: 'WD' },
      { name: 'Documentation Head', role: 'HEAD — DOCUMENTATION', description: 'Recording the journey, outcomes and impact.', initials: 'DH' },
      { name: 'Discipline Head', role: 'HEAD — DISCIPLINE', description: 'Ensuring smooth, professional and organised execution.', initials: 'DH' },
    ],
  },
];

// Magnetic Button Component
function MagneticButton({ children, className, onClick, strength = 0.3, ...props }) {
  const ref = React.useRef(null);
  const [position, setPosition] = React.useState({ x: 0, y: 0 });

  const handleMouse = (e) => {
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const x = (clientX - (left + width / 2)) * strength;
    const y = (clientY - (top + height / 2)) * strength;
    setPosition({ x, y });
  };

  const reset = () => setPosition({ x: 0, y: 0 });

  return (
    <motion.button
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: 'spring', stiffness: 150, damping: 15, mass: 0.1 }}
      className={className}
      onClick={onClick}
      {...props}
    >
      {children}
    </motion.button>
  );
}

function BrandLogo({ alt = '' }) {
  return (
    <motion.img
      className="brand-logo"
      src={VISION_X_LOGO_SRC}
      alt={alt}
      aria-hidden={alt ? undefined : true}
      whileHover={{ scale: 1.05 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    >
    </motion.img>
  );
}

function GreekKey({ className = '' }) {
  return <div className={`greek-key ${className}`} aria-hidden="true"><span /></div>;
}

// Enhanced Section Heading
function SectionHeading({ eyebrow, title, text, align = 'center' }) {
  return (
    <motion.div 
      className={`section-heading align-${align}`}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={staggerContainer}
    >
      <motion.span className="eyebrow" variants={fadeInUp}>
        <span />{eyebrow}
      </motion.span>
      <motion.h2 variants={fadeInUp}>{title}</motion.h2>
      {text && <motion.p variants={fadeInUp}>{text}</motion.p>}
    </motion.div>
  );
}

// Enhanced Header with scroll-aware behavior
function Header({ activePage, onNavigate }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    ['home', 'HOME'], ['about', 'ABOUT'], ['competitions', 'COMPETITIONS'],
    ['schedule', 'SCHEDULE'], ['team', 'TEAM'],
  ];
  const moreItems = [['prizes', 'Prizes & recognition'], ['gallery', 'Gallery & highlights'], ['contact', 'Contact & FAQs']];

  const go = (page) => {
    setMenuOpen(false);
    setMoreOpen(false);
    onNavigate(page);
  };

  const isMoreActive = moreItems.some(([page]) => page === activePage);

  return (
    <motion.header 
      className={`site-header ${scrolled ? 'scrolled' : ''}`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="header-inner">
        <motion.button 
          className="brand" 
          onClick={() => go('home')} 
          aria-label="Vision X home"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <BrandLogo alt="Vision X" />
        </motion.button>

        <motion.button 
          className="menu-toggle" 
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? 'Close navigation' : 'Open navigation'}
          aria-expanded={menuOpen}
          whileTap={{ scale: 0.92 }}
        >
          <AnimatePresence mode="wait">
            {menuOpen ? (
              <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
                <X size={20} />
              </motion.div>
            ) : (
              <motion.div key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}>
                <Menu size={20} />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>

        <motion.nav 
          className={`main-nav ${menuOpen ? 'is-open' : ''}`}
          aria-label="Main navigation"
          initial={false}
          animate={{ height: menuOpen ? 'auto' : 0 }}
        >
          {navItems.map(([page, label]) => (
            <motion.button
              key={page}
              className={activePage === page ? 'active' : ''}
              onClick={() => go(page)}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.97 }}
            >
              {label}
              {activePage === page && (
                <motion.div
                  className="nav-indicator"
                  layoutId="nav-indicator"
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                />
              )}
            </motion.button>
          ))}

          <div className={`nav-more ${moreOpen ? 'is-open' : ''}`}>
            <motion.button
              type="button"
              className={isMoreActive ? 'active' : ''}
              onClick={() => setMoreOpen((open) => !open)}
              aria-expanded={moreOpen}
              whileTap={{ scale: 0.97 }}
            >
              MORE <motion.span animate={{ rotate: moreOpen ? 180 : 0 }}><ChevronDown size={12} /></motion.span>
            </motion.button>
            <AnimatePresence>
              {moreOpen && (
                <motion.div
                  className="more-menu"
                  initial={{ opacity: 0, y: 8, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                >
                  {moreItems.map(([page, label]) => (
                    <motion.button
                      type="button"
                      key={page}
                      className={activePage === page ? 'active' : ''}
                      onClick={() => go(page)}
                      whileHover={{ x: 4 }}
                    >
                      {label} <ArrowUpRight size={13} />
                    </motion.button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <MagneticButton
            className="nav-cta"
            onClick={() => go('register')}
            strength={0.2}
          >
            REGISTER <ArrowUpRight size={14} />
          </MagneticButton>
        </motion.nav>
      </div>
      <div className="header-ornament">
        <span>ΜΕΤΑ ΤΗΝ ΓΝΩΣΙΝ</span> <i /> <span>FROM CURIOSITY TO IMPACT</span>
      </div>
    </motion.header>
  );
}

// Enhanced Hero Emblem with parallax
function HeroEmblem() {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 10]);

  return (
    <motion.div
      className="hero-emblem"
      aria-label="Classical Greek columns with a scientific orbital diagram"
      style={{ y, rotate }}
      animate={{ y: [0, -12, 0] }}
      transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
    >
      <div className="emblem-orbit orbit-a"><span /></div>
      <div className="emblem-orbit orbit-b"><span /></div>
      <div className="emblem-crosshair crosshair-one" />
      <div className="emblem-crosshair crosshair-two" />
      <div className="emblem-plate">
        <div className="plate-topline">
          <span>ΑΘΗΝΑ · ATHENA</span>
          <span>FIG. 01 / VX26</span>
        </div>
        <svg className="temple-svg" viewBox="0 0 520 480" role="img" aria-label="Illustration of a classical Greek temple integrated with a scientific diagram">
          <defs>
            <linearGradient id="marbleStone" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#fffaf0" />
              <stop offset=".42" stopColor="#d7c8ad" />
              <stop offset="1" stopColor="#827765" />
            </linearGradient>
            <linearGradient id="stoneSide" x1="0" x2="1">
              <stop offset="0" stopColor="#8f8069" />
              <stop offset=".3" stopColor="#eee2cd" />
              <stop offset=".75" stopColor="#b5a58c" />
              <stop offset="1" stopColor="#706452" />
            </linearGradient>
            <linearGradient id="redGlass" x1="0" x2="1">
              <stop offset="0" stopColor="#8c1728" />
              <stop offset="1" stopColor="#d14a4a" />
            </linearGradient>
          </defs>
          <g fill="none" stroke="#c8a96d" opacity=".7">
            <path d="M54 405H466M72 423H448M98 440H422" strokeWidth="2" />
            <path d="M115 116H405M134 96H386M155 77H365" strokeWidth="1" />
          </g>
          <path d="M105 150L260 44L415 150Z" fill="url(#marbleStone)" stroke="#f2e6d3" strokeWidth="3" />
          <path d="M140 142L260 66L380 142Z" fill="#292126" stroke="#9a835d" strokeWidth="2" />
          <path d="M232 140L260 91L288 140Z" fill="url(#redGlass)" opacity=".9" />
          <path d="M92 151H428V173H92Z" fill="url(#stoneSide)" />
          <path d="M79 178H441V196H79Z" fill="url(#marbleStone)" />
          {[125, 187, 249, 311, 373].map((x) => (
            <g key={x}>
              <path d={`M${x-19} 210H${x+19}L${x+13} 370H${x-13}Z`} fill="url(#stoneSide)" stroke="#e8d9c0" strokeWidth="1.5" />
              <path d={`M${x-23} 204H${x+23}V212H${x-23}ZM${x-16} 370H${x+16}V381H${x-16}Z`} fill="url(#marbleStone)" />
              <path d={`M${x-9} 220V360M${x} 220V360M${x+9} 220V360`} stroke="#f5ead8" opacity=".45" />
            </g>
          ))}
          <path d="M90 386H430V402H90Z" fill="url(#stoneSide)" />
          <path d="M70 404H450V421H70Z" fill="url(#marbleStone)" />
          <g stroke="#b99a63" fill="none" opacity=".92">
            <circle cx="260" cy="260" r="118" strokeDasharray="4 8" />
            <ellipse cx="260" cy="260" rx="155" ry="57" transform="rotate(-28 260 260)" />
            <ellipse cx="260" cy="260" rx="155" ry="57" transform="rotate(48 260 260)" />
            <circle cx="260" cy="260" r="7" fill="#b99a63" />
            <circle cx="366" cy="191" r="5" fill="#c63b45" stroke="none" />
            <circle cx="148" cy="321" r="4" fill="#c63b45" stroke="none" />
          </g>
          <g stroke="#d9c7a8" strokeWidth="1.2" opacity=".75">
            <path d="M260 132V170M260 350V391M132 260H175M345 260H388" />
            <path d="M245 260H275M260 245V275" />
          </g>
        </svg>
        <div className="plate-bottomline">
          <span>LOGOS · SCIENTIA · PROGRESSUS</span>
          <span>CHITKARA / 2026</span>
        </div>
      </div>
      <div className="emblem-greek greek-left">ΑΡΕΤΗ</div>
      <div className="emblem-greek greek-right">ΓΝΩΣΙΣ</div>
      <motion.div
        className="emblem-stamp"
        animate={{ rotate: [10, 12, 10] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      >
        <span>EST.</span>
        <strong>20</strong>
        <b>26</b>
        <i>THE NEXT IDEA</i>
      </motion.div>
      <div className="emblem-caption">
        <span /> ANCIENT CURIOSITY. FUTURE TECHNOLOGY.
      </div>
      <div className="emblem-coordinate">CHITKARA UNIVERSITY · PUNJAB</div>
    </motion.div>
  );
}

// Enhanced Countdown with flip animation
function Countdown() {
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    const timer = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(timer);
  }, []);

  const remaining = Math.max(0, EVENT_START.getTime() - now);
  const units = [
    ['DAYS', Math.floor(remaining / 86400000)],
    ['HOURS', Math.floor((remaining / 3600000) % 24)],
    ['MINUTES', Math.floor((remaining / 60000) % 60)],
    ['SECONDS', Math.floor((remaining / 1000) % 60)],
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
        {eventOver ? 'THE 2026 EDITION HAS CONCLUDED' : eventStarted ? 'VISION X IS UNDERWAY' : 'COUNTDOWN TO VISION X'}
      </div>
      {eventStarted || eventOver ? (
        <motion.div
          className="countdown-live-copy"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {eventOver ? '27–28 NOVEMBER 2026 · THANK YOU FOR BEING PART OF THE JOURNEY' : '27–28 NOVEMBER 2026 · THE EXPERIENCE IS LIVE'}
        </motion.div>
      ) : (
        <div className="countdown-units">
          {units.map(([label, value]) => (
            <FlipUnit key={label} label={label} value={value} />
          ))}
        </div>
      )}
    </motion.div>
  );
}

function FlipUnit({ label, value }) {
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
    </div>
  );
}

// Enhanced Home Page
function HomePage({ onNavigate }) {
  return (
    <main>
      <section className="hero-section">
        <div className="hero-noise" />
        <div className="hero-grid-overlay" />
        <div className="hero-inner shell">
          <motion.div
            className="hero-copy"
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            <motion.div className="hero-pretitle" variants={fadeInUp}>
              <span className="pretitle-line" />
              CHITKARA RESEARCH CLUB PRESENTS
              <span className="pretitle-line" />
            </motion.div>
            <motion.div className="hero-overline" variants={fadeInUp}>
              AN ENCOUNTER WITH <em>WHAT'S NEXT.</em>
            </motion.div>
            <motion.h1 variants={fadeInUp}>
              VISION <span className="hero-x">X</span> <sup>2026</sup>
            </motion.h1>
            <motion.div className="hero-subtitle" variants={fadeInUp}>
              FROM CURIOSITY <i>TO</i> IMPACT
            </motion.div>
            <motion.p className="hero-description" variants={fadeInUp}>
              A meeting ground for ideas, research and innovation — where questions become conversations, evidence becomes insight, and curiosity moves towards impact.
            </motion.p>
            <motion.div className="hero-event-meta" variants={fadeInUp}>
              <span><CalendarDays size={16} /> 27–28 NOVEMBER 2026</span>
              <i />
              <span><MapPin size={16} /> CHITKARA UNIVERSITY, PUNJAB</span>
            </motion.div>
            <motion.div className="hero-actions" variants={fadeInUp}>
              <MagneticButton
                className="button button-primary"
                onClick={() => onNavigate('competitions')}
                strength={0.25}
              >
                EXPLORE COMPETITIONS <ArrowUpRight size={17} />
              </MagneticButton>
              <MagneticButton
                className="button button-ghost"
                onClick={() => onNavigate('register')}
                strength={0.25}
              >
                REGISTER NOW <ArrowRight size={16} />
              </MagneticButton>
            </motion.div>
            <motion.div variants={fadeInUp}>
              <Countdown />
            </motion.div>
          </motion.div>
          <HeroEmblem />
          <div className="hero-index">
            <span>01</span> <i /> FROM CURIOSITY TO IMPACT
            <span className="hero-index-greek">ΓΝΩΘΙ ΣΕΑΥΤΟΝ</span>
          </div>
          <div className="hero-sidecode">
            <span>VX / INSTITUTE</span>
            <span>IDEAS IN MOTION</span>
            <span>EST. MMXXVI</span>
          </div>
        </div>
        <div className="hero-bottom-rule"><GreekKey /></div>
      </section>

      <section className="section-block shell home-intro-section">
        <SectionHeading
          eyebrow="BEYOND BOUNDARIES · BEYOND ORDINARY"
          title={<>Ideas become impact. <em>Begin here.</em></>}
          text="VISION X brings the spirit of inquiry into a shared experience — connecting research, communication and original thinking."
        />
        <motion.div
          className="home-intro-grid"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerContainer}
        >
          <motion.article className="home-intro-card" variants={scaleIn} whileHover={{ y: -8, scale: 1.02 }}>
            <span className="intro-card-index">01 / INQUIRE</span>
            <Microscope size={27} />
            <h3>Research with purpose.</h3>
            <p>Ask better questions, examine evidence and make space for new perspectives.</p>
          </motion.article>
          <motion.article className="home-intro-card" variants={scaleIn} whileHover={{ y: -8, scale: 1.02 }}>
            <span className="intro-card-index">02 / EXCHANGE</span>
            <Network size={27} />
            <h3>Ideas in conversation.</h3>
            <p>Share knowledge, debate thoughtfully and learn from different disciplines.</p>
          </motion.article>
          <motion.article className="home-intro-card" variants={scaleIn} whileHover={{ y: -8, scale: 1.02 }}>
            <span className="intro-card-index">03 / CREATE</span>
            <Atom size={27} />
            <h3>Curiosity in motion.</h3>
            <p>Move from exploration to communication, collaboration and meaningful work.</p>
          </motion.article>
        </motion.div>
        <div className="intro-about-link">
          <MagneticButton className="text-link" onClick={() => onNavigate('about')} strength={0.2}>
            DISCOVER THE VISION <ArrowUpRight size={15} />
          </MagneticButton>
        </div>
      </section>

      <section className="blueprint-section research-atlas" aria-labelledby="research-atlas-title">
        <div className="shell blueprint-layout">
          <motion.div
            className="blueprint-copy"
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
          >
            <span className="eyebrow"><span /> ΕΠΙΣΤΗΜΗ · RESEARCH & TECHNOLOGY</span>
            <h2 id="research-atlas-title">Ancient questions.<br /><em>New frontiers.</em></h2>
            <p>
              The Greek tradition of inquiry meets the tools of modern research.
              VISION X brings people together to examine evidence, share ideas
              and explore what technology makes possible.
            </p>
            <div className="blueprint-points research-principles">
              <div><span>Α</span><p><b>Ask with purpose</b><small>Start with curiosity, clear questions and an open mind.</small></p></div>
              <div><span>Β</span><p><b>Follow the evidence</b><small>Connect observation, research and critical thought.</small></p></div>
              <div><span>Γ</span><p><b>Share what you discover</b><small>Turn knowledge into conversation and future ideas.</small></p></div>
            </div>
          </motion.div>

          <motion.div
            className="blueprint-console research-console"
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.65, delay: 0.1 }}
          >
            <div className="console-head">
              <span><i /> VISION X / KNOWLEDGE SYSTEM</span>
              <span>ΜΕΘΟΔΟΣ · 01</span>
            </div>
            <div className="console-body research-console-body">
              <div className="console-diagram research-diagram" role="img" aria-label="A connected research map: question, evidence, dialogue and discovery">
                <span className="diagram-ring ring-one" />
                <span className="diagram-ring ring-two" />
                <span className="diagram-ring ring-three" />
                <span className="research-crosshair research-crosshair-one" />
                <span className="research-crosshair research-crosshair-two" />
                <div className="diagram-core">
                  <Atom size={34} strokeWidth={1.2} />
                  <small>IDEA → IMPACT</small>
                </div>
                <span className="diagram-node research-node research-node-a"><Microscope size={15} /></span>
                <span className="diagram-node research-node research-node-b"><Network size={15} /></span>
                <span className="diagram-node research-node research-node-c"><BookOpen size={15} /></span>
                <span className="diagram-label research-label-a">QUESTION</span>
                <span className="diagram-label research-label-b">EVIDENCE</span>
                <span className="diagram-label research-label-c">DISCOVERY</span>
                <span className="research-diagram-greek" aria-hidden="true">ΓΝΩΣΙΣ</span>
              </div>
              <div className="console-readout research-readout">
                <span className="readout-title">THE RESEARCH CYCLE</span>
                <div className="research-cycle-step"><span>01</span><div><b>Observe</b><small>Notice what needs to be understood.</small></div></div>
                <div className="research-cycle-step"><span>02</span><div><b>Investigate</b><small>Explore evidence and perspectives.</small></div></div>
                <div className="research-cycle-step"><span>03</span><div><b>Communicate</b><small>Present, debate and build on ideas.</small></div></div>
                <div className="readout-terminal"><i /> OPEN SYSTEM <b>READY FOR QUESTIONS</b></div>
              </div>
            </div>
            <div className="console-foot">
              <span>ΑΘΗΝΑ · KNOWLEDGE / VX—2026</span>
              <span><Network size={13} /> IDEAS, CONNECTED</span>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="question-section">
        <div className="question-inner shell">
          <motion.div
            className="question-orbit"
            aria-hidden="true"
            animate={{ y: [0, -10, 0], rotate: [0, 5, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          >
            <span>?</span>
            <i />
          </motion.div>
          <motion.div
            className="question-copy"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <span className="eyebrow"><span /> THE QUESTION</span>
            <h2>What if <em>you</em><br />changed everything?</h2>
            <p>Every breakthrough begins with a question. Bring yours to a space built around curiosity, research and the exchange of ideas.</p>
            <MagneticButton className="button button-light" onClick={() => onNavigate('competitions')} strength={0.25}>
              FIND YOUR ARENA <ArrowUpRight size={17} />
            </MagneticButton>
          </motion.div>
          <div className="question-side-note">
            27—28 NOVEMBER<br />
            CHITKARA UNIVERSITY<br />
            PUNJAB · INDIA
          </div>
        </div>
      </section>
    </main>
  );
}

// Page Hero Component
function PageHero({ kicker, title, description, footer }) {
  return (
    <motion.section
      className="page-hero shell"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.65 }}
    >
      <div className="page-hero-kicker"><span /> {kicker}</div>
      <h1>{title}</h1>
      <p>{description}</p>
      <div className="page-hero-foot">
        <span>{footer}</span>
        <ArrowDown size={16} />
      </div>
    </motion.section>
  );
}

// About Page
function AboutPage() {
  return (
    <main className="subpage">
      <PageHero
        kicker="ABOUT VISION X · 2026"
        title={<>Beyond boundaries. <br /><em>Beyond ordinary.</em></>}
        description="From Curiosity to Impact — a research and ideas-led gathering at Chitkara University, Punjab."
        footer="27–28 NOVEMBER 2026 · CHITKARA UNIVERSITY"
      />
      <section className="section-block shell about-overview">
        <SectionHeading
          eyebrow="WHAT IS VISION X?"
          title={<>A place for the <em>next question.</em></>}
          text="VISION X is a platform for ideas, research presentation, debate and scholarly writing. It brings different ways of thinking into one shared event."
        />
        <motion.div
          className="about-pillar-grid"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerContainer}
        >
          <motion.article className="about-pillar" variants={scaleIn} whileHover={{ y: -6 }}>
            <span>01</span>
            <Landmark size={28} />
            <h3>Ancient curiosity</h3>
            <p>Inspired by the long tradition of asking questions, examining ideas and seeking understanding.</p>
            <small>INQUIRY · ΓΝΩΣΙΣ</small>
          </motion.article>
          <motion.article className="about-pillar" variants={scaleIn} whileHover={{ y: -6 }}>
            <span>02</span>
            <FlaskConical size={28} />
            <h3>Research culture</h3>
            <p>Making room for research presentations, posters and careful engagement with existing work.</p>
            <small>EVIDENCE · ΕΡΕΥΝΑ</small>
          </motion.article>
          <motion.article className="about-pillar" variants={scaleIn} whileHover={{ y: -6 }}>
            <span>03</span>
            <Atom size={28} />
            <h3>Future thinking</h3>
            <p>Encouraging communication, debate and new perspectives across areas of knowledge.</p>
            <small>IDEAS · ΜΕΛΛΟΝ</small>
          </motion.article>
        </motion.div>
      </section>
      <section className="about-mission-section">
        <div className="shell mission-grid">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="eyebrow"><span /> OUR VISION · DRAFT</span>
            <h2>Make curiosity <br /><em>a catalyst.</em></h2>
            <p>To create a space where curiosity, research and open exchange can move people towards new possibilities.</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="eyebrow"><span /> OUR MISSION · DRAFT</span>
            <h2>Question. Share. <br /><em>Understand.</em></h2>
            <p>To bring people together through talks, research communication, debate and collaborative academic challenges.</p>
          </motion.div>
        </div>
      </section>
      <section className="section-block shell why-research-section">
        <SectionHeading
          eyebrow="WHY RESEARCH & INNOVATION MATTER"
          title={<>Progress begins with <em>evidence.</em></>}
          text="Research helps us examine what we know. Innovation invites us to explore what might be possible. Both depend on curiosity and thoughtful exchange."
        />
        <motion.div
          className="research-steps"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerContainer}
        >
          <motion.div variants={fadeInUp}>
            <strong>01</strong>
            <span>QUESTION</span>
            <p>Recognise what is not yet understood.</p>
          </motion.div>
          <motion.div variants={fadeInUp}>
            <strong>02</strong>
            <span>INVESTIGATE</span>
            <p>Explore evidence, literature and perspectives.</p>
          </motion.div>
          <motion.div variants={fadeInUp}>
            <strong>03</strong>
            <span>COMMUNICATE</span>
            <p>Present findings and test ideas through dialogue.</p>
          </motion.div>
          <motion.div variants={fadeInUp}>
            <strong>04</strong>
            <span>MOVE FORWARD</span>
            <p>Carry new insight into future work.</p>
          </motion.div>
        </motion.div>
      </section>
    </main>
  );
}

// Competitions Page with enhanced cards
function CompetitionsPage({ onNavigate }) {
  return (
    <main className="subpage">
      <PageHero
        kicker="THE VISION X COMPETITIONS"
        title={<>Four arenas. <br /><em>One curious mind.</em></>}
        description="Talks, research communication, debate and an overnight academic writing challenge."
        footer="04 COMPETITIONS · 27–28 NOVEMBER 2026"
      />
      <section className="section-block shell compact-top">
        <div className="competition-intro">
          <div>
            <span className="eyebrow"><span /> FIND YOUR ARENA</span>
            <h2>Make your ideas <br /><em>count.</em></h2>
          </div>
          <p>Explore the four competition formats planned for VISION X 2026. Further participation guidelines and details can be added as they are finalised.</p>
        </div>
        <motion.div
          className="competition-grid competition-grid-four"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={staggerContainer}
        >
          {competitions.map((item) => {
            const Icon = item.icon;
            return (
              <motion.article
                className={`competition-card tone-${item.number}`}
                key={item.number}
                variants={scaleIn}
                whileHover={{ y: -10, scale: 1.02 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              >
                <div className="competition-visual" style={{ background: item.gradient }}>
                  <span className="competition-number">{item.number}</span>
                  <motion.div
                    className="competition-icon"
                    whileHover={{ rotate: -8, scale: 1.1 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    <Icon size={42} strokeWidth={1.2} />
                  </motion.div>
                  <span className="competition-orbit" />
                  <span className="competition-greek">{item.greek}</span>
                </div>
                <div className="competition-content">
                  <span className="competition-type">{item.type}</span>
                  <h3>{item.name}</h3>
                  <p>{item.description}</p>
                  <div className="competition-meta">
                    <span><Sparkles size={13} /> {item.detail}</span>
                  </div>
                  <MagneticButton
                    className="competition-link"
                    onClick={() => onNavigate('register')}
                    strength={0.3}
                  >
                    REGISTER NOW <ArrowUpRight size={16} />
                  </MagneticButton>
                </div>
              </motion.article>
            );
          })}
        </motion.div>
      </section>
      <section className="competition-cta">
        <div className="shell competition-cta-inner">
          <div>
            <span className="eyebrow"><span /> YOUR NEXT IDEA STARTS HERE</span>
            <h2>Take your place <em>at VISION X.</em></h2>
            <p>27–28 November 2026 · Chitkara University, Punjab.</p>
          </div>
          <MagneticButton
            className="button button-light"
            onClick={() => onNavigate('register')}
            strength={0.25}
          >
            REGISTER NOW <ArrowUpRight size={17} />
          </MagneticButton>
        </div>
      </section>
    </main>
  );
}

// Schedule Page with timeline
function SchedulePage() {
  const [selectedDay, setSelectedDay] = useState('day1');
  const dayInfo = useMemo(() => ({
    day1: { label: 'DAY 01', date: '27 NOVEMBER 2026', title: 'Day one programme', roman: 'XXVII' },
    day2: { label: 'DAY 02', date: '28 NOVEMBER 2026', title: 'Day two programme', roman: 'XXVIII' },
  }), []);

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
      />
      <section className="section-block shell schedule-section">
        <SectionHeading
          eyebrow="SELECT A DAY"
          title={<>The programme <em>at a glance.</em></>}
          text="Switch between Day 01 and Day 02. The detailed schedule will be added after the event plan is confirmed."
        />
        <div className="schedule-day-switch" role="tablist" aria-label="Select event day">
          <motion.button
            type="button"
            role="tab"
            aria-selected={selectedDay === 'day1'}
            className={selectedDay === 'day1' ? 'is-active' : ''}
            onClick={() => setSelectedDay('day1')}
            whileTap={{ scale: 0.97 }}
          >
            <span>DAY 01</span>
            <strong>27 NOV</strong>
          </motion.button>
          <motion.button
            type="button"
            role="tab"
            aria-selected={selectedDay === 'day2'}
            className={selectedDay === 'day2' ? 'is-active' : ''}
            onClick={() => setSelectedDay('day2')}
            whileTap={{ scale: 0.97 }}
          >
            <span>DAY 02</span>
            <strong>28 NOV</strong>
          </motion.button>
        </div>
        <AnimatePresence mode="wait">
          <motion.div
            className="schedule-board"
            key={selectedDay}
            role="tabpanel"
            initial={{ opacity: 0, y: 20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.98 }}
            transition={{ duration: 0.3 }}
          >
            <div className="schedule-board-heading">
              <div>
                <span>{dayInfo[selectedDay].label} / VISION X 2026</span>
                <h3>{dayInfo[selectedDay].title}</h3>
                <p>{dayInfo[selectedDay].date}</p>
              </div>
              <strong>{dayInfo[selectedDay].roman}</strong>
            </div>
            <motion.div
              className="schedule-items"
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
            >
              {scheduleItems.map(({ icon: Icon, label, title, status }, index) => (
                <motion.div
                  className="schedule-item"
                  key={label}
                  variants={fadeInUp}
                  whileHover={{ x: 8, scale: 1.02 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <div className="schedule-item-icon">
                    <Icon size={19} />
                  </div>
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

// Prizes Page with enhanced visuals
function PrizesPage() {
  const prizeItems = [
    { name: 'Competition-wise prizes', text: 'Prize allocation for each competition will be published once finalised.', icon: Trophy },
    { name: 'Certificates', text: 'Certificate information will be shared with the final event guidelines.', icon: Medal },
    { name: 'Awards & recognition', text: 'Recognition categories and award details will be announced.', icon: Award },
  ];

  return (
    <main className="subpage">
      <PageHero
        kicker="PRIZES & RECOGNITION"
        title={<>Celebrate the work. <br /><em>Recognise the ideas.</em></>}
        description="A platform to recognise curiosity, research communication and thoughtful participation."
        footer="TOTAL PRIZE POOL · 30K"
      />
      <section className="section-block shell prize-section">
        <motion.div
          className="prize-total-card"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          whileHover={{ scale: 1.02 }}
        >
          <motion.div
            className="prize-total-orbit"
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          >
            <Trophy size={48} strokeWidth={1.1} />
          </motion.div>
          <div>
            <span className="eyebrow"><span /> VISION X 2026</span>
            <motion.strong
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}
            >
              30K
            </motion.strong>
            <h2>Total prize pool</h2>
            <p>Competition-wise distribution and individual prize details will be announced once finalised.</p>
          </div>
          <span className="prize-card-mark">VX / 2026</span>
        </motion.div>
        <motion.div
          className="prize-detail-grid"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerContainer}
        >
          {prizeItems.map(({ name, text, icon: Icon }, index) => (
            <motion.article
              className="prize-detail-card"
              key={name}
              variants={scaleIn}
              whileHover={{ y: -8, scale: 1.03 }}
            >
              <span>0{index + 1}</span>
              <Icon size={27} />
              <h3>{name}</h3>
              <p>{text}</p>
            </motion.article>
          ))}
        </motion.div>
      </section>
    </main>
  );
}

// Gallery Page with masonry-like layout
function GalleryPage() {
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
      />
      <section className="section-block shell gallery-section">
        <SectionHeading
          eyebrow="THE VISION X ARCHIVE"
          title={<>A record of <em>curiosity in action.</em></>}
          text="The gallery will grow as official event media and updates become available."
        />
        <div className="gallery-filters" role="group" aria-label="Filter gallery content">
          {[['all', 'ALL'], ['photos', 'PHOTOGRAPHS'], ['videos', 'VIDEOS'], ['behind', 'BEHIND THE SCENES'], ['updates', 'UPDATES']].map(([value, label]) => (
            <motion.button
              type="button"
              key={value}
              className={filter === value ? 'is-active' : ''}
              onClick={() => setFilter(value)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              layout
            >
              {label}
            </motion.button>
          ))}
        </div>
        <motion.div className="gallery-grid" layout>
          <AnimatePresence mode="popLayout">
            {visibleItems.map(({ id, title, tag, icon: Icon, code, shape }) => (
              <motion.article
                className="gallery-card"
                key={id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                whileHover={{ y: -8, scale: 1.02 }}
              >
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

// Enhanced Team Card
function TeamCard({ member, index }) {
  const [photoFailed, setPhotoFailed] = useState(false);

  return (
    <motion.article
      className="team-card"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.07 }}
      whileHover={{ y: -8, scale: 1.02 }}
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

// Team Page
function TeamPage() {
  return (
    <main className="subpage">
      <PageHero
        kicker="TEAM VISION X"
        title={<>Made by people. <br /><em>Built on belief.</em></>}
        description="Meet the organizing committee, leadership, department heads and the people working behind the scenes. Faculty coordinator and volunteer information will be added when confirmed."
        footer="THE VISIONARIES · THE EXECUTORS · THE BUILDERS"
      />
      {teamGroups.map((group, groupIndex) => (
        <motion.section
          className={`section-block shell team-section team-section-${group.id}`}
          key={group.id}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="team-section-heading">
            <div>
              <span className="eyebrow"><span /> {group.eyebrow}</span>
              <h2>{group.title}<em>.</em></h2>
            </div>
            <span className="team-count">
              {String(group.members.length).padStart(2, '0')} MEMBERS <i /> 0{groupIndex + 1}/04
            </span>
          </div>
          <motion.div
            className="team-grid"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={staggerContainer}
          >
            {group.members.map((member, index) => (
              <TeamCard member={member} index={index} key={member.name} />
            ))}
          </motion.div>
        </motion.section>
      ))}
      <section className="team-support-section">
        <div className="shell team-support-grid">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="eyebrow"><span /> FACULTY COORDINATION</span>
            <h2>Guidance behind <em>the vision.</em></h2>
            <p>Faculty coordinator names and profiles will be published after confirmation.</p>
            <span className="team-support-status">PROFILES TO BE ANNOUNCED</span>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="eyebrow"><span /> VOLUNTEER COMMUNITY</span>
            <h2>The people who <em>make it happen.</em></h2>
            <p>Volunteer teams and their roles will be introduced as the organising details are finalised.</p>
            <span className="team-support-status">TEAM DETAILS TO FOLLOW</span>
          </motion.div>
        </div>
      </section>
    </main>
  );
}

// Contact Page with enhanced FAQ
function ContactPage() {
  const faqs = [
    { q: 'When is VISION X 2026?', a: 'The event is scheduled for 27–28 November 2026.' },
    { q: 'Where will the event take place?', a: 'At Chitkara University, Punjab.' },
    { q: 'Which competitions are part of VISION X?', a: 'VOX SPHERE, INNOVISTA, BATTLE OF WITS and VISIONATHON.' },
    { q: 'Where can I find the day-wise schedule?', a: 'The Schedule page includes a two-day overview. Session timings, competition slots, breaks and venue details will be added once finalised.' },
    { q: 'What is the prize pool?', a: 'The total prize pool is listed as 30K. Competition-wise allocations and award details will be announced once finalised.' },
  ];

  const [openFaq, setOpenFaq] = useState(0);

  return (
    <main className="subpage">
      <PageHero
        kicker="CONTACT & FREQUENTLY ASKED QUESTIONS"
        title={<>Find your way. <br /><em>Get in touch.</em></>}
        description="Event information for participants, researchers, speakers and visitors."
        footer="CHITKARA UNIVERSITY · PUNJAB"
      />
      <section className="section-block shell contact-layout">
        <motion.div
          className="contact-info"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="eyebrow"><span /> CONTACT INFORMATION</span>
          <h2>Let's start a <em>conversation.</em></h2>
          <p>Official contact details and social channels will be published here when confirmed.</p>
          <div className="contact-info-list">
            <motion.div whileHover={{ x: 8 }}>
              <MapPin size={20} />
              <span>
                <small>VENUE</small>
                <strong>Chitkara University, Punjab</strong>
              </span>
            </motion.div>
            <motion.div whileHover={{ x: 8 }}>
              <Mail size={20} />
              <span>
                <small>OFFICIAL EMAIL</small>
                <strong>To be announced</strong>
              </span>
            </motion.div>
            <motion.div whileHover={{ x: 8 }}>
              <Instagram size={20} />
              <span>
                <small>SOCIAL MEDIA</small>
                <strong>Official channels to be announced</strong>
              </span>
            </motion.div>
          </div>
          <div className="contact-date-stamp">
            <CalendarDays size={17} />
            <span>27–28 NOVEMBER 2026</span>
          </div>
        </motion.div>
        <motion.div
          className="faq-panel"
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="faq-heading">
            <span className="eyebrow"><span /> QUICK ANSWERS</span>
            <h3>Frequently asked <em>questions.</em></h3>
          </div>
          <div className="faq-list">
            {faqs.map((faq, index) => (
              <motion.div
                className={`faq-item ${openFaq === index ? 'is-open' : ''}`}
                key={faq.q}
                layout
              >
                <motion.button
                  type="button"
                  onClick={() => setOpenFaq(openFaq === index ? -1 : index)}
                  aria-expanded={openFaq === index}
                  whileHover={{ x: 4 }}
                >
                  <span>{faq.q}</span>
                  <motion.span
                    animate={{ rotate: openFaq === index ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ChevronDown size={17} />
                  </motion.span>
                </motion.button>
                <AnimatePresence initial={false}>
                  {openFaq === index && (
                    <motion.div
                      className="faq-answer"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <p>{faq.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>
    </main>
  );
}

// Register Page
function RegisterPage() {
  return (
    <main className="subpage register-page">
      <PageHero
        kicker="YOUR NEXT CHAPTER STARTS HERE"
        title={<>Step into <br /><em>the vision.</em></>}
        description="Your next idea could become your biggest impact. Take the first step."
        footer="VISION X 2026 · 27–28 NOVEMBER"
      />
      <section className="section-block shell compact-top registration-section">
        <motion.div
          className="registration-aside"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="registration-logo">
            <BrandLogo alt="Vision X" />
            <span>VISION X<br />2026</span>
          </div>
          <span className="eyebrow"><span /> OFFICIAL REGISTRATION</span>
          <h2>One step closer <br />to <em>what's next.</em></h2>
          <p>Register for VISION X 2026 with the button or QR code. The event will take place on 27–28 November 2026 at Chitkara University, Punjab.</p>
          <div className="registration-note">
            <Check size={16} />
            <span>Chitkara Research Club event</span>
          </div>
          <div className="registration-note">
            <Check size={16} />
            <span>Four competition formats</span>
          </div>
          <div className="registration-aside-seal">
            <Landmark size={20} />
            <span>ACADEMIA · RESEARCH · INNOVATION</span>
          </div>
        </motion.div>
        <motion.div
          className="registration-form-panel"
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="form-panel-head">
            <div>
              <span>APPLICATION / 2026</span>
              <h3>Participant registration</h3>
            </div>
            <span className="form-live">
              <i /> OPEN NOW
            </span>
          </div>
          <div className="registration-cta">
            <p>Use the official Google Form to submit your registration, or scan the QR code from your phone.</p>
            <MagneticButton
              className="button button-primary"
              onClick={openRegistrationForm}
              strength={0.25}
            >
              REGISTER NOW <ArrowUpRight size={16} />
            </MagneticButton>
            <figure className="registration-qr">
              <a
                href={REGISTRATION_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Open VISION X 2026 registration form"
              >
                <img
                  src={REGISTRATION_QR_SRC}
                  alt="QR code linking to the VISION X 2026 Google Form"
                  width="220"
                  height="220"
                />
              </a>
              <figcaption>SCAN TO REGISTER</figcaption>
            </figure>
          </div>
        </motion.div>
      </section>
    </main>
  );
}

// Enhanced Footer
function Footer({ onNavigate }) {
  const links = [
    ['about', 'About VISION X'],
    ['competitions', 'Competitions'],
    ['schedule', 'Event schedule'],
    ['prizes', 'Prizes & recognition'],
    ['gallery', 'Gallery & highlights'],
    ['team', 'Team VISION X'],
    ['contact', 'Contact & FAQs'],
    ['register', 'Registration'],
  ];

  return (
    <footer className="site-footer">
      <GreekKey className="footer-key" />
      <div className="shell footer-main">
        <div className="footer-brand">
          <div className="footer-logo">
            <BrandLogo alt="Vision X" />
          </div>
          <p>FROM CURIOSITY TO IMPACT</p>
          <small>A flagship initiative by Chitkara Research Club.</small>
          <div className="footer-greek">
            ΓΝΩΘΙ ΣΕΑΥΤΟΝ <i>·</i> KNOW THYSELF
          </div>
          <div className="footer-venue">
            <MapPin size={13} /> CHITKARA UNIVERSITY, PUNJAB
          </div>
        </div>
        <div className="footer-links">
          <span>EXPLORE VISION X</span>
          {links.map(([page, label]) => (
            <motion.button
              key={page}
              onClick={() => onNavigate(page)}
              whileHover={{ x: 4 }}
            >
              {label}
            </motion.button>
          ))}
        </div>
        <div className="footer-end">
          <span>27–28 NOVEMBER 2026</span>
          <h3>THE NEXT IDEA <br /><em>STARTS WITH YOU.</em></h3>
          <MagneticButton onClick={() => onNavigate('register')} strength={0.2}>
            TAKE YOUR PLACE <ArrowUpRight size={15} />
          </MagneticButton>
          <small>© 2026 CHITKARA RESEARCH CLUB</small>
        </div>
      </div>
      <div className="footer-bottom shell">
        <span>VISION X <i>·</i> 2026</span>
        <span>QUESTION. INVESTIGATE. CREATE.</span>
        <motion.button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          whileHover={{ y: -2 }}
        >
          BACK TO TOP ↑
        </motion.button>
      </div>
    </footer>
  );
}

// Main App Component
export default function App() {
  const getInitialPage = () => {
    const hash = window.location.hash.replace('#', '');
    if (hash === 'details') return 'about';
    return PAGES.includes(hash) ? hash : 'home';
  };

  const [activePage, setActivePage] = useState(getInitialPage);
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    document.documentElement.style.colorScheme = 'dark';
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', '#111014');
  }, []);

  const navigate = (page) => {
    if (!PAGES.includes(page)) return;
    setActivePage(page);
    window.history.pushState(null, '', `#${page}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 480);
    const syncPage = () => {
      const hash = window.location.hash.replace('#', '');
      setActivePage(hash === 'details' ? 'about' : PAGES.includes(hash) ? hash : 'home');
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('hashchange', syncPage);
    window.addEventListener('popstate', syncPage);

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('hashchange', syncPage);
      window.removeEventListener('popstate', syncPage);
    };
  }, []);

  return (
    <MotionConfig reducedMotion="user">
      <div className="app-shell" data-theme="dark">
        <Suspense fallback={null}>
          <FxLayer />
          <FxExtras />
        </Suspense>
        <Header activePage={activePage} onNavigate={navigate} />
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            className="page-stage"
            key={activePage}
            initial={{ opacity: 0, y: 20, filter: 'blur(8px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: -20, filter: 'blur(8px)' }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            {activePage === 'home' && <HomePage onNavigate={navigate} />}
            {activePage === 'about' && <AboutPage />}
            {activePage === 'competitions' && <CompetitionsPage onNavigate={navigate} />}
            {activePage === 'schedule' && <SchedulePage />}
            {activePage === 'prizes' && <PrizesPage />}
            {activePage === 'gallery' && <GalleryPage />}
            {activePage === 'team' && <TeamPage />}
            {activePage === 'contact' && <ContactPage />}
            {activePage === 'register' && <RegisterPage />}
          </motion.div>
        </AnimatePresence>
        <Footer onNavigate={navigate} />
        <AnimatePresence>
          {showTop && (
            <motion.button
              className="back-to-top visible"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              aria-label="Back to top"
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 20 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <ArrowDown size={17} />
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </MotionConfig>
  );
}