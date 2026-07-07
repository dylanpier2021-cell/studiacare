"use client";

import { useState } from "react";
import { QUESTIONS } from "@/data/questions";
import { FLASHCARDS } from "@/data/flashcards";
import { PASSAGES } from "@/data/passages";
import { RichText } from "./Define";
import { Flashcards } from "./Flashcards";
import { ReadingTrainer } from "./ReadingTrainer";

const TABS = ["Practice", "Flashcards", "Reading Trainer"] as const;
type Tab = (typeof TABS)[number];

const DEMO_Q = QUESTIONS.slice(0, 5);

/** Public, no-login demo that lives on the landing page. */
export function LandingDemo() {
  const [tab, setTab] = useState<Tab>("Practice");
  return (
    <div className="card overflow-hidden">
      <div className="bg-brand text-white px-5 py-4 flex items-center justify-between flex-wrap gap-3">
        <span className="font-extrabold">StudiaCare Study Room</span>
        <div className="flex gap-1.5 flex-wrap">
          {TABS.map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-4 py-1.5 rounded-full text-sm font-semibold ${
                tab === t ? "bg-white text-brand-dark" : "bg-white/20 text-white"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>
      <div className="p-5 sm:p-6 min-h-[380px]">
        {tab === "Practice" && <DemoQuiz />}
        {tab === "Flashcards" && <Flashcards cards={FLASHCARDS.slice(0, 6)} />}
        {tab === "Reading Trainer" && (
          <>
            <p className="text-ink-soft text-sm mb-4">
              Read before the words disappear. Train your eyes to move at exam speed so long
              questions never eat your clock.
            </p>
            <ReadingTrainer text={PASSAGES[0].text} />
          </>
        )}
      </div>
    </div>
  );
}

function DemoQuiz() {
  const [i, setI] = useState(0);
  const [chosen, setChosen] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);
  const q = DEMO_Q[i];

  function pick(n: number) {
    if (chosen !== null) return;
    setChosen(n);
    if (n === q.correct) setScore((s) => s + 1);
  }
  function next() {
    if (i === DEMO_Q.length - 1) setDone(true);
    else {
      setI((v) => v + 1);
      setChosen(null);
    }
  }
  function restart() {
    setI(0);
    setChosen(null);
    setScore(0);
    setDone(false);
  }

  if (done) {
    return (
      <div className="text-center py-6">
        <p className="text-ink-soft font-semibold">Your score</p>
        <div className="text-5xl font-extrabold text-brand my-1">
          {score}/{DEMO_Q.length}
        </div>
        <p className="text-ink-soft max-w-sm mx-auto mt-2">
          That's a taste. The full app has 100+ timed questions across every chapter — with your
          progress saved.
        </p>
        <button onClick={restart} className="btn btn-primary mt-5">
          Try again
        </button>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-3">
        <span className="text-sm font-semibold text-ink-soft">
          Question {i + 1} of {DEMO_Q.length}
        </span>
        <span className="tabular font-bold bg-soft px-3 py-1.5 rounded-full text-sm">⏱ 05:00</span>
      </div>
      <p className="text-lg font-bold mb-4 leading-snug">
        <RichText text={q.prompt} />
      </p>
      <div className="grid gap-2.5">
        {q.options.map((opt, n) => {
          const isCorrect = chosen !== null && n === q.correct;
          const isWrong = chosen === n && n !== q.correct;
          return (
            <button
              key={n}
              onClick={() => pick(n)}
              disabled={chosen !== null}
              className={`text-left px-4 py-3 rounded-xl border-2 bg-card ${
                isCorrect ? "border-good" : isWrong ? "border-bad" : "border-line hover:border-brand"
              }`}
            >
              {opt}
            </button>
          );
        })}
      </div>
      {chosen !== null && (
        <div className="mt-4 p-4 rounded-xl bg-soft text-sm">
          <b className={chosen === q.correct ? "text-good" : "text-bad"}>
            {chosen === q.correct ? "Correct!" : "Not quite."}
          </b>{" "}
          <RichText text={q.rationale} />
        </div>
      )}
      {chosen !== null && (
        <div className="mt-4 flex justify-end">
          <button onClick={next} className="btn btn-primary">
            {i === DEMO_Q.length - 1 ? "See score →" : "Next →"}
          </button>
        </div>
      )}
    </div>
  );
}
