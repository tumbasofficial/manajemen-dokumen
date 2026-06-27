"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { buatSupabaseBrowser } from "@/lib/supabase-browser";

export default function AksiDokumen({ dokumen, urlFile }) {
  const router = useRouter();
  const supabase = buatSupabaseBrowser();
  const [mauHapus, setMauHapus] = useState(false);
  const [sedangHapus, setSedangHapus] = useState(false);

  async function bagikanDokumen() {
    if (navigator.share) {
      try {
        await navigator.share({
          title: dokumen.nama,
          url: urlFile,
        });
      } catch {
        // pengguna membatalkan, tidak masalah
      }
    } else {
      await navigator.clipboard.writeText(urlFile);
      alert("Tautan dokumen sudah disalin. Anda bisa tempel ke WhatsApp.");
    }
  }

  async function hapusDokumen() {
    setSedangHapus(true);
    await supabase.storage.from("dokumen-pengguna").remove([dokumen.path_file]);
    await supabase.from("dokumen").delete().eq("id", dokumen.id);
    router.push(`/kategori/${dokumen.kategori}`);
    router.refresh();
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="grid grid-cols-2 gap-3">
        <a
          href={urlFile}
          download={dokumen.nama}
          className="flex items-center justify-center gap-2 rounded-kotak bg-teal-100 px-4 py-4 text-base font-medium text-teal-800"
        >
          ⬇️ Unduh
        </a>
        <button
          onClick={bagikanDokumen}
          className="flex items-center justify-center gap-2 rounded-kotak bg-biru-100 px-4 py-4 text-base font-medium text-biru-800"
        >
          📤 Bagikan
        </button>
      </div>

      {!mauHapus ? (
        <button
          onClick={() => setMauHapus(true)}
          className="flex items-center justify-center gap-2 rounded-kotak bg-white px-4 py-4 text-base font-medium text-merahmuda-600"
        >
          🗑️ Hapus dokumen ini
        </button>
      ) : (
        <div className="rounded-kotak bg-merahmuda-100 px-5 py-4">
          <p className="mb-3 text-base font-medium text-merahmuda-800">
            Yakin mau hapus dokumen ini? Dokumen akan dihapus dan tidak
            bisa dikembalikan lagi.
          </p>
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => setMauHapus(false)}
              className="rounded-kotak bg-white px-4 py-3 text-base font-medium text-kayu-700"
            >
              Batal
            </button>
            <button
              onClick={hapusDokumen}
              disabled={sedangHapus}
              className="rounded-kotak bg-merahmuda-600 px-4 py-3 text-base font-medium text-white disabled:opacity-60"
            >
              {sedangHapus ? "Menghapus..." : "Ya, hapus"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
