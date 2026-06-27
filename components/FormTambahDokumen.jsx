"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { buatSupabaseBrowser } from "@/lib/supabase-browser";

const PILIHAN_KATEGORI = [
  { id: "surat", nama: "Surat-surat", ikon: "📄" },
  { id: "sertifikat", nama: "Sertifikat", ikon: "🎓" },
  { id: "sekolah", nama: "Dokumen Sekolah", ikon: "🏫" },
  { id: "lain", nama: "Lainnya", ikon: "📁" },
];

const UKURAN_MAKS_BYTE = 20 * 1024 * 1024; // 20 MB

export default function FormTambahDokumen() {
  const router = useRouter();
  const supabase = buatSupabaseBrowser();
  const inputFileRef = useRef(null);

  const [file, setFile] = useState(null);
  const [namaDokumen, setNamaDokumen] = useState("");
  const [kategori, setKategori] = useState("lain");
  const [sedangProses, setSedangProses] = useState(false);
  const [pesanError, setPesanError] = useState("");
  const [selesai, setSelesai] = useState(false);

  function pilihFile(daftarFile) {
    const f = daftarFile?.[0];
    if (!f) return;

    if (f.size > UKURAN_MAKS_BYTE) {
      setPesanError("Ukuran file terlalu besar. Maksimal 20 MB ya.");
      return;
    }

    setPesanError("");
    setFile(f);
    if (!namaDokumen) {
      // otomatis isi nama dari nama file, tanpa embel-embel ekstensi
      setNamaDokumen(f.name.replace(/\.[^/.]+$/, ""));
    }
  }

  async function simpanDokumen(e) {
    e.preventDefault();
    if (!file) {
      setPesanError("Silakan pilih file dokumen dulu.");
      return;
    }

    setSedangProses(true);
    setPesanError("");

    try {
      const { data: userData, error: errorUser } =
        await supabase.auth.getUser();
      if (errorUser || !userData?.user) {
        throw new Error("Sesi masuk Anda berakhir. Silakan masuk lagi.");
      }
      const pemilikId = userData.user.id;

      const ekstensi = file.name.split(".").pop();
      const namaUnikFile = `${pemilikId}/${Date.now()}-${Math.random()
        .toString(36)
        .slice(2)}.${ekstensi}`;

      const { error: errorUnggah } = await supabase.storage
        .from("dokumen-pengguna")
        .upload(namaUnikFile, file);

      if (errorUnggah) {
        throw new Error("Gagal menyimpan file. Coba sekali lagi.");
      }

      const { error: errorTabel } = await supabase.from("dokumen").insert({
        nama: namaDokumen || file.name,
        kategori,
        path_file: namaUnikFile,
        tipe_file: file.type,
        ukuran_file: file.size,
        pemilik_id: pemilikId,
      });

      if (errorTabel) {
        throw new Error("Gagal mencatat dokumen. Coba sekali lagi.");
      }

      setSelesai(true);
      setTimeout(() => {
        router.push(`/kategori/${kategori}`);
        router.refresh();
      }, 1200);
    } catch (err) {
      setPesanError(err.message || "Terjadi kesalahan. Coba sekali lagi.");
    } finally {
      setSedangProses(false);
    }
  }

  if (selesai) {
    return (
      <div className="flex flex-col items-center gap-4 py-16 text-center">
        <span className="text-6xl" aria-hidden="true">
          ✅
        </span>
        <p className="text-2xl font-semibold text-kayu-900">
          Dokumen tersimpan!
        </p>
        <p className="text-lg text-kayu-700">Mengantar Anda kembali...</p>
      </div>
    );
  }

  return (
    <form onSubmit={simpanDokumen} className="flex flex-col gap-6">
      {/* Area pilih file - besar dan jelas */}
      <div>
        <p className="mb-2 text-lg font-medium text-kayu-900">
          1. Pilih dokumennya
        </p>
        <button
          type="button"
          onClick={() => inputFileRef.current?.click()}
          className="flex w-full flex-col items-center gap-3 rounded-kotak border-2 border-dashed border-biru-600/40 bg-white px-6 py-10 text-center"
        >
          <span className="text-5xl" aria-hidden="true">
            {file ? "📎" : "📁"}
          </span>
          <span className="text-lg font-medium text-biru-800">
            {file ? file.name : "Ketuk untuk pilih file dari HP / Laptop"}
          </span>
          <span className="text-base text-kayu-700">
            Bisa PDF, foto, atau dokumen lainnya
          </span>
        </button>
        <input
          ref={inputFileRef}
          type="file"
          className="hidden"
          onChange={(e) => pilihFile(e.target.files)}
          accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
        />
      </div>

      {/* Nama dokumen */}
      <div>
        <label htmlFor="nama" className="mb-2 block text-lg font-medium text-kayu-900">
          2. Beri nama dokumen ini
        </label>
        <input
          id="nama"
          type="text"
          value={namaDokumen}
          onChange={(e) => setNamaDokumen(e.target.value)}
          placeholder="contoh: Sertifikat Pelatihan 2024"
          className="w-full rounded-kotak border-2 border-kayu-700/20 bg-white px-5 py-4 text-lg text-kayu-900 placeholder:text-kayu-700/40 focus:border-biru-600"
        />
      </div>

      {/* Pilih kategori */}
      <div>
        <p className="mb-2 text-lg font-medium text-kayu-900">
          3. Simpan ke kotak mana?
        </p>
        <div className="grid grid-cols-2 gap-3">
          {PILIHAN_KATEGORI.map((k) => (
            <button
              key={k.id}
              type="button"
              onClick={() => setKategori(k.id)}
              className={`flex items-center gap-2 rounded-kotak border-2 px-4 py-4 text-left text-base font-medium ${
                kategori === k.id
                  ? "border-biru-600 bg-biru-100 text-biru-800"
                  : "border-kayu-700/15 bg-white text-kayu-700"
              }`}
            >
              <span className="text-2xl" aria-hidden="true">
                {k.ikon}
              </span>
              {k.nama}
            </button>
          ))}
        </div>
      </div>

      {pesanError && (
        <p className="rounded-kotak bg-merahmuda-100 px-4 py-3 text-base text-merahmuda-800">
          {pesanError}
        </p>
      )}

      <button
        type="submit"
        disabled={sedangProses}
        className="w-full rounded-kotak bg-biru-600 px-6 py-4 text-lg font-medium text-white disabled:opacity-60"
      >
        {sedangProses ? "Menyimpan..." : "Simpan dokumen"}
      </button>
    </form>
  );
}
