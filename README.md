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
5. Everything is unlocked — mock exams, reading trainer, unlimited questions.
6. Toggle light / dark any time — the theme persists.

---

## It's free right now

`FREE_ACCESS` in [`src/lib/config.ts`](src/lib/config.ts) is `true`, so anyone can
sign up and use **everything** — all quizzes, mock exams, flashcards, the reading
trainer, progress tracking — with no paywall and no card. The whole Stripe/paid-tier
system is still wired behind that flag; flip it to `false` later to re-enable the
$9 / $15 tiers and the 75-question free limit.

## Go live (make it real, multi-user, cloud-synced) — ~5 minutes

The app runs great in local/demo mode (localStorage) with zero setup. To turn it
into real production software with real accounts and cloud-synced progress:

1. Create a **Supabase** project (supabase.com → New project).
2. In the SQL editor, paste + run [`supabase/schema.sql`](supabase/schema.sql)
   (creates tables, RLS, and the signup trigger).
3. Add three env vars (locally in `.env.local`, and in the Vercel project settings):
   ```
   NEXT_PUBLIC_SUPABASE_URL=...        # Supabase → Settings → API
   NEXT_PUBLIC_SUPABASE_ANON_KEY=...
   SUPABASE_SERVICE_ROLE_KEY=...       # server only
   ```
4. Redeploy. That's it — the app auto-detects the keys and switches from
   localStorage to **real Supabase auth + Postgres**: accounts, sessions, and
   per-user progress/attempts persist to the cloud and sync across devices, with
   Row Level Security so each user only sees their own data.

Stripe is optional while the app is free. When you re-enable paid tiers, add the
Stripe keys + price IDs from `.env.local.example`.

Everything degrades gracefully: no keys = demo mode, so it's always runnable.

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
| Free access — everything unlocked, no paywall (FREE_ACCESS flag) | ✅ |
| Real Supabase persistence — auth + progress/attempts sync + RLS | ✅ wired |
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
