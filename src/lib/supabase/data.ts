import type { SupabaseClient } from "@supabase/supabase-js";
import type { Attempt, Progress } from "@/lib/types";

// ----------------------------------------------------------------------------
// Real progress persistence against Supabase Postgres (tables + RLS defined in
// supabase/schema.sql). All calls run client-side with the user's session, so
// RLS guarantees each user only ever touches their own rows.
// ----------------------------------------------------------------------------

type AttemptRow = {
  id: string;
  label: string;
  chapter: string;
  score: number;
  total: number;
  by_chapter: Record<string, { correct: number; total: number }>;
  created_at: string;
};

function mapAttempt(r: AttemptRow): Attempt {
  return {
    id: r.id,
    date: (r.created_at ?? "").slice(0, 10),
    label: r.label,
    chapter: r.chapter,
    score: r.score,
    total: r.total,
    byChapter: r.by_chapter ?? {},
  };
}

/** Load a user's progress row + recent attempts from Postgres. */
export async function fetchRemoteProgress(
  sb: SupabaseClient,
  uid: string
): Promise<Partial<Progress>> {
  const [{ data: row }, { data: atts }] = await Promise.all([
    sb.from("progress").select("*").eq("user_id", uid).maybeSingle(),
    sb
      .from("attempts")
      .select("*")
      .eq("user_id", uid)
      .order("created_at", { ascending: false })
      .limit(50),
  ]);

  const attempts = (atts ?? []).map(mapAttempt as (r: AttemptRow) => Attempt);
  if (!row) return { attempts };

  return {
    questionsAnswered: row.questions_answered ?? 0,
    streak: row.streak ?? 0,
    lastStudyDate: row.last_study_date ?? null,
    cycleDay: row.cycle_day ?? 1,
    cycleNumber: row.cycle_number ?? 1,
    chapterScores: row.chapter_scores ?? {},
    reminders: row.reminders ?? undefined,
    attempts,
  };
}

/** Upsert the user's progress scalar/jsonb columns. */
export async function upsertRemoteProgress(
  sb: SupabaseClient,
  uid: string,
  p: Progress,
  nowISO: string
): Promise<void> {
  await sb.from("progress").upsert(
    {
      user_id: uid,
      questions_answered: p.questionsAnswered,
      streak: p.streak,
      last_study_date: p.lastStudyDate,
      cycle_day: p.cycleDay,
      cycle_number: p.cycleNumber,
      chapter_scores: p.chapterScores,
      reminders: p.reminders,
      updated_at: nowISO,
    },
    { onConflict: "user_id" }
  );
}

/** Insert one completed quiz attempt (id + created_at are DB-generated). */
export async function insertRemoteAttempt(
  sb: SupabaseClient,
  uid: string,
  a: Attempt
): Promise<void> {
  await sb.from("attempts").insert({
    user_id: uid,
    label: a.label,
    chapter: a.chapter,
    score: a.score,
    total: a.total,
    by_chapter: a.byChapter,
  });
}
