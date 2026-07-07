# StudiaCare — Rough Draft 2

Timed, exam-style nursing **state-exam prep** web app for nursing/college students.
Built for Justimie Mambongo by Pierson Digital Marketing.

> **Rough Draft 1** was a single-file landing demo. **This** is the real app:
> Next.js + Supabase + Stripe, all 9 pages, mobile-first, light + dark mode.

---

## Run it locally (zero setup)

```bash
npm install
npm run dev        # http://localhost:3000
```

That's it. The app runs in **demo mode** out of the box — accounts and progress
are stored in your browser's localStorage, and checkout is simulated — so you can
click through the entire free-tier flow without any keys. Add Supabase/Stripe keys
(below) to switch on real auth and payments.

### Try the flow

1. Open `/` — the landing page (hero, demo quiz, pricing).
2. **Start free** → create an account (`/signup`).
3. Dashboard shows your 7-day study cycle and today's task.
4. **Build your quiz** (`/quiz/setup`) → pick chapters → timed quiz → results with
   rationales and per-topic feedback.
5. After 75 questions the **paywall** appears. **Checkout** simulates the upgrade.
6. Toggle 🌙 / ☀️ any time — the theme persists.

---

## Turning on real services

Copy `.env.local.example` → `.env.local` and fill in:

- **Supabase** (auth + Postgres): create a project, paste the URL + anon key.
  Then run [`supabase/schema.sql`](supabase/schema.sql) in the SQL editor. The app
  auto-detects the keys and switches from localStorage to real Supabase auth.
- **Stripe** (subscriptions): paste her test keys and create two recurring prices
  (Standard $9/mo, Advanced $15/mo). Checkout then creates a real Stripe session
  with the first-month-free trial and coupon support.

Everything degrades gracefully: no keys = demo mode, so the draft is always runnable.

---

## Deploy to Vercel

1. Push this repo to GitHub (`dylanpier2021-cell`).
2. Import into Vercel → framework auto-detected (Next.js).
3. Add the env vars from `.env.local.example` in the Vercel dashboard.
4. Point **StudiaCare.com** at the Vercel project.

---

## What's built

| Area | Status |
|---|---|
| Landing (hero, how-it-works, story, live demo, pricing, FAQ, SEO/JSON-LD) | ✅ |
| Auth: signup / login / reset (Supabase-ready, localStorage fallback) | ✅ |
| Dashboard: 7-day cycle, streak, today's plan, quick actions, recent sessions | ✅ |
| Quiz engine: **timed**, one-at-a-time, rationale on every answer | ✅ |
| Custom quizzes: pick chapters / weak areas, choose length | ✅ |
| Results: score, per-topic feedback, weak areas, full rationale review | ✅ |
| Free-tier gate (first 75 questions) → paywall | ✅ |
| Hover-to-define terms (hover + tap) | ✅ |
| Flashcards by chapter (flip) | ✅ |
| Chapters: list → chapter page (video slot, reading, chapter quiz) | ✅ |
| Disappearing-words reading trainer (Advanced tier) | ✅ |
| Profile: progress by chapter, subscription, reminder settings | ✅ |
| Checkout: plan summary, **coupon field**, Stripe (test) + demo mode | ✅ |
| Light / dark mode, persisted | ✅ |
| AI reminders — **settings UI built, sending stubbed** | ◻️ stub |
| Real question bank, Supabase project, Stripe products, domain | ⏳ client/setup |

Search the codebase for `{{NEED FROM CLIENT}}` / `{{CONFIRM WITH CLIENT}}` to find
every open question in place.

## Structure

```
src/
  app/            # pages (App Router) + api/checkout, api/reminders
  components/     # Quiz, Flashcards, ReadingTrainer, nav, Define (hover-to-define)…
  lib/            # store.tsx (auth + progress), config.ts (pricing/gating), supabase/
  data/           # questions, flashcards, chapters, glossary, passages, studyPlan
supabase/schema.sql   # tables + Row Level Security
```

## Notes for the client build

- **Confirm the exam** (NCLEX-RN vs CNA) — it decides the whole question bank.
- The 25 seed questions are clearly marked **samples**. No fabricated testimonials.
- The "$21 off" coupon: build supports Stripe promotion codes; confirm the exact
  amount / whether it's one-time or recurring.
