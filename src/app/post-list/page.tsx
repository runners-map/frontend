import { ChatRoom } from '@/types/ChatRoom';
import axios from 'axios';
import Link from 'next/link';
import { FaClipboardList } from 'react-icons/fa';

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
      <div className="bg-gradient-to-r from-primary p-5 via-blue-500 to-blue-400 shadow-2xl rounded-3xl text-white mb-10 ">
        <h1 className="text-2xl font-semibold border-b-2 border-gray-400 pb-4 mb-5">
          참여중인 러닝크루 <span className="text-3xl"> ({chats.length}) </span>
        </h1>
        <div>
          <p>곧 시작될 러닝</p>
          <p className="text-2xl text-bold">1개</p>
        </div>
      </div>
      <h2 className="text-xl text-extrabold border-b-2 border-primary flex mb-5">
        <FaClipboardList className="h-6 w-6 text-primary mr-2" />
        <p>모집글 목록</p>
      </h2>

      {chats.map((chat: ChatRoom) => {
        let genderIcon;
        switch (chat.gender) {
          case 'M':
            genderIcon = (
              <span role="img" aria-label="male">
                🏃‍♂️
              </span>
            );
            break;
          case 'F':
            genderIcon = (
              <span role="img" aria-label="female">
                🏃‍♀️
              </span>
            );
            break;
          case 'All':
            genderIcon = (
              <span role="img" aria-label="all-gender">
                🏃‍♀️🏃‍♂️
              </span>
            );
            break;
          default:
            genderIcon = null;
        }
        return (
          <li
            key={chat.chatRoomId}
            className="rounded-3xl bg-gray-200 bg-opacity-70 shadow-lg transform transition-transform duration-300 mb-5 active:bg-gray-400 active:scale-95 active:transition-transform">
            <Link href={`/post-list/post/${chat.chatRoomId}/post-info`} className="block p-6 rounded-3xl">
              <div className="flex">
                <div className="flex items-center">
                  {genderIcon && <div className="mr-2 p-5 rounded-full shadow-lg">{genderIcon}</div>}
                  <div className="ml">
                    <h2 className="text-lg font-semibold text-gray-800">{chat.title}</h2>
                    <div className="text-xs text-gray-500">
                      {String(chat.startTime).split('T')[0]} {String(chat.startTime).split('T')[1]}{' '}
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
