import { useMemo } from 'react';
import { SYMBOLS } from '../../utils/constants';

export default function FloatingSymbols({ count = 8 }) {
  const items = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        char: SYMBOLS[(i * 5 + 2) % SYMBOLS.length],
        left: `${(i * 37 + 8) % 92}%`,
        top: `${(i * 53 + 12) % 82}%`,
        size: 20 + ((i * 13) % 30),
        dur: 14 + ((i * 7) % 12),
        delay: -((i * 3) % 10),
      })),
    [count]
  );
  return (
    <div className="floating-symbols" aria-hidden="true">
      {items.map((it, i) => (
        <span
          key={i}
          style={{
            left: it.left,
            top: it.top,
            fontSize: it.size,
            animationDuration: `${it.dur}s`,
            animationDelay: `${it.delay}s`,
          }}
        >
          {it.char}
        </span>
      ))}
    </div>
  );
}