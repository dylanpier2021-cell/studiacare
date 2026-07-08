"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import type { Attempt, Progress, ReminderSettings, SessionUser, Tier } from "./types";
import { CYCLE_DAYS, FREE_ACCESS, FREE_QUESTION_LIMIT, supabaseConfigured } from "./config";
import { getSupabaseBrowser } from "./supabase/client";
import {
  fetchRemoteProgress,
  insertRemoteAttempt,
  upsertRemoteProgress,
} from "./supabase/data";

// ============================================================================
// StudiaCare data layer.
//
// Two backends behind one API:
//   • Supabase (real auth + Postgres) when env keys are present.
//   • localStorage "demo mode" otherwise — so `npm run dev` works with zero
//     setup and Justimie can click through the whole free-tier flow.
//
// {{NEED FROM CLIENT: Supabase project → then real auth + cross-device sync
//   turn on automatically. Progress-table sync is stubbed below (see syncRemote).}}
// ============================================================================

const LS_SESSION = "sc.session";
const LS_USERS = "sc.users"; // demo-mode credential store (NOT secure — draft only)
const progressKey = (uid: string) => `sc.progress.${uid}`;

function todayISO(): string {
  return new Date().toISOString().slice(0, 10);
}

function daysBetween(a: string, b: string): number {
  const ms = new Date(b + "T00:00:00").getTime() - new Date(a + "T00:00:00").getTime();
  return Math.round(ms / 86400000);
}

function defaultReminders(): ReminderSettings {
  return { enabled: false, time: "18:00", channel: "email", days: [1, 2, 3, 4, 5] };
}

function defaultProgress(): Progress {
  return {
    questionsAnswered: 0,
    streak: 0,
    lastStudyDate: null,
    cycleDay: 1,
    cycleNumber: 1,
    attempts: [],
    chapterScores: {},
    reminders: defaultReminders(),
  };
}

function loadProgress(uid: string): Progress {
  if (typeof window === "undefined") return defaultProgress();
  try {
    const raw = localStorage.getItem(progressKey(uid));
    if (raw) return { ...defaultProgress(), ...JSON.parse(raw) };
  } catch {
    /* ignore */
  }
  return defaultProgress();
}

function saveProgress(uid: string, p: Progress) {
  try {
    localStorage.setItem(progressKey(uid), JSON.stringify(p));
  } catch {
    /* ignore */
  }
}

// ---- demo-mode credential helpers (localStorage) ---------------------------
type DemoUser = { id: string; email: string; password: string; tier: Tier };

function readUsers(): Record<string, DemoUser> {
  try {
    return JSON.parse(localStorage.getItem(LS_USERS) || "{}");
  } catch {
    return {};
  }
}
function writeUsers(u: Record<string, DemoUser>) {
  localStorage.setItem(LS_USERS, JSON.stringify(u));
}
function makeId() {
  return "u_" + Math.random().toString(36).slice(2, 10);
}

// ============================================================================

interface AppContextValue {
  user: SessionUser | null;
  progress: Progress;
  loading: boolean;
  /** Real Supabase auth vs. local demo mode. */
  demoMode: boolean;
  /** Questions still free for this user (Infinity for paid users). */
  freeRemaining: number;
  signUp: (email: string, password: string) => Promise<{ error?: string; message?: string }>;
  signIn: (email: string, password: string) => Promise<{ error?: string }>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<{ error?: string; message?: string }>;
  recordAttempt: (a: Omit<Attempt, "id" | "date">) => void;
  setTier: (t: Tier) => void;
  updateReminders: (r: ReminderSettings) => void;
}

const AppContext = createContext<AppContextValue | null>(null);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<SessionUser | null>(null);
  const [progress, setProgress] = useState<Progress>(defaultProgress());
  const [loading, setLoading] = useState(true);
  const demoMode = !supabaseConfigured();

  // Load a signed-in user's progress from Postgres, falling back to local cache.
  const hydrateProgress = useCallback(async (uid: string) => {
    const sb = getSupabaseBrowser();
    if (!sb) {
      setProgress(loadProgress(uid));
      return;
    }
    try {
      const remote = await fetchRemoteProgress(sb, uid);
      const merged: Progress = {
        ...defaultProgress(),
        ...remote,
        reminders: remote.reminders ?? defaultReminders(),
      };
      setProgress(merged);
      saveProgress(uid, merged);
    } catch {
      setProgress(loadProgress(uid));
    }
  }, []);

  // Hydrate session on mount.
  useEffect(() => {
    let active = true;
    (async () => {
      if (supabaseConfigured()) {
        const sb = getSupabaseBrowser();
        const { data } = await sb!.auth.getUser();
        if (active && data.user) {
          const u: SessionUser = {
            id: data.user.id,
            email: data.user.email ?? "",
            tier: (localStorage.getItem(`sc.tier.${data.user.id}`) as Tier) || "free",
          };
          setUser(u);
          // Load real progress from Postgres; fall back to local cache offline.
          try {
            const remote = await fetchRemoteProgress(sb!, u.id);
            const merged: Progress = {
              ...defaultProgress(),
              ...remote,
              reminders: remote.reminders ?? defaultReminders(),
            };
            if (active) {
              setProgress(merged);
              saveProgress(u.id, merged);
            }
          } catch {
            if (active) setProgress(loadProgress(u.id));
          }
        }
      } else {
        try {
          const raw = localStorage.getItem(LS_SESSION);
          if (raw) {
            const u: SessionUser = JSON.parse(raw);
            setUser(u);
            setProgress(loadProgress(u.id));
          }
        } catch {
          /* ignore */
        }
      }
      if (active) setLoading(false);
    })();
    return () => {
      active = false;
    };
  }, []);

  const persist = useCallback((uid: string, next: Progress) => {
    saveProgress(uid, next); // local cache (also the offline fallback)
    setProgress(next);
    // Mirror to Postgres when Supabase is connected.
    if (supabaseConfigured()) {
      const sb = getSupabaseBrowser();
      if (sb) upsertRemoteProgress(sb, uid, next, new Date().toISOString()).catch(() => {});
    }
  }, []);

  const signUp = useCallback<AppContextValue["signUp"]>(async (email, password) => {
    email = email.trim().toLowerCase();
    if (!email || !password) return { error: "Email and password are required." };
    if (password.length < 6) return { error: "Password must be at least 6 characters." };

    if (supabaseConfigured()) {
      const sb = getSupabaseBrowser();
      const { data, error } = await sb!.auth.signUp({ email, password });
      if (error) return { error: error.message };
      // If email confirmation is ON in Supabase, there's no session yet.
      if (!data.session) {
        return { message: "Almost there — check your email to confirm your account, then log in." };
      }
      if (data.user) {
        const u: SessionUser = { id: data.user.id, email, tier: "free" };
        setUser(u);
        await hydrateProgress(u.id);
      }
      return {};
    }

    const users = readUsers();
    if (users[email]) return { error: "An account with that email already exists." };
    const u: DemoUser = { id: makeId(), email, password, tier: "free" };
    users[email] = u;
    writeUsers(users);
    const session: SessionUser = { id: u.id, email, tier: "free" };
    localStorage.setItem(LS_SESSION, JSON.stringify(session));
    setUser(session);
    setProgress(loadProgress(session.id));
    return {};
  }, []);

  const signIn = useCallback<AppContextValue["signIn"]>(async (email, password) => {
    email = email.trim().toLowerCase();
    if (supabaseConfigured()) {
      const sb = getSupabaseBrowser();
      const { data, error } = await sb!.auth.signInWithPassword({ email, password });
      if (error) return { error: error.message };
      const u: SessionUser = {
        id: data.user.id,
        email,
        tier: (localStorage.getItem(`sc.tier.${data.user.id}`) as Tier) || "free",
      };
      setUser(u);
      await hydrateProgress(u.id);
      return {};
    }

    const users = readUsers();
    const rec = users[email];
    if (!rec || rec.password !== password) {
      return { error: "Wrong email or password." };
    }
    const session: SessionUser = { id: rec.id, email, tier: rec.tier };
    localStorage.setItem(LS_SESSION, JSON.stringify(session));
    setUser(session);
    setProgress(loadProgress(session.id));
    return {};
  }, []);

  const signOut = useCallback(async () => {
    if (supabaseConfigured()) {
      await getSupabaseBrowser()!.auth.signOut();
    }
    localStorage.removeItem(LS_SESSION);
    setUser(null);
    setProgress(defaultProgress());
  }, []);

  const resetPassword = useCallback<AppContextValue["resetPassword"]>(async (email) => {
    email = email.trim().toLowerCase();
    if (!email) return { error: "Enter your email first." };
    if (supabaseConfigured()) {
      const sb = getSupabaseBrowser();
      const { error } = await sb!.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/login`,
      });
      if (error) return { error: error.message };
      return { message: "Check your email for a reset link." };
    }
    // Demo mode: no email service. {{NEED FROM CLIENT: transactional email provider.}}
    return {
      message:
        "Demo mode: password reset emails turn on once Supabase is connected.",
    };
  }, []);

  const setTier = useCallback(
    (t: Tier) => {
      if (!user) return;
      localStorage.setItem(`sc.tier.${user.id}`, t);
      const next = { ...user, tier: t };
      setUser(next);
      if (supabaseConfigured()) {
        const sb = getSupabaseBrowser();
        sb?.from("profiles").update({ tier: t }).eq("id", user.id).then(
          () => {},
          () => {}
        );
      } else {
        const users = readUsers();
        if (users[user.email]) {
          users[user.email].tier = t;
          writeUsers(users);
        }
        localStorage.setItem(LS_SESSION, JSON.stringify(next));
      }
    },
    [user]
  );

  const recordAttempt = useCallback<AppContextValue["recordAttempt"]>(
    (a) => {
      if (!user) return;
      const today = todayISO();
      const prev = loadProgress(user.id);

      // streak + cycle math
      let streak = prev.streak;
      let cycleDay = prev.cycleDay;
      let cycleNumber = prev.cycleNumber;
      if (prev.lastStudyDate !== today) {
        const gap = prev.lastStudyDate ? daysBetween(prev.lastStudyDate, today) : null;
        streak = gap === 1 ? prev.streak + 1 : 1;
        cycleDay = prev.cycleDay >= CYCLE_DAYS ? 1 : prev.cycleDay + 1;
        cycleNumber = prev.cycleDay >= CYCLE_DAYS ? prev.cycleNumber + 1 : prev.cycleNumber;
        if (!prev.lastStudyDate) {
          cycleDay = 1;
        }
      }

      // best score per chapter
      const chapterScores = { ...prev.chapterScores };
      for (const [ch, tally] of Object.entries(a.byChapter)) {
        const pct = Math.round((tally.correct / Math.max(1, tally.total)) * 100);
        chapterScores[ch] = Math.max(chapterScores[ch] ?? 0, pct);
      }

      const attempt: Attempt = {
        ...a,
        id: "a_" + Math.random().toString(36).slice(2, 10),
        date: today,
      };

      const next: Progress = {
        ...prev,
        questionsAnswered: prev.questionsAnswered + a.total,
        streak,
        cycleDay,
        cycleNumber,
        lastStudyDate: today,
        attempts: [attempt, ...prev.attempts].slice(0, 50),
        chapterScores,
      };
      // Persist the attempt row to Postgres (progress row is handled by persist()).
      if (supabaseConfigured()) {
        const sb = getSupabaseBrowser();
        if (sb) insertRemoteAttempt(sb, user.id, attempt).catch(() => {});
      }
      persist(user.id, next);
    },
    [user, persist]
  );

  const updateReminders = useCallback(
    (r: ReminderSettings) => {
      if (!user) return;
      const prev = loadProgress(user.id);
      persist(user.id, { ...prev, reminders: r });
    },
    [user, persist]
  );

  const freeRemaining = useMemo(() => {
    if (FREE_ACCESS) return Infinity; // everything is free — no gate
    if (!user) return FREE_QUESTION_LIMIT;
    if (user.tier !== "free") return Infinity;
    return Math.max(0, FREE_QUESTION_LIMIT - progress.questionsAnswered);
  }, [user, progress.questionsAnswered]);

  const value: AppContextValue = {
    user,
    progress,
    loading,
    demoMode,
    freeRemaining,
    signUp,
    signIn,
    signOut,
    resetPassword,
    recordAttempt,
    setTier,
    updateReminders,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp(): AppContextValue {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within <AppProvider>");
  return ctx;
}
