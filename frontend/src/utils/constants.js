// Shared constants used across the app
export const UNIVERSITY_REGISTRATION_URL = 'https://forms.gle/NFwxVXPLp4dCearQ6';
export const SCHOOL_REGISTRATION_URL = 'https://forms.gle/truroakCErv2YvZs7';
export const REGISTRATION_URL = UNIVERSITY_REGISTRATION_URL;
export const buildRegistrationQrSrc = (url) => `https://api.qrserver.com/v1/create-qr-code/?size=280x280&margin=12&ecc=M&color=941f30&bgcolor=fffaf1&data=${encodeURIComponent(url)}`;
export const REGISTRATION_QR_SRC = buildRegistrationQrSrc(REGISTRATION_URL);
export const VISION_X_LOGO_SRC = '/images/vision-x-logo-transparent.png';

export const EVENT_START = new Date('2026-11-27T00:00:00+05:30');
export const EVENT_END = new Date('2026-11-29T00:00:00+05:30');

export const PAGES = ['home', 'about', 'competitions', 
    // 'schedule', 'prizes', 'gallery', 
    // 'team',
    'contact', 'register'];

export function openRegistrationForm() {
  window.open(REGISTRATION_URL, '_blank', 'noopener,noreferrer');
}

// Drifting scientific symbols (decorative)
export const SYMBOLS = ['π', 'Σ', '∇', 'λ', 'Δ', '∞', 'Ω', '∂', 'φ', 'θ', '∫', 'ψ'];
