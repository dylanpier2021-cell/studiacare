"use client";

import { Suspense, useMemo } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { AppShell } from "@/components/AppShell";
import { Quiz } from "@/components/Quiz";
import { useApp } from "@/lib/store";
import { questionsForChapters, shuffle } from "@/data/questions";
import { chapterTitle } from "@/data/chapters";
import { hasAdvanced } from "@/lib/config";

export default function QuizPage() {
  return (
    <AppShell>
      <Suspense fallback={<div className="p-10 text-center text-ink-faint">Loading quiz…</div>}>
        <QuizRunner />
      </Suspense>
    </AppShell>
  );
}

function QuizRunner() {
  const params = useSearchParams();
  const { user } = useApp();

  const bank = (params.get("bank") === "2" ? 2 : params.get("bank") === "1" ? 1 : undefined) as
    | 1
    | 2
    | undefined;
  const chapter = params.get("chapter") ?? undefined;
  const topics = params.get("topics")?.split(",").filter(Boolean) ?? [];
  const isMock = params.get("mode") === "mock";
  const count = Number(params.get("count")) || undefined;

  const { questions, label, chapterTag } = useMemo(() => {
    let qs = chapter
      ? questionsForChapters([chapter])
      : topics.length > 0
        ? questionsForChapters(topics)
        : questionsForChapters([], bank);
    qs = shuffle(qs);
    if (count) qs = qs.slice(0, count);

    let label = "Conditioning quiz";
    let chapterTag: string | "mixed" = "mixed";
    if (isMock) label = "Mock Exam";
    else if (chapter) {
      label = chapterTitle(chapter);
      chapterTag = chapter;
    } else if (topics.length > 0) label = "Custom quiz";

    return { questions: qs, label, chapterTag };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]);

  // Mock exams are an Advanced-tier feature.
  if (isMock && user && !hasAdvanced(user.tier)) {
    return (
      <div className="max-w-xl mx-auto px-5 py-12 text-center">
        <div className="card p-8">
          <span className="pill">Advanced feature</span>
          <h2 className="text-2xl font-extrabold mt-3 mb-2">Mock exams are on Advanced</h2>
          <p className="text-ink-soft mb-6">
            Full-length, 100-question timed mock exams — the closest thing to test day — are part of
            the Advanced plan, along with the reading trainer.
          </p>
          <Link href="/checkout?plan=advanced" className="btn btn-primary">
            Upgrade to Advanced
          </Link>
        </div>
      </div>
    );
  }

  if (questions.length === 0) {
    return (
      <div className="max-w-xl mx-auto px-5 py-12 text-center">
        <p className="text-ink-soft">No questions available for this selection yet.</p>
        <Link href="/quiz/setup" className="btn btn-ghost mt-4">
          Build a different quiz
        </Link>
      </div>
    );
  }

  // ~1 minute per question, like the real exam pace.
  const seconds = Math.max(120, questions.length * 60);

  return (
    <Quiz
      questions={questions}
      seconds={seconds}
      label={label}
      chapter={chapterTag}
      backHref={chapter ? `/chapters/${chapter}` : "/dashboard"}
    />
  );
}
