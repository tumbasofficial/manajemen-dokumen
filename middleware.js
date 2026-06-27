import { createServerClient } from "@supabase/ssr";
import { NextResponse } from "next/server";

// Middleware ini berjalan setiap kali ada orang membuka halaman.
// Tugasnya dua: (1) memperpanjang sesi login otomatis,
// (2) menendang ke halaman login jika belum masuk dan mencoba
// mengakses halaman yang butuh login.
export async function middleware(request) {
  let respons = NextResponse.next({
    request: { headers: request.headers },
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        get(name) {
          return request.cookies.get(name)?.value;
        },
        set(name, value, options) {
          respons.cookies.set({ name, value, ...options });
        },
        remove(name, options) {
          respons.cookies.set({ name, value: "", ...options });
        },
      },
    }
  );

  const { data } = await supabase.auth.getUser();
  const user = data?.user;

  const halamanPublik = ["/login"];
  const sedangDiHalamanPublik = halamanPublik.some((p) =>
    request.nextUrl.pathname.startsWith(p)
  );

  if (!user && !sedangDiHalamanPublik) {
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  if (user && sedangDiHalamanPublik) {
    const url = request.nextUrl.clone();
    url.pathname = "/";
    return NextResponse.redirect(url);
  }

  return respons;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|webp)$).*)",
  ],
};
