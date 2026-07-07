import Link from "next/link";
import { SiteNav } from "@/components/SiteNav";
import { Footer } from "@/components/Footer";
import { HeroArt } from "@/components/HeroArt";
import { LandingDemo } from "@/components/LandingDemo";
import { PricingCards } from "@/components/PricingCards";

const FEATURES = [
  { icon: "⏱️", title: "Timed everything", body: "The state exam is timed, so we time every quiz and every mock exam. The clock stops being scary when you practice with it daily." },
  { icon: "💯", title: "100-question conditioning", body: "The real exam is 85 questions. You train with 100, so your focus outlasts the test instead of fading at question 60." },
  { icon: "💡", title: "A rationale on every answer", body: "Right or wrong, every question explains why — short rationales that teach as you practice, not just a score at the end." },
  { icon: "📖", title: "Hover-to-define terms", body: "Hit a hard word mid-question? Hover (or tap) and get the definition instantly. No leaving the question to look it up." },
  { icon: "🗂️", title: "Custom quizzes & flashcards", body: "Study by chapter, drill flashcards, and build custom quizzes so you spend time on what challenges YOU — not what you already know." },
  { icon: "👀", title: "Reading trainer", body: "Words disappear as you read, at the pace the exam demands. Train your reading speed so long questions never eat your clock." },
  { icon: "🔔", title: "Study reminders", body: "Life gets busy. StudiaCare nudges you on a schedule so exam day never sneaks up on you." },
  { icon: "📈", title: "Progress on your profile", body: "Log in and see exactly where you stand — scores by chapter, weak spots, streaks, and how ready you actually are." },
  { icon: "🌙", title: "Light & dark mode", body: "Study at noon or at 2 AM. Your eyes will thank you either way." },
];

const HOW = [
  { n: "1", title: "Start free", body: "Create an account and get your first 75 questions free — no card. Feel the real exam pressure right away." },
  { n: "2", title: "Train on a 7-day cycle", body: "Follow a simple weekly plan. Each day the dashboard tells you exactly what to study next." },
  { n: "3", title: "Walk in ready", body: "By exam day you've sat a hundred timed questions many times over. The real 85 feels familiar, not frightening." },
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

      {/* HERO */}
      <header className="relative overflow-hidden py-16 sm:py-20 bg-[radial-gradient(1000px_500px_at_85%_-10%,var(--brand-soft),transparent_60%)]">
        <div className="max-w-wrap mx-auto px-5 grid gap-10 items-center md:grid-cols-[1.15fr_.85fr]">
          <div>
            <span className="pill mb-4">Nursing State Exam Prep</span>
            <h1 className="text-4xl sm:text-5xl font-extrabold leading-[1.1] mb-4">
              I passed the state exam <span className="text-brand">the first time.</span>
            </h1>
            <p className="text-lg text-ink-soft mb-4 max-w-xl">
              If you want to pass the first time like me — let me teach you. Timed, exam-style
              practice that makes test day feel like something you&apos;ve already done.
            </p>
            <p className="text-ink-soft italic mb-6 max-w-xl border-l-4 border-brand pl-4">
              &ldquo;I wasn&apos;t used to sitting in a room for 2 hours without moving. Training
              like this makes the real exam feel familiar.&rdquo;
            </p>
            <div className="flex flex-wrap gap-3 mb-4">
              <Link href="/signup" className="btn btn-primary">
                Start free — 75 questions
              </Link>
              <a href="#demo" className="btn btn-ghost">
                Try a question
              </a>
            </div>
            <p className="text-sm text-ink-faint">First month free on Standard. No card to start.</p>
            <div className="flex gap-7 mt-8 flex-wrap">
              <div>
                <b className="block text-2xl text-brand">100</b>
                <span className="text-sm text-ink-faint">conditioning questions</span>
              </div>
              <div>
                <b className="block text-2xl text-brand">Timed</b>
                <span className="text-sm text-ink-faint">just like the real exam</span>
              </div>
              <div>
                <b className="block text-2xl text-brand">Every answer</b>
                <span className="text-sm text-ink-faint">explained, right or wrong</span>
              </div>
            </div>
          </div>
          <div className="flex justify-center">
            <HeroArt className="w-[min(340px,80%)] h-auto" />
          </div>
        </div>
      </header>

      {/* FEATURES */}
      <section id="features" className="py-14">
        <div className="max-w-wrap mx-auto px-5 text-center">
          <span className="pill">Why StudiaCare</span>
          <h2 className="text-2xl sm:text-3xl font-extrabold mt-2 mb-2">
            Built to feel like the actual exam
          </h2>
          <p className="text-ink-soft max-w-xl mx-auto">
            No gimmicks, no cartoon mascots. A serious, calm study space that trains you under the
            same pressure you&apos;ll feel on test day.
          </p>
          <div className="grid gap-4 mt-8 sm:grid-cols-2 lg:grid-cols-3 text-left">
            {FEATURES.map((f) => (
              <div key={f.title} className="card p-6">
                <div className="w-11 h-11 rounded-xl bg-brand-soft flex items-center justify-center text-xl mb-3">
                  {f.icon}
                </div>
                <h3 className="font-bold mb-1">{f.title}</h3>
                <p className="text-sm text-ink-soft">{f.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how" className="py-14 bg-soft">
        <div className="max-w-wrap mx-auto px-5 text-center">
          <span className="pill">How it works</span>
          <h2 className="text-2xl sm:text-3xl font-extrabold mt-2 mb-8">Three steps to exam day</h2>
          <div className="grid gap-5 md:grid-cols-3 text-left">
            {HOW.map((h) => (
              <div key={h.n} className="card p-6">
                <div className="w-10 h-10 rounded-full bg-brand text-white font-extrabold flex items-center justify-center mb-3">
                  {h.n}
                </div>
                <h3 className="font-bold mb-1">{h.title}</h3>
                <p className="text-sm text-ink-soft">{h.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* STORY / ABOUT */}
      <section id="story" className="py-14">
        <div className="max-w-wrap mx-auto px-5 grid gap-8 items-center md:grid-cols-2">
          <div>
            <span className="pill">About me</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold mt-2 mb-3">
              &ldquo;I wasn&apos;t used to sitting in a room for two hours without moving.&rdquo;
            </h2>
            <p className="text-ink-soft">
              That&apos;s what makes the state exam hard — not just the questions, the{" "}
              <em>conditions</em>. StudiaCare was built by an instructor who passed the first time,
              around one idea: practice under real conditions until the real thing feels like
              something you&apos;re already used to.
            </p>
          </div>
          <blockquote className="card p-7 text-xl font-bold leading-relaxed">
            &ldquo;I passed the state exam the first time. If you want to pass the first time like me
            — let me teach you.&rdquo;
            <div className="text-sm font-medium text-ink-faint mt-3">
              {/* {{NEED FROM CLIENT: confirm exact About Me wording; client asked for no face/photo}} */}
              — Your instructor, StudiaCare
            </div>
          </blockquote>
        </div>
      </section>

      {/* DEMO */}
      <section id="demo" className="py-14 bg-soft">
        <div className="max-w-wrap mx-auto px-5">
          <div className="text-center mb-8">
            <span className="pill">Live demo</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold mt-2 mb-2">Try it right now</h2>
            <p className="text-ink-soft max-w-xl mx-auto">
              A small taste — the full version has 100+ questions across every chapter, with your
              progress saved.
            </p>
          </div>
          <LandingDemo />
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" className="py-14">
        <div className="max-w-wrap mx-auto px-5 text-center">
          <span className="pill">Simple pricing</span>
          <h2 className="text-2xl sm:text-3xl font-extrabold mt-2 mb-2">
            Start free. Stay because it works.
          </h2>
          <p className="text-ink-soft max-w-xl mx-auto">
            Your first 75 questions cost nothing. Upgrade when you&apos;re ready for the full bank.
          </p>
          <PricingCards />
          <p className="text-xs text-ink-faint mt-5">
            Payments handled securely by Stripe. Have a coupon? Add it at checkout.
            {/* {{CONFIRM WITH CLIENT: $21 coupon details — amount, one-time vs recurring}} */}
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-14 bg-soft">
        <div className="max-w-2xl mx-auto px-5">
          <div className="text-center mb-6">
            <span className="pill">FAQ</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold mt-2">Questions students ask</h2>
          </div>
          {FAQS.map((f) => (
            <details key={f.q} className="border-b border-line py-4 group">
              <summary className="font-bold cursor-pointer flex justify-between items-center list-none">
                {f.q}
                <span className="text-brand text-xl group-open:hidden">+</span>
                <span className="text-brand text-xl hidden group-open:inline">–</span>
              </summary>
              <p className="mt-2 text-ink-soft text-sm">{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-10">
        <div className="max-w-wrap mx-auto px-5">
          <div className="card bg-brand border-none p-10 sm:p-12 text-center">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              Walk in on exam day like you&apos;ve done it before.
            </h2>
            <p className="text-white/80 max-w-md mx-auto mt-3 mb-6">
              Because with StudiaCare, you have — a hundred times.
            </p>
            <Link href="/signup" className="btn bg-white text-brand-dark">
              Start free — 75 questions
            </Link>
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
