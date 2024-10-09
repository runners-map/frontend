export interface ChatMessage {
  messageId: number;
  userId: number;
  chatRoomId: number;
  message: string;
  sendAt: Date;
  id: string;
}
