"use client";

import { useRouter } from "next/navigation";

export default function MyPageButtons() {
  const router = useRouter();

  const handleClickSettingBtn = () => {
    router.push("/mypage/setting");
  };
  return (
    <>
      <button
        className="btn btn-outline btn-primary w-full"
        onClick={handleClickSettingBtn}
      >
        설정 변경
      </button>
      <button className="btn btn-outline btn-primary w-full">로그 아웃</button>
      <button className="btn btn-outline btn-primary w-full">회원 탈퇴</button>
    </>
  );
}
