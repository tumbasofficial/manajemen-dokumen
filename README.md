# Lemari Dokumen Saya

Aplikasi web sederhana untuk menyimpan dan mencari dokumen pribadi,
dirancang khusus agar mudah dipakai oleh pengguna lanjut usia yang
awam teknologi. Dibangun dengan Next.js dan Supabase.

---

## Daftar isi

1. [Setup Supabase (database & penyimpanan file)](#1-setup-supabase)
2. [Buka project di VS Code](#2-buka-project-di-vs-code)
3. [Jalankan di komputer sendiri](#3-jalankan-di-komputer-sendiri)
4. [Upload ke GitHub](#4-upload-ke-github)
5. [Deploy ke Vercel](#5-deploy-ke-vercel)
6. [Aktifkan login lewat email](#6-aktifkan-login-lewat-email)
7. [Struktur project](#7-struktur-project)

---

## 1. Setup Supabase

Supabase adalah tempat menyimpan data (nama dokumen, kategori) dan
file (PDF, foto) Anda. Ini gratis untuk pemakaian pribadi.

### 1.1 Buat akun dan project

1. Buka **https://supabase.com** lalu klik **"Start your project"**
2. Daftar pakai akun GitHub Anda (lebih cepat)
3. Klik **"New project"**
4. Isi:
   - **Name**: `lemari-dokumen` (atau nama bebas)
   - **Database Password**: buat password kuat, **simpan baik-baik** di catatan Anda
   - **Region**: pilih `Southeast Asia (Singapore)` agar paling cepat diakses dari Indonesia
5. Klik **"Create new project"** dan tunggu sekitar 2 menit sampai selesai disiapkan

### 1.2 Jalankan skrip database

1. Di dashboard project Anda, klik menu **"SQL Editor"** di sidebar kiri
2. Klik **"New query"**
3. Buka file `supabase/setup.sql` yang sudah saya buatkan di project ini
4. Salin **seluruh isinya**, tempel ke kotak SQL Editor di Supabase
5. Klik tombol **"Run"** (atau tekan Ctrl+Enter)
6. Pastikan muncul tulisan **"Success. No rows returned"** — artinya berhasil

Skrip ini otomatis membuat:
- Tabel `dokumen` untuk menyimpan info setiap dokumen
- Aturan keamanan (RLS) supaya dokumen Anda tidak bisa dilihat orang lain
- Tempat penyimpanan file bernama `dokumen-pengguna` yang bersifat privat

### 1.3 Ambil kunci API

1. Klik ikon **gerigi/Settings** di sidebar kiri, lalu klik **"API"**
2. Catat dua nilai ini (Anda akan butuh sebentar lagi):
   - **Project URL** — contoh: `https://abcdefgh.supabase.co`
   - **anon public key** — kode panjang di bagian "Project API keys"

Simpan dua nilai ini, akan dipakai di langkah berikutnya.

---

## 2. Buka project di VS Code

1. Install **VS Code** dari https://code.visualstudio.com jika belum ada
2. Install **Node.js** (versi 18 atau lebih baru) dari https://nodejs.org — pilih versi **LTS**
3. Buka VS Code, klik **File > Open Folder**, pilih folder `lemari-dokumen` ini

### 2.1 Buat file kunci rahasia

1. Di VS Code, cari file bernama `.env.local.example`
2. Buat file baru bernama **`.env.local`** (persis seperti ini, ada titik di depan)
3. Isi dengan kunci dari Supabase tadi:

```
NEXT_PUBLIC_SUPABASE_URL=https://abcdefgh.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=tempel-anon-key-anda-di-sini
```

> File `.env.local` ini berisi kunci rahasia. File ini **tidak akan**
> ikut terupload ke GitHub (sudah diatur di file `.gitignore`),
> supaya tidak bocor ke publik.

---

## 3. Jalankan di komputer sendiri

Buka Terminal di VS Code (menu **Terminal > New Terminal**), lalu ketik:

```bash
npm install
```

Tunggu sampai selesai (mengunduh semua library yang dibutuhkan).
Setelah itu jalankan:

```bash
npm run dev
```

Buka browser, kunjungi **http://localhost:3000** — aplikasi Anda
sudah bisa dicoba di komputer sendiri.

---

## 4. Upload ke GitHub

1. Buat akun di https://github.com jika belum ada
2. Klik tombol **"+"** di kanan atas, pilih **"New repository"**
3. Beri nama `lemari-dokumen`, biarkan **Private**, klik **"Create repository"**
4. Kembali ke VS Code, jalankan di Terminal:

```bash
git init
git add .
git commit -m "Versi awal lemari dokumen"
git branch -M main
git remote add origin https://github.com/NAMA-AKUN-ANDA/lemari-dokumen.git
git push -u origin main
```

Ganti `NAMA-AKUN-ANDA` dengan username GitHub Anda.

> Tip: VS Code juga punya menu **Source Control** (ikon cabang di
> sidebar kiri) kalau Anda lebih suka klik tombol daripada mengetik perintah.

---

## 5. Deploy ke Vercel

1. Buka https://vercel.com, klik **"Sign Up"**, pilih **"Continue with GitHub"**
2. Setelah masuk, klik **"Add New... > Project"**
3. Pilih repository `lemari-dokumen` yang baru Anda buat, klik **"Import"**
4. Di bagian **"Environment Variables"**, tambahkan dua baris:
   - `NEXT_PUBLIC_SUPABASE_URL` → isi dengan Project URL dari Supabase
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` → isi dengan anon public key dari Supabase
5. Klik **"Deploy"**, tunggu sekitar 1-2 menit

Setelah selesai, Anda akan mendapat alamat website seperti
`https://lemari-dokumen.vercel.app` yang bisa dibuka dari HP atau
laptop mana saja.

### Update website setelah ubah kode

Setiap kali Anda mengubah kode dan menjalankan:

```bash
git add .
git commit -m "Penjelasan perubahan"
git push
```

Vercel akan **otomatis** membangun ulang dan memperbarui website,
tidak perlu klik apa-apa lagi di Vercel.

---

## 6. Aktifkan login lewat email

Supaya guru bisa masuk dengan kode 6 angka dari email (tanpa password):

1. Di dashboard Supabase, klik **Authentication > Providers**
2. Pastikan **Email** sudah aktif (biasanya aktif secara default)
3. Klik **Authentication > Email Templates**, pilih template **"Magic Link"**
   atau **"OTP"**, dan opsional ubah teksnya ke Bahasa Indonesia agar
   lebih ramah, misalnya:

   ```
   Subjek: Kode masuk Lemari Dokumen Anda

   Halo,

   Kode masuk Anda adalah: {{ .Token }}

   Masukkan 6 angka ini ke halaman masuk. Kode berlaku 1 jam.
   ```

4. Klik **Authentication > URL Configuration**, isi **Site URL** dengan
   alamat Vercel Anda (contoh: `https://lemari-dokumen.vercel.app`)

---

## 7. Struktur project

```
lemari-dokumen/
├── app/
│   ├── page.js                 → halaman utama (beranda)
│   ├── login/page.js           → halaman masuk
│   ├── tambah/page.js          → halaman tambah dokumen
│   ├── cari/page.js            → halaman hasil pencarian
│   ├── kategori/[id]/page.js   → daftar dokumen 1 kategori
│   ├── dokumen/[id]/page.js    → lihat 1 dokumen
│   └── api/keluar/route.js     → proses logout
├── components/
│   ├── FormLogin.jsx
│   ├── FormTambahDokumen.jsx
│   ├── KotakKategori.jsx
│   ├── KotakCari.jsx
│   ├── KartuDokumen.jsx
│   ├── AksiDokumen.jsx
│   └── TombolTambahMengambang.jsx
├── lib/
│   ├── supabase-browser.js     → koneksi Supabase di browser
│   └── supabase-server.js      → koneksi Supabase di server
├── supabase/
│   └── setup.sql                → skrip setup database (jalankan sekali di awal)
├── middleware.js                 → menjaga sesi login & lindungi halaman
└── .env.local                    → kunci rahasia (buat sendiri, jangan upload)
```

## Kategori dokumen yang tersedia

Saat ini ada 4 kategori: Surat-surat, Sertifikat, Dokumen Sekolah,
dan Lainnya. Untuk menambah atau mengubah kategori, edit daftar
`DAFTAR_KATEGORI` di `app/page.js` dan `PILIHAN_KATEGORI` di
`components/FormTambahDokumen.jsx`.

## Catatan tentang "Tempat Sampah"

Tampilan saat ini sudah meminta konfirmasi 2 kali sebelum dokumen
dihapus, tapi penghapusannya masih langsung permanen. Jika Anda
ingin benar-benar mengaktifkan jeda 30 hari sebelum hilang permanen,
beri tahu saya — saya akan tambahkan kolom `dihapus_pada` ke alur
hapus (kolomnya sudah disiapkan di `setup.sql`) dan satu halaman
"Tempat Sampah" baru, beserta tugas terjadwal untuk membersihkan
dokumen yang sudah lebih dari 30 hari di sana.
