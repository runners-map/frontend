export interface Participant {
  userId: number;
  nickname: string;
}

export interface ChatRoom {
  postId: number;
  chatRoomId: number;
  adminId: number;
  adminNickname: string;
  title: string;
  content: string;
  limitMemberCnt: number;
  gender: string;
  startTime: Date;
  startPosition: string;
  distance: number;
  paceMin: number;
  paceSec: number;
  memberCnt: number;
  createdAt: string;
  participants: Participant[];
  departureYn: string;
  arriveYn: string;
}
