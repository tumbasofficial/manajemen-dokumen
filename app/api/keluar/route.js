import { buatSupabaseServer } from "@/lib/supabase-server.js";
import { NextResponse } from "next/server";

export async function POST(request) {
  const supabase = buatSupabaseServer();
  await supabase.auth.signOut();
  return NextResponse.redirect(new URL("/login", request.url), {
    status: 302,
  });
}
