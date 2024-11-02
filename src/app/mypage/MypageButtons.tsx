'use client';

import { useRouter } from 'next/navigation';
import { HiOutlineCog6Tooth, HiMiniArrowRightOnRectangle, HiOutlineUserMinus } from 'react-icons/hi2';

export default function MyPageButtons() {
  const router = useRouter();
  const handleLogout = async () => {
    router.push('/login');
  };

  const handleClickSettingBtn = () => {
    router.push('/mypage/setting');
  };
  const handleDeleteAccount = () => {
    router.push('/mypage/delete-account');
  };

  return (
    <>
      <button
        className="btn btn-primary w-full rounded-full text-base shadow-md shadow-slate-300 text-white"
        onClick={handleClickSettingBtn}>
        <HiOutlineCog6Tooth size={25} />내 정보 변경
      </button>
      <button
        onClick={handleLogout}
        className="btn btn-primary w-full rounded-full text-base shadow-md shadow-slate-300 text-white">
        <HiMiniArrowRightOnRectangle size={25} />
        로그아웃
      </button>
      <button
        onClick={handleDeleteAccount}
        className="btn btn-secondary w-full rounded-full shadow-md shadow-slate-300 text-base text-white">
        <HiOutlineUserMinus size={25} />
        회원 탈퇴
      </button>
    </>
  );
}
