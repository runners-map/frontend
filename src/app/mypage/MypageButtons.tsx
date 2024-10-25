'use client';

import { useUserInfo } from '@/types/UserInfo';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { HiOutlineCog6Tooth, HiMiniArrowRightOnRectangle, HiOutlineUserMinus } from 'react-icons/hi2';
import Cookies from 'js-cookie';
export default function MyPageButtons() {
  const router = useRouter();
  const { logout } = useUserInfo();

  const handleLogout = async () => {
    try {
      await axios.post(
        '/api/user/logout',
        {},
        {
          headers: {
            Authorization: `Bearer ${Cookies.get('accessToken')}`
          }
        }
      );
      console.log('액세스 토큰은', Cookies.get('accessToken'));
      logout();
      router.push('/login');
      console.log('로그아웃 성공');
    } catch (error) {
      console.error('로그아웃 실패:', error);
    }
  };

  const handleClickSettingBtn = () => {
    router.push('/mypage/setting');
  };
  return (
    <>
      <button className="btn btn-primary w-full rounded-full shadow-2xl text-base" onClick={handleClickSettingBtn}>
        <HiOutlineCog6Tooth size={25} />내 정보 변경
      </button>
      <button className="btn btn-primary w-full rounded-full shadow-2xl text-base" onClick={handleLogout}>
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
