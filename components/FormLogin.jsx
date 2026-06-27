"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { buatSupabaseBrowser } from "@/lib/supabase-browser";

export default function FormLogin() {
  const router = useRouter();
  const supabase = buatSupabaseBrowser();

  const [tahap, setTahap] = useState("masuk-email"); // "masuk-email" | "masuk-kode"
  const [email, setEmail] = useState("");
  const [kode, setKode] = useState("");
  const [sedangProses, setSedangProses] = useState(false);
  const [pesan, setPesan] = useState("");

  async function kirimKode(e) {
    e.preventDefault();
    setPesan("");
    setSedangProses(true);

    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: { shouldCreateUser: true },
    });

    setSedangProses(false);

    if (error) {
      setPesan("Maaf, kode tidak terkirim. Coba periksa email Anda lagi.");
      return;
    }

    setTahap("masuk-kode");
  }

  async function periksaKode(e) {
    e.preventDefault();
    setPesan("");
    setSedangProses(true);

    const { error } = await supabase.auth.verifyOtp({
      email,
      token: kode,
      type: "email",
    });

    setSedangProses(false);

    if (error) {
      setPesan("Kode yang dimasukkan belum sesuai. Coba lihat email lagi.");
      return;
    }

    router.push("/");
    router.refresh();
  }

  return (
    <div className="w-full max-w-sm">
      {tahap === "masuk-email" && (
        <form onSubmit={kirimKode} className="flex flex-col gap-4">
          <label htmlFor="email" className="text-lg font-medium text-kayu-900">
            Masukkan email Anda
          </label>
          <input
            id="email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="contoh@email.com"
            className="w-full rounded-kotak border-2 border-kayu-700/20 bg-white px-5 py-4 text-lg text-kayu-900 placeholder:text-kayu-700/40 focus:border-biru-600"
          />
          <button
            type="submit"
            disabled={sedangProses}
            className="w-full rounded-kotak bg-biru-600 px-6 py-4 text-lg font-medium text-white disabled:opacity-60"
          >
            {sedangProses ? "Mengirim kode..." : "Kirim kode masuk"}
          </button>
          {pesan && <p className="text-base text-merahmuda-600">{pesan}</p>}
        </form>
      )}

      {tahap === "masuk-kode" && (
        <form onSubmit={periksaKode} className="flex flex-col gap-4">
          <p className="text-base text-kayu-700">
            Kami sudah mengirim 6 angka ke <strong>{email}</strong>. Buka
            email itu, lalu tulis angkanya di sini.
          </p>
          <label htmlFor="kode" className="text-lg font-medium text-kayu-900">
            Kode dari email
          </label>
          <input
            id="kode"
            type="text"
            inputMode="numeric"
            required
            value={kode}
            onChange={(e) => setKode(e.target.value)}
            placeholder="123456"
            className="w-full rounded-kotak border-2 border-kayu-700/20 bg-white px-5 py-4 text-2xl tracking-widest text-kayu-900 placeholder:text-kayu-700/30 focus:border-biru-600"
          />
          <button
            type="submit"
            disabled={sedangProses}
            className="w-full rounded-kotak bg-biru-600 px-6 py-4 text-lg font-medium text-white disabled:opacity-60"
          >
            {sedangProses ? "Memeriksa..." : "Masuk sekarang"}
          </button>
          <button
            type="button"
            onClick={() => setTahap("masuk-email")}
            className="text-base text-kayu-700 underline"
          >
            Salah alamat email? Ulangi
          </button>
          {pesan && <p className="text-base text-merahmuda-600">{pesan}</p>}
        </form>
      )}
    </div>
  );
}
