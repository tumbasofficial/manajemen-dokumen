import Link from "next/link";
import { buatSupabaseServer } from "@/lib/supabase-server";
import KartuDokumen from "@/components/KartuDokumen";
import KotakCari from "@/components/KotakCari";

export default async function HalamanCari({ searchParams }) {
  const supabase = buatSupabaseServer();
  const kataKunci = searchParams?.q ?? "";

  const { data: dokumen } = await supabase
    .from("dokumen")
    .select("*")
    .ilike("nama", `%${kataKunci}%`)
    .order("dibuat_pada", { ascending: false });

  return (
    <main className="min-h-screen bg-krem-100 px-5 pb-16 pt-8">
      <div className="mx-auto max-w-md">
        <Link href="/" className="mb-4 inline-block text-lg text-kayu-700">
          ← Kembali ke lemari
        </Link>

        <div className="mb-6">
          <KotakCari />
        </div>

        <p className="mb-4 text-lg text-kayu-700">
          Hasil pencarian untuk <strong>&ldquo;{kataKunci}&rdquo;</strong>
        </p>

        {(!dokumen || dokumen.length === 0) && (
          <div className="rounded-kotak bg-white px-6 py-12 text-center">
            <span className="mb-3 block text-5xl" aria-hidden="true">
              🔍
            </span>
            <p className="text-lg text-kayu-700">
              Tidak ada dokumen yang cocok. Coba kata lain.
            </p>
          </div>
        )}

        <div className="flex flex-col gap-3">
          {dokumen?.map((d) => (
            <KartuDokumen key={d.id} dokumen={d} />
          ))}
        </div>
      </div>
    </main>
  );
}
