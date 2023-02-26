import type { Database } from "types/arsetypes";
import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";

export function getSupabaseBrowserClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string;

  return createBrowserSupabaseClient<Database>({ supabaseUrl, supabaseKey });
}
