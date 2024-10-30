import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function SearchRouteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <ToastContainer
        position="top-center"
        autoClose={1500}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        draggable
      />
    </>
  );
}
