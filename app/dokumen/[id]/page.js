import Link from "next/link";
import { buatSupabaseServer } from "@/lib/supabase-server.js";
import AksiDokumen from "@/components/AksiDokumen";

export default async function HalamanDetailDokumen({ params }) {
  const supabase = buatSupabaseServer();

  const { data: dokumen } = await supabase
    .from("dokumen")
    .select("*")
    .eq("id", params.id)
    .single();

  if (!dokumen) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center bg-krem-100 px-6 text-center">
        <p className="text-lg text-kayu-700">Dokumen tidak ditemukan.</p>
        <Link href="/" className="mt-4 text-lg text-biru-600 underline">
          Kembali ke beranda
        </Link>
      </main>
    );
  }

  const { data: urlData } = await supabase.storage
    .from("dokumen-pengguna")
    .createSignedUrl(dokumen.path_file, 60 * 60); // berlaku 1 jam

  const urlFile = urlData?.signedUrl;
  const tipe = dokumen.tipe_file ?? "";

  return (
    <main className="min-h-screen bg-krem-100 px-5 pb-16 pt-8">
      <div className="mx-auto max-w-md">
        <Link
          href={`/kategori/${dokumen.kategori}`}
          className="mb-4 inline-block text-lg text-kayu-700"
        >
          ← Kembali
        </Link>

        <h1 className="mb-4 text-2xl font-semibold text-kayu-900">
          {dokumen.nama}
        </h1>

        <div className="mb-6 overflow-hidden rounded-kotak bg-white">
          {tipe.includes("pdf") && urlFile && (
            <iframe
              src={urlFile}
              title={dokumen.nama}
              className="h-[60vh] w-full"
            />
          )}
          {tipe.includes("image") && urlFile && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={urlFile}
              alt={dokumen.nama}
              className="w-full object-contain"
            />
          )}
          {!tipe.includes("pdf") && !tipe.includes("image") && (
            <div className="flex flex-col items-center gap-3 px-6 py-16 text-center">
              <span className="text-5xl" aria-hidden="true">
                📄
              </span>
              <p className="text-lg text-kayu-700">
                Dokumen ini tidak bisa ditampilkan langsung. Unduh untuk
                membukanya.
              </p>
            </div>
          )}
        </div>

        {urlFile && <AksiDokumen dokumen={dokumen} urlFile={urlFile} />}
      </div>
    </main>
  );
}
