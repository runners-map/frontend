import { create } from 'zustand';
import Cookies from 'js-cookie';

export interface UserInfoType {
  accessToken: string;
  refreshToken: string;
  userId: number;
  gender: string;
  lastPosition: string | null;
  email: string;
  nickname: string;
  profileImageUrl: string;
}

interface AuthState {
  user: UserInfoType | null;
  userId: number;
  saveUser: (
    accessToken: string,
    refreshToken: string,
    userId: number,
    gender: string,
    lastPosition: string | null,
    nickname: string,
    email: string,
    profileImageUrl: string
  ) => void;
  isLogin: boolean;
  checkLogin: () => void;
  logout: () => void;
  setUserId: (userId: number) => void;
}

export const useUserInfo = create<AuthState>(set => ({
  user: null,
  userId: 0,
  isLogin: false,
  saveUser: (accessToken, refreshToken, userId, gender, lastPosition, nickname, email, profileImageUrl) => {
    const user: UserInfoType = {
      accessToken,
      refreshToken,
      userId,
      gender,
      lastPosition,
      email,
      nickname,
      profileImageUrl
    };
    set({ user, isLogin: true });
  },
  checkLogin: () => {
    const accessToken = Cookies.get('accessToken');
    const refreshToken = Cookies.get('refreshToken');
    if (accessToken && refreshToken) {
      set({ isLogin: true });
    } else {
      set({ user: null, isLogin: false });
    }
  },
  logout: () => {
    Cookies.remove('accessToken');
    Cookies.remove('refreshToken');
    set({ user: null, isLogin: false });
  },
  setUserId: newUserId => set({ userId: newUserId })
}));
