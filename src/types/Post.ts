import { create } from 'zustand';

export interface Post {
  adminId: number;
  title: string;
  content: string;
  limitMemberCnt: number;
  gender: string;
  startDateTime: Date;
  startPosition: string;
  swLatlng: number;
  neLatlng: number;
  distance: number;
  paceMin: number;
  paceSec: number;
  path: string[];
}

interface PostState {
  adminId: number;
  path: string[];
  distance: number;
  startPosition: string;
  setAdminId: (adminId: number) => void;
  setPath: (path: string[]) => void;
  setDistance: (distance: number) => void;
  setStartPosition: (startPosition: string) => void;
}

export const usePostStore = create<PostState>(set => ({
  adminId: 0,
  path: [],
  distance: 0,
  startPosition: '',
  setAdminId: newAdminId => set({ adminId: newAdminId }),
  setPath: newPath => set({ path: newPath }),
  setDistance: newDistance => set({ distance: newDistance }),
  setStartPosition: newPosition => set({ startPosition: newPosition })
}));

export interface GetPostsRequest {
  swLatlng: string;
  neLatlng: string;
  gender: string;
  paceMinStart: number;
  paceMinEnd: number;
  distanceStart: number;
  distanceEnd: number;
  startDate: string;
  startTime: string;
  limitMemberCnt: number;
}

export interface GetPostsResponse {
  status: number;
  errorCode?: string;
  message?: string;
  data: Post[];
}
