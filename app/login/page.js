import FormLogin from "@/components/FormLogin";

export default function HalamanLogin() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-krem-100 px-6 py-12">
      <div className="mb-10 flex flex-col items-center text-center">
        <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-kotak bg-oranye-100">
          <span className="text-4xl" aria-hidden="true">
            🗄️
          </span>
        </div>
        <h1 className="text-3xl font-semibold text-kayu-900">
          Lemari Dokumen Saya
        </h1>
        <p className="mt-2 text-lg text-kayu-700">
          Tempat aman menyimpan semua dokumen Anda
        </p>
      </div>
      <FormLogin />
    </main>
  );
}
