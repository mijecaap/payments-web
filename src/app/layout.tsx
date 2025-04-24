import type { Metadata } from 'next';
import { Geist } from 'next/font/google';
import './globals.css';

const geist = Geist({
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Sistema de Pagos',
  description: 'Sistema de gestión de pagos',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`${geist.className} antialiased`}>{children}</body>
    </html>
  );
}
