// Hero atrofidagi qo'lda chizilgan uslubdagi bezaklar (original SVG)
const S = { fill: 'none', strokeLinecap: 'round', strokeLinejoin: 'round' }

export const Lightning = ({ className, color = '#f04848' }) => (
  <svg viewBox="0 0 80 120" className={className} aria-hidden="true">
    <path d="M8 6 46 70 30 66 72 114" stroke={color} strokeWidth="5" {...S} />
  </svg>
)

export const Zigzag = ({ className, color = '#8b5cf6' }) => (
  <svg viewBox="0 0 110 130" className={className} aria-hidden="true">
    <path d="M6 70 28 52 40 78 82 8 70 70 104 122" stroke={color} strokeWidth="5" {...S} />
  </svg>
)

export const Squiggle = ({ className, color = '#f5a524' }) => (
  <svg viewBox="0 0 200 60" className={className} aria-hidden="true">
    <path d="M4 44c30 6 58 4 76-8 12-8 14-26 4-28-12-2-14 22-2 30 22 14 64 2 104-24" stroke={color} strokeWidth="2.6" {...S} />
    <path d="M176 6l10 8-12 4" stroke={color} strokeWidth="2.6" {...S} />
  </svg>
)

export const Burst = ({ className, color = '#f04848' }) => (
  <svg viewBox="0 0 110 80" className={className} aria-hidden="true">
    <g stroke={color} strokeWidth="2.6" {...S}>
      <path d="M40 70c4-20 14-34 30-40" />
      <path d="M30 40c10-4 18-2 26 4" />
      <path d="M52 8c0 12 4 22 12 30" />
      <path d="M78 34c8-6 18-8 26-6" />
      <path d="M84 52c6 0 12 2 18 6" />
    </g>
  </svg>
)

export const Arrows = ({ className, color = '#f5a524' }) => (
  <svg viewBox="0 0 140 100" className={className} aria-hidden="true">
    <g stroke={color} strokeWidth="2.6" {...S}>
      <path d="M30 96 14 18" />
      <path d="M14 18c20 6 40 20 52 40" />
      <path d="M14 18c40-2 80-10 120-16" />
      <path d="M10 34 14 18l14 6" />
    </g>
  </svg>
)

export const Smile = ({ className }) => (
  <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
    <circle cx="32" cy="32" r="30" fill="#8cd23c" />
    <path d="M18 30c2 10 10 16 20 14 6-1 10-6 10-12" stroke="#fff" strokeWidth="4" {...S} />
    <path d="M22 20l2 8M32 16l1 8" stroke="#fff" strokeWidth="4" {...S} />
  </svg>
)

export const Bubble = ({ className, text = ['Har kun', 'yangi', 'qadam'] }) => (
  <svg viewBox="0 0 90 90" className={className} aria-hidden="true">
    <path d="M14 10h60c8 0 12 4 12 12v34c0 8-4 12-12 12H34L14 84l4-16c-8 0-12-4-12-12V22c0-8 4-12 8-12Z" fill="#f04848" transform="rotate(-8 45 45)" />
    <g fill="#fff" fontFamily="Nunito, sans-serif" fontSize={text.some((l) => l.length > 7) ? 9.5 : 11} fontWeight="700" transform="rotate(-14 45 40)">
      {text.map((l, i) => (
        <text key={l} x="18" y={32 + i * 13}>
          {l}
        </text>
      ))}
    </g>
  </svg>
)

// Chiziqli personaj + yozuv
export const Figure = ({ className, color = '#3a1b78', lines = [], prop = 'rocket', flip = false }) => (
  <svg viewBox="0 0 180 130" className={className} aria-hidden="true">
    <g transform={flip ? 'translate(180 0) scale(-1 1)' : undefined} stroke={color} strokeWidth="2.4" {...S}>
      {/* bosh */}
      <circle cx="46" cy="26" r="13" fill="#fff" />
      <path d="M34 20c4-10 18-12 24-4 2-6 8-6 10-2" />
      <circle cx="42" cy="27" r="1.2" fill={color} />
      <circle cx="51" cy="27" r="1.2" fill={color} />
      <path d="M43 33c2 2 5 2 7 0" />
      {/* tana */}
      <path d="M40 40c-8 10-10 24-8 36h26c2-12 0-26-8-36" fill="#fff" />
      <path d="M36 52 18 64M54 50l18-10" />
      {/* oyoqlar */}
      <path d="M38 76 26 104l-12 2M52 76l14 24 12-2" />
      {prop === 'rocket' && (
        <g>
          <rect x="70" y="18" width="34" height="28" rx="3" fill="#fff" transform="rotate(10 87 32)" />
          <path d="M82 40c2-10 8-16 16-18-2 8-8 14-16 18Z" />
          <path d="M84 38l-4 4" />
        </g>
      )}
      {prop === 'scope' && <path d="M58 40 92 22l4 8-34 16Z" fill="#fff" />}
      {prop === 'brush' && <path d="M70 40 84 8M82 4l6 4-4 6" />}
      {prop === 'thumb' && <path d="M72 40v-8c0-4 6-4 6 0v6h6c3 0 4 3 3 5l-2 6c-1 2-3 3-5 3h-8Z" fill="#fff" />}
    </g>
    <g fill={color} fontFamily="Montserrat, Nunito, sans-serif" fontWeight="800" fontSize={lines.some((l) => l.length > 9) ? 11.5 : 13}>
      {lines.map((l, i) => (
        <text key={l} x={flip ? 2 : 88} y={62 + i * 15} textAnchor="start">
          {l}
        </text>
      ))}
    </g>
  </svg>
)
