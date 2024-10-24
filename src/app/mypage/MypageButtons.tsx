"use client";

import { useRouter } from "next/navigation";
import {
  HiOutlineCog6Tooth,
  HiMiniArrowRightOnRectangle,
  HiOutlineUserMinus,
} from "react-icons/hi2";
export default function MyPageButtons() {
  const router = useRouter();

  const handleClickSettingBtn = () => {
    router.push("/mypage/setting");
  };
  return (
    <>
      <button
        className="btn btn-primary w-full rounded-full shadow-2xl text-base"
        onClick={handleClickSettingBtn}
      >
        <HiOutlineCog6Tooth size={25} />내 정보 변경
      </button>
      <button className="btn btn-primary w-full rounded-full shadow-2xl text-base">
        <HiMiniArrowRightOnRectangle />
        로그아웃
      </button>
      <button className="btn btn-secondary w-full rounded-full shadow-2xl text-base">
        <HiOutlineUserMinus />
        회원 탈퇴
      </button>
    </>
  );
}
