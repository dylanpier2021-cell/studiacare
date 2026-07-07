"use client";

import { useState } from "react";
import type { Flashcard } from "@/lib/types";
import { RichText } from "./Define";

/** Flip-card deck. Tap the card to flip. */
export function Flashcards({ cards }: { cards: Flashcard[] }) {
  const [i, setI] = useState(0);
  const [flipped, setFlipped] = useState(false);

  if (cards.length === 0) {
    return <p className="text-ink-soft text-center py-10">No flashcards in this chapter yet.</p>;
  }

  const card = cards[i];
  function go(delta: number) {
    setFlipped(false);
    setI((v) => (v + delta + cards.length) % cards.length);
  }

  return (
    <div className="fc-stage max-w-md mx-auto">
      <div
        className={`fc ${flipped ? "flipped" : ""}`}
        onClick={() => setFlipped((f) => !f)}
        role="button"
        tabIndex={0}
        aria-label="Flip flashcard"
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") setFlipped((f) => !f);
        }}
      >
        <div className="fc-face card font-bold text-lg">
          <span>
            <RichText text={card.front} />
          </span>
        </div>
        <div className="fc-face fc-back bg-brand text-white font-semibold">
          <span>
            <RichText text={card.back} />
          </span>
        </div>
      </div>
      <p className="text-center text-ink-faint text-sm mt-3">Tap the card to flip it</p>
      <div className="flex justify-center items-center gap-3 mt-4">
        <button onClick={() => go(-1)} className="btn btn-ghost btn-sm">
          ← Back
        </button>
        <span className="font-bold text-ink-faint">
          {i + 1} / {cards.length}
        </span>
        <button onClick={() => go(1)} className="btn btn-primary btn-sm">
          Next →
        </button>
      </div>
    </div>
  );
}
