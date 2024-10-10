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
        className="btn btn-outline btn-primary w-full"
        onClick={handleClickSettingBtn}
      >
        <HiOutlineCog6Tooth />내 정보 변경
      </button>
      <button className="btn btn-outline btn-primary w-full">
        <HiMiniArrowRightOnRectangle />
        로그아웃
      </button>
      <button className="btn btn-outline btn-secondary w-full">
        <HiOutlineUserMinus />
        회원 탈퇴
      </button>
    </>
  );
}
