import { create } from 'zustand';

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

// export interface GetPostsRequest {
//   swLatlng: string;
//   neLatlng: string;
//   gender: string;
//   paceMinStart: number;
//   paceMinEnd: number;
//   distanceStart: number;
//   distanceEnd: number;
//   startDate: string;
//   startTime: string;
//   limitMemberCnt: number;
// }

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
  postIdResponse: number;
  adminIdResponse: number;
  titleResponse: string;
  contentResponse: string;
  limitMemberCntResponse: number;
  genderResponse: string;
  startDateTimeResponse: Date;
  startPositionResponse: string;
  distanceResponse: number;
  paceMinResponse: number;
  paceSecResponse: number;
  pathResponse: PathPoint[];
  setPostIdResponse: (postId: number) => void;
  setAdminIdResponse: (adminId: number) => void;
  setTitleResponse: (title: string) => void;
  setContentResponse: (content: string) => void;
  setLimitMemberCntResponse: (limitMemberCnt: number) => void;
  setGenderResponse: (gender: string) => void;
  setPathResponse: (path: PathPoint[]) => void;
  setDistanceResponse: (distance: number) => void;
  setStartPositionResponse: (startPosition: string) => void;
  setStartDateTimeResponse: (startDateTimeResponse: Date) => void;
  setPaceMinResponse: (paceMin: number) => void;
  setPaceSecResponse: (paceSec: number) => void;
}

export const usePostResponseStore = create<GetPostResponseState>(set => ({
  postIdResponse: 0,
  adminIdResponse: 0,
  titleResponse: '',
  contentResponse: '',
  limitMemberCntResponse: 0,
  genderResponse: '',
  startDateTimeResponse: new Date(),
  startPositionResponse: '',
  distanceResponse: 0,
  paceMinResponse: 0,
  paceSecResponse: 0,
  pathResponse: [],

  setPostIdResponse: postId => set({ postIdResponse: postId }),
  setAdminIdResponse: adminId => set({ adminIdResponse: adminId }),
  setTitleResponse: title => set({ titleResponse: title }),
  setContentResponse: content => set({ contentResponse: content }),
  setLimitMemberCntResponse: limitMemberCnt => set({ limitMemberCntResponse: limitMemberCnt }),
  setGenderResponse: gender => set({ genderResponse: gender }),
  setStartDateTimeResponse: startDateTime => set({ startDateTimeResponse: startDateTime }),
  setStartPositionResponse: startPosition => set({ startPositionResponse: startPosition }),
  setDistanceResponse: distance => set({ distanceResponse: distance }),
  setPaceMinResponse: paceMin => set({ paceMinResponse: paceMin }),
  setPaceSecResponse: paceSec => set({ paceSecResponse: paceSec }),
  setPathResponse: path => set({ pathResponse: path })
}));
