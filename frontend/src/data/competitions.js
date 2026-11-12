import { Mic2, Presentation, MessagesSquare, BookText } from 'lucide-react';

export const competitions = [
  {
    number: '01',
    name: 'VOX SPHERE',
    type: 'TEDx-STYLE TALKS',
    description: 'A dedicated stage for ideas, perspectives and talks that invite audiences to think beyond the familiar.',
    detail: 'Talks',
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
    description: 'Present research and communicate discoveries through structured presentations and academic posters.',
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
    description: 'A forum for argument, evidence, critical thinking and the exchange of contrasting perspectives.',
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
    description: 'An overnight challenge centred on reviewing research and developing a review paper.',
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