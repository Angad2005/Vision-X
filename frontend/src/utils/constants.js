// Shared constants used across the app
export const REGISTRATION_URL = 'https://forms.gle/YOUR_FORM_ID';
export const REGISTRATION_QR_SRC = `https://api.qrserver.com/v1/create-qr-code/?size=280x280&margin=12&ecc=M&color=941f30&bgcolor=fffaf1&data=${encodeURIComponent(REGISTRATION_URL)}`;
export const VISION_X_LOGO_SRC = '/images/WhatsApp%20Image%202026-11-04%20at%2011.19.35%20PM.jpeg';

export const EVENT_START = new Date('2026-11-27T00:00:00+05:30');
export const EVENT_END = new Date('2026-11-29T00:00:00+05:30');

export const PAGES = ['home', 'about', 'competitions', 
    // 'schedule', 'prizes', 'gallery', 
    'team', 'contact', 'register'];

export function openRegistrationForm() {
  window.open(REGISTRATION_URL, '_blank', 'noopener,noreferrer');
}

// Drifting scientific symbols (decorative)
export const SYMBOLS = ['π', 'Σ', '∇', 'λ', 'Δ', '∞', 'Ω', '∂', 'φ', 'θ', '∫', 'ψ'];