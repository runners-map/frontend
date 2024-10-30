import { create } from "zustand";

interface PathPoint {
  lat: number;
  lng: number;
}

export interface Post {
  postId: number;
  adminId: number;
  title: string;
  content: string;
  limitMemberCnt: number;
  gender: string;
  startDateTime: Date;
  startPosition: string;
  distance: number;
  paceMin: number;
  paceSec: number;
  paceTime: string;
  path: PathPoint[];
  departureYn: boolean;
  arriveYn: boolean;
  centerLat: number;
  centerLng: number;
  fileId: number | null;
  afterRunPictureUrl: string | null;
  likeCount: number;
}

interface PostState {
  adminId: number;
  path: PathPoint[];
  distance: number;
  startPosition: string;
  setAdminId: (adminId: number) => void;
  setPath: (path: PathPoint[]) => void;
  setDistance: (distance: number) => void;
  setStartPosition: (startPosition: string) => void;
}

export const usePostStore = create<PostState>((set) => ({
  adminId: 0,
  path: [],
  distance: 0,
  startPosition: "",
  setAdminId: (newAdminId) => set({ adminId: newAdminId }),
  setPath: (newPath) => set({ path: newPath }),
  setDistance: (newDistance) => set({ distance: newDistance }),
  setStartPosition: (newPosition) => set({ startPosition: newPosition }),
}));

export interface GetPostResponse {
  postId: number;
  adminId: number;
  title: string;
  content: string;
  limitMemberCnt: number;
  gender: string;
  startDateTime: Date;
  startPosition: string;
  distance: number;
  paceMin: number;
  paceSec: number;
  path: PathPoint[];
}

export interface GetPostResponseState {
  startPositionResponse: string;
  distanceResponse: number;
  pathResponse: PathPoint[];
  setPathResponse: (path: PathPoint[]) => void;
  setDistanceResponse: (distance: number) => void;
  setStartPositionResponse: (startPosition: string) => void;
}

export interface PostFilter {
  gender: string;
  pace: string;
  paceMinStart: number | null | "";
  paceMinEnd: number | null | "";
  distance: string;
  distanceStart: number | null | "";
  distanceEnd: number | null | "";
  limitMemberCnt: string;
  limitMemberCntStart: number | null | "";
  limitMemberCntEnd: number | null | "";
  startDate: string;
  startTime: string;
}

export interface MapPostQuery {
  centerLat: number | null;
  centerLng: number | null;
  gender: string;
  paceMinStart: number | null | "";
  paceMinEnd: number | null | "";
  distanceStart: number | null | "";
  distanceEnd: number | null | "";
  limitMemberCntStart: number | null | "";
  limitMemberCntEnd: number | null | "";
  startDate: string;
  startTime: string;
}
export const usePostResponseStore = create<GetPostResponseState>((set) => ({
  startPositionResponse: "",
  distanceResponse: 0,
  pathResponse: [],
  setStartPositionResponse: (startPosition) =>
    set({ startPositionResponse: startPosition }),
  setDistanceResponse: (distance) => set({ distanceResponse: distance }),
  setPathResponse: (path) => set({ pathResponse: path }),
}));
