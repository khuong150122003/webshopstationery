import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'VPP Học Sinh — Dụng cụ học tập giá hợp lý',
  description: 'Website mua sắm dụng cụ học tập: vở, bút, hộp bút, màu vẽ, máy tính học sinh với giá hợp lý cho học sinh, sinh viên. Không cần đăng nhập, thanh toán QR hoặc COD.',
  keywords: 'văn phòng phẩm, dụng cụ học tập, vở học sinh, bút bi, bút chì, hộp bút, combo học tập',
  openGraph: {
    title: 'VPP Học Sinh — Dụng cụ học tập giá hợp lý',
    description: 'Mua sắm dụng cụ học tập đa dạng, giá hợp lý. Thanh toán QR hoặc COD, không cần đăng nhập.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet" />
      </head>
      <body>
        <Navbar />
        <main style={{ minHeight: 'calc(100vh - var(--navbar-h) - 100px)' }}>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
