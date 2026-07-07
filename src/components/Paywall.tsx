import Link from "next/link";
import { FREE_QUESTION_LIMIT } from "@/lib/config";

/** Shown when a free user has used their free questions. */
export function Paywall({ compact = false }: { compact?: boolean }) {
  return (
    <div className={`card text-center ${compact ? "p-6" : "p-8 sm:p-10"} max-w-xl mx-auto`}>
      <span className="pill">You've hit the free limit</span>
      <h2 className="text-2xl font-extrabold mt-3 mb-2">
        That's your {FREE_QUESTION_LIMIT} free questions
      </h2>
      <p className="text-ink-soft mb-6">
        You've felt what the exam feels like. Keep conditioning with the full
        100-question bank — <strong>your first month is free.</strong>
      </p>
      <div className="flex flex-wrap gap-3 justify-center">
        <Link href="/checkout?plan=standard" className="btn btn-primary">
          Start my free month
        </Link>
        <Link href="/checkout?plan=advanced" className="btn btn-ghost">
          See Advanced
        </Link>
      </div>
      <p className="text-xs text-ink-faint mt-4">Cancel anytime. No card needed to keep your progress.</p>
    </div>
  );
}
