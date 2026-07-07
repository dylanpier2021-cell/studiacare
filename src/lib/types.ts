// Shared types for StudiaCare.

export type Tier = "free" | "standard" | "advanced";

export interface Question {
  id: string;
  /** Chapter slug this question belongs to (see data/chapters.ts). */
  chapter: string;
  /** Question stem. May contain <Define> markup via the {term} convention (see Define component). */
  prompt: string;
  options: string[];
  /** Index into `options`. */
  correct: number;
  rationale: string;
  /** Which conditioning bank this belongs to: 1 = main 100, 2 = second 100. */
  bank: 1 | 2;
}

export interface Flashcard {
  id: string;
  chapter: string;
  front: string;
  back: string;
}

export interface Chapter {
  slug: string;
  title: string;
  blurb: string;
  /** Placeholder video embed URL, or null until the client supplies one. */
  videoUrl: string | null;
}

/** One completed quiz attempt, stored per user. */
export interface Attempt {
  id: string;
  /** ISO date string (yyyy-mm-dd) the attempt finished. */
  date: string;
  label: string;
  chapter: string | "mixed";
  score: number;
  total: number;
  /** Per-topic tally for weak-area feedback. */
  byChapter: Record<string, { correct: number; total: number }>;
}

/** Everything we persist about a user's study state. */
export interface Progress {
  /** How many unique graded questions they've answered — drives the free-tier gate. */
  questionsAnswered: number;
  streak: number;
  /** ISO date of the last day they studied, for streak math. */
  lastStudyDate: string | null;
  /** Day 1..7 of the current work cycle. */
  cycleDay: number;
  cycleNumber: number;
  attempts: Attempt[];
  /** chapter slug -> best score % */
  chapterScores: Record<string, number>;
  reminders: ReminderSettings;
}

export interface ReminderSettings {
  enabled: boolean;
  /** 24h "HH:MM" */
  time: string;
  channel: "email" | "sms";
  /** 0=Sun..6=Sat */
  days: number[];
}

export interface SessionUser {
  id: string;
  email: string;
  tier: Tier;
}
