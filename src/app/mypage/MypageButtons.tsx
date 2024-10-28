"use client";

import { useRouter } from "next/navigation";
import {
  HiOutlineCog6Tooth,
  HiMiniArrowRightOnRectangle,
  HiOutlineUserMinus,
} from "react-icons/hi2";
import Cookies from "js-cookie";
import axios from "axios";

export default function MyPageButtons({ logout }) {
  const handleLogout = async () => {
    try {
      // 로그아웃 API 호출
      await axios.post(
        "/api/user/logout",
        {},
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("accessToken")}`, // Authorization 헤더에 토큰 추가
          },
        }
      );

      console.log("액세스 토큰은", Cookies.get("accessToken"));

      // 로그아웃 후 isLogin을 false로 설정
      logout();
      console.log("로그아웃 성공");
      router.push("/login");
    } catch (error) {
      console.error("로그아웃 실패:", error);
    }
  };

  const router = useRouter();

  const handleClickSettingBtn = () => {
    router.push("/mypage/setting");
  };
  return (
    <>
      <button
        className="btn btn-primary w-full rounded-full text-base shadow-md shadow-slate-300 text-white"
        onClick={handleClickSettingBtn}
      >
        <HiOutlineCog6Tooth size={25} />내 정보 변경
      </button>
      <button
        onClick={handleLogout}
        className="btn btn-primary w-full rounded-full text-base shadow-md shadow-slate-300 text-white"
      >
        <HiMiniArrowRightOnRectangle />
        로그아웃
      </button>
      <button className="btn btn-secondary w-full rounded-full shadow-md shadow-slate-300 text-base ">
        <HiOutlineUserMinus />
        회원 탈퇴
      </button>
    </>
  );
}
