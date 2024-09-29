"use client";

import { useRouter } from "next/navigation";
export default function Header() {
  const router = useRouter();

  return (
    <header>
      <button onClick={() => router.back()}>뒤로가기</button>
    </header>
  );
}
