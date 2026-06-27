import { createBrowserClient } from "@supabase/ssr";

// File ini membuat koneksi ke Supabase yang dipakai di komponen
// yang berjalan di browser pengguna (klik tombol, isi formulir, dll).
export function buatSupabaseBrowser() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );
}
