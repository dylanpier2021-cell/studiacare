"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AppShell } from "@/components/AppShell";
import { useApp } from "@/lib/store";
import { CHAPTERS } from "@/data/chapters";
import { questionsForChapters } from "@/data/questions";
import { hasAdvanced } from "@/lib/config";
import { IconLayers, IconClock } from "@/components/Icons";

export default function QuizSetupPage() {
  return (
    <AppShell>
      <QuizSetup />
    </AppShell>
  );
}

function QuizSetup() {
  const router = useRouter();
  const { user, progress } = useApp();
  const [selected, setSelected] = useState<string[]>([]);
  const [length, setLength] = useState(10);

  const weakChapters = useMemo(
    () =>
      Object.entries(progress.chapterScores)
        .filter(([, pct]) => pct < 70)
        .map(([slug]) => slug),
    [progress.chapterScores]
  );

  const available = useMemo(
    () => questionsForChapters(selected.length ? selected : CHAPTERS.map((c) => c.slug)).length,
    [selected]
  );

  function toggle(slug: string) {
    setSelected((s) => (s.includes(slug) ? s.filter((x) => x !== slug) : [...s, slug]));
  }

  function start() {
    const topics = selected.length ? selected : CHAPTERS.map((c) => c.slug);
    router.push(`/quiz?topics=${topics.join(",")}&count=${length}`);
  }

  return (
    <div className="max-w-2xl mx-auto px-5 py-8">
      <h1 className="text-3xl font-extrabold mb-1">Build your quiz</h1>
      <p className="text-ink-soft mb-6">
        Pick the chapters you want to drill so you spend time on what challenges you — not what you
        already know.
      </p>

      {/* Quick launchers */}
      <div className="grid gap-3 sm:grid-cols-2 mb-8">
        <Link href="/quiz?bank=1" className="card glow-hover p-5">
          <div className="w-10 h-10 rounded-lg flex items-center justify-center text-white mb-2 bg-gradient-to-br from-brand to-[color:var(--brand2)]">
            <IconLayers className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-sm">Full conditioning quiz</h3>
          <p className="text-xs text-ink-soft mt-1">Every chapter, timed. Build your stamina.</p>
        </Link>
        <Link href="/quiz?mode=mock&bank=1" className="card glow-hover p-5 relative">
          <div className="w-10 h-10 rounded-lg flex items-center justify-center text-white mb-2 bg-gradient-to-br from-brand to-[color:var(--brand2)]">
            <IconClock className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-sm">
            Mock exam {user && !hasAdvanced(user.tier) && <span className="pill ml-1">Advanced</span>}
          </h3>
          <p className="text-xs text-ink-soft mt-1">Full-length, exam-day simulation.</p>
        </Link>
      </div>

      {/* Chapter picker */}
      <div className="card p-6">
        <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
          <h2 className="font-bold">Choose chapters</h2>
          {weakChapters.length > 0 && (
            <button
              onClick={() => setSelected(weakChapters)}
              className="text-sm text-brand font-semibold"
            >
              Focus on my weak areas ({weakChapters.length})
            </button>
          )}
        </div>
        <div className="grid sm:grid-cols-2 gap-2.5">
          {CHAPTERS.map((c) => {
            const on = selected.includes(c.slug);
            const score = progress.chapterScores[c.slug];
            return (
              <button
                key={c.slug}
                onClick={() => toggle(c.slug)}
                className={`text-left px-4 py-3 rounded-xl border-2 transition-colors ${
                  on ? "border-brand bg-brand-soft" : "border-line hover:border-brand"
                }`}
              >
                <span className="font-semibold text-sm block">{c.title}</span>
                <span className="text-xs text-ink-faint">
                  {score != null ? `Best: ${score}%` : "Not started"}
                </span>
              </button>
            );
          })}
        </div>
        <p className="text-xs text-ink-faint mt-3">
          {selected.length === 0
            ? "Nothing selected = all chapters."
            : `${selected.length} selected`}{" "}
          · {available} sample questions available
        </p>
      </div>

      {/* Length */}
      <div className="card p-6 mt-4">
        <label className="label">How many questions?</label>
        <div className="flex gap-2 flex-wrap">
          {[5, 10, 25, 50].map((n) => (
            <button
              key={n}
              onClick={() => setLength(n)}
              className={`px-4 py-2 rounded-full border-2 font-semibold text-sm ${
                length === n ? "border-brand bg-brand-soft" : "border-line"
              }`}
            >
              {n}
            </button>
          ))}
        </div>
        <p className="text-xs text-ink-faint mt-2">
          The quiz caps at however many sample questions exist today. The full bank is coming from
          the client.
        </p>
      </div>

      <button onClick={start} className="btn btn-primary w-full mt-6">
        Start timed quiz →
      </button>
    </div>
  );
}
