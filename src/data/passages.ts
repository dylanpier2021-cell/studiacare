// Reading-trainer passages (disappearing-words trainer). Placeholders for the
// draft. {{NEED FROM CLIENT: real reading passages per chapter.}}
export interface Passage {
  id: string;
  chapter: string;
  title: string;
  text: string;
}

export const PASSAGES: Passage[] = [
  {
    id: "p1",
    chapter: "basic-nursing-skills",
    title: "Safe ambulation after surgery",
    text: "A nurse aide enters the room of a client recovering from hip surgery. The client asks to walk to the bathroom. Before helping, the aide checks the care plan, locks the bed wheels, helps the client sit and dangle first, and applies non-slip footwear. Reading fast and catching every detail is how you finish long exam questions with time to spare.",
  },
  {
    id: "p2",
    chapter: "safety-infection-control",
    title: "Standard precautions",
    text: "Standard precautions apply to every client, every time, regardless of diagnosis. Perform hand hygiene before and after contact. Wear gloves when touching blood or body fluids, and add a gown, mask, or eye protection when splashes are likely. Remove protective equipment carefully so the contaminated surfaces never touch your skin, and wash your hands again when you are done.",
  },
  {
    id: "p3",
    chapter: "physiological-adaptation",
    title: "Recognizing low blood sugar",
    text: "A client with diabetes may develop low blood sugar quickly. Early signs include shakiness, sweating, hunger, and irritability. If the client is awake and able to swallow, offer a fast-acting carbohydrate such as four ounces of juice, wait fifteen minutes, and recheck. Report the episode. Reading the signs early, under pressure, is exactly the skill the exam is testing.",
  },
];

export function passageForChapter(slug: string): Passage | undefined {
  return PASSAGES.find((p) => p.chapter === slug) ?? PASSAGES[0];
}
