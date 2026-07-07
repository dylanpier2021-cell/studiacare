import Link from "next/link";
import { PLANS } from "@/lib/config";

/**
 * Pricing grid, shared by the landing page and checkout.
 * Free → signup; paid → checkout with the chosen plan.
 */
export function PricingCards() {
  return (
    <div className="grid gap-5 md:grid-cols-3 max-w-4xl mx-auto mt-9">
      {PLANS.map((p) => {
        const href = p.id === "free" ? "/signup" : `/checkout?plan=${p.id}`;
        return (
          <div
            key={p.id}
            className={`card p-7 flex flex-col relative ${p.featured ? "border-2 border-brand" : ""}`}
          >
            {p.featured && (
              <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-brand text-white text-xs font-bold px-4 py-1.5 rounded-full whitespace-nowrap">
                Most popular · First month FREE
              </span>
            )}
            <h3 className="text-lg font-bold">{p.name}</h3>
            <div className="text-4xl font-extrabold mt-2">
              {p.price}
              {p.id !== "free" && <span className="text-base font-semibold text-ink-faint">/mo</span>}
            </div>
            <div className="text-sm text-ink-faint mb-4">{p.cadence}</div>
            <ul className="space-y-2 mb-6 flex-1">
              {p.features.map((f) => (
                <li key={f} className="text-sm text-ink-soft flex gap-2">
                  <span className="text-good font-extrabold">✓</span>
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
