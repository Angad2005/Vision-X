import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CalendarDays, ChevronDown, Instagram, Mail, MapPin } from 'lucide-react';
import PageHero from '../components/shared/PageHero';

export default function ContactPage() {
  const faqs = [
    { q: 'When is VISION X 2026?', a: 'The event is scheduled for 27–28 November 2026.' },
    { q: 'Where will the event take place?', a: 'At Chitkara University, Punjab.' },
    { q: 'Which competitions are part of VISION X?', a: 'VOX SPHERE, INNOVISTA, BATTLE OF WITS and VISIONATHON.' },
    { q: 'Where can I find the day-wise schedule?', a: 'The Schedule page includes a two-day overview. Session timings, competition slots, breaks and venue details will be added once finalised.' },
    // { q: 'What is the prize pool?', a: 'The total prize pool is listed as 30K. Competition-wise allocations and award details will be announced once finalised.' },
  ];
  const [openFaq, setOpenFaq] = useState(0);

  return (
    <main className="subpage">
      <PageHero
        kicker="CONTACT & FREQUENTLY ASKED QUESTIONS"
        title={<>Find your way. <br /><em>Get in touch.</em></>}
        description="Event information for participants, researchers, speakers and visitors."
        footer="CHITKARA UNIVERSITY · PUNJAB"
        note={['ΔΙΑΛΟΓΟΣ', 'diálogos · conversation through reason']}
      />

      <section className="section-block shell contact-layout">
        <motion.div className="contact-info" initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <span className="eyebrow"><span /> CONTACT INFORMATION</span>
          <h2>Let's start a <em>conversation.</em></h2>
          <p>For event enquiries, email the VISION X team. Official social channels will be published here when confirmed.</p>
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
                <a href="mailto:chitkararesearchclub.osl@gmail.com">chitkararesearchclub.osl@gmail.com</a>
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

        <motion.div className="faq-panel" initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <div className="faq-heading">
            <span className="eyebrow"><span /> QUICK ANSWERS</span>
            <h3>Frequently asked <em>questions.</em></h3>
          </div>
          <div className="faq-list">
            {faqs.map((faq, index) => (
              <motion.div className={`faq-item ${openFaq === index ? 'is-open' : ''}`} key={faq.q} layout>
                <motion.button type="button" onClick={() => setOpenFaq(openFaq === index ? -1 : index)} aria-expanded={openFaq === index} whileHover={{ x: 4 }}>
                  <span>{faq.q}</span>
                  <motion.span animate={{ rotate: openFaq === index ? 180 : 0 }} transition={{ duration: 0.3 }}>
                    <ChevronDown size={17} />
                  </motion.span>
                </motion.button>
                <AnimatePresence initial={false}>
                  {openFaq === index && (
                    <motion.div className="faq-answer" initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}>
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