"use client";

import { useEffect, useId, useState } from "react";

/**
 * Circular progress ring with the number in the center — the signature
 * "match %" element. Gradient stroke, animates on mount.
 */
export function ProgressRing({
  value,
  size = 132,
  stroke = 11,
  centerTop,
  centerLabel,
  className = "",
  trackClass = "",
}: {
  /** 0–100 */
  value: number;
  size?: number;
  stroke?: number;
  /** big text in the center (defaults to `${value}%`) */
  centerTop?: React.ReactNode;
  /** small label under the number */
  centerLabel?: React.ReactNode;
  className?: string;
  trackClass?: string;
}) {
  const uid = useId().replace(/:/g, "");
  const r = (size - stroke) / 2;
  const circ = 2 * Math.PI * r;
  const clamped = Math.max(0, Math.min(100, value));
  const [shown, setShown] = useState(0);

  useEffect(() => {
    const t = setTimeout(() => setShown(clamped), 120);
    return () => clearTimeout(t);
  }, [clamped]);

  const offset = circ - (shown / 100) * circ;

  return (
    <div
      className={`relative inline-flex items-center justify-center ${className}`}
      style={{ width: size, height: size }}
    >
      <svg width={size} height={size} className="-rotate-90">
        <defs>
          <linearGradient id={`grad-${uid}`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="var(--brand)" />
            <stop offset="100%" stopColor="var(--brand2)" />
          </linearGradient>
        </defs>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          strokeWidth={stroke}
          className={`stroke-line ${trackClass}`}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke={`url(#grad-${uid})`}
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={circ}
          strokeDashoffset={offset}
          style={{ transition: "stroke-dashoffset 1s cubic-bezier(0.22,1,0.36,1)" }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
        <span className="font-display font-extrabold leading-none" style={{ fontSize: size * 0.26 }}>
          {centerTop ?? `${Math.round(clamped)}%`}
        </span>
        {centerLabel && (
          <span className="text-ink-faint mt-1" style={{ fontSize: size * 0.09 }}>
            {centerLabel}
          </span>
        )}
      </div>
    </div>
  );
}
