export interface Post {
  postId: number;
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
  path: string;
}

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
