// A simple 7-day work-period plan. The dashboard reads the user's current
// cycle day and shows "what to do today."
// {{NEED FROM CLIENT: confirm the ideal weekly study structure for her students.}}
export interface PlanDay {
  day: number;
  focus: string;
  detail: string;
  /** primary action link */
  href: string;
  cta: string;
}

export const STUDY_PLAN: PlanDay[] = [
  {
    day: 1,
    focus: "Safety & Infection Control",
    detail: "Warm up with the fundamentals every exam leans on. Chapter quiz + flashcards.",
    href: "/chapters/safety-infection-control",
    cta: "Start Day 1",
  },
  {
    day: 2,
    focus: "Basic Nursing Skills",
    detail: "Positioning, mobility, and transfers. Take the chapter quiz timed.",
    href: "/chapters/basic-nursing-skills",
    cta: "Start Day 2",
  },
  {
    day: 3,
    focus: "Vital Signs & Pharmacology",
    detail: "Normal ranges and the rights of medication. Build a custom quiz across both.",
    href: "/quiz/setup",
    cta: "Build today's quiz",
  },
  {
    day: 4,
    focus: "Physiological Adaptation",
    detail: "Recognize changes in condition fast. Chapter quiz + reading trainer.",
    href: "/chapters/physiological-adaptation",
    cta: "Start Day 4",
  },
  {
    day: 5,
    focus: "Health Promotion & Psychosocial",
    detail: "Prevention, nutrition, and therapeutic communication. Custom quiz.",
    href: "/quiz/setup",
    cta: "Build today's quiz",
  },
  {
    day: 6,
    focus: "Weak-area review",
    detail: "Target your lowest-scoring topics from the week. Custom quiz on weak areas.",
    href: "/quiz/setup",
    cta: "Review weak areas",
  },
  {
    day: 7,
    focus: "Conditioning day",
    detail: "Sit a full 100-question timed session. This is the day that builds stamina.",
    href: "/quiz?bank=1",
    cta: "Start conditioning quiz",
  },
];

export function planForDay(day: number): PlanDay {
  const d = ((day - 1) % 7 + 7) % 7;
  return STUDY_PLAN[d];
}
