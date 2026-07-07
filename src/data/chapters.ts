import type { Chapter } from "@/lib/types";

// Placeholder chapter structure. Titles are realistic for a nursing state exam
// (CNA / NCLEX-RN overlap); the client confirms the final list + content.
// {{NEED FROM CLIENT: confirm exam (NCLEX-RN vs CNA) — it decides chapter list + bank.}}
// {{NEED FROM CLIENT: chapter reading content. Video slots are seeded below with
//   well-matched public nursing lessons (RegisteredNurseRN / LevelUpRN) as
//   placeholders — replace with the client's own lesson videos before launch.}}
export const CHAPTERS: Chapter[] = [
  {
    slug: "safety-infection-control",
    title: "Safety & Infection Control",
    blurb: "Hand hygiene, standard precautions, fall prevention, and a safe environment.",
    videoUrl: "https://www.youtube-nocookie.com/embed/6QXV-i-lryA",
  },
  {
    slug: "basic-nursing-skills",
    title: "Basic Nursing Skills",
    blurb: "Positioning, mobility, ADLs, and everyday hands-on care.",
    videoUrl: "https://www.youtube-nocookie.com/embed/sklquo00ElQ",
  },
  {
    slug: "vital-signs",
    title: "Vital Signs & Measurement",
    blurb: "Temperature, pulse, respirations, blood pressure, and normal ranges.",
    videoUrl: "https://www.youtube-nocookie.com/embed/gUWJ-6nL5-8",
  },
  {
    slug: "pharmacology",
    title: "Pharmacology Basics",
    blurb: "The rights of medication, common drug classes, and safe administration.",
    videoUrl: "https://www.youtube-nocookie.com/embed/YHBgApOKpaM",
  },
  {
    slug: "physiological-adaptation",
    title: "Physiological Adaptation",
    blurb: "Recognizing changes in condition and responding to the body under stress.",
    videoUrl: "https://www.youtube-nocookie.com/embed/QJUxSm_t42o",
  },
  {
    slug: "health-promotion",
    title: "Health Promotion & Maintenance",
    blurb: "Nutrition, prevention, and supporting clients across the lifespan.",
    videoUrl: "https://www.youtube-nocookie.com/embed/kgTA0uzM99k",
  },
  {
    slug: "psychosocial",
    title: "Psychosocial Integrity",
    blurb: "Mental health, coping, therapeutic communication, and dignity.",
    videoUrl: "https://www.youtube-nocookie.com/embed/svMEO66BlJY",
  },
  {
    slug: "clients-rights",
    title: "Client Rights & Communication",
    blurb: "Consent, refusal, confidentiality, and reporting up the chain.",
    videoUrl: "https://www.youtube-nocookie.com/embed/k9_a2Hz-3p0",
  },
];

export function chapterTitle(slug: string): string {
  return CHAPTERS.find((c) => c.slug === slug)?.title ?? slug;
}
