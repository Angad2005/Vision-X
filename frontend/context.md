# VISION X 2026 — Project Context for LLMs

> Upload this file into any LLM chat to give it full working knowledge of this project.
> It describes the architecture, every file, every component contract, the design system,
> and the conventions you must follow when producing rewritten code.
>
> **Workflow tip:** for "fully correct" rewrites, also attach the specific source file(s)
> you want changed (paths are listed below). This file tells the AI *how everything fits
> together*; the attached files give it the exact current code to modify.

---

## 1. What this project is

A single-page marketing/event website for **VISION X 2026**, a research & innovation
festival by the **Chitkara Research Club**, scheduled **27–28 November 2026** at
**Chitkara University, Punjab, India**.

Design identity: "Athena / Research" — classical Greek academic motifs (meander/greek-key
patterns, Greek letters, laurel wreaths, serif display type) fused with a modern
dark crimson/ivory/antique-gold tech aesthetic. Tagline: **"FROM CURIOSITY TO IMPACT"**.
Decorative Greek text is used throughout (e.g. `ΓΝΩΘΙ ΣΕΑΥΤΟΝ · KNOW THYSELF`).

There are **four competitions**: VOX SPHERE (TEDx-style talks), INNOVISTA (research
presentation & poster making), BATTLE OF WITS (debate challenge), VISIONATHON (overnight
review-paper challenge).

---

## 2. Tech stack

| Layer | Choice |
|---|---|
| Framework | React 19 (`react`, `react-dom` ^19.1.1) — **plain JSX, no TypeScript** |
| Build tool | Vite 7 (`vite` ^7.1.7) + `@vitejs/plugin-react` |
| Routing | **None** — custom hash-based SPA routing inside `App.jsx` (no react-router) |
| Animation | `motion` package, imported as **`motion/react`** (Motion for React, v12) |
| Icons | `lucide-react` ^0.468 |
| CSS | One global stylesheet `src/styles.css` + `bootstrap/dist/css/bootstrap.min.css` imported first in `main.jsx`. **No react-bootstrap components are actually used** — Bootstrap CSS is loaded but all layout/styling is custom. |
| Fonts | Google Fonts in `index.html`: `DM Sans` (body), `Playfair Display` (serif display), `DM Mono` (mono labels) |

Scripts: `npm run dev` (port 5173, strictPort, host 0.0.0.0), `npm run build`, `npm run preview`.

---

## 3. Directory tree

```text
VIsion X/
├── index.html                  # shell HTML, fonts, favicon, meta
├── vite.config.js              # react plugin, dev server 0.0.0.0:5173
├── package.json
├── README.md
├── public/
│   └── images/                 # logo, hero statue, figures, favicon jpeg
│       ├── vision-x-logo-transparent.png   # used by BrandLogo
│       ├── winged-marble-statue.jpg        # used by HeroEmblem
│       ├── vision-x-figure.png
│       ├── greek-research-figure.svg
│       └── WhatsApp Image 2026-11-04 ... .jpeg  # favicon
└── src/
    ├── main.jsx                # mounts <App/> in #root, imports bootstrap + styles.css
    ├── App.jsx                 # hash router, page switching, page transition, back-to-top
    ├── styles.css              # ENTIRE design system (~1620 lines, single file)
    ├── utils/
    │   ├── constants.js        # URLs, dates, PAGES list, SYMBOLS
    │   └── animations.js       # shared motion variants
    ├── data/
    │   ├── competitions.js     # 4 competitions + Greek glosses
    │   ├── lexicon.js          # Greek→English science vocabulary
    │   ├── lineage.js          # ancient Greek thinkers list
    │   └── teamGroups.js       # team roster grouped in 4 groups
    ├── components/
    │   ├── FxLayer.jsx         # lazy: intro splash, scroll progress, particles, tilt/magnet
    │   ├── FxExtras.jsx        # lazy: nav curtain, DOM "magic" (sheen/ripple/count-up)
    │   └── shared/             # reusable UI components (see §5)
    └── pages/                  # one file per route (see §4)
```

---

## 4. Routing architecture (IMPORTANT — no react-router)

`App.jsx` implements a **hash-based SPA router**:

- Valid page ids live in `PAGES` inside `src/utils/constants.js`:
  ```js
  export const PAGES = ['home', 'about', 'competitions',
      // 'schedule', 'prizes', 'gallery',
      'team', 'contact', 'register'];
  ```
- `navigate(page)` in `App.jsx`: validates `PAGES.includes(page)`, calls
  `setActivePage`, `window.history.pushState(null,'',`#${page}`)`, scrolls to top.
  The `pushState` call is intercepted by `FxExtras` which dispatches a `vx-nav`
  event → triggers the full-screen "VISION X" curtain transition.
- On load and on `hashchange`/`popstate`, the hash is read; `#details` is an alias
  for `about`; unknown hashes fall back to `home`.
- `<AnimatePresence mode="wait" initial={false}>` wraps a `motion.div.page-stage`
  keyed by `activePage` — page transition is fade+slide (`y:14→0` in, `y:-10` out,
  0.32s, ease `[0.22,1,0.36,1]`).
- `.app-shell` has **`data-theme="dark"` hardcoded**. The CSS contains full light-theme
  overrides and `.theme-switch` styles, but **no theme toggle exists in the JSX** —
  the site is permanently dark. (README mentions a theme switch; it is not wired up.)
- `document.documentElement.style.colorScheme = 'dark'` and meta theme-color are set
  in a `useEffect` on mount.
- A "back to top" floating button appears after `scrollY > 480`.

**Currently DISABLED pages:** `SchedulePage`, `PrizesPage`, `GalleryPage` exist as
complete files but are commented out in **four places** — to re-enable a page you must
uncomment in all of them:
1. `src/utils/constants.js` → `PAGES` array
2. `src/App.jsx` → import + `{activePage === 'x' && <XPage/>}` render block
3. `src/components/shared/Header.jsx` → `navItems` or `moreItems` arrays
4. `src/components/shared/Footer.jsx` → `links` array

---

## 5. File-by-file inventory

### `src/App.jsx`
- Exports default `App()`. Lazy-loads `FxLayer` and `FxExtras` via `React.lazy` +
  `<Suspense fallback={null}>`.
- Imports eagerly: `Header`, `Footer`, and active pages (`HomePage`, `AboutPage`,
  `CompetitionsPage`, `TeamPage`, `ContactPage`, `RegisterPage`).
- Props passed down: `HomePage` and `CompetitionsPage` receive `onNavigate={navigate}`;
  all other pages take **no props**. `Header`/`Footer` receive `activePage`/`onNavigate`.

### `src/main.jsx`
- Imports `bootstrap/dist/css/bootstrap.min.css` **then** `./styles.css` (custom CSS
  wins). Mounts `<App/>` inside `<React.StrictMode>` into `#root`.

### `src/utils/constants.js` — full source (single source of truth for global values)
```js
export const REGISTRATION_URL = 'https://forms.gle/YOUR_FORM_ID'; // ⚠ PLACEHOLDER — replace with real Google Form
export const REGISTRATION_QR_SRC = `https://api.qrserver.com/v1/create-qr-code/?size=280x280&margin=12&ecc=M&color=941f30&bgcolor=fffaf1&data=${encodeURIComponent(REGISTRATION_URL)}`;
export const VISION_X_LOGO_SRC = '/images/vision-x-logo-transparent.png';

export const EVENT_START = new Date('2026-11-27T00:00:00+05:30'); // IST
export const EVENT_END   = new Date('2026-11-29T00:00:00+05:30'); // end of Nov 28 IST

export const PAGES = ['home', 'about', 'competitions',
    // 'schedule', 'prizes', 'gallery',
    'team', 'contact', 'register'];

export function openRegistrationForm() {
  window.open(REGISTRATION_URL, '_blank', 'noopener,noreferrer');
}
export const SYMBOLS = ['π', 'Σ', '∇', 'λ', 'Δ', '∞', 'Ω', '∂', 'φ', 'θ', '∫', 'ψ'];
```

### `src/utils/animations.js` — full source (shared motion variants)
```js
export const fadeInUp = {
  hidden: { opacity: 1, y: 16, clipPath: 'inset(100% 0 0 0)' },
  visible: { opacity: 1, y: 0, clipPath: 'inset(-8% 0 0 0)',
    transition: { duration: 0.52, ease: [0.22, 1, 0.36, 1] } },
};
export const staggerContainer = {
  hidden: { opacity: 1 },
  visible: { transition: { staggerChildren: 0.07, delayChildren: 0.12 } },
};
export const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};
```
Usage pattern everywhere: `<motion.X initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={...}>`.

### `src/data/competitions.js` — full source
```js
import { Mic2, Presentation, MessagesSquare, BookText } from 'lucide-react';
export const competitions = [
  { number: '01', name: 'VOX SPHERE', type: 'TEDx-STYLE TALKS',
    description: '...', detail: 'Talks', icon: Mic2, greek: 'Α',
    gradient: 'linear-gradient(135deg, #c63b45 0%, #8c1728 100%)' },
  { number: '02', name: 'INNOVISTA', type: 'RESEARCH PRESENTATION & POSTER MAKING',
    detail: 'Research', icon: Presentation, greek: 'Β',
    gradient: 'linear-gradient(135deg, #d4a574 0%, #8b6f47 100%)' },
  { number: '03', name: 'BATTLE OF WITS', type: 'DEBATE CHALLENGE',
    detail: 'Debate', icon: MessagesSquare, greek: 'Γ',
    gradient: 'linear-gradient(135deg, #6b7280 0%, #374151 100%)' },
  { number: '04', name: 'VISIONATHON', type: 'OVERNIGHT REVIEW PAPER MAKING CHALLENGE',
    detail: 'Research writing', icon: BookText, greek: 'Δ',
    gradient: 'linear-gradient(135deg, #a71925 0%, #5c1019 100%)' },
];
export const competitionGreek = {
  '01': ['ΑΓΟΡΑ', 'agorá · the public square'],
  '02': ['ΕΡΕΥΝΑ', 'érevna · research, search'],
  '03': ['ΔΙΑΛΕΚΤΙΚΗ', 'dialektikí · the art of argument'],
  '04': ['ΣΥΝΘΕΣΙΣ', 'sýnthesis · a putting together'],
};
```
Item shape: `{number, name, type, description, detail, icon (Lucide component ref), greek, gradient}`.
Cards get CSS class `tone-${number}` (i.e. `tone-01`…`tone-04`).

### `src/data/lexicon.js` — full source
```js
export const lexicon = [
  { greek: 'ΘΕΩΡΙΑ', roman: 'theōría', meaning: 'a looking at, contemplation', english: 'theory' },
  { greek: 'ΥΠΟΘΕΣΙΣ', roman: 'hypóthesis', meaning: 'a foundation placed beneath', english: 'hypothesis' },
  { greek: 'ΜΕΘΟΔΟΣ', roman: 'méthodos', meaning: 'a way of pursuing', english: 'method' },
  { greek: 'ΑΝΑΛΥΣΙΣ', roman: 'análysis', meaning: 'a loosening up, unravelling', english: 'analysis' },
  { greek: 'ΣΥΝΘΕΣΙΣ', roman: 'sýnthesis', meaning: 'a putting together', english: 'synthesis' },
  { greek: 'ΑΛΗΘΕΙΑ', roman: 'alḗtheia', meaning: 'that which is un-concealed', english: 'truth' },
];
```

### `src/data/lineage.js` — full source
```js
export const lineage = [
  { name: 'Thales of Miletus', era: 'c. 624–546 BCE', glyph: 'Θ', text: '...' },
  { name: 'Hippocrates',      era: 'c. 460–370 BCE',  glyph: 'Ι', text: '...' },
  { name: 'Aristotle',        era: '384–322 BCE',    glyph: 'Α', text: '...' },
  { name: 'Euclid',           era: 'c. 300 BCE',     glyph: 'Ε', text: '...' },
  { name: 'Archimedes',       era: 'c. 287–212 BCE', glyph: 'Ψ', text: '...' },
  { name: 'Eratosthenes',     era: 'c. 276–194 BCE', glyph: 'Ρ', text: '...' },
];
```

### `src/data/teamGroups.js` — shape (4 groups, most names are placeholders)
```js
export const teamGroups = [
  { id: 'core',     eyebrow: 'CORE LEADERSHIP',   title: 'The Visionaries',
    members: [{ name, role, description, image?, initials }] },
  { id: 'event',    eyebrow: 'EVENT MANAGEMENT',  title: 'The Executors',   members: [...] },
  { id: 'creative', eyebrow: 'CREATIVE & MEDIA',  title: 'The Storytellers',members: [...] },
  { id: 'tech',     eyebrow: 'TECH & OPERATIONS', title: 'The Builders',    members: [...] },
];
```
⚠ Only `Lubhit Dureja` (PRESIDENT) and `Anchit Phutela` (VICE PRESIDENT) are real names.
All other members are placeholders like `'Secretary Name'`, `'Event Head Name'` —
**replace these strings when real names arrive**. Member shape:
`{name, role, description, image (optional path), initials (2-letter fallback monogram)}`.
Note: `image: '/images/lubhit-dureja.jpg'` is referenced but that file does **not** exist
in `public/images` yet — `TeamCard` gracefully falls back to a monogram on image error.

### Shared components (`src/components/shared/`)

| File | Export | Props | Notes |
|---|---|---|---|
| `Header.jsx` | `Header` | `{activePage, onNavigate}` | Sticky header. `navItems`/`moreItems` are local arrays `[pageId, LABEL]` — edit these to change nav. Has mobile hamburger (`menuOpen`), "MORE" dropdown (`moreOpen`), REGISTER CTA via `MagneticButton`. Ornament strip: `ΜΕΤΑ ΤΗΝ ΓΝΩΣΙΝ · FROM CURIOSITY TO IMPACT`. |
| `Footer.jsx` | `Footer` | `{onNavigate}` | `links` array `[pageId, label]`; brand block, explore links, CTA, bottom bar with constants `π 3.14159 · φ 1.61803 · e 2.71828 · ΠΑΝΤΑ ΡΕΙ`. |
| `Countdown.jsx` | `Countdown` | none | 1s interval; computes remaining from `EVENT_START`; renders `FlipUnit`s for DAYS/HOURS/MINUTES/SECONDS with Greek labels (ΗΜΕΡΕΣ/ΩΡΕΣ/ΛΕΠΤΑ/ΔΕΥΤΕΡΟΛΕΠΤΑ). Shows "UNDERWAY"/"CONCLUDED" states after start/end. |
| `FlipUnit.jsx` | `FlipUnit` | `{label, value, greek}` | Flip-digit animation via `AnimatePresence`; pads value to 2 digits. |
| `FloatingSymbols.jsx` | `FloatingSymbols` | `{count = 8}` | Decorative absolutely-positioned Greek/science symbols, deterministic pseudo-random layout from `SYMBOLS`. |
| `BrandLogo.jsx` | `BrandLogo` | `{alt = ''}` | `motion.img` using `VISION_X_LOGO_SRC`. |
| `GreekKey.jsx` | `GreekKey` | `{className = ''}` | Decorative meander strip `<div className="greek-key">`. |
| `HeroEmblem.jsx` | `HeroEmblem` | none | Scroll-parallax (`useScroll`+`useTransform` on y/rotate) floating composition with `/images/winged-marble-statue.jpg`, orbital rings, markers. Respects `useReducedMotion`. |
| `LaurelWreath.jsx` | `LaurelWreath` | none | Pure SVG laurel wreath (two mirrored groups). |
| `MagneticButton.jsx` | `MagneticButton` | `{children, className, onClick, strength = 0.3, ...props}` | `motion.button` that translates toward cursor (`onMouseMove`/`onMouseLeave`, spring `stiffness:150 damping:15 mass:0.1`). Passes extra props through (e.g. `aria-label`). |
| `MeanderDivider.jsx` | `MeanderDivider` | `{glyph = 'Φ', label}` | SVG meander-pattern divider with centered glyph + optional small label. Uses `useId()` for pattern id. |
| `PageHero.jsx` | `PageHero` | `{kicker, title, description, footer, note}` | Standard sub-page banner. `title` accepts JSX (uses `<em>` for gold accent). `note` is a 2-tuple `[bigGreekWord, 'romanization · gloss']`. |
| `SectionHeading.jsx` | `SectionHeading` | `{eyebrow, title, text, align = 'center'}` | Eyebrow (gold, with red dash) + serif `<h2>` + optional paragraph; uses `staggerContainer`/`fadeInUp`. `title` accepts JSX. |
| `TeamCard.jsx` | `TeamCard` | `{member, index}` | Card with photo (`member.image`, falls back to `member.initials` monogram on error), role, name, description, decorative social icons, `0{index+1}` index badge. |

### Effect layers (`src/components/`)

**`FxLayer.jsx`** (lazy, rendered once in App):
- `Intro` — full-screen "VISION X" letter animation on first visit per session
  (`sessionStorage['vx-intro']`), auto-dismisses after 3.1s.
- `.fx-progress` — fixed top scroll-progress bar (`useScroll`+`useSpring`).
- `Particles` — fixed full-screen `<canvas>` particle field (gold + occasional red
  dots, connecting lines, mouse repulsion). Skipped when `prefers-reduced-motion`.
- `useInteractions` — on fine-pointer non-reduced-motion devices: 3D `rotate` tilt on
  `TILT` selector cards and `translate` magnetism on `MAGNET` selector buttons, applied
  via WAAPI `element.animate()` + inline styles (released on pointer-leave).

**`FxExtras.jsx`** (lazy, rendered once in App):
- `Curtain` — monkey-patches `window.history.pushState` to dispatch `vx-nav`; renders a
  crimson full-screen wipe with animated "VISION X" letters on every `navigate()` call.
- `useDomMagic` — global DOM enhancer (MutationObserver-based, auto-applies to NEW nodes):
  - Injects `<span class="fx-sheen">` into every `TILT` card → cursor-following sheen
    driven by `--mx`/`--my` CSS vars.
  - `IntersectionObserver` count-up animation on elements matching
    `.prize-total-card>div>strong` (starts with digits).
  - Ripple `<span class="fx-ripple">` on `pointerdown` over `RIPPLE` selectors
    (.button, .nav-cta, .competition-link, .faq-item>button, .gallery-filters button,
    .schedule-day-switch button, .footer-end>button).
  - Sets `--px`/`--py` (−0.5…0.5) CSS vars on `<html>` from pointer position.
- Selector constants `TILT`, `COUNT`, `RIPPLE` are defined at top of the file —
  **if you add a new card/button class that should get these effects, add its selector
  to these lists** (and mirror in `FxLayer.jsx` `TILT`/`MAGNET` for tilt/magnetism).

### Pages (`src/pages/`)

All pages render `<main>` (sub-pages add `className="subpage"`) and are composed from
`PageHero` + `SectionHeading` + `motion` primitives + shared components.

| File | Route id | Props | Content summary |
|---|---|---|---|
| `HomePage.jsx` | `home` | `{onNavigate}` | Hero section (pretitle, giant `VISION X 2026` h1, `HeroEmblem`, meta row, CTAs → competitions/register, `Countdown`), intro 3-card grid, `lineage` cards section, "research atlas" blueprint console section, question/CTA panel. |
| `AboutPage.jsx` | `about` (alias `#details`) | none | PageHero, 3 about-pillars, `lexicon` grid, vision/mission draft section, 4-step "why research" section. |
| `CompetitionsPage.jsx` | `competitions` | `{onNavigate}` | PageHero, intro, 4 `competition-card`s from data (gradient visual, icon, Greek etymology), CTA band. |
| `SchedulePage.jsx` | `schedule` — **disabled** | none | Day 01/02 tab switcher (`selectedDay` state, `dayInfo` map, static `scheduleItems` placeholder list). |
| `PrizesPage.jsx` | `prizes` — **disabled** | none | 30K prize total card (`LaurelWreath`, `prize-total-card` triggers count-up FX), 3 detail cards. |
| `GalleryPage.jsx` | `gallery` — **disabled** | none | Filter buttons (`filter` state: all/photos/videos/behind/updates) + `AnimatePresence` card grid with placeholder media slots. |
| `TeamPage.jsx` | `team` | none | PageHero + one section per `teamGroups` entry (`team-section-${group.id}`) + faculty/volunteer placeholder panels. |
| `ContactPage.jsx` | `contact` | none | PageHero + contact info (venue, email `chitkararesearchclub.osl@gmail.com`, social TBD) + FAQ accordion (`faqs` array local, `openFaq` index state, `AnimatePresence` height animation). |
| `RegisterPage.jsx` | `register` | none | PageHero + aside + form panel with `openRegistrationForm()` button and QR `<img src={REGISTRATION_QR_SRC}>`. |

---

## 6. Design system (`src/styles.css`)

Single global stylesheet, plain CSS (no modules, no preprocessors). It grew
organically and is effectively **two blocks**:
- **Lines ~1–983** — original design system, organized by comment banners:
  base/`:root` → fx layers → header → buttons/eyebrow → hero → marquee keyframes →
  section foundations → journey cards → blueprint console → question panel →
  page-hero → details → competitions → team → registration → footer → responsive
  breakpoints → accessibility → readable type scale.
- **Lines ~984–1620** — appended feature block: research-grid/atlas refinements,
  header-nav fixes, hero event-meta + countdown, all newer page surfaces
  (about pillars, lexicon, lineage, mission, research steps, schedule, prizes,
  gallery, contact/FAQ, team additions, footer balance), dark-mode contrast
  overrides for those sections, the "event brief palette" pass, and final ornament
  styles (meander divider, floating symbols, lineage, lexicon, etymology,
  page-hero marginalia, countdown Greek labels, Eureka, laurel wreath, footer
  constants). When editing, search for the class name — related rules may exist in
  both blocks (base rule early, dark-mode override late).

### Responsive breakpoints
`@media (max-width: 1080px)` tablet · `800px` mobile (nav collapses to hamburger,
`.main-nav.is-open` slides down) · `540px` small phones. Plus
`prefers-reduced-motion: reduce` blocks that disable animations/particles.
`html` has `scroll-behavior: smooth` and `scroll-padding-top: 100px`.

### Z-index layering (fixed FX vs content)
`fx-intro` 999 · `fx-dot`/`fx-ring` 998 · `fx-curtain` 990 · `fx-progress` 60 ·
`site-header` 40 · `back-to-top` 30 · `page-stage`/content 1 · `fx-particles` 0.
Body has `overflow-x: hidden`; `.app-shell` uses `overflow: clip`.

### Legacy/unused CSS (do not be confused by these)
Styles exist for classes **no longer rendered** by any page: `.journey-card`,
`.journey-grid`, `.process-*`, `.details-grid`, `.detail-card`, `.awards-grid`,
`.award-card`, `.event-status`/`.status-*`, `.team-page-hero`, `.tone-dark`,
`.tone-gold`, `.tone-marble`. They are leftovers from earlier iterations. The FX
selector lists in `FxExtras.jsx`/`FxLayer.jsx` still mention `.detail-card`,
`.journey-card`, `.award-card` — harmless dead selectors.

### CSS custom properties (`:root`)
```css
--ink:#111014; --ink-2:#19171c; --ink-3:#252129;
--paper:#f2eee7; --paper-2:#e8e0d4; --paper-3:#d9cdbb; --white:#fffaf1;
--red:#941f30; --red-bright:#c53d48; --red-dark:#581523;
--gold:#a9854c; --gold-light:#d5b77e; --gold-pale:#ead9b6;
--muted:#817a79; --line:rgba(30,25,27,.15); --line-light:rgba(255,250,241,.15);
--serif:'Playfair Display',Georgia,serif;
--mono:'DM Mono',monospace;
/* body font is 'DM Sans' set on :root font-family */
```
Runtime vars set by JS: `--mx`/`--my` (card-local cursor pos for sheen),
`--px`/`--py` (global pointer pos), `--hero-parallax-y`/`--hero-parallax-rotate`
(HeroEmblem scroll transforms).

### Core layout classes
- `.shell` — content wrapper: `width:min(1280px, calc(100% - 72px)); margin-inline:auto`
- `.app-shell` — root div (has `data-theme="dark"`); `.page-stage` — animated route container
- `.section-block` — standard vertical padding (112px top/bottom); `.compact-top` variant
- `.subpage` — class on sub-page `<main>`

### Reusable class vocabulary (use these — don't invent new ones)
- `.eyebrow` — gold small-caps label with red dash (`<span className="eyebrow"><span /> TEXT</span>`)
- `.button` + `.button-primary` / `.button-ghost` / `.button-light` — CTA buttons (always
  wrapped in `MagneticButton`, which forwards `className`)
- `.text-link` — underline-style link button
- `.page-hero`, `.page-hero-kicker`, `.page-hero-note`, `.greek-relief` — sub-page banner
- `.section-heading` (+ `.align-left`) — section title block
- `.meander-divider`, `.greek-key`, `.meander-glyph`, `.meander-line` — Greek ornament dividers
- `.floating-symbols` — decorative drifting symbols container
- `.countdown-panel`, `.countdown-units`, `.countdown-unit`, `.flip`, `.unit-greek`
- Cinematic-pass additions (appended block at end of styles.css, ~line 1621+):
  `.hero-greek-mark`, `.hero-sweep` (animated gold light sweep), `.greek-watermark`
  (oversized faint Greek section decoration — only safe inside `.lineage-section` /
  `.about-mission-section` which give children z-index:1), `.footer-wordmark`,
  `.app-shell::after` film grain, `.nav-indicator` (gold active-nav bar, hidden on
  mobile), competition `tone-01..04` accent borders, `.lineage-grid` is now a
  horizontal snap-scroll row (not a grid).
- Card classes (each auto-gets sheen + optional tilt/ripple via FX selectors):
  `.home-intro-card`, `.about-pillar`, `.lineage-card`, `.lexicon-card`, `.competition-card`
  (+ `.tone-01..04`, `.competition-visual`, `.competition-content`, `.competition-meta`,
  `.competition-link`, `.competition-cta`), `.team-card` (+ `.team-photo`,
  `.team-monogram`, `.team-card-copy`, `.team-socials`), `.detail-card`,
  `.prize-total-card`, `.prize-detail-card`, `.gallery-card`, `.schedule-item`,
  `.journey-card`, `.blueprint-section`/`.blueprint-console`/`.console-*`/`.research-*`/
  `.diagram-*`, `.question-section`/`.question-copy`, `.contact-info`/`.faq-*`,
  `.registration-*`, `.team-section*`, `.mission-grid`, `.research-steps`
- Typography: serif (`var(--serif)`) for big headings, `<em>` inside headings renders
  gold italic accent; uppercase + letter-spacing for labels/buttons; Greek words inline.

### Theming note
CSS has complete `[data-theme="light"]` overrides plus `.theme-switch` styles, but the
app hardcodes `data-theme="dark"`. If asked to change theme/colors, remember the site
is dark-only in practice.

---

## 7. Conventions & rules for generating code

1. **Plain JSX, no TypeScript, no new dependencies** unless asked. Imports use
   extensionless paths (`'./components/shared/Header'`, `'../utils/constants'`).
2. **Animation library is `motion/react`** — `import { motion, AnimatePresence,
   MotionConfig, useScroll, useSpring, useTransform, useReducedMotion } from 'motion/react'`.
   Signature ease is `[0.22, 1, 0.36, 1]` almost everywhere. Respect
   `prefers-reduced-motion` for heavy effects (FxLayer already does).
3. **Icons:** `import { X } from 'lucide-react'` — check the icon exists in
   lucide-react@0.468 before using.
4. **Styling:** add/extend classes in `src/styles.css` using the existing variables and
   naming style (kebab-case, component-prefixed). Reuse `.shell`, `.eyebrow`,
   `.section-block`, `.button*` patterns. Match the uppercase-label / Greek-accent
   editorial voice in copy.
5. **Routing:** to add a page — create `src/pages/XPage.jsx`, add id to `PAGES` in
   `constants.js`, import + render in `App.jsx`, add nav entry in `Header.jsx`, add link
   in `Footer.jsx` (uncomment pattern used by disabled pages is the template).
6. **Content changes** usually mean editing `src/data/*.js` or string literals inside
   pages — data files are the preferred single-source-of-truth pattern already in use.
7. **FX integration:** new card/button classes need their selectors added to the
   selector constants at the top of `FxExtras.jsx` (`TILT` for sheen injection,
   `RIPPLE` for click ripples) and `FxLayer.jsx` (`TILT` for 3D hover-tilt, `MAGNET`
   for cursor magnetism) — plus the `:hover > .fx-sheen` rule in styles.css.
   **The lists are not identical:** `FxExtras.TILT` additionally contains
   `.detail-card` and `.award-card`; `FxExtras.RIPPLE` covers `.faq-item>button`,
   `.gallery-filters button`, `.schedule-day-switch button` which `FxLayer.MAGNET`
   lacks; `FxLayer.MAGNET` uniquely covers `.text-link` and `.back-to-top`. Add new
   selectors to whichever effects you want — they are independent lists.
8. **Placeholders to fix when real info arrives:** `REGISTRATION_URL` in constants.js
   (currently `https://forms.gle/YOUR_FORM_ID` — QR code is generated from it
automatically), team member names in `teamGroups.js`, schedule items in
   `SchedulePage.jsx`, prize details in `PrizesPage.jsx`, gallery media in
   `GalleryPage.jsx`, FAQ/prize answers in `ContactPage.jsx`, missing
   `/images/lubhit-dureja.jpg`.
9. **Verify with:** `npm run build` (or `npm run dev`). No test suite, linter, or
   formatter is configured — `npm run build` (vite build) is the only check.
10. **Do NOT** introduce react-router, CSS modules, Tailwind, TypeScript, or a second
    stylesheet unless the user explicitly asks — the single `styles.css` + hash router
    is the architecture.
11. **Copy voice:** labels/buttons/eyebrows are UPPERCASE with wide letter-spacing;
    Greek decorative words pair with romanization via `·` (e.g. `ΓΝΩΘΙ ΣΕΑΥΤΟΝ ·
    KNOW THYSELF`, `epistḗmē · knowledge that can be justified`). In headings, wrap the
    accent phrase in `<em>` (renders gold). Keep copy terse and editorial — the site
    deliberately marks unconfirmed info as "TO BE ANNOUNCED"/"pending" rather than
    inventing details.
12. **Runtime details that affect rewrites:**
    - `<MotionConfig reducedMotion="user">` wraps the whole app — all `motion`
      components already respect the OS reduced-motion setting; don't add manual
      checks except for canvas/DOM effects (FxLayer/FxExtras already guard with
      `matchMedia`).
    - `React.StrictMode` is on — effects must be idempotent (FxExtras correctly
      restores `history.pushState` on cleanup; follow that pattern).
    - The nav **curtain only fires on `navigate()`** (which uses `pushState`). Browser
      back/forward (`popstate`) changes pages WITHOUT the curtain — intentional.
    - The intro splash plays once per browser session (`sessionStorage['vx-intro']`).
    - `Countdown` ticks every 1s via `setInterval`; it derives everything from
      `EVENT_START`/`EVENT_END` — never hardcode dates in components.
    - `REGISTRATION_QR_SRC` is generated dynamically from `REGISTRATION_URL` — updating
      the constant automatically fixes the QR image; no other change needed.

---

## 8. Environment & repo facts

- **Not a git repository** — there is no `.git`; changes can't be diffed/committed
  unless the user initializes git.
- `package-lock.json` exists → `npm install` (or `npm ci`) reproduces the tree.
  `devDependencies` is intentionally empty — `vite` and `@vitejs/plugin-react` live in
  `dependencies`.
- Vite 7 requires **Node.js ^20.19 or >=22.12**.
- `.gitignore` covers `node_modules`, `dist`, `.env`, `.DS_Store`.
- Unused image assets in `public/images/`: `vision-x-figure.png` and
  `greek-research-figure.svg` are **not referenced anywhere** in `src/` or
  `index.html` — safe to delete or use for future sections.
- Content inconsistency to be aware of: a Contact-page FAQ answer says "The Schedule
  page includes a two-day overview" but the Schedule page is currently disabled —
  either re-enable the page or fix the FAQ copy.
- Windows environment; project path contains a space (`VIsion X`) — quote paths in
  shell commands.

---

## 9. How to ask for changes

When chatting with an LLM using this file:
- Upload **`context.md` + the specific file(s)** you want rewritten (paths in §3/§5).
- Describe the change in one sentence; the AI now knows the props, classes, animation
  conventions and routing wiring needed to produce a drop-in correct file.
- If a change spans files (e.g. "add a new page"), mention it — the AI must update all
  wiring points listed in §4/§7.5.
