import { ChatRoom } from '@/types/ChatRoom';
import axios from 'axios';

export const metadata = {
  title: '채팅방 목록'
};

const getChatList = async () => {
  const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/ChatRoom`);
  return response.data;
};

export default async function ChatListPage() {
  const chats = await getChatList();

  return (
    <ul>
      {chats.map((chat: ChatRoom) => (
        <li key={chat.chat_room_id}>{chat.title}</li>
      ))}
    </ul>
  );
}
