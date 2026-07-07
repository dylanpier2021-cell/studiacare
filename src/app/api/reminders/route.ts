import { NextResponse } from "next/server";

// Study-reminder sender — STUBBED for the draft.
//
// The settings UI (Profile → Study reminders) already saves each user's
// schedule. Wiring the actual send is the remaining piece:
//   1. A cron trigger (e.g. Vercel Cron) hits this route on a schedule.
//   2. It reads users whose reminder time matches and sends via a provider.
//
// {{NEED FROM CLIENT: email vs SMS, provider (Resend/SendGrid/Twilio), and copy.}}
export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));
  // Intentionally does not send anything yet.
  console.log("[reminders] would send reminder:", body);
  return NextResponse.json({
    ok: true,
    sent: false,
    note: "Reminder sending is stubbed. Connect an email/SMS provider to enable.",
  });
}

export async function GET() {
  return NextResponse.json({
    ok: true,
    note: "Reminders stub. POST here from a scheduler once a provider is connected.",
  });
}
