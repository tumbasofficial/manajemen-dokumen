import { buatSupabaseServer } from "@/lib/supabase-server.js";
import KotakKategori from "@/components/KotakKategori.jsx";
import KotakCari from "@/components/KotakCari.jsx";
import TombolTambahMengambang from "@/components/TombolTambahMengambang.jsx";
const DAFTAR_KATEGORI = [
  { id: "surat", nama: "Surat-surat", ikon: "📄", warna: "biru" },
  { id: "sertifikat", nama: "Sertifikat", ikon: "🎓", warna: "teal" },
  { id: "sekolah", nama: "Dokumen Sekolah", ikon: "🏫", warna: "oranye" },
  { id: "lain", nama: "Lainnya", ikon: "📁", warna: "merahmuda" },
];

export default async function HalamanUtama() {
  const supabase = buatSupabaseServer();

  const { data: userData } = await supabase.auth.getUser();
  const namaPengguna = userData?.user?.email?.split("@")[0] ?? "Anda";

  const { data: dokumen } = await supabase
    .from("dokumen")
    .select("kategori");

  const jumlahPerKategori = {};
  for (const k of DAFTAR_KATEGORI) jumlahPerKategori[k.id] = 0;
  for (const d of dokumen ?? []) {
    if (jumlahPerKategori[d.kategori] !== undefined) {
      jumlahPerKategori[d.kategori] += 1;
    }
  }

  return (
    <main className="min-h-screen bg-krem-100 px-5 pb-32 pt-8">
      <div className="mx-auto max-w-md">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <p className="text-base text-kayu-700">Selamat datang,</p>
            <h1 className="text-2xl font-semibold capitalize text-kayu-900">
              {namaPengguna}
            </h1>
          </div>
          <form action="/api/keluar" method="post">
            <button
              type="submit"
              className="rounded-kotak bg-white px-4 py-2 text-base text-kayu-700"
            >
              Keluar
            </button>
          </form>
        </div>

        <div className="mb-6">
          <KotakCari />
        </div>

        <p className="mb-3 text-lg text-kayu-700">Manajemen dokumen saya</p>

        <div className="grid grid-cols-2 gap-4">
          {DAFTAR_KATEGORI.map((k) => (
            <KotakKategori
              key={k.id}
              id={k.id}
              nama={k.nama}
              ikon={k.ikon}
              warna={k.warna}
              jumlah={jumlahPerKategori[k.id]}
            />
          ))}
        </div>
      </div>

      <TombolTambahMengambang />
    </main>
  );
}
