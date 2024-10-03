import { ChatRoom } from '@/types/ChatRoom';
import axios from 'axios';
import Link from 'next/link';

export const metadata = {
  title: '채팅방 목록'
};

const getChatList = async () => {
  await new Promise(resolve => setTimeout(resolve, 1000));
  const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/ChatRoom`);
  return response.data;
};

export default async function ChatListPage() {
  const chats = await getChatList();
  return (
    <ul className="p-14">
      {chats.map((chat: ChatRoom) => (
        <li
          key={chat.chat_room_id}
          className="bg-gradient-to-r from-blue-200 to-purple-200 shadow-lg rounded-lg overflow-hidden transform hover:scale-105 transition-transform duration-300 mb-5">
          <Link href={`/chat-list/${chat.chat_room_id}/post-info`} className="block p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">{chat.title}</h2>
          </Link>
        </li>
      ))}
    </ul>
  );
}
