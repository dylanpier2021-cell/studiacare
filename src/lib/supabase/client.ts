"use client";

import { createBrowserClient } from "@supabase/ssr";
import { supabaseConfigured } from "@/lib/config";

/**
 * Browser-side Supabase client. Returns null when Supabase isn't configured
 * (local demo mode) so callers can fall back to localStorage.
 * {{NEED FROM CLIENT: create Supabase project + paste keys in .env.local}}
 */
export function getSupabaseBrowser() {
  if (!supabaseConfigured()) return null;
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}
