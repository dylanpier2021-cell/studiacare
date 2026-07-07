"use client";

import Link from "next/link";
import { AppShell } from "@/components/AppShell";
import { useApp } from "@/lib/store";
import { planForDay } from "@/data/studyPlan";
import { CYCLE_DAYS } from "@/lib/config";
import { chapterTitle } from "@/data/chapters";

export default function DashboardPage() {
  return (
    <AppShell>
      <Dashboard />
    </AppShell>
  );
}

function Dashboard() {
  const { user, progress } = useApp();
  const today = planForDay(progress.cycleDay);
  const avg =
    progress.attempts.length > 0
      ? Math.round(
          progress.attempts.reduce((s, a) => s + (a.score / Math.max(1, a.total)) * 100, 0) /
            progress.attempts.length
        )
      : 0;

  // weakest chapter from best-scores map
  const weakest = Object.entries(progress.chapterScores).sort((a, b) => a[1] - b[1])[0];

  return (
    <div className="max-w-wrap mx-auto px-5 py-8">
      <div className="flex items-end justify-between flex-wrap gap-3 mb-6">
        <div>
          <p className="text-ink-faint text-sm">Welcome back</p>
          <h1 className="text-3xl font-extrabold">{user?.email.split("@")[0]}</h1>
        </div>
        <div className="flex gap-3">
          <div className="card px-5 py-3 text-center">
            <b className="block text-2xl text-brand">{progress.streak} 🔥</b>
            <span className="text-xs text-ink-faint">day streak</span>
          </div>
          <div className="card px-5 py-3 text-center">
            <b className="block text-2xl text-brand">
              {progress.cycleDay}/{CYCLE_DAYS}
            </b>
            <span className="text-xs text-ink-faint">cycle {progress.cycleNumber}</span>
          </div>
        </div>
      </div>

      {/* Today's plan */}
      <div className="card p-6 sm:p-8 bg-brand border-none text-white">
        <span className="pill !bg-white/20 !text-white">
          Today · Day {progress.cycleDay} of your 7-day cycle
        </span>
        <h2 className="text-2xl font-extrabold mt-3">{today.focus}</h2>
        <p className="text-white/85 mt-1 max-w-xl">{today.detail}</p>
        <Link href={today.href} className="btn bg-white text-brand-dark mt-5">
          {today.cta} →
        </Link>
      </div>

      {/* Quick actions */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mt-6">
        <QuickCard href="/quiz?bank=1" icon="💯" title="100-question quiz" body="Full timed conditioning bank." />
        <QuickCard href="/quiz/setup" icon="🗂️" title="Custom quiz" body="Pick chapters and weak areas." />
        <QuickCard href="/flashcards" icon="🔖" title="Flashcards" body="Drill by chapter." />
        <QuickCard href="/chapters" icon="📚" title="Chapters" body="Read, watch, and quiz." />
      </div>

      {/* Snapshot */}
      <div className="grid gap-4 sm:grid-cols-3 mt-6">
        <Stat value={String(progress.questionsAnswered)} label="questions answered" />
        <Stat value={progress.attempts.length ? `${avg}%` : "—"} label="average score" />
        <Stat
          value={weakest ? chapterTitle(weakest[0]) : "—"}
          label={weakest ? `weakest topic · ${weakest[1]}%` : "weakest topic"}
          small
        />
      </div>

      {/* Recent attempts */}
      <div className="card p-6 mt-6">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-bold">Recent sessions</h3>
          <Link href="/profile" className="text-sm text-brand font-semibold">
            See all →
          </Link>
        </div>
        {progress.attempts.length === 0 ? (
          <p className="text-ink-soft text-sm">
            No sessions yet — start with today&apos;s plan above and your progress shows up here.
          </p>
        ) : (
          <div className="divide-y divide-line">
            {progress.attempts.slice(0, 5).map((a) => (
              <div key={a.id} className="flex items-center justify-between py-2.5 text-sm">
                <div>
                  <span className="font-semibold">{a.label}</span>
                  <span className="text-ink-faint"> · {a.date}</span>
                </div>
                <b className="text-brand">
                  {a.score}/{a.total}
                </b>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function QuickCard({
  href,
  icon,
  title,
  body,
}: {
  href: string;
  icon: string;
  title: string;
  body: string;
}) {
  return (
    <Link href={href} className="card p-5 hover:border-brand transition-colors">
      <div className="text-2xl mb-2">{icon}</div>
      <h3 className="font-bold text-sm">{title}</h3>
      <p className="text-xs text-ink-soft mt-1">{body}</p>
    </Link>
  );
}

function Stat({ value, label, small }: { value: string; label: string; small?: boolean }) {
  return (
    <div className="card p-5 text-center">
      <b className={`block text-brand ${small ? "text-lg" : "text-2xl"}`}>{value}</b>
      <span className="text-xs text-ink-faint">{label}</span>
    </div>
  );
}
