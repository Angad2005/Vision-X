import { motion } from 'motion/react';
import { CalendarDays, Instagram, Mail, MapPin, Phone } from 'lucide-react';
import PageHero from '../components/shared/PageHero';

export default function ContactPage() {
  const contactPeople = [
    { name: 'Lubhit Dureja', phone: '9463209997' },
    { name: 'Kanan Verma', phone: '9876534923' },
    { name: 'ANchit Phutela', phone: '9888901700' },
  ];

  return (
    <main className="subpage">
      <PageHero
        kicker="CONTACT & SUPPORT"
        title={<>Find your way. <br /><em>Get in touch.</em></>}
        description="Event information for participants, researchers, speakers and visitors."
        footer="CHITKARA UNIVERSITY · PUNJAB"
        note={['ΔΙΑΛΟΓΟΣ', 'diálogos · conversation through reason']}
      />

      <section className="section-block shell contact-layout">
        <motion.div className="contact-info" initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <span className="eyebrow"><span /> CONTACT INFORMATION</span>
          <h2>Let's start a <em>conversation.</em></h2>
          <p>For event enquiries and participant support, reach out to the VISION X organising team.</p>
          <div className="contact-info-list">
            <motion.div whileHover={{ x: 5 }}>
              <MapPin size={20} />
              <span>
                <small>VENUE</small>
                <strong>Chitkara University, Punjab</strong>
              </span>
            </motion.div>
            <motion.div whileHover={{ x: 5 }}>
              <Mail size={20} />
              <span>
                <small>OFFICIAL EMAIL</small>
                <a href="mailto:chitkararesearchclub.osl@gmail.com">chitkararesearchclub.osl@gmail.com</a>
              </span>
            </motion.div>
            <motion.div whileHover={{ x: 5 }}>
              <Instagram size={20} />
              <span>
                <small>SOCIAL MEDIA</small>
                <a href="https://www.instagram.com/chitkararesearchclub.osl/" target="_blank" rel="noopener noreferrer">@Chitkararesearchclub.osl</a>
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
            <span className="eyebrow"><span /> CONTACT PERSONS</span>
            <h3>Reach the <em>team.</em></h3>
          </div>
          <div className="contact-info-list">
            {contactPeople.map((person) => (
              <motion.div key={person.name} whileHover={{ x: 5 }}>
                <Phone size={20} />
                <span>
                  <small>{person.name}</small>
                  <strong>{person.phone}</strong>
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>
    </main>
  );
}