"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  HiMap,
  HiChatBubbleOvalLeftEllipsis,
  HiChartBar,
  HiMiniTrophy,
  HiMiniUser,
} from "react-icons/hi2";

export default function Navigation() {
  const currentPath = usePathname();
  return (
    <nav className="btm-nav max-w-md mx-auto rounded-t-3xl shadow-2xl shadow-black">
      <Link
        href={"/"}
        className={`${currentPath === "/" ? "text-primary" : "text-gray-400"}`}
      >
        <HiMap size={25} />
      </Link>
      <Link
        href={"/post-list"}
        className={`${
          currentPath === "/post-list" ? "text-primary" : "text-gray-400"
        }`}
      >
        <HiChatBubbleOvalLeftEllipsis size={25} />
      </Link>
      <Link
        href={"/ranking"}
        className={`${
          currentPath === "/ranking" ? "text-primary" : "text-gray-400"
        }`}
      >
        <HiMiniTrophy size={25} />
      </Link>
      <Link
        href={"/chart"}
        className={`${
          currentPath === "/chart" ? "text-primary" : "text-gray-400"
        }`}
      >
        <HiChartBar size={25} />
      </Link>
      <Link
        href={"/mypage"}
        className={`${
          currentPath === "/mypage" ? "text-primary" : "text-gray-400"
        }`}
      >
        <HiMiniUser size={25} />
      </Link>
    </nav>
  );
}
