import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowUpRight, ChevronDown, Menu, X } from 'lucide-react';
import BrandLogo from './BrandLogo';
import MagneticButton from './MagneticButton';

export default function Header({ activePage, onNavigate }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    ['home', 'HOME'],
    ['about', 'ABOUT'],
    ['competitions', 'COMPETITIONS'],
    // ['schedule', 'SCHEDULE'],
    ['team', 'TEAM'],
  ];
  const moreItems = [
    // ['prizes', 'Prizes & recognition'],
    // ['gallery', 'Gallery & highlights'],
    ['contact', 'Contact & FAQs'],
  ];

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

          <MagneticButton className="nav-cta" onClick={() => go('register')} strength={0.2}>
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