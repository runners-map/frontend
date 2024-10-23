import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function SearchRouteLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko" className="bg-gray-200">
      <body className="max-w-md mx-auto min-h-screen relative bg-white">
        {children}
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
