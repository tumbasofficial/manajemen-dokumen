import Link from "next/link";

function ikonUntukTipe(tipeFile) {
  if (!tipeFile) return "📄";
  if (tipeFile.includes("pdf")) return "📕";
  if (tipeFile.includes("image")) return "🖼️";
  if (tipeFile.includes("word") || tipeFile.includes("doc")) return "📝";
  return "📄";
}

function formatTanggal(isoString) {
  const tgl = new Date(isoString);
  return tgl.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default function KartuDokumen({ dokumen }) {
  return (
    <Link
      href={`/dokumen/${dokumen.id}`}
      className="flex items-center gap-4 rounded-kotak bg-white px-5 py-4 active:scale-[0.98]"
    >
      <span className="text-3xl" aria-hidden="true">
        {ikonUntukTipe(dokumen.tipe_file)}
      </span>
      <div className="flex-1 overflow-hidden">
        <p className="truncate text-lg font-medium text-kayu-900">
          {dokumen.nama}
        </p>
        <p className="text-base text-kayu-700">
          Disimpan {formatTanggal(dokumen.dibuat_pada)}
        </p>
      </div>
      <span className="text-xl text-kayu-700/40" aria-hidden="true">
        →
      </span>
    </Link>
  );
}
