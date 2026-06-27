"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function KotakCari() {
  const router = useRouter();
  const [kata, setKata] = useState("");

  function cari(e) {
    e.preventDefault();
    if (kata.trim().length === 0) return;
    router.push(`/cari?q=${encodeURIComponent(kata.trim())}`);
  }

  return (
    <form onSubmit={cari} className="flex items-center gap-3 rounded-kotak bg-white px-5 py-4">
      <span className="text-xl text-kayu-700/50" aria-hidden="true">
        🔍
      </span>
      <input
        type="text"
        value={kata}
        onChange={(e) => setKata(e.target.value)}
        placeholder="Cari dokumen saya..."
        className="w-full bg-transparent text-lg text-kayu-900 placeholder:text-kayu-700/40 focus:outline-none"
      />
    </form>
  );
}
