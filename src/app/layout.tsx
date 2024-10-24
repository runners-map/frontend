"use client";
import "./globals.css";
import Navigation from "@/components/Navigation";
import { usePathname } from "next/navigation";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const noNavPaths = ["/login", "/register", "/mypage/setting", "/404"];
  const hideNav =
    noNavPaths.includes(pathname) || pathname.startsWith("/post-list/");

  return (
    <html lang="ko" className="bg-gray-200">
      <body className="max-w-md mx-auto min-h-screen relative bg-gray-50">
        <QueryClientProvider client={queryClient}>
          {children}
          {!hideNav && <Navigation />}
        </QueryClientProvider>
      </body>
    </html>
  );
}
