"use client";

import Link from "next/link";
import { AppShell } from "@/components/AppShell";
import { CHAPTERS } from "@/data/chapters";
import { questionsForChapters } from "@/data/questions";
import { FLASHCARDS } from "@/data/flashcards";
import { useApp } from "@/lib/store";
import { ProgressRing } from "@/components/ProgressRing";
import { IconCheck, IconArrow } from "@/components/Icons";

export default function ChaptersPage() {
  return (
    <AppShell>
      <ChaptersView />
    </AppShell>
  );
}

function ChaptersView() {
  const { progress } = useApp();
  return (
    <div className="max-w-wrap mx-auto px-5 py-8">
      <h1 className="text-3xl sm:text-4xl font-extrabold mb-1">Chapters</h1>
      <p className="text-ink-soft mb-7">
        Work through each subject: read, watch, train your reading speed, and take the chapter quiz.
      </p>
      <div className="grid gap-4 sm:grid-cols-2">
        {CHAPTERS.map((c) => {
          const count = questionsForChapters([c.slug]).length;
          const hasCards = FLASHCARDS.some((f) => f.chapter === c.slug);
          const best = progress.chapterScores[c.slug];
          const started = best != null;
          return (
            <Link
              key={c.slug}
              href={`/chapters/${c.slug}`}
              className="card glow-hover p-6 flex flex-col"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h2 className="font-bold text-lg leading-tight">{c.title}</h2>
                  <p className="text-xs text-ink-faint mt-1">
                    {count} questions · lesson video
                  </p>
                </div>
                <span className="w-9 h-9 rounded-full bg-soft flex items-center justify-center text-ink-soft shrink-0">
                  <IconArrow className="w-4 h-4 -rotate-45" />
                </span>
              </div>

              <div className="flex items-center gap-5 mt-5">
                <ProgressRing
                  value={best ?? 0}
                  size={108}
                  stroke={9}
                  centerTop={started ? undefined : "—"}
                  centerLabel={started ? (best >= 70 ? "strong" : "good") : "not started"}
                />
                <ul className="text-sm text-ink-soft space-y-2">
                  {["Timed quiz", "Rationales", hasCards ? "Flashcards" : "Reading trainer"].map(
                    (f) => (
                      <li key={f} className="flex items-center gap-2">
                        <IconCheck className="w-4 h-4 text-good shrink-0" />
                        {f}
                      </li>
                    )
                  )}
                </ul>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
