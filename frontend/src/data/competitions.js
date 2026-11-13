import { Mic2, Presentation, MessagesSquare, BookText } from 'lucide-react';

export const competitions = [
  {
    number: '01',
    name: 'VOX SPHERE',
    type: 'SPEAKER INTERACTION SESSION',
    description: 'An inspiring TED Talk-inspired session that brings together thought leaders and experienced individuals to share their journeys, ideas, and perspectives. An open platform for students to gain insights, explore new ideas, and interact directly with the speakers.',
    detail: 'Speaker interaction',
    date: '27 November 2026',
    primaryOutcome: 'Public speaking, expression and thought leadership.',
    image: '/images/3.png',
    icon: Mic2,
    greek: 'Α',
    gradient: 'linear-gradient(135deg, #c63b45 0%, #8c1728 100%)',
  },
  {
    number: '02',
    name: 'INNOVISTA',
    type: 'RESEARCH PRESENTATION & POSTER MAKING',
    description: 'A platform for young researchers to showcase innovative ideas, research findings, and creative solutions through structured research presentations and visually engaging academic posters.',
    detail: 'Research',
    date: '28 November 2026',
    primaryOutcome: 'Research presentation, poster design and innovation.',
    image: '/images/9.png',
    icon: Presentation,
    greek: 'Β',
    gradient: 'linear-gradient(135deg, #d4a574 0%, #8b6f47 100%)',
  },
  {
    number: '03',
    name: 'BATTLE OF WITS',
    type: 'DEBATE CHALLENGE',
    description: 'An intellectually stimulating debate competition where participants present arguments, challenge opposing viewpoints, and demonstrate critical thinking, confidence, research, and communication skills.',
    detail: 'Debate',
    date: '28 November 2026',
    primaryOutcome: 'Critical thinking, argumentation and diplomacy.',
    image: '/images/4.png',
    icon: MessagesSquare,
    greek: 'Γ',
    gradient: 'linear-gradient(135deg, #6b7280 0%, #374151 100%)',
  },
  {
    number: '04',
    name: 'VISIONATHON',
    type: 'OVERNIGHT REVIEW PAPER MAKING CHALLENGE',
    description: 'An intensive research-based challenge where participants explore a chosen topic, analyse existing literature, and develop a structured review paper within the given timeframe, showcasing their analytical and academic writing abilities.',
    detail: 'Research writing',
    date: '27–28 November 2026',
    primaryOutcome: 'Academic research, literature review and collaborative writing.',
    image: '/images/10.png',
    icon: BookText,
    greek: 'Δ',
    gradient: 'linear-gradient(135deg, #a71925 0%, #5c1019 100%)',
  },
];

// Greek terms that sit behind each competition
export const competitionGreek = {
  '01': ['ΑΓΟΡΑ', 'agorá · the public square'],
  '02': ['ΕΡΕΥΝΑ', 'érevna · research, search'],
  '03': ['ΔΙΑΛΕΚΤΙΚΗ', 'dialektikí · the art of argument'],
  '04': ['ΣΥΝΘΕΣΙΣ', 'sýnthesis · a putting together'],
};