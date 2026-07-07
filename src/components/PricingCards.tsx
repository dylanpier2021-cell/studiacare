import Link from "next/link";
import { PLANS } from "@/lib/config";
import { IconCheck } from "./Icons";

/**
 * Pricing grid, shared by the landing page and checkout.
 * Free → signup; paid → checkout with the chosen plan.
 */
export function PricingCards() {
  return (
    <div className="grid gap-5 md:grid-cols-3 max-w-4xl mx-auto mt-9 text-left">
      {PLANS.map((p) => {
        const href = p.id === "free" ? "/signup" : `/checkout?plan=${p.id}`;
        return (
          <div
            key={p.id}
            className={`card glow-hover p-7 flex flex-col relative ${
              p.featured ? "ring-glow border-brand" : ""
            }`}
          >
            {p.featured && (
              <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 text-white text-xs font-bold px-4 py-1.5 rounded-full whitespace-nowrap bg-gradient-to-r from-brand to-[color:var(--brand2)] shadow-[0_8px_20px_-8px_var(--glow)]">
                Most popular · First month FREE
              </span>
            )}
            <h3 className="text-lg font-bold">{p.name}</h3>
            <div className="text-4xl font-extrabold mt-2">
              {p.id === "free" ? (
                p.price
              ) : (
                <span className="text-gradient">{p.price}</span>
              )}
              {p.id !== "free" && (
                <span className="text-base font-semibold text-ink-faint">/mo</span>
              )}
            </div>
            <div className="text-sm text-ink-faint mb-4">{p.cadence}</div>
            <ul className="space-y-2 mb-6 flex-1">
              {p.features.map((f) => (
                <li key={f} className="text-sm text-ink-soft flex gap-2 items-start">
                  <IconCheck className="w-4 h-4 text-good shrink-0 mt-0.5" />
                  {f}
                </li>
              ))}
            </ul>
            <Link
              href={href}
              className={`btn ${p.featured ? "btn-primary" : "btn-ghost"} w-full`}
            >
              {p.cta}
            </Link>
          </div>
        );
      })}
    </div>
  );
}
