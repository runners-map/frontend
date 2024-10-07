'use client';

import { useRouter } from 'next/navigation';
import { IoIosArrowBack } from 'react-icons/io';

export default function Header() {
  const router = useRouter();

  return (
    <header>
      <button onClick={() => router.back()} className="absolute left-0 ">
        <IoIosArrowBack size={35} />
      </button>
    </header>
  );
}
