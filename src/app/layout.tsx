import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Google Review Master - QR Generator",
  description: "Tạo mã QR và standee thiết kế chuyên nghiệp giúp tối ưu đánh giá 5 sao trên Google Maps.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body style={{ height: '100dvh', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
        <div className="bg-blobs">
          <div className="blob blob-1"></div>
          <div className="blob blob-2"></div>
        </div>
 
        <main style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
          {children}
        </main>
      </body>
    </html>
  );
}
