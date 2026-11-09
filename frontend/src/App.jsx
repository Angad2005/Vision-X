import { useEffect, useState, lazy, Suspense } from 'react';
import { AnimatePresence, MotionConfig, motion } from 'motion/react';
import { ArrowDown } from 'lucide-react';
import { PAGES } from './utils/constants';

// Lazy-load heavy layers
const FxLayer = lazy(() => import('./components/FxLayer.jsx'));
const FxExtras = lazy(() => import('./components/FxExtras.jsx'));

// Shared chrome
import Header from './components/shared/Header';
import Footer from './components/shared/Footer';

// Pages (eager — they're small enough and needed immediately)
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import CompetitionsPage from './pages/CompetitionsPage';
// import SchedulePage from './pages/SchedulePage';
// import PrizesPage from './pages/PrizesPage';
// import GalleryPage from './pages/GalleryPage';
// import TeamPage from './pages/TeamPage';
import ContactPage from './pages/ContactPage';
import RegisterPage from './pages/RegisterPage';

export default function App() {
  const getInitialPage = () => {
    const hash = window.location.hash.replace('#', '');
    if (hash === 'details') return 'about';
    return PAGES.includes(hash) ? hash : 'home';
  };

  const [activePage, setActivePage] = useState(getInitialPage);
  const [showTop, setShowTop] = useState(false);
  const [pendingSection, setPendingSection] = useState(null);
  const [guidelinesRequest, setGuidelinesRequest] = useState(0);

  useEffect(() => {
    document.documentElement.style.colorScheme = 'dark';
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', '#111014');
  }, []);

  const navigate = (page, sectionId, options = {}) => {
    if (!PAGES.includes(page)) return;
    if (options.openGuidelines) setGuidelinesRequest((request) => request + 1);
    if (sectionId && page === activePage) {
      document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      return;
    }
    setPendingSection(sectionId ?? null);
    setActivePage(page);
    window.history.pushState(null, '', `#${page}`);
    if (!sectionId) window.scrollTo({ top: 0, behavior: 'smooth' });
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
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -14 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            onAnimationComplete={() => {
              if (!pendingSection) return;
              document.getElementById(pendingSection)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
              setPendingSection(null);
            }}
          >
            {activePage === 'home' && <HomePage onNavigate={navigate} />}
            {activePage === 'about' && <AboutPage />}
            {activePage === 'competitions' && <CompetitionsPage onNavigate={navigate} guidelinesRequest={guidelinesRequest} />}
            {/* {activePage === 'schedule' && <SchedulePage />}
            {activePage === 'prizes' && <PrizesPage />}
            {activePage === 'gallery' && <GalleryPage />} */}
            {/* {activePage === 'team' && <TeamPage />} */}
            {activePage === 'contact' && <ContactPage />}
            {activePage === 'register' && <RegisterPage onNavigate={navigate} />}
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
