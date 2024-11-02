'use client';
import './globals.css';
import Navigation from '@/components/Navigation';
import { usePathname, useRouter } from 'next/navigation';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Cookies from 'js-cookie';
import { useEffect } from 'react';

const queryClient = new QueryClient();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();
  const pathname = usePathname();

  const noNavPaths = ['/login', '/register', '/mypage/setting', '/mypage/delete-account', '/404'];
  const hideNav = noNavPaths.includes(pathname) || pathname.startsWith('/post-list/');
  const accessToken = Cookies.get('accessToken');

  useEffect(() => {
    if (!accessToken && pathname !== '/login' && pathname !== '/register') {
      router.push('/login');
    }
    if (accessToken && (pathname === '/login' || pathname === '/register')) {
      router.push('/');
    }
  }, [accessToken, pathname, router]);

  return (
    <html lang="ko" className="bg-gray-200">
      <body className="max-w-md mx-auto min-h-screen relative bg-gray-50">
        <QueryClientProvider client={queryClient}>
          {children}
          {!hideNav && <Navigation />}
        </QueryClientProvider>
        <ToastContainer
          position="top-center"
          autoClose={1500}
          hideProgressBar={false}
          closeOnClick
          pauseOnHover
          draggable
        />
      </body>
    </html>
  );
}
