import { createClient } from "@supabase/supabase-js";

// Koneksi Supabase untuk komponen di Server (Server Component / API Route)
export function buatSupabaseServer() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );
}