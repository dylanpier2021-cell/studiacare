"use client";

import Link from "next/link";
import { Logo } from "./Logo";
import { ThemeToggle } from "./ThemeToggle";
import { useApp } from "@/lib/store";

/** Centered card layout for auth pages, with a demo-mode note. */
export function AuthShell({
  title,
  subtitle,
  children,
  footer,
}: {
  title: string;
  subtitle: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
}) {
  const { demoMode } = useApp();
  return (
    <div className="min-h-screen flex flex-col bg-soft">
      <div className="max-w-wrap w-full mx-auto px-5 h-16 flex items-center justify-between">
        <Logo />
        <ThemeToggle />
      </div>
      <div className="flex-1 flex items-center justify-center px-5 py-8">
        <div className="w-full max-w-md">
          <div className="card p-7 sm:p-8">
            <h1 className="text-2xl font-extrabold">{title}</h1>
            <p className="text-ink-soft text-sm mt-1 mb-6">{subtitle}</p>
            {children}
          </div>
          {footer && <div className="text-center text-sm text-ink-soft mt-4">{footer}</div>}
          {demoMode && (
            <p className="text-center text-xs text-ink-faint mt-4 max-w-sm mx-auto">
              Demo mode: accounts are stored locally in this browser so the app works with no setup.
              Real email auth turns on once Supabase keys are added.
            </p>
          )}
          <p className="text-center mt-4">
            <Link href="/" className="text-sm text-ink-faint hover:text-brand">
              ← Back to home
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
