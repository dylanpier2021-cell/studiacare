"use client";

import { createBrowserClient } from "@supabase/ssr";
import { supabaseConfigured, SUPABASE_URL, SUPABASE_KEY } from "@/lib/config";

/**
 * Browser-side Supabase client. Returns null when Supabase isn't configured
 * (local demo mode) so callers can fall back to localStorage.
 */
export function getSupabaseBrowser() {
  if (!supabaseConfigured()) return null;
  return createBrowserClient(SUPABASE_URL!, SUPABASE_KEY!);
}
