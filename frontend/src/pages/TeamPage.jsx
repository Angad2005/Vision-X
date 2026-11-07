import { motion } from 'motion/react';
import { staggerContainer } from '../utils/animations';
import PageHero from '../components/shared/PageHero';
import TeamCard from '../components/shared/TeamCard';
import { teamGroups } from '../data/teamGroups';

export default function TeamPage() {
  return (
    <main className="subpage">
      <PageHero
        kicker="TEAM VISION X"
        title={<>Made by people. <br /><em>Built on belief.</em></>}
        description="Meet the organizing committee, leadership, department heads and the people working behind the scenes. Faculty coordinator and volunteer information will be added when confirmed."
        footer="THE VISIONARIES · THE EXECUTORS · THE BUILDERS"
        note={['ΣΥΝΕΡΓΙΑ', 'synergía · working together']}
      />

      {teamGroups.map((group, groupIndex) => (
        <motion.section className={`section-block shell team-section team-section-${group.id}`} key={group.id} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <div className="team-section-heading">
            <div>
              <span className="eyebrow"><span /> {group.eyebrow}</span>
              <h2>{group.title}<em>.</em></h2>
            </div>
            <span className="team-count">
              {String(group.members.length).padStart(2, '0')} MEMBERS <i /> 0{groupIndex + 1}/04
            </span>
          </div>
          <motion.div className="team-grid" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }} variants={staggerContainer}>
            {group.members.map((member, index) => (
              <TeamCard member={member} index={index} key={member.name} />
            ))}
          </motion.div>
        </motion.section>
      ))}

      <section className="team-support-section">
        <div className="shell team-support-grid">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <span className="eyebrow"><span /> FACULTY COORDINATION</span>
            <h2>Guidance behind <em>the vision.</em></h2>
            <p>Faculty coordinator names and profiles will be published after confirmation.</p>
            <span className="team-support-status">PROFILES TO BE ANNOUNCED</span>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
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