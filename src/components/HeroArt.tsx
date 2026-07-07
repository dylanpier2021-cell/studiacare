/**
 * Hero illustration: stethoscope + glucose meter, drawn in the brand color.
 * Sets the "exam room / clinical" tone the client asked for — serious, calm,
 * no cartoon, no photo of her face.
 */
export function HeroArt({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 320 320"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={className}
    >
      <circle cx="160" cy="160" r="150" fill="var(--brand-soft)" />
      {/* stethoscope */}
      <path
        d="M95 55v85a55 55 0 0 0 110 0V55"
        stroke="var(--brand)"
        strokeWidth="12"
        strokeLinecap="round"
      />
      <path d="M80 55h30M180 55h30" stroke="var(--brand)" strokeWidth="12" strokeLinecap="round" />
      <path
        d="M150 195v22a45 45 0 0 0 45 45h20"
        stroke="var(--brand)"
        strokeWidth="12"
        strokeLinecap="round"
      />
      <circle cx="245" cy="262" r="24" stroke="var(--brand)" strokeWidth="12" />
      <circle cx="245" cy="262" r="7" fill="var(--brand)" />
      {/* glucose meter */}
      <rect x="40" y="215" width="66" height="88" rx="12" fill="var(--bg-card)" stroke="var(--brand)" strokeWidth="6" />
      <rect x="52" y="230" width="42" height="26" rx="5" fill="var(--brand-soft)" stroke="var(--brand)" strokeWidth="4" />
      <text
        x="73"
        y="249"
        textAnchor="middle"
        fontSize="15"
        fontWeight="800"
        fill="var(--brand-dark)"
        fontFamily="sans-serif"
      >
        98
      </text>
      <circle cx="61" cy="272" r="5" fill="var(--brand)" />
      <circle cx="79" cy="272" r="5" fill="var(--brand)" />
      <circle cx="97" cy="272" r="5" fill="var(--brand)" />
    </svg>
  );
}
