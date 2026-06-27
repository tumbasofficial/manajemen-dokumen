import Link from "next/link";
import FormTambahDokumen from "@/components/FormTambahDokumen";

export default function HalamanTambahDokumen() {
  return (
    <main className="min-h-screen bg-krem-100 px-5 pb-16 pt-8">
      <div className="mx-auto max-w-md">
        <Link
          href="/"
          className="mb-4 inline-block text-lg text-kayu-700"
        >
          ← Kembali
        </Link>
        <h1 className="mb-6 text-2xl font-semibold text-kayu-900">
          Tambah Dokumen Baru
        </h1>
        <FormTambahDokumen />
      </div>
    </main>
  );
}
