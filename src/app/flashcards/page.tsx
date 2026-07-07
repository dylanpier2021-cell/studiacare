"use client";

import { useMemo, useState } from "react";
import { AppShell } from "@/components/AppShell";
import { Flashcards } from "@/components/Flashcards";
import { FLASHCARDS } from "@/data/flashcards";
import { CHAPTERS } from "@/data/chapters";

export default function FlashcardsPage() {
  return (
    <AppShell>
      <FlashcardsView />
    </AppShell>
  );
}

function FlashcardsView() {
  const [chapter, setChapter] = useState<string>("all");
  const cards = useMemo(
    () => (chapter === "all" ? FLASHCARDS : FLASHCARDS.filter((c) => c.chapter === chapter)),
    [chapter]
  );
  // Only show chapters that actually have cards in the seed set.
  const withCards = CHAPTERS.filter((c) => FLASHCARDS.some((f) => f.chapter === c.slug));

  return (
    <div className="max-w-2xl mx-auto px-5 py-8">
      <h1 className="text-3xl font-extrabold mb-1">Flashcards</h1>
      <p className="text-ink-soft mb-6">Flip through key facts. Organized by chapter.</p>

      <div className="flex gap-2 flex-wrap mb-6">
        <button
          onClick={() => setChapter("all")}
          className={`px-4 py-2 rounded-full text-sm font-semibold border-2 ${
            chapter === "all" ? "border-brand bg-brand-soft" : "border-line"
          }`}
        >
          All
        </button>
        {withCards.map((c) => (
          <button
            key={c.slug}
            onClick={() => setChapter(c.slug)}
            className={`px-4 py-2 rounded-full text-sm font-semibold border-2 ${
              chapter === c.slug ? "border-brand bg-brand-soft" : "border-line"
            }`}
          >
            {c.title}
          </button>
        ))}
      </div>

      <Flashcards key={chapter} cards={cards} />
    </div>
  );
}
