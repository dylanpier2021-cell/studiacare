import type { Question } from "@/lib/types";

// ============================================================================
// SAMPLE QUESTION BANK — 25 original, realistic nursing-state-exam-style
// questions written for Rough Draft 2. These are PLACEHOLDERS to demonstrate
// the engine. The real bank comes from the client.
//
// {{NEED FROM CLIENT: who writes the full bank (100 main + 100 conditioning),
//   and confirm the exam — NCLEX-RN vs CNA state exam. This decides everything.}}
//
// Markup: wrap a glossary term in [square brackets] for a hover/tap definition.
// ============================================================================

export const QUESTIONS: Question[] = [
  // ---- Safety & Infection Control ----
  {
    id: "q1",
    chapter: "safety-infection-control",
    bank: 1,
    prompt:
      "Which action best maintains medical [asepsis] when caring for any client?",
    options: [
      "Wearing sterile gloves for every task",
      "Performing hand hygiene before and after client contact",
      "Double-bagging all soiled linens",
      "Wearing a mask at all times",
    ],
    correct: 1,
    rationale:
      "Hand hygiene is the single most effective way to prevent the spread of infection. Sterile gloves and masks have their place, but handwashing is the foundation of every safe interaction.",
  },
  {
    id: "q2",
    chapter: "safety-infection-control",
    bank: 1,
    prompt:
      "A client is at risk for falls. Which is the BEST [restraint alternative] to try first?",
    options: [
      "Apply a vest restraint at night",
      "Keep all four side rails up",
      "Place a bed alarm and check on the client frequently",
      "Ask the family to stay 24 hours a day",
    ],
    correct: 2,
    rationale:
      "The least-restrictive option comes first. A bed alarm plus frequent rounding keeps the client safe without a restraint. Four raised side rails can count as a restraint, and vest restraints are a last resort with an order.",
  },
  {
    id: "q3",
    chapter: "safety-infection-control",
    bank: 1,
    prompt:
      "You enter a room and find a small fire in a trash can. Using the RACE approach, what is the FIRST step?",
    options: [
      "Activate the alarm",
      "Rescue anyone in immediate danger",
      "Contain the fire by closing the door",
      "Extinguish the fire",
    ],
    correct: 1,
    rationale:
      "RACE = Rescue, Alarm, Contain, Extinguish. People come first: rescue anyone in immediate danger before sounding the alarm or fighting the fire.",
  },
  {
    id: "q4",
    chapter: "safety-infection-control",
    bank: 2,
    prompt:
      "Which technique correctly removes contaminated gloves to protect the wearer?",
    options: [
      "Peel both gloves off from the wrist upward, touching the outside",
      "Grasp the outside of one glove at the wrist, peel it off inside-out, then use a bare finger inside the second glove to remove it",
      "Rinse the gloves under water before removing them",
      "Remove gloves only after leaving the room",
    ],
    correct: 1,
    rationale:
      "The outside of the glove is contaminated. Remove the first glove inside-out, then slide a clean bare finger under the second glove's cuff so skin never touches the dirty surface.",
  },

  // ---- Basic Nursing Skills ----
  {
    id: "q5",
    chapter: "basic-nursing-skills",
    bank: 1,
    prompt:
      "Before helping a client [ambulate] for the first time after surgery, the FIRST action is to:",
    options: [
      "Sit the client up and let the legs dangle at the bedside",
      "Have a wheelchair ready",
      "Ask the client to stand quickly to build confidence",
      "Raise the bed to its highest position",
    ],
    correct: 0,
    rationale:
      "Dangling the legs first lets the client adjust and prevents [orthostatic hypotension] — the dizziness from standing too fast. Standing quickly is the opposite of safe, and the bed should be LOW before transfer.",
  },
  {
    id: "q6",
    chapter: "basic-nursing-skills",
    bank: 1,
    prompt: "A client must be positioned [supine] for a procedure. You place the client:",
    options: [
      "On the left side with knees bent",
      "Flat on the back, face up",
      "Sitting upright at 90 degrees",
      "On the stomach with the head turned",
    ],
    correct: 1,
    rationale:
      "Supine means flat on the back, face up. Side-lying is lateral, sitting upright is [Fowler's position], and on the stomach is [prone]. Positions show up on the exam constantly — know them cold.",
  },
  {
    id: "q7",
    chapter: "basic-nursing-skills",
    bank: 1,
    prompt:
      "When transferring a client from bed to a wheelchair, which body mechanics protect YOUR back?",
    options: [
      "Bend at the waist and lift with your arms",
      "Keep feet together and twist toward the chair",
      "Bend your knees, keep your back straight, and keep the client close",
      "Lift quickly to shorten the strain",
    ],
    correct: 2,
    rationale:
      "Bend the knees, keep the back straight, and hold the load close to your center of gravity. Twisting and bending at the waist are the fastest way to injure yourself.",
  },
  {
    id: "q8",
    chapter: "basic-nursing-skills",
    bank: 1,
    prompt:
      "A client on bed rest is at risk for a [pressure injury]. Which intervention helps prevent it?",
    options: [
      "Reposition the client at least every 2 hours",
      "Keep the head of the bed as high as possible",
      "Massage reddened bony areas firmly",
      "Limit fluids to keep the skin dry",
    ],
    correct: 0,
    rationale:
      "Repositioning at least every 2 hours relieves pressure over bony areas. Massaging reddened skin can worsen damage, and restricting fluids harms skin integrity rather than helping.",
  },

  // ---- Vital Signs ----
  {
    id: "q9",
    chapter: "vital-signs",
    bank: 1,
    prompt: "Which reading is within the normal range for an adult's oral temperature?",
    options: ["94.0°F", "98.6°F", "101.5°F", "103.2°F"],
    correct: 1,
    rationale:
      "Normal adult oral temperature is about 97.6–99.6°F, so 98.6°F is normal. 101.5°F and above indicate a fever; 94.0°F is hypothermic.",
  },
  {
    id: "q10",
    chapter: "vital-signs",
    bank: 1,
    prompt:
      "You count an adult client's resting heart rate at 52 beats per minute. This is called [bradycardia]. What is the BEST next step?",
    options: [
      "Do nothing; it is always normal",
      "Recheck, note how the client feels, and report the finding",
      "Have the client walk to raise the rate",
      "Give the client caffeine",
    ],
    correct: 1,
    rationale:
      "A rate under 60 is bradycardia. Recheck for accuracy, assess the client (dizzy? symptomatic?), and report. You never treat a vital sign on your own with caffeine or exercise.",
  },
  {
    id: "q11",
    chapter: "vital-signs",
    bank: 1,
    prompt: "Where do you place the stethoscope to count an [apical pulse]?",
    options: [
      "On the wrist over the radial artery",
      "On the neck over the carotid artery",
      "Over the apex of the heart, left side of the chest",
      "On the top of the foot",
    ],
    correct: 2,
    rationale:
      "The apical pulse is heard with a stethoscope over the apex of the heart — roughly the 5th intercostal space at the left midclavicular line. The radial and carotid are palpated, not the apical.",
  },
  {
    id: "q12",
    chapter: "vital-signs",
    bank: 2,
    prompt:
      "A blood pressure reading of 148/92 mmHg most likely indicates:",
    options: ["Normal blood pressure", "[Hypertension]", "[Hypoglycemia]", "Dehydration only"],
    correct: 1,
    rationale:
      "A reading at or above 130/80 mmHg signals hypertension. 148/92 is clearly elevated and should be rechecked and reported. Blood sugar is unrelated to a BP cuff reading.",
  },

  // ---- Pharmacology ----
  {
    id: "q13",
    chapter: "pharmacology",
    bank: 1,
    prompt: "Which of the following is one of the 'rights' of safe medication administration?",
    options: [
      "Right brand name",
      "Right pharmacy",
      "Right dose",
      "Right color",
    ],
    correct: 2,
    rationale:
      "The classic rights include the right client, drug, dose, route, time, and documentation. 'Right dose' is one of them; color and brand are not safety checks.",
  },
  {
    id: "q14",
    chapter: "pharmacology",
    bank: 1,
    prompt:
      "An order reads: give the medication [PRN] for pain. This means you give it:",
    options: [
      "Every 4 hours around the clock",
      "Only when the client needs it and criteria are met",
      "Immediately, one time only",
      "Before meals only",
    ],
    correct: 1,
    rationale:
      "PRN means 'as needed.' You give it only when the client requires it and the ordered criteria are met — not on a fixed schedule.",
  },
  {
    id: "q15",
    chapter: "pharmacology",
    bank: 1,
    prompt:
      "A client is [NPO] before surgery. The client asks for a sip of water. The BEST response is to:",
    options: [
      "Give a small sip since it is only water",
      "Explain that nothing by mouth is ordered and offer mouth care",
      "Give ice chips instead",
      "Ignore the request",
    ],
    correct: 1,
    rationale:
      "NPO means nothing by mouth — including water and ice chips — to prevent [aspiration] during surgery. Explain kindly and offer mouth care for comfort instead.",
  },

  // ---- Physiological Adaptation ----
  {
    id: "q16",
    chapter: "physiological-adaptation",
    bank: 1,
    prompt:
      "A client with diabetes reports feeling shaky and sweaty. The blood glucose reads 56 mg/dL — [hypoglycemia]. What should you offer FIRST?",
    options: [
      "A glass of water",
      "4 oz of fruit juice",
      "A short walk to help circulation",
      "An extra dose of insulin",
    ],
    correct: 1,
    rationale:
      "Low blood sugar needs fast-acting carbohydrate — 4 oz of juice raises glucose quickly. Water does nothing for glucose, walking burns more, and insulin would drop it further, which is dangerous.",
  },
  {
    id: "q17",
    chapter: "physiological-adaptation",
    bank: 1,
    prompt:
      "A client who had a stroke coughs and gags while drinking thin liquids — a sign of [dysphagia]. The BEST first response is to:",
    options: [
      "Encourage smaller, faster sips",
      "Stop the liquids and report it",
      "Switch to a straw",
      "Have the client lie down to rest",
    ],
    correct: 1,
    rationale:
      "Coughing with liquids after a stroke signals a swallowing problem and [aspiration] risk. Stop and report — a swallow evaluation is needed. Straws and lying down increase the risk.",
  },
  {
    id: "q18",
    chapter: "physiological-adaptation",
    bank: 1,
    prompt:
      "You notice a bluish tint to a client's lips and fingertips ([cyanosis]). This most likely means:",
    options: [
      "The client is too warm",
      "Low oxygen in the blood — check breathing and call for help",
      "The client just ate",
      "Normal aging skin",
    ],
    correct: 1,
    rationale:
      "Cyanosis is a bluish color from low oxygen. It is an emergency sign — assess breathing, apply oxygen if ordered, and get help immediately.",
  },
  {
    id: "q19",
    chapter: "physiological-adaptation",
    bank: 2,
    prompt:
      "An elderly client has dry mouth, dark urine, and new confusion. These are classic signs of:",
    options: ["[Hyperglycemia]", "[Dehydration]", "A healthy fluid balance", "[Edema]"],
    correct: 1,
    rationale:
      "Dry mouth, dark concentrated urine, and confusion point to dehydration, which is common and dangerous in older adults. Encourage fluids and report the change.",
  },

  // ---- Health Promotion ----
  {
    id: "q20",
    chapter: "health-promotion",
    bank: 1,
    prompt:
      "Which meal choice best supports wound healing for a recovering client?",
    options: [
      "White toast and black coffee",
      "Grilled chicken, spinach, and an orange",
      "Candy and soda",
      "Plain lettuce only",
    ],
    correct: 1,
    rationale:
      "Wound healing needs protein (chicken), vitamin C (orange), and iron/vitamins (spinach). Empty calories and low-protein choices slow healing.",
  },
  {
    id: "q21",
    chapter: "health-promotion",
    bank: 1,
    prompt:
      "When teaching an older adult about fall prevention at home, the BEST advice is to:",
    options: [
      "Use throw rugs to cover slippery floors",
      "Keep pathways clear and add night lighting",
      "Wear socks without shoes to move quietly",
      "Rush to answer the phone to stay active",
    ],
    correct: 1,
    rationale:
      "Clear pathways and good lighting prevent falls. Throw rugs and slippery socks are trip hazards, and rushing is a leading cause of falls.",
  },

  // ---- Psychosocial ----
  {
    id: "q22",
    chapter: "psychosocial",
    bank: 1,
    prompt:
      "A client says, 'I don't think I'll ever get better.' Which response is MOST therapeutic?",
    options: [
      "'Don't say that — you'll be fine.'",
      "'You sound discouraged. Tell me more about how you're feeling.'",
      "'Everyone feels that way sometimes.'",
      "'Let's talk about something happier.'",
    ],
    correct: 1,
    rationale:
      "Therapeutic communication acknowledges the feeling and invites the client to share. False reassurance ('you'll be fine') and changing the subject shut the conversation down.",
  },
  {
    id: "q23",
    chapter: "psychosocial",
    bank: 1,
    prompt:
      "A confused client keeps calling you by a family member's name. The BEST approach is to:",
    options: [
      "Correct the client firmly each time",
      "Play along and pretend to be the relative",
      "Gently reorient the client and stay calm and respectful",
      "Ignore the client",
    ],
    correct: 2,
    rationale:
      "Calm, respectful reorientation preserves dignity without arguing. Harsh correcting increases agitation, and pretending is dishonest and can deepen confusion.",
  },

  // ---- Client Rights & Communication ----
  {
    id: "q24",
    chapter: "clients-rights",
    bank: 1,
    prompt: "A client refuses a scheduled bath. You should:",
    options: [
      "Bathe the client anyway for hygiene",
      "Respect the refusal, offer again later, and report it",
      "Tell the client they have no choice",
      "Document that care was given",
    ],
    correct: 1,
    rationale:
      "Clients have the right to refuse care. Never force it — that can be battery. Respect the choice, try again later, and report/document the refusal accurately.",
  },
  {
    id: "q25",
    chapter: "clients-rights",
    bank: 1,
    prompt:
      "A visitor asks you about another client's diagnosis. The BEST response is to:",
    options: [
      "Share the details since they seem concerned",
      "Explain that you can't share private health information",
      "Give a general summary only",
      "Direct them to read the chart",
    ],
    correct: 1,
    rationale:
      "Client health information is confidential. You cannot share it with anyone not authorized — kindly explain the privacy rule and redirect the visitor.",
  },
];

// -- selectors ---------------------------------------------------------------

export function questionsForChapters(slugs: string[], bank?: 1 | 2): Question[] {
  return QUESTIONS.filter(
    (q) => (slugs.length === 0 || slugs.includes(q.chapter)) && (!bank || q.bank === bank)
  );
}

export function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
