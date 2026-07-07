"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { AppShell } from "@/components/AppShell";
import { ReadingTrainer } from "@/components/ReadingTrainer";
import { Flashcards } from "@/components/Flashcards";
import { useApp } from "@/lib/store";
import { CHAPTERS } from "@/data/chapters";
import { FLASHCARDS } from "@/data/flashcards";
import { questionsForChapters } from "@/data/questions";
import { passageForChapter } from "@/data/passages";
import { hasAdvanced } from "@/lib/config";

export default function ChapterPage() {
  return (
    <AppShell>
      <ChapterView />
    </AppShell>
  );
}

function ChapterView() {
  const params = useParams<{ slug: string }>();
  const { user } = useApp();
  const chapter = CHAPTERS.find((c) => c.slug === params.slug);

  if (!chapter) {
    return (
      <div className="max-w-xl mx-auto px-5 py-16 text-center">
        <p className="text-ink-soft">That chapter doesn&apos;t exist.</p>
        <Link href="/chapters" className="btn btn-ghost mt-4">
          All chapters
        </Link>
      </div>
    );
  }

  const cards = FLASHCARDS.filter((f) => f.chapter === chapter.slug);
  const questionCount = questionsForChapters([chapter.slug]).length;
  const passage = passageForChapter(chapter.slug);
  const advanced = user ? hasAdvanced(user.tier) : false;

  return (
    <div className="max-w-2xl mx-auto px-5 py-8">
      <Link href="/chapters" className="text-sm text-ink-faint hover:text-brand">
        ← All chapters
      </Link>
      <h1 className="text-3xl font-extrabold mt-2 mb-1">{chapter.title}</h1>
      <p className="text-ink-soft mb-6">{chapter.blurb}</p>

      {/* Chapter quiz CTA */}
      <div className="card p-6 flex items-center justify-between flex-wrap gap-3 mb-6">
        <div>
          <h2 className="font-bold">Chapter quiz</h2>
          <p className="text-sm text-ink-soft">{questionCount} timed sample questions.</p>
        </div>
        <Link href={`/quiz?chapter=${chapter.slug}`} className="btn btn-primary">
          Start quiz →
        </Link>
      </div>

      {/* Video slot */}
      <section className="mb-6">
        <h2 className="font-bold mb-2">Lesson video</h2>
        <div className="aspect-video rounded-card overflow-hidden ring-glow bg-soft border border-line flex items-center justify-center text-center">
          {chapter.videoUrl ? (
            <iframe
              src={chapter.videoUrl}
              className="w-full h-full"
              allowFullScreen
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              title={`${chapter.title} lesson`}
            />
          ) : (
            <div className="text-ink-faint text-sm px-6">
              Video slot
              {/* {{NEED FROM CLIENT: chapter lesson video URL (YouTube/Vimeo embed or upload)}} */}
              <span className="block text-xs">Client to supply the lesson video.</span>
            </div>
          )}
        </div>
        {/* {{NEED FROM CLIENT: placeholder lesson videos are public nursing lessons —
            replace each with the client's own recording before launch.}} */}
        <p className="text-xs text-ink-faint mt-2">
          Placeholder lesson — to be replaced with the instructor&apos;s own video.
        </p>
      </section>

      {/* Reading content */}
      <section className="mb-6">
        <h2 className="font-bold mb-2">Reading</h2>
        <div className="card p-5 text-ink-soft text-sm leading-relaxed">
          {passage?.text}
          <p className="text-xs text-ink-faint mt-3">
            {/* {{NEED FROM CLIENT: full chapter reading content}} */}
            Sample reading — full chapter content comes from the client.
          </p>
        </div>
      </section>

      {/* Reading trainer (Advanced) */}
      <section className="mb-6">
        <div className="flex items-center gap-2 mb-2">
          <h2 className="font-bold">Reading trainer</h2>
          {!advanced && <span className="pill">Advanced</span>}
        </div>
        {advanced ? (
          <div className="card p-5">
            <p className="text-sm text-ink-soft mb-4">
              Read before the words disappear. Train your eyes to move at exam speed.
            </p>
            <ReadingTrainer text={passage?.text ?? ""} />
          </div>
        ) : (
          <div className="card p-5 text-center">
            <p className="text-sm text-ink-soft mb-4">
              The disappearing-words reading trainer is part of the Advanced plan — it builds the
              reading speed long exam questions demand.
            </p>
            <Link href="/checkout?plan=advanced" className="btn btn-ghost btn-sm">
              Unlock with Advanced
            </Link>
          </div>
        )}
      </section>

      {/* Flashcards */}
      {cards.length > 0 && (
        <section className="mb-6">
          <h2 className="font-bold mb-3">Flashcards</h2>
          <Flashcards cards={cards} />
        </section>
      )}
    </div>
  );
}
