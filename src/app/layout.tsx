'use client';
import './globals.css';
import Navigation from '@/components/Navigation';
import { usePathname } from 'next/navigation';

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const noNavPaths = ['/login', '/register', '/mypage/setting', '/404'];
  const hideNav = noNavPaths.includes(pathname) || pathname.startsWith('/post/') || pathname.startsWith('/chat-list/');

  return (
    <html lang="ko" className="bg-gray-200">
      <body className="relative max-w-md mx-auto min-h-screen bg-white">
        <main>{children}</main>
        {!hideNav && <Navigation />}
      </body>
    </html>
  );
}
