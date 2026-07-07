import { NextResponse } from "next/server";
import Stripe from "stripe";

// Creates a Stripe Checkout Session for a subscription.
// {{NEED FROM CLIENT: her Stripe secret key + the two recurring price IDs.}}
// Runs only when Stripe is configured; otherwise the client uses demo mode.
export async function POST(req: Request) {
  const secret = process.env.STRIPE_SECRET_KEY;
  if (!secret || secret.includes("xxx")) {
    return NextResponse.json(
      { error: "Stripe is not configured. Add STRIPE_SECRET_KEY to enable real checkout." },
      { status: 400 }
    );
  }

  const stripe = new Stripe(secret);
  const { plan } = (await req.json()) as { plan: "standard" | "advanced"; coupon?: string };

  const priceId =
    plan === "advanced"
      ? process.env.NEXT_PUBLIC_STRIPE_PRICE_ADVANCED
      : process.env.NEXT_PUBLIC_STRIPE_PRICE_STANDARD;

  if (!priceId || priceId.includes("xxx")) {
    return NextResponse.json(
      { error: `Missing Stripe price ID for the ${plan} plan.` },
      { status: 400 }
    );
  }

  const site = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  try {
    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      line_items: [{ price: priceId, quantity: 1 }],
      // First month free on Standard.
      subscription_data: plan === "standard" ? { trial_period_days: 30 } : undefined,
      // Lets students enter the coupon/promotion code on the Stripe page.
      // {{CONFIRM WITH CLIENT: create the "$21 off" promotion code in her Stripe dashboard.}}
      allow_promotion_codes: true,
      success_url: `${site}/dashboard?upgraded=1`,
      cancel_url: `${site}/checkout?plan=${plan}`,
    });
    return NextResponse.json({ url: session.url });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Stripe error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
