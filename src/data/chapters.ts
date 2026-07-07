import type { Chapter } from "@/lib/types";

// Placeholder chapter structure. Titles are realistic for a nursing state exam
// (CNA / NCLEX-RN overlap); the client confirms the final list + content.
// {{NEED FROM CLIENT: confirm exam (NCLEX-RN vs CNA) — it decides chapter list + bank.}}
// {{NEED FROM CLIENT: chapter reading content + which video goes in each slot.}}
export const CHAPTERS: Chapter[] = [
  {
    slug: "safety-infection-control",
    title: "Safety & Infection Control",
    blurb: "Hand hygiene, standard precautions, fall prevention, and a safe environment.",
    videoUrl: null,
  },
  {
    slug: "basic-nursing-skills",
    title: "Basic Nursing Skills",
    blurb: "Positioning, mobility, ADLs, and everyday hands-on care.",
    videoUrl: null,
  },
  {
    slug: "vital-signs",
    title: "Vital Signs & Measurement",
    blurb: "Temperature, pulse, respirations, blood pressure, and normal ranges.",
    videoUrl: null,
  },
  {
    slug: "pharmacology",
    title: "Pharmacology Basics",
    blurb: "The rights of medication, common drug classes, and safe administration.",
    videoUrl: null,
  },
  {
    slug: "physiological-adaptation",
    title: "Physiological Adaptation",
    blurb: "Recognizing changes in condition and responding to the body under stress.",
    videoUrl: null,
  },
  {
    slug: "health-promotion",
    title: "Health Promotion & Maintenance",
    blurb: "Nutrition, prevention, and supporting clients across the lifespan.",
    videoUrl: null,
  },
  {
    slug: "psychosocial",
    title: "Psychosocial Integrity",
    blurb: "Mental health, coping, therapeutic communication, and dignity.",
    videoUrl: null,
  },
  {
    slug: "clients-rights",
    title: "Client Rights & Communication",
    blurb: "Consent, refusal, confidentiality, and reporting up the chain.",
    videoUrl: null,
  },
];

export function chapterTitle(slug: string): string {
  return CHAPTERS.find((c) => c.slug === slug)?.title ?? slug;
}
