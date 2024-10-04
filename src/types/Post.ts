export interface Post {
  postId: number;
  adminId: string;
  title: string;
  content: string;
  limitMemberCnt: number;
  gender: string;
  startDateTime: Date;
  startPosition: Date;
  distance: number;
  paceMin: number;
  paceSec: number;
  path: string;
  departureYn: boolean;
  arriveYn: boolean;
  lat: number;
  lng: number;
  createdDateTime: string;
  updatedDateTime: string;
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
