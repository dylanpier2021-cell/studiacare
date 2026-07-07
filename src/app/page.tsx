import Link from "next/link";
import { SiteNav } from "@/components/SiteNav";
import { Footer } from "@/components/Footer";
import { LandingDemo } from "@/components/LandingDemo";
import { PricingCards } from "@/components/PricingCards";
import { Reveal } from "@/components/Reveal";
import {
  IconClock,
  IconLayers,
  IconSpark,
  IconBook,
  IconCards,
  IconEye,
  IconBell,
  IconChart,
  IconArrow,
  IconCheck,
} from "@/components/Icons";

const FEATURES = [
  { Icon: IconClock, title: "Timed everything", body: "The state exam is timed, so we time every quiz and mock exam. The clock stops being scary when you practice with it daily." },
  { Icon: IconLayers, title: "100-question conditioning", body: "The real exam is 85 questions. You train with 100, so your focus outlasts the test instead of fading at question 60." },
  { Icon: IconSpark, title: "A rationale on every answer", body: "Right or wrong, every question explains why — short rationales that teach as you practice, not just a score at the end." },
  { Icon: IconBook, title: "Hover-to-define terms", body: "Hit a hard word mid-question? Hover or tap and get the definition instantly. No leaving the question to look it up." },
  { Icon: IconCards, title: "Custom quizzes & flashcards", body: "Study by chapter, drill flashcards, and build custom quizzes so you spend time on what challenges you." },
  { Icon: IconEye, title: "Reading trainer", body: "Words disappear as you read, at the pace the exam demands. Train your reading speed so long questions never eat your clock." },
  { Icon: IconBell, title: "Study reminders", body: "Life gets busy. StudiaCare nudges you on a schedule so exam day never sneaks up on you." },
  { Icon: IconChart, title: "Progress on your profile", body: "Log in and see exactly where you stand — scores by chapter, weak spots, streaks, and how ready you actually are." },
];

const HOW = [
  { n: "01", title: "Start free", body: "Create an account and get your first 75 questions free — no card. Feel the real exam pressure right away." },
  { n: "02", title: "Train on a 7-day cycle", body: "Follow a simple weekly plan. Each day your dashboard tells you exactly what to study next." },
  { n: "03", title: "Walk in ready", body: "By exam day you've sat a hundred timed questions many times over. The real 85 feels familiar, not frightening." },
];

const FAQS = [
  { q: "Why 100 questions when the real exam is 85?", a: "Conditioning. If you can sit 100 timed questions and stay sharp, the real 85 feels familiar instead of exhausting. You walk in already used to it." },
  { q: "Is it really timed like the real exam?", a: "Yes. Every practice session runs on a clock because the state exam does too. The timer stops being scary when you see it every day." },
  { q: "What do I get for free?", a: "Your first 75 questions with feedback and hover definitions — no credit card. After that, Standard is $9/month and your first month is free." },
  { q: "Do I get explanations, or just a score?", a: "Every single question shows a rationale — why the right answer is right and why yours was wrong. You learn while practicing, not after." },
  { q: "Can I study on my phone?", a: "Yes. StudiaCare is built mobile-first and works on your phone, tablet, and computer, in light or dark mode." },
];

export default function Landing() {
  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <>
      <SiteNav />

      {/* ===================== HERO ===================== */}
      <header className="relative overflow-hidden">
        {/* aurora orbs */}
        <div className="orb orb-a w-[380px] h-[380px] -top-24 -right-16" />
        <div className="orb orb-b w-[320px] h-[320px] top-40 -left-24" />
        <div className="orb orb-c w-[260px] h-[260px] bottom-0 right-24 hidden md:block" />

        <div className="relative max-w-wrap mx-auto px-5 pt-14 pb-16 sm:pt-20 grid gap-12 items-center md:grid-cols-[1.05fr_.95fr]">
          <div className="animate-in">
            <span className="pill inline-flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-good pulse-dot" />
              Nursing State Exam Prep
            </span>
            <h1 className="text-4xl sm:text-[3.4rem] font-extrabold leading-[1.05] mt-4 mb-4">
              I passed the state exam <span className="text-gradient">the first time.</span>
            </h1>
            <p className="text-lg text-ink-soft mb-4 max-w-xl">
              If you want to pass the first time like me — let me teach you. Timed, exam-style
              practice that makes test day feel like something you&apos;ve already done.
            </p>
            <p className="text-ink-soft italic mb-7 max-w-xl border-l-2 border-brand pl-4">
              &ldquo;I wasn&apos;t used to sitting in a room for 2 hours without moving. Training
              like this makes the real exam feel familiar.&rdquo;
            </p>
            <div className="flex flex-wrap gap-3 mb-5">
              <Link href="/signup" className="btn btn-primary">
                Start free — 75 questions <IconArrow className="w-4 h-4" />
              </Link>
              <a href="#demo" className="btn btn-ghost">
                Try a question
              </a>
            </div>
            <div className="flex gap-6 flex-wrap pt-2">
              {[
                ["100", "conditioning questions"],
                ["Timed", "like the real exam"],
                ["Every answer", "explained"],
              ].map(([b, s]) => (
                <div key={s}>
                  <b className="block text-2xl font-extrabold text-gradient">{b}</b>
                  <span className="text-xs text-ink-faint">{s}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Photo collage */}
          <div className="relative animate-in" style={{ animationDelay: "120ms" }}>
            <div className="ring-glow rounded-[24px] overflow-hidden float-slow">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/hero-scrubs.jpg"
                alt="A nurse in scrubs with a stethoscope"
                className="w-full h-[420px] object-cover"
                width={700}
                height={420}
              />
            </div>
            {/* floating glucose card */}
            <div className="absolute -bottom-6 -left-4 sm:-left-8 w-40 sm:w-48 rounded-2xl overflow-hidden ring-glow float-slower bg-card">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/glucose.jpg"
                alt="Checking blood glucose"
                className="w-full h-32 sm:h-36 object-cover"
                width={200}
                height={150}
              />
            </div>
            {/* floating stat chip */}
            <div className="absolute -top-5 -right-3 glass rounded-2xl px-4 py-3 float-slow shadow-card">
              <div className="flex items-center gap-2">
                <IconClock className="w-5 h-5 text-brand" />
                <div>
                  <div className="tabular font-extrabold leading-none">85:00</div>
                  <div className="text-[10px] text-ink-faint">exam clock</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* ===================== FEATURES ===================== */}
      <section id="features" className="py-16 relative">
        <div className="max-w-wrap mx-auto px-5">
          <Reveal className="text-center max-w-xl mx-auto">
            <span className="pill">Why StudiaCare</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold mt-3 mb-2">
              Built to feel like the <span className="text-gradient">actual exam</span>
            </h2>
            <p className="text-ink-soft">
              No gimmicks, no cartoon mascots. A serious, calm study space that trains you under the
              same pressure you&apos;ll feel on test day.
            </p>
          </Reveal>

          <div className="grid gap-4 mt-10 sm:grid-cols-2 lg:grid-cols-4">
            {FEATURES.map((f, i) => (
              <Reveal key={f.title} delay={(i % 4) * 80}>
                <div className="card glow-hover p-6 h-full">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center text-white mb-4 bg-gradient-to-br from-brand to-[color:var(--brand2)] shadow-[0_10px_24px_-10px_var(--glow)]">
                    <f.Icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-bold mb-1">{f.title}</h3>
                  <p className="text-sm text-ink-soft">{f.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== FULL-BLEED BAND ===================== */}
      <section className="relative overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/corridor.jpg"
          alt="Nurses in a hospital corridor"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#06141b]/95 via-[#06141b]/80 to-[#0e7c86]/50" />
        <div className="relative max-w-wrap mx-auto px-5 py-20 sm:py-24">
          <Reveal className="max-w-lg text-white">
            <span className="pill !bg-white/15 !text-white">The idea behind it</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold mt-3 mb-3">
              Train under real conditions until the real thing feels familiar.
            </h2>
            <p className="text-white/80">
              What makes the state exam hard isn&apos;t just the questions — it&apos;s the
              conditions. The silent room. The clock. Two hours without moving. StudiaCare puts you
              there early, so exam day is something you&apos;ve already lived.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ===================== HOW IT WORKS ===================== */}
      <section id="how" className="py-16">
        <div className="max-w-wrap mx-auto px-5">
          <Reveal className="text-center">
            <span className="pill">How it works</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold mt-3 mb-8">Three steps to exam day</h2>
          </Reveal>
          <div className="grid gap-5 md:grid-cols-3">
            {HOW.map((h, i) => (
              <Reveal key={h.n} delay={i * 90}>
                <div className="card glow-hover p-7 h-full">
                  <div className="text-4xl font-extrabold text-gradient mb-2">{h.n}</div>
                  <h3 className="font-bold mb-1">{h.title}</h3>
                  <p className="text-sm text-ink-soft">{h.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== STORY / ABOUT ===================== */}
      <section id="story" className="py-16 bg-soft">
        <div className="max-w-wrap mx-auto px-5 grid gap-10 items-center md:grid-cols-2">
          <Reveal>
            <span className="pill">About me</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold mt-3 mb-3">
              Built by an instructor who <span className="text-gradient">passed the first time.</span>
            </h2>
            <p className="text-ink-soft mb-5">
              StudiaCare comes from one idea: practice under real conditions until the real thing
              feels like something you&apos;re already used to. Serious, calm, and focused — like the
              exam room itself.
            </p>
            <blockquote className="glass rounded-2xl p-6 text-lg font-bold leading-relaxed">
              &ldquo;I passed the state exam the first time. If you want to pass the first time like
              me — let me teach you.&rdquo;
              <div className="text-sm font-medium text-ink-faint mt-3">
                {/* {{NEED FROM CLIENT: confirm exact About Me wording; client asked for no face/photo}} */}
                — Your instructor, StudiaCare
              </div>
            </blockquote>
          </Reveal>
          <Reveal delay={100} className="relative">
            <div className="ring-glow rounded-[24px] overflow-hidden float-slow">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/stethoscope.jpg"
                alt="A stethoscope"
                className="w-full h-[360px] object-cover"
                width={560}
                height={360}
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ===================== DEMO ===================== */}
      <section id="demo" className="py-16 relative overflow-hidden">
        <div className="orb orb-b w-[340px] h-[340px] top-10 -right-24" />
        <div className="relative max-w-wrap mx-auto px-5">
          <Reveal className="text-center mb-8">
            <span className="pill">Live demo</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold mt-3 mb-2">Try it right now</h2>
            <p className="text-ink-soft max-w-xl mx-auto">
              A small taste — the full version has 100+ questions across every chapter, with your
              progress saved.
            </p>
          </Reveal>
          <Reveal>
            <LandingDemo />
          </Reveal>
        </div>
      </section>

      {/* ===================== PRICING ===================== */}
      <section id="pricing" className="py-16 bg-soft">
        <div className="max-w-wrap mx-auto px-5 text-center">
          <Reveal>
            <span className="pill">Simple pricing</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold mt-3 mb-2">
              Start free. Stay because it works.
            </h2>
            <p className="text-ink-soft max-w-xl mx-auto">
              Your first 75 questions cost nothing. Upgrade when you&apos;re ready for the full bank.
            </p>
          </Reveal>
          <Reveal>
            <PricingCards />
          </Reveal>
          <p className="text-xs text-ink-faint mt-6 inline-flex items-center gap-1.5 justify-center">
            <IconCheck className="w-4 h-4 text-good" />
            Payments secured by Stripe. Have a coupon? Add it at checkout.
            {/* {{CONFIRM WITH CLIENT: $21 coupon details — amount, one-time vs recurring}} */}
          </p>
        </div>
      </section>

      {/* ===================== FAQ ===================== */}
      <section id="faq" className="py-16">
        <div className="max-w-2xl mx-auto px-5">
          <Reveal className="text-center mb-6">
            <span className="pill">FAQ</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold mt-3">Questions students ask</h2>
          </Reveal>
          <Reveal>
            {FAQS.map((f) => (
              <details key={f.q} className="border-b border-line py-4 group">
                <summary className="font-bold cursor-pointer flex justify-between items-center list-none gap-4">
                  {f.q}
                  <span className="text-brand text-xl shrink-0 group-open:hidden">+</span>
                  <span className="text-brand text-xl shrink-0 hidden group-open:inline">–</span>
                </summary>
                <p className="mt-2 text-ink-soft text-sm">{f.a}</p>
              </details>
            ))}
          </Reveal>
        </div>
      </section>

      {/* ===================== FINAL CTA ===================== */}
      <section className="py-12">
        <div className="max-w-wrap mx-auto px-5">
          <div className="relative overflow-hidden rounded-[28px] p-10 sm:p-14 text-center bg-gradient-to-br from-brand to-[color:var(--brand2)] ring-glow">
            <div className="orb orb-c w-[280px] h-[280px] -top-10 -left-10 !opacity-30" />
            <div className="relative">
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
                Walk in on exam day like you&apos;ve done it before.
              </h2>
              <p className="text-white/85 max-w-md mx-auto mt-3 mb-7">
                Because with StudiaCare, you have — a hundred times.
              </p>
              <Link href="/signup" className="btn bg-white text-brand-dark hover:!shadow-none">
                Start free — 75 questions <IconArrow className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
      />
    </>
  );
}
