"use client";

import { useState } from "react";
import Link from "next/link";
import { AppShell } from "@/components/AppShell";
import { useApp } from "@/lib/store";
import { CHAPTERS } from "@/data/chapters";
import { PLANS, FREE_ACCESS } from "@/lib/config";
import type { ReminderSettings } from "@/lib/types";
import { IconFlame, IconCheck } from "@/components/Icons";
import { ProgressRing } from "@/components/ProgressRing";

const DAY_LABELS = ["S", "M", "T", "W", "T", "F", "S"];

export default function ProfilePage() {
  return (
    <AppShell>
      <Profile />
    </AppShell>
  );
}

function Profile() {
  const { user, progress } = useApp();
  const avg =
    progress.attempts.length > 0
      ? Math.round(
          progress.attempts.reduce((s, a) => s + (a.score / Math.max(1, a.total)) * 100, 0) /
            progress.attempts.length
        )
      : 0;
  const planName = PLANS.find((p) => p.id === user?.tier)?.name ?? "Free";
  const readiness = Math.round(
    CHAPTERS.reduce((s, c) => s + (progress.chapterScores[c.slug] ?? 0), 0) / CHAPTERS.length
  );

  return (
    <div className="max-w-2xl mx-auto px-5 py-8">
      <h1 className="text-3xl sm:text-4xl font-extrabold mb-1">Your profile</h1>
      <p className="text-ink-soft mb-6">{user?.email}</p>

      {/* Readiness + snapshot */}
      <div className="card p-6 mb-6 flex flex-col sm:flex-row items-center gap-6">
        <div className="text-center shrink-0">
          <ProgressRing value={readiness} size={132} centerLabel="ready" />
          <p className="text-xs text-ink-faint mt-2">Exam readiness</p>
        </div>
        <div className="grid grid-cols-2 gap-3 w-full">
          <Stat value={String(progress.questionsAnswered)} label="questions" />
          <Stat value={progress.attempts.length ? `${avg}%` : "—"} label="avg score" />
          <Stat value={String(progress.streak)} label="day streak" icon={<IconFlame className="w-4 h-4" />} />
          <Stat value={`${progress.cycleNumber}`} label="cycle #" />
        </div>
      </div>

      {/* Per-chapter progress */}
      <div className="card p-6 mb-6">
        <h2 className="font-bold mb-4">Progress by chapter</h2>
        <div className="space-y-3">
          {CHAPTERS.map((c) => {
            const pct = progress.chapterScores[c.slug] ?? 0;
            return (
              <div key={c.slug} className="flex items-center gap-3">
                <span className="text-sm flex-1 min-w-0 truncate">{c.title}</span>
                <div className="w-28 h-2 bg-soft rounded-full overflow-hidden">
                  <div className="h-full bg-brand" style={{ width: `${pct}%` }} />
                </div>
                <b className="text-sm text-ink-soft w-10 text-right">{pct}%</b>
              </div>
            );
          })}
        </div>
      </div>

      {/* Plan */}
      <div className="card p-6 mb-6">
        <h2 className="font-bold mb-1">Your plan</h2>
        {FREE_ACCESS ? (
          <p className="text-sm text-ink-soft">
            You&apos;re on the <b className="text-ink">free</b> plan — everything is unlocked. No
            card, no limits. Just study.
          </p>
        ) : (
          <>
            <p className="text-sm text-ink-soft mb-4">
              Current plan: <b className="text-ink">{planName}</b>
            </p>
            <div className="flex flex-wrap gap-3">
              {user?.tier !== "advanced" && (
                <Link href="/checkout?plan=advanced" className="btn btn-primary btn-sm">
                  Upgrade to Advanced
                </Link>
              )}
              {user?.tier === "free" && (
                <Link href="/checkout?plan=standard" className="btn btn-ghost btn-sm">
                  Get Standard (first month free)
                </Link>
              )}
            </div>
          </>
        )}
      </div>

      {/* Reminder settings */}
      <ReminderCard />
    </div>
  );
}

function ReminderCard() {
  const { progress, updateReminders } = useApp();
  const [r, setR] = useState<ReminderSettings>(progress.reminders);
  const [saved, setSaved] = useState(false);

  function save() {
    updateReminders(r);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }
  function toggleDay(d: number) {
    setR((prev) => ({
      ...prev,
      days: prev.days.includes(d) ? prev.days.filter((x) => x !== d) : [...prev.days, d].sort(),
    }));
  }

  return (
    <div className="card p-6">
      <h2 className="font-bold mb-1">Study reminders</h2>
      <p className="text-sm text-ink-soft mb-4">
        Get a nudge so exam day never sneaks up on you.
        {/* {{NEED FROM CLIENT: email vs SMS provider + copy. Sending is stubbed for the draft.}} */}
      </p>

      <label className="flex items-center justify-between mb-4">
        <span className="font-semibold text-sm">Reminders on</span>
        <input
          type="checkbox"
          checked={r.enabled}
          onChange={(e) => setR({ ...r, enabled: e.target.checked })}
          className="w-5 h-5 accent-[color:var(--brand)]"
        />
      </label>

      <div className={r.enabled ? "" : "opacity-50 pointer-events-none"}>
        <div className="grid sm:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="label">Time</label>
            <input
              type="time"
              value={r.time}
              onChange={(e) => setR({ ...r, time: e.target.value })}
              className="field"
            />
          </div>
          <div>
            <label className="label">Channel</label>
            <select
              value={r.channel}
              onChange={(e) => setR({ ...r, channel: e.target.value as "email" | "sms" })}
              className="field"
            >
              <option value="email">Email</option>
              <option value="sms">SMS</option>
            </select>
          </div>
        </div>
        <label className="label">Days</label>
        <div className="flex gap-2">
          {DAY_LABELS.map((d, i) => (
            <button
              key={i}
              onClick={() => toggleDay(i)}
              className={`w-9 h-9 rounded-full font-bold text-sm border-2 ${
                r.days.includes(i) ? "border-brand bg-brand-soft text-brand-dark" : "border-line"
              }`}
            >
              {d}
            </button>
          ))}
        </div>
      </div>

      <button onClick={save} className="btn btn-primary btn-sm mt-5">
        {saved ? (
          <>
            <IconCheck className="w-4 h-4" /> Saved
          </>
        ) : (
          "Save reminders"
        )}
      </button>
    </div>
  );
}

function Stat({
  value,
  label,
  icon,
}: {
  value: string;
  label: string;
  icon?: React.ReactNode;
}) {
  return (
    <div className="card p-4 text-center">
      <b className="flex items-center justify-center gap-1 text-xl text-brand">
        {icon}
        {value}
      </b>
      <span className="text-xs text-ink-faint">{label}</span>
    </div>
  );
}
