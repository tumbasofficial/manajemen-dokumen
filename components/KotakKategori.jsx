import Link from "next/link";

const GAYA_WARNA = {
  biru: "bg-biru-100 text-biru-800",
  teal: "bg-teal-100 text-teal-800",
  oranye: "bg-oranye-100 text-oranye-800",
  merahmuda: "bg-merahmuda-100 text-merahmuda-800",
};

export default function KotakKategori({ id, nama, ikon, jumlah, warna }) {
  return (
    <Link
      href={`/kategori/${id}`}
      className={`flex min-h-[148px] flex-col justify-between rounded-kotak p-5 transition active:scale-95 ${GAYA_WARNA[warna]}`}
    >
      <span className="text-4xl" aria-hidden="true">
        {ikon}
      </span>
      <span>
        <span className="block text-lg font-semibold">{nama}</span>
        <span className="block text-base opacity-80">
          {jumlah} dokumen
        </span>
      </span>
    </Link>
  );
}
