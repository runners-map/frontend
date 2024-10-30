
import { create } from "zustand";
import { persist } from "zustand/middleware"; // persist 미들웨어 추가
import Cookies from "js-cookie";


export interface UserInfoType {
  accessToken: string;
  refreshToken: string;
  userId: number;
  gender: string;
  email: string;
  nickname: string;
  lastPosition: string;
  profileImageUrl: string;
}

interface AuthState {
  user: UserInfoType | null;
  saveUser: (user: UserInfoType) => void;
  updateUser: (newUserData: Partial<UserInfoType>) => void;
  isLogin: boolean;
  checkLogin: () => void;
  logout: () => void;
}


const localStorageCustom = {
  getItem: (name: string) => {
    const item = localStorage.getItem(name);
    return item ? JSON.parse(item) : null;
  },
  setItem: (name: string, value: any) => {
    localStorage.setItem(name, JSON.stringify(value));
  },
  removeItem: (name: string) => {
    localStorage.removeItem(name);
  },
};

export const useUserInfo = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isLogin: false,
      saveUser: (user) => {
        set({ user, isLogin: true });
      },
      updateUser: (newUserData) => {
        set((state) => ({
          user: state.user ? { ...state.user, ...newUserData } : state.user,
        }));
      },
      checkLogin: () => {
        const accessToken = Cookies.get("accessToken");
        const refreshToken = Cookies.get("refreshToken");

        if (accessToken && refreshToken) {
          set({ isLogin: true });
        } else {
          set({ user: null, isLogin: false });
        }
      },
      logout: () => {
        Cookies.remove("accessToken");
        Cookies.remove("refreshToken");
        set({ user: null, isLogin: false });
      },
    }),
    {
      name: "user-info-storage", // 로컬 저장소에 저장될 키 이름
      storage: localStorageCustom, // 로컬 스토리지 사용
    }
  )
);
