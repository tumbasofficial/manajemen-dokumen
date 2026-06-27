import "./globals.css";

export const metadata = {
  title: "Lemari Dokumen Saya",
  description: "Tempat menyimpan dan mencari dokumen pribadi dengan mudah",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body>{children}</body>
    </html>
  );
}
