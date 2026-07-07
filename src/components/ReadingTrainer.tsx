"use client";

import { useEffect, useRef, useState } from "react";

const SPEEDS = [
  { label: "Warm-up", ms: 900 },
  { label: "Exam pace", ms: 600 },
  { label: "Challenge", ms: 380 },
];

/**
 * Disappearing-words reading trainer. Words fade out one by one at the chosen
 * pace, training the student to read at exam speed. (Advanced-tier feature.)
 */
export function ReadingTrainer({ text }: { text: string }) {
  const words = text.split(/\s+/);
  const [gone, setGone] = useState(0);
  const [running, setRunning] = useState(false);
  const [speed, setSpeed] = useState(SPEEDS[1].ms);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  function stop() {
    if (timer.current) clearInterval(timer.current);
    timer.current = null;
    setRunning(false);
  }

  function start() {
    stop();
    setGone(0);
    setRunning(true);
    let i = 0;
    timer.current = setInterval(() => {
      i += 1;
      setGone(i);
      if (i >= words.length) stop();
    }, speed);
  }

  function reset() {
    stop();
    setGone(0);
  }

  useEffect(() => () => stop(), []);

  return (
    <div>
      <div className="bg-soft rounded-card p-6 text-lg leading-[2] min-h-[160px]">
        {words.map((w, i) => (
          <span key={i} className={`rw ${i < gone ? "gone" : ""}`}>
            {w}{" "}
          </span>
        ))}
      </div>
      <div className="flex flex-wrap gap-3 items-center mt-4">
        <button onClick={start} className="btn btn-primary btn-sm" disabled={running}>
          {running ? "Reading…" : "Start reading"}
        </button>
        <button onClick={reset} className="btn btn-ghost btn-sm">
          Reset
        </button>
        <label className="text-sm text-ink-soft font-semibold flex items-center gap-2">
          Speed:
          <select
            value={speed}
            onChange={(e) => setSpeed(Number(e.target.value))}
            className="field !w-auto !py-2 !px-3"
          >
            {SPEEDS.map((s) => (
              <option key={s.ms} value={s.ms}>
                {s.label}
              </option>
            ))}
          </select>
        </label>
      </div>
    </div>
  );
}
