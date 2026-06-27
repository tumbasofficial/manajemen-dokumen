import { createClient } from "@supabase/supabase-js";

// Koneksi Supabase untuk komponen di Browser (Client Component)
export function buatSupabaseBrowser() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );
}