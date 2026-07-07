"use client";

import Link from "next/link";
import { AppShell } from "@/components/AppShell";
import { CHAPTERS } from "@/data/chapters";
import { questionsForChapters } from "@/data/questions";
import { useApp } from "@/lib/store";

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
      <h1 className="text-3xl font-extrabold mb-1">Chapters</h1>
      <p className="text-ink-soft mb-6">
        Work through each subject: read, watch, train your reading speed, and take the chapter quiz.
      </p>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {CHAPTERS.map((c) => {
          const count = questionsForChapters([c.slug]).length;
          const best = progress.chapterScores[c.slug];
          return (
            <Link
              key={c.slug}
              href={`/chapters/${c.slug}`}
              className="card p-6 hover:border-brand transition-colors flex flex-col"
            >
              <h2 className="font-bold mb-1">{c.title}</h2>
              <p className="text-sm text-ink-soft flex-1">{c.blurb}</p>
              <div className="flex items-center justify-between mt-4 text-xs">
                <span className="text-ink-faint">{count} sample questions</span>
                {best != null ? (
                  <span className="pill">Best {best}%</span>
                ) : (
                  <span className="text-ink-faint">Not started</span>
                )}
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
