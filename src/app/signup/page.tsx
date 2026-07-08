"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AuthShell } from "@/components/AuthShell";
import { useApp } from "@/lib/store";

export default function SignupPage() {
  const { signUp } = useApp();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setNotice(null);
    setBusy(true);
    const { error, message } = await signUp(email, password);
    setBusy(false);
    if (error) setError(error);
    else if (message) setNotice(message); // email confirmation required
    else router.push("/dashboard");
  }

  return (
    <AuthShell
      title="Create your free account"
      subtitle="It's completely free — everything unlocked, no card needed."
      footer={
        <>
          Already have an account?{" "}
          <Link href="/login" className="text-brand font-semibold">
            Log in
          </Link>
        </>
      }
    >
      <form onSubmit={onSubmit} className="space-y-4">
        <div>
          <label className="label" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            type="email"
            required
            autoComplete="email"
            className="field"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
          />
        </div>
        <div>
          <label className="label" htmlFor="password">
            Password
          </label>
          <input
            id="password"
            type="password"
            required
            autoComplete="new-password"
            className="field"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="At least 6 characters"
          />
        </div>
        {error && <p className="text-bad text-sm">{error}</p>}
        {notice && (
          <p className="text-sm rounded-xl bg-soft border border-line p-3 text-ink-soft">
            {notice}
          </p>
        )}
        <button type="submit" className="btn btn-primary w-full" disabled={busy}>
          {busy ? "Creating…" : "Start free"}
        </button>
      </form>
    </AuthShell>
  );
}
