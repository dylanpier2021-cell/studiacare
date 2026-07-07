"use client";

import { useState } from "react";
import { defineTerm } from "@/data/glossary";

/**
 * Hover-to-define term. Definition shows on hover (desktop) and on tap (mobile).
 * If the word isn't in the glossary, it renders as plain text.
 */
export function Define({ word }: { word: string }) {
  const [open, setOpen] = useState(false);
  const def = defineTerm(word);
  if (!def) return <>{word}</>;

  return (
    <span
      className={`term ${open ? "open" : ""}`}
      tabIndex={0}
      role="button"
      aria-label={`Definition of ${word}`}
      onClick={(e) => {
        e.stopPropagation();
        setOpen((o) => !o);
      }}
      onBlur={() => setOpen(false)}
    >
      {word}
      <span className="tip" role="tooltip">
        {def}
      </span>
    </span>
  );
}

/**
 * Renders text with [bracketed] terms turned into hover-to-define tooltips.
 * Example: "Position the client [supine] before the scan."
 */
export function RichText({ text }: { text: string }) {
  const parts = text.split(/(\[[^\]]+\])/g);
  return (
    <>
      {parts.map((part, i) => {
        const m = part.match(/^\[([^\]]+)\]$/);
        if (m) return <Define key={i} word={m[1]} />;
        return <span key={i}>{part}</span>;
      })}
    </>
  );
}
