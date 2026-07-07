// Hover-to-define glossary. In question/flashcard text, wrap a term in
// [square brackets] and the <RichText> component turns it into a hover/tap
// tooltip. Words not found here render as plain text.
// {{NEED FROM CLIENT: extend this glossary alongside the real question bank.}}
export const GLOSSARY: Record<string, string> = {
  hypoglycemia:
    "Low blood sugar, typically below 70 mg/dL. Watch for shakiness, sweating, and confusion.",
  hyperglycemia:
    "High blood sugar. Watch for excessive thirst, frequent urination, and fatigue.",
  supine: "Lying flat on the back, face up.",
  prone: "Lying flat on the stomach, face down.",
  "lateral position": "Lying on one side.",
  "fowler's position":
    "Sitting up with the head of the bed raised 45–60°. Eases breathing and feeding.",
  asepsis: "Practices that keep an area free of germs and infection.",
  "orthostatic hypotension":
    "A drop in blood pressure when standing up, causing dizziness or fainting.",
  dysphagia: "Difficulty swallowing; raises the risk of choking or aspiration.",
  aspiration: "Food, liquid, or saliva entering the airway or lungs instead of the stomach.",
  ambulate: "To walk or move about.",
  edema: "Swelling caused by extra fluid trapped in the body's tissues.",
  cyanosis: "A bluish color of the skin or lips from low oxygen in the blood.",
  "vital signs":
    "Temperature, pulse, respirations, and blood pressure — the basic measures of body function.",
  hypertension: "Consistently high blood pressure, generally 130/80 mmHg or above.",
  "apical pulse": "The heartbeat heard over the apex of the heart with a stethoscope.",
  NPO: "'Nothing by mouth' — the client should not eat or drink.",
  PRN: "'As needed' — given only when required, not on a fixed schedule.",
  incontinence: "Loss of control over urination or bowel movements.",
  "pressure injury":
    "Skin and tissue damage from prolonged pressure, often over bony areas. Also called a pressure ulcer or bedsore.",
  dehydration: "Not enough fluid in the body. Signs include dry mouth, dark urine, and confusion.",
  hemorrhage: "Rapid, excessive bleeding.",
  tachycardia: "A fast heart rate, generally over 100 beats per minute in an adult.",
  bradycardia: "A slow heart rate, generally under 60 beats per minute in an adult.",
  "range of motion":
    "Moving a joint through its full movement to keep it flexible and prevent stiffness.",
  "restraint alternative":
    "A less-restrictive option (like a bed alarm or closer supervision) used before any physical restraint.",
};

export function defineTerm(word: string): string | undefined {
  return GLOSSARY[word.toLowerCase()];
}
