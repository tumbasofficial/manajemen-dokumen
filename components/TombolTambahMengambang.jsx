import Link from "next/link";

export default function TombolTambahMengambang() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-10 bg-gradient-to-t from-krem-100 via-krem-100 to-transparent px-5 pb-6 pt-10">
      <Link
        href="/tambah"
        className="mx-auto flex max-w-md items-center justify-center gap-2 rounded-kotak bg-biru-600 px-6 py-4 text-lg font-medium text-white shadow-lg active:scale-95"
      >
        <span className="text-2xl" aria-hidden="true">
          +
        </span>
        Tambah dokumen baru
      </Link>
    </div>
  );
}
