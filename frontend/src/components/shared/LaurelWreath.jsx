export default function LaurelWreath() {
  const leaves = Array.from({ length: 9 }, (_, i) => i);
  return (
    <svg className="laurel-wreath" viewBox="0 0 200 200" aria-hidden="true">
      {[1, -1].map((dir) => (
        <g
          key={dir}
          transform={dir === -1 ? 'translate(200 0) scale(-1 1)' : undefined}
          fill="none"
          stroke="currentColor"
          strokeWidth="1.1"
        >
          <path d="M100 178C52 168 26 132 26 92C26 62 40 38 62 24" />
          {leaves.map((i) => {
            const t = i / 8;
            const x = 100 - 74 * Math.sin(t * 1.35);
            const y = 178 - 154 * t;
            return (
              <ellipse
                key={i}
                cx={x - 8}
                cy={y}
                rx="11"
                ry="4.6"
                transform={`rotate(${-30 - t * 40} ${x - 8} ${y})`}
              />
            );
          })}
        </g>
      ))}
    </svg>
  );
}