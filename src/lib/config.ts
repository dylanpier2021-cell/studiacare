import type { Tier } from "./types";

// ----------------------------------------------------------------------------
// Product config. Single source of truth for pricing + gating so the landing
// page, paywall, checkout, and profile never drift apart.
// ----------------------------------------------------------------------------

/**
 * FREE_ACCESS: everything is unlocked and free — anyone can sign up and use the
 * whole app (all questions, mock exams, reading trainer, no paywall).
 * Flip to `false` to re-enable the paid tiers + 75-question free limit later;
 * all the Stripe/paywall infrastructure is still wired behind this flag.
 */
export const FREE_ACCESS = true;

/** Free-tier gate: first N questions are free, then the paywall appears. */
export const FREE_QUESTION_LIMIT = 75;

/** Main conditioning quiz length (real exam is 85; 100 conditions students). */
export const MAIN_QUIZ_LENGTH = 100;

/** How many days in one study work-period cycle. */
export const CYCLE_DAYS = 7;

export interface Plan {
  id: Tier;
  name: string;
  price: string;
  cadence: string;
  blurb: string;
  features: string[];
  cta: string;
  featured?: boolean;
  /** env var name holding this plan's Stripe price id */
  priceEnv?: "NEXT_PUBLIC_STRIPE_PRICE_STANDARD" | "NEXT_PUBLIC_STRIPE_PRICE_ADVANCED";
}

export const PLANS: Plan[] = [
  {
    id: "free",
    name: "Free",
    price: "$0",
    cadence: "no card required",
    blurb: "Get a real feel for the exam.",
    features: [
      "First 75 practice questions",
      "Timed, exam-style format",
      "Feedback + rationale on every answer",
      "Hover-to-define terms",
      "Flashcards",
    ],
    cta: "Start free",
  },
  {
    id: "standard",
    name: "Standard",
    price: "$9",
    cadence: "/mo · first month FREE",
    blurb: "The full conditioning bank.",
    features: [
      "Everything in Free",
      "Full 100-question conditioning bank",
      "Second 100-question bank",
      "All chapters + custom quizzes",
      "Progress tracking + study reminders",
    ],
    cta: "Start my free month",
    featured: true,
    priceEnv: "NEXT_PUBLIC_STRIPE_PRICE_STANDARD",
  },
  {
    id: "advanced",
    name: "Advanced",
    price: "$15",
    cadence: "/mo",
    blurb: "Everything, plus mock exams.",
    features: [
      "Everything in Standard",
      "Full-length timed mock exams (100 Q)",
      "Disappearing-words reading trainer",
      "Priority new-question drops",
    ],
    cta: "Go Advanced",
    priceEnv: "NEXT_PUBLIC_STRIPE_PRICE_ADVANCED",
  },
];

export function tierRank(t: Tier): number {
  return t === "advanced" ? 2 : t === "standard" ? 1 : 0;
}

/** Advanced-only features (unlocked for everyone while FREE_ACCESS is on). */
export function hasAdvanced(tier: Tier): boolean {
  return FREE_ACCESS || tierRank(tier) >= 2;
}

/** Paid features (unlocked for everyone while FREE_ACCESS is on). */
export function hasPaid(tier: Tier): boolean {
  return FREE_ACCESS || tierRank(tier) >= 1;
}

/**
 * Public Supabase URL + client key. Accepts either the new-style publishable
 * key (`NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`, `sb_publishable_...`) or the
 * legacy anon key (`NEXT_PUBLIC_SUPABASE_ANON_KEY`) — whichever is set.
 */
export const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
export const SUPABASE_KEY =
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

/**
 * Is Supabase configured with real credentials? When false the app runs in
 * local demo mode (localStorage) so `npm run dev` works with zero setup.
 */
export function supabaseConfigured(): boolean {
  return Boolean(
    SUPABASE_URL &&
      SUPABASE_KEY &&
      SUPABASE_URL.startsWith("http") &&
      !SUPABASE_URL.includes("your-supabase")
  );
}

/** Is Stripe configured with a real publishable key? */
export function stripeConfigured(): boolean {
  const pk = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
  return Boolean(pk && pk.startsWith("pk_") && !pk.includes("xxx"));
}
