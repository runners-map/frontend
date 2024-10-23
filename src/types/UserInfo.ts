import { create } from 'zustand';
import Cookies from 'js-cookie';

export interface UserInfoType {
  userId: number;
  gender: string;
  lastPosition: string;
  email: string;
  nickname: string;
}

interface AuthState {
  user: UserInfoType | null;
  saveUser: (user: UserInfoType) => void;
  isLogin: boolean;
  checkLogin: () => void;
  logout: () => void;
}

export const useUserInfo = create<AuthState>(set => ({
  user: null,
  isLogin: false,
  saveUser: user => {
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
  }
}));
