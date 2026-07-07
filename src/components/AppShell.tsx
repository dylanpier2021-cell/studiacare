"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { Logo } from "./Logo";
import { ThemeToggle } from "./ThemeToggle";
import { useApp } from "@/lib/store";
import { FREE_ACCESS } from "@/lib/config";

const NAV = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/chapters", label: "Chapters" },
  { href: "/quiz/setup", label: "Quiz" },
  { href: "/flashcards", label: "Flashcards" },
  { href: "/profile", label: "Profile" },
];

/** Wrapper for signed-in pages: guards auth, renders the app nav. */
export function AppShell({ children }: { children: React.ReactNode }) {
  const { user, loading, signOut, freeRemaining } = useApp();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!loading && !user) router.replace("/login");
  }, [loading, user, router]);

  if (loading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center text-ink-faint">
        Loading…
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <header className="sticky top-0 z-50 bg-card border-b border-line">
        <div className="max-w-wrap mx-auto px-5 h-16 flex items-center justify-between gap-3">
          <Logo href="/dashboard" />
          <nav className="hidden md:flex gap-6 font-semibold text-sm">
            {NAV.map((n) => (
              <Link
                key={n.href}
                href={n.href}
                className={
                  pathname.startsWith(n.href)
                    ? "text-brand"
                    : "text-ink-soft hover:text-brand"
                }
              >
                {n.label}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-2.5">
            {!FREE_ACCESS && user.tier === "free" && (
              <span className="hidden sm:inline pill" title="Free questions remaining">
                {freeRemaining} free left
              </span>
            )}
            {FREE_ACCESS && (
              <span className="hidden sm:inline pill" title="Everything is free right now">
                Free · everything unlocked
              </span>
            )}
            <ThemeToggle />
            <button
              onClick={() => signOut().then(() => router.push("/"))}
              className="text-sm font-semibold text-ink-soft hover:text-brand"
            >
              Sign out
            </button>
          </div>
        </div>
        {/* Mobile nav */}
        <div className="md:hidden border-t border-line overflow-x-auto">
          <div className="flex gap-4 px-5 py-2 text-sm font-semibold whitespace-nowrap">
            {NAV.map((n) => (
              <Link
                key={n.href}
                href={n.href}
                className={
                  pathname.startsWith(n.href) ? "text-brand" : "text-ink-soft"
                }
              >
                {n.label}
              </Link>
            ))}
          </div>
        </div>
      </header>
      <main className="flex-1">{children}</main>
    </div>
  );
}
