"use client";

import Link from "next/link";
import { Logo } from "./Logo";
import { ThemeToggle } from "./ThemeToggle";
import { useApp } from "@/lib/store";

/** Public marketing nav (landing page). */
export function SiteNav() {
  const { user } = useApp();
  return (
    <nav className="sticky top-0 z-50 bg-card border-b border-line backdrop-blur">
      <div className="max-w-wrap mx-auto px-5 h-16 flex items-center justify-between">
        <Logo />
        <div className="hidden md:flex gap-7 font-semibold text-sm text-ink-soft">
          <a href="/#features" className="hover:text-brand">
            Features
          </a>
          <a href="/#how" className="hover:text-brand">
            How it works
          </a>
          <a href="/#story" className="hover:text-brand">
            About
          </a>
          <a href="/#pricing" className="hover:text-brand">
            Pricing
          </a>
          <a href="/#faq" className="hover:text-brand">
            FAQ
          </a>
        </div>
        <div className="flex items-center gap-2.5">
          <ThemeToggle />
          {user ? (
            <Link href="/dashboard" className="btn btn-primary btn-sm">
              Dashboard
            </Link>
          ) : (
            <>
              <Link href="/login" className="hidden sm:inline text-sm font-semibold text-ink-soft hover:text-brand">
                Log in
              </Link>
              <Link href="/signup" className="btn btn-primary btn-sm">
                Start free
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
