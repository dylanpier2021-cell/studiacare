"use client";

import { Suspense, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Logo } from "@/components/Logo";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useApp } from "@/lib/store";
import { PLANS, stripeConfigured } from "@/lib/config";
import type { Tier } from "@/lib/types";

export default function CheckoutPage() {
  return (
    <Suspense fallback={<div className="p-10 text-center text-ink-faint">Loading…</div>}>
      <Checkout />
    </Suspense>
  );
}

function Checkout() {
  const params = useSearchParams();
  const router = useRouter();
  const { user, setTier } = useApp();
  const planId = (params.get("plan") as Tier) || "standard";
  const plan = PLANS.find((p) => p.id === planId) ?? PLANS[1];

  const [coupon, setCoupon] = useState("");
  const [couponMsg, setCouponMsg] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const trial = plan.id === "standard"; // first month free

  function applyCoupon() {
    if (!coupon.trim()) return;
    // Demo mode validates client-side; real Stripe validates the coupon at checkout.
    // {{CONFIRM WITH CLIENT: exact "$21 off" coupon — amount, one-time vs recurring, code.}}
    setCouponMsg(`Coupon "${coupon.trim().toUpperCase()}" will be applied at payment.`);
  }

  async function pay() {
    setError(null);
    setBusy(true);
    try {
      if (stripeConfigured()) {
        // Real Stripe: create a Checkout Session server-side and redirect.
        const res = await fetch("/api/checkout", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ plan: plan.id, coupon: coupon.trim() || undefined }),
        });
        const data = await res.json();
        if (data.url) {
          window.location.href = data.url;
          return;
        }
        setError(data.error || "Could not start checkout.");
      } else {
        // Demo mode: simulate a successful subscription.
        setTier(plan.id);
        router.push("/dashboard?upgraded=1");
        return;
      }
    } catch {
      setError("Something went wrong. Try again.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-soft">
      <div className="max-w-wrap w-full mx-auto px-5 h-16 flex items-center justify-between">
        <Logo />
        <ThemeToggle />
      </div>

      <div className="flex-1 flex items-center justify-center px-5 py-8">
        <div className="w-full max-w-md">
          <div className="card p-7">
            <span className="pill">Checkout</span>
            <h1 className="text-2xl font-extrabold mt-3">StudiaCare {plan.name}</h1>

            <div className="flex items-end gap-1 mt-2">
              <span className="text-4xl font-extrabold">{plan.price}</span>
              <span className="text-ink-faint font-semibold mb-1">/mo</span>
            </div>
            {trial && (
              <p className="text-good text-sm font-semibold mt-1">
                First month free — you won&apos;t be charged today.
              </p>
            )}

            <ul className="mt-4 space-y-1.5">
              {plan.features.map((f) => (
                <li key={f} className="text-sm text-ink-soft flex gap-2">
                  <span className="text-good font-bold">✓</span>
                  {f}
                </li>
              ))}
            </ul>

            {/* Coupon */}
            <div className="mt-6">
              <label className="label">Have a coupon?</label>
              <div className="flex gap-2">
                <input
                  className="field"
                  placeholder="Enter code"
                  value={coupon}
                  onChange={(e) => setCoupon(e.target.value)}
                />
                <button onClick={applyCoupon} className="btn btn-ghost btn-sm whitespace-nowrap">
                  Apply
                </button>
              </div>
              {couponMsg && <p className="text-good text-sm mt-2">{couponMsg}</p>}
            </div>

            {error && <p className="text-bad text-sm mt-4">{error}</p>}

            {user ? (
              <button onClick={pay} className="btn btn-primary w-full mt-6" disabled={busy}>
                {busy ? "Starting…" : trial ? "Start free month" : `Subscribe — ${plan.price}/mo`}
              </button>
            ) : (
              <div className="mt-6">
                <Link href={`/signup`} className="btn btn-primary w-full">
                  Create an account to continue
                </Link>
                <p className="text-center text-xs text-ink-faint mt-2">
                  Already have one?{" "}
                  <Link href="/login" className="text-brand font-semibold">
                    Log in
                  </Link>
                </p>
              </div>
            )}

            <p className="text-xs text-ink-faint mt-4 text-center">
              {stripeConfigured()
                ? "Payments processed securely by Stripe."
                : "Demo mode: this simulates a subscription. Real Stripe checkout turns on once keys are added."}
            </p>
          </div>

          <p className="text-center mt-4">
            <Link href="/#pricing" className="text-sm text-ink-faint hover:text-brand">
              ← Compare plans
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
