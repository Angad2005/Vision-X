import React from 'react';

export default function MeanderDivider({ glyph = 'Φ', label }) {
  const id = React.useId().replace(/:/g, '');
  return (
    <div className="meander-divider shell" aria-hidden="true">
      <svg className="meander-line" height="14" width="100%" preserveAspectRatio="none">
        <defs>
          <pattern id={`mea-${id}`} width="28" height="14" patternUnits="userSpaceOnUse">
            <path d="M1 13V1H27V13H9V5H19V9H14" fill="none" stroke="currentColor" strokeWidth="1.2" />
          </pattern>
        </defs>
        <rect width="100%" height="14" fill={`url(#mea-${id})`} />
      </svg>
      <span className="meander-glyph">
        <b>{glyph}</b>
        {label && <small>{label}</small>}
      </span>
      <svg className="meander-line" height="14" width="100%" preserveAspectRatio="none">
        <rect width="100%" height="14" fill={`url(#mea-${id})`} />
      </svg>
    </div>
  );
}