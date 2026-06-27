import Link from "next/link";
import { buatSupabaseServer } from "@/lib/supabase-server";
import KartuDokumen from "@/components/KartuDokumen";
import TombolTambahMengambang from "@/components/TombolTambahMengambang";

const NAMA_KATEGORI = {
  surat: "Surat-surat",
  sertifikat: "Sertifikat",
  sekolah: "Dokumen Sekolah",
  lain: "Lainnya",
};

export default async function HalamanKategori({ params }) {
  const supabase = buatSupabaseServer();
  const namaTampil = NAMA_KATEGORI[params.id] ?? "Dokumen";

  const { data: dokumen } = await supabase
    .from("dokumen")
    .select("*")
    .eq("kategori", params.id)
    .order("dibuat_pada", { ascending: false });

  return (
    <main className="min-h-screen bg-krem-100 px-5 pb-32 pt-8">
      <div className="mx-auto max-w-md">
        <Link href="/" className="mb-4 inline-block text-lg text-kayu-700">
          ← Kembali ke lemari
        </Link>
        <h1 className="mb-6 text-2xl font-semibold text-kayu-900">
          {namaTampil}
        </h1>

        {(!dokumen || dokumen.length === 0) && (
          <div className="rounded-kotak bg-white px-6 py-12 text-center">
            <span className="mb-3 block text-5xl" aria-hidden="true">
              📭
            </span>
            <p className="text-lg text-kayu-700">
              Belum ada dokumen di kotak ini.
            </p>
          </div>
        )}

        <div className="flex flex-col gap-3">
          {dokumen?.map((d) => (
            <KartuDokumen key={d.id} dokumen={d} />
          ))}
        </div>
      </div>

      <TombolTambahMengambang />
    </main>
  );
}
