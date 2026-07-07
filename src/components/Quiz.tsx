"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import type { Question } from "@/lib/types";
import { useApp } from "@/lib/store";
import { chapterTitle } from "@/data/chapters";
import { RichText } from "./Define";
import { Paywall } from "./Paywall";
import { IconClock, IconCheck } from "./Icons";

function fmt(s: number) {
  const m = Math.max(0, s);
  return (
    String(Math.floor(m / 60)).padStart(2, "0") + ":" + String(m % 60).padStart(2, "0")
  );
}

interface QuizProps {
  questions: Question[];
  /** total time budget in seconds */
  seconds: number;
  label: string;
  chapter: string | "mixed";
  /** where "Done" sends the user */
  backHref?: string;
}

type AnswerRec = { q: Question; chosen: number; correct: boolean };

export function Quiz({ questions, seconds, label, chapter, backHref = "/dashboard" }: QuizProps) {
  const { user, freeRemaining, recordAttempt } = useApp();

  // Free-tier gate: cap the quiz to the user's remaining free questions.
  const effective = useMemo(() => {
    if (!user || user.tier !== "free") return questions;
    return questions.slice(0, freeRemaining);
  }, [questions, user, freeRemaining]);

  const [idx, setIdx] = useState(0);
  const [chosen, setChosen] = useState<number | null>(null);
  const [answers, setAnswers] = useState<AnswerRec[]>([]);
  const [done, setDone] = useState(false);
  const [timeLeft, setTimeLeft] = useState(seconds);
  const recorded = useRef(false);

  const q = effective[idx];

  // countdown
  useEffect(() => {
    if (done || effective.length === 0) return;
    const t = setInterval(() => {
      setTimeLeft((s) => {
        if (s <= 1) {
          clearInterval(t);
          finish(answers);
          return 0;
        }
        return s - 1;
      });
    }, 1000);
    return () => clearInterval(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [done, effective.length]);

  function finish(final: AnswerRec[]) {
    if (recorded.current) return;
    recorded.current = true;
    const byChapter: Record<string, { correct: number; total: number }> = {};
    let score = 0;
    for (const a of final) {
      byChapter[a.q.chapter] ??= { correct: 0, total: 0 };
      byChapter[a.q.chapter].total++;
      if (a.correct) {
        byChapter[a.q.chapter].correct++;
        score++;
      }
    }
    if (final.length > 0) {
      recordAttempt({ label, chapter, score, total: final.length, byChapter });
    }
    setDone(true);
  }

  function pick(i: number) {
    if (chosen !== null) return;
    setChosen(i);
    setAnswers((a) => [...a, { q, chosen: i, correct: i === q.correct }]);
  }

  function next() {
    if (idx === effective.length - 1) {
      finish(answers);
    } else {
      setIdx((i) => i + 1);
      setChosen(null);
    }
  }

  // Free user with nothing left → straight to paywall.
  if (effective.length === 0) {
    return (
      <div className="max-w-wrap mx-auto px-5 py-10">
        <Paywall />
      </div>
    );
  }

  if (done) {
    return <Results answers={answers} label={label} backHref={backHref} userTierFree={user?.tier === "free"} />;
  }

  const low = timeLeft <= 60;
  const progress = (idx / effective.length) * 100;

  return (
    <div className="max-w-2xl mx-auto px-5 py-6 sm:py-10">
      {user?.tier === "free" && (
        <p className="text-xs text-ink-faint mb-3 text-center">
          Free preview · {freeRemaining} of your {" "}
          {/* remaining free questions */}free questions in play
        </p>
      )}
      <div className="flex justify-between items-center mb-4 gap-3 flex-wrap">
        <div>
          <span className="pill">{label}</span>
        </div>
        <span
          className={`tabular font-extrabold px-4 py-2 rounded-full bg-soft inline-flex items-center gap-1.5 ${
            low ? "text-bad" : ""
          }`}
          aria-live="polite"
        >
          <IconClock className="w-4 h-4" /> {fmt(timeLeft)}
        </span>
      </div>

      <div className="h-2 rounded-full bg-soft overflow-hidden mb-5">
        <div className="h-full bg-brand transition-all" style={{ width: `${progress}%` }} />
      </div>

      <p className="text-sm font-semibold text-ink-soft mb-1">
        Question {idx + 1} of {effective.length}
      </p>
      <p className="text-lg font-bold mb-5 leading-snug">
        <RichText text={q.prompt} />
      </p>

      <div className="grid gap-2.5">
        {q.options.map((opt, i) => {
          const isCorrect = chosen !== null && i === q.correct;
          const isWrong = chosen === i && i !== q.correct;
          return (
            <button
              key={i}
              onClick={() => pick(i)}
              disabled={chosen !== null}
              className={`text-left px-4 py-3.5 rounded-xl border-2 bg-card transition-colors ${
                isCorrect
                  ? "border-good"
                  : isWrong
                    ? "border-bad"
                    : "border-line hover:border-brand"
              } ${chosen !== null ? "cursor-default" : "cursor-pointer"}`}
            >
              {opt}
            </button>
          );
        })}
      </div>

      {chosen !== null && (
        <div className="mt-4 p-4 rounded-xl bg-soft text-[0.95rem]">
          <b className={chosen === q.correct ? "text-good" : "text-bad"}>
            {chosen === q.correct ? "Correct!" : "Not quite."}
          </b>{" "}
          <RichText text={q.rationale} />
        </div>
      )}

      <div className="mt-5 flex justify-end">
        {chosen !== null && (
          <button onClick={next} className="btn btn-primary">
            {idx === effective.length - 1 ? "See my results →" : "Next question →"}
          </button>
        )}
      </div>
    </div>
  );
}

function Results({
  answers,
  label,
  backHref,
  userTierFree,
}: {
  answers: AnswerRec[];
  label: string;
  backHref: string;
  userTierFree: boolean;
}) {
  const { freeRemaining } = useApp();
  const total = answers.length;
  const score = answers.filter((a) => a.correct).length;
  const pct = total ? Math.round((score / total) * 100) : 0;

  // per-topic tally → weak areas
  const byChapter: Record<string, { correct: number; total: number }> = {};
  for (const a of answers) {
    byChapter[a.q.chapter] ??= { correct: 0, total: 0 };
    byChapter[a.q.chapter].total++;
    if (a.correct) byChapter[a.q.chapter].correct++;
  }
  const topics = Object.entries(byChapter).map(([slug, t]) => ({
    slug,
    pct: Math.round((t.correct / t.total) * 100),
    ...t,
  }));
  const weak = topics.filter((t) => t.pct < 70);

  return (
    <div className="max-w-2xl mx-auto px-5 py-8 sm:py-12">
      <div className="text-center">
        <span className="pill">{label} · Results</span>
        <p className="text-ink-soft font-semibold mt-4">Your score</p>
        <div className="text-5xl font-extrabold text-brand my-1">
          {score}/{total}
        </div>
        <p className="text-ink-soft">{pct}% correct</p>
        <p className="text-ink-soft max-w-md mx-auto mt-3">
          {pct === 100
            ? "Perfect — you'd walk into the real thing ready."
            : pct >= 70
              ? "Solid. The rationales below show exactly what to lock in."
              : "Good practice — every miss here is one you won't make on exam day."}
        </p>
      </div>

      {/* per-topic feedback */}
      <div className="card p-5 mt-8">
        <h3 className="font-bold mb-3">How you did by topic</h3>
        <div className="space-y-3">
          {topics.map((t) => (
            <div key={t.slug} className="flex items-center gap-3">
              <span className="text-sm min-w-0 flex-1 truncate">{chapterTitle(t.slug)}</span>
              <div className="w-24 h-2 bg-soft rounded-full overflow-hidden">
                <div
                  className={`h-full ${t.pct < 70 ? "bg-bad" : "bg-good"}`}
                  style={{ width: `${t.pct}%` }}
                />
              </div>
              <b className="text-sm text-ink-soft w-10 text-right">{t.pct}%</b>
            </div>
          ))}
        </div>
        {weak.length > 0 && (
          <p className="text-sm text-ink-soft mt-4">
            <b>Focus next on:</b> {weak.map((w) => chapterTitle(w.slug)).join(", ")}.
          </p>
        )}
      </div>

      {/* every question reviewed */}
      <div className="mt-6 space-y-2.5">
        <h3 className="font-bold">Review every answer</h3>
        {answers.map((a, n) => (
          <div
            key={n}
            className={`p-4 rounded-xl border border-line text-sm ${
              a.correct ? "border-l-4 border-l-good" : "border-l-4 border-l-bad"
            }`}
          >
            <p className="font-semibold mb-1 inline-flex items-center gap-1.5">
              Q{n + 1} —{" "}
              {a.correct ? (
                <span className="inline-flex items-center gap-1 text-good">
                  <IconCheck className="w-4 h-4" /> Correct
                </span>
              ) : (
                <span className="text-bad">Missed</span>
              )}
            </p>
            <p className="text-ink-soft">
              <RichText text={a.q.rationale} />
            </p>
          </div>
        ))}
      </div>

      {userTierFree && freeRemaining === 0 && (
        <div className="mt-8">
          <Paywall />
        </div>
      )}

      <div className="mt-8 flex flex-wrap gap-3 justify-center">
        <Link href={backHref} className="btn btn-ghost">
          Back
        </Link>
        <Link href="/quiz/setup" className="btn btn-primary">
          New quiz
        </Link>
      </div>
    </div>
  );
}
