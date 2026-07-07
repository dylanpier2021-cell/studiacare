import type { Flashcard } from "@/lib/types";

// SAMPLE flashcards, organized by chapter. Placeholders for the draft.
// {{NEED FROM CLIENT: full flashcard set, aligned to the final question bank.}}
export const FLASHCARDS: Flashcard[] = [
  {
    id: "f1",
    chapter: "vital-signs",
    front: "Normal adult oral temperature range?",
    back: "About 97.6°F – 99.6°F (36.4°C – 37.5°C). Many questions hinge on 'is this normal?'",
  },
  {
    id: "f2",
    chapter: "vital-signs",
    front: "Normal adult resting heart rate?",
    back: "60–100 beats per minute. Under 60 = bradycardia, over 100 = tachycardia.",
  },
  {
    id: "f3",
    chapter: "safety-infection-control",
    front: "First thing to do before ANY client care task?",
    back: "Hand hygiene, then identify the client. The most-tested habit on the exam.",
  },
  {
    id: "f4",
    chapter: "safety-infection-control",
    front: "What does RACE stand for in a fire?",
    back: "Rescue, Alarm, Contain, Extinguish — in that order. People first.",
  },
  {
    id: "f5",
    chapter: "basic-nursing-skills",
    front: "Fowler's position is…",
    back: "Head of bed raised 45–60°. Semi-Fowler's is 30–45°. Used for breathing and feeding.",
  },
  {
    id: "f6",
    chapter: "basic-nursing-skills",
    front: "How often should a bed-bound client be repositioned?",
    back: "At least every 2 hours, to prevent pressure injuries over bony areas.",
  },
  {
    id: "f7",
    chapter: "physiological-adaptation",
    front: "Signs of hypoglycemia?",
    back: "Shaky, sweaty, confused, hungry, irritable. Treat with fast sugar (juice), then recheck.",
  },
  {
    id: "f8",
    chapter: "pharmacology",
    front: "Name three of the 'rights' of medication administration.",
    back: "Right client, right drug, right dose, right route, right time, right documentation.",
  },
  {
    id: "f9",
    chapter: "clients-rights",
    front: "A client refuses care. You should…",
    back: "Respect the refusal, never force, offer again later, and report it. Forcing care can be battery.",
  },
  {
    id: "f10",
    chapter: "psychosocial",
    front: "What is therapeutic communication?",
    back: "Acknowledging feelings and inviting the client to share — not false reassurance or changing the subject.",
  },
];
