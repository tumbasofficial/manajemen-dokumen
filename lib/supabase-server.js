import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

// File ini membuat koneksi ke Supabase yang dipakai di server
// (halaman yang dirender di server, dan route API).
// Pakai cookies supaya Supabase tahu siapa yang sedang login.
export function buatSupabaseServer() {
  const cookieStore = cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        get(name) {
          return cookieStore.get(name)?.value;
        },
        set(name, value, options) {
          try {
            cookieStore.set({ name, value, ...options });
          } catch {
            // Dipanggil dari Server Component, boleh diabaikan
            // karena middleware akan menangani refresh sesi.
          }
        },
        remove(name, options) {
          try {
            cookieStore.set({ name, value: "", ...options });
          } catch {
            // sama seperti di atas
          }
        },
      },
    }
  );
}
