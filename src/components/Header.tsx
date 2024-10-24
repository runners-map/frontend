'use client';

import { useRouter } from 'next/navigation';
import { IoIosArrowBack } from 'react-icons/io';

export default function Header() {
  const router = useRouter();

  return (
    <header>
      <button
        onClick={() => router.back()}
        className="absolute left-0 rounded-full w-12 h-12 active:bg-gray-500 transition-colors duration-150 ease-in-out">
        <IoIosArrowBack size={35} color="white" />
      </button>
    </header>
  );
}
