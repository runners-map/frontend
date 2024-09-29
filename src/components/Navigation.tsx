"use client";

import Link from "next/link";

export default function Navigation() {
  return (
    <>
      <nav>
        <ul>
          <li>
            <Link href={"/"}>맵</Link>
          </li>
          <li>
            <Link href={"/chat-list"}>채팅방 목록</Link>
          </li>
          <li>
            <Link href={"/chart"}>기록</Link>
          </li>
          <li>
            <Link href={"/ranking"}>랭킹</Link>
          </li>
          <li>
            <Link href={"/mypage"}>마이페이지</Link>
          </li>
        </ul>
      </nav>
    </>
  );
}
