import Header from '@/components/Header';
import { FaUsers, FaTransgender, FaClock, FaMapMarkerAlt, FaRoad, FaRunning } from 'react-icons/fa';
import EditButton from './EditButton';
import ChatButton from './CommentButton';
import DeleteButton from './DeleteButton';
import fetchCall from '@/lib/axios';
import { Post } from '@/types/Post';

const getPostList = async (id: string) => {
  await new Promise(resolve => setTimeout(resolve, 1000));
  const response = await fetchCall<Post>(`/posts/${id}`, 'get');
  return response;
};

export async function generateMetadata({ params: { id } }: { params: { id: string } }) {
  const chats = await getPostList(id);

  return {
    title: chats.title
  };
}

export default async function PostInfoPage({ params: { id } }: { params: { id: string } }) {
  const chats = await getPostList(id);

  return (
    <div className="flex flex-col min-h-screen bg-primary">
      <header className="flex justify-center relative p-10 shadow-md">
        <Header />
        <h1 className="text-4xl text-white font-bold text-center">{chats.title}</h1>
      </header>
      <main className="flex-1 p-6 bg-white shadow-2xl rounded-t-3xl">
        <section className="mb-6 bg-white p-4 rounded-2xl shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-semibold">채팅방 정보</h2>
            <div className="flex space-x-2">
              <EditButton id={id} />
              <ChatButton id={id} />
              <DeleteButton id={id} />
            </div>
          </div>
          <p className="text-lg flex items-center mb-4">
            <FaUsers className="mr-2 text-primary" />
            제한인원: <span className="font-bold">{chats.limitMemberCnt}</span>
          </p>
          <p className="text-lg flex items-center mb-4">
            <FaTransgender className="mr-2 text-primary" />
            제한성별:{' '}
            <span className="font-bold">
              {chats.gender === 'All' ? '제한없음' : chats.gender === 'M' ? '남자' : '여자'}
            </span>
          </p>
          <p className="text-lg flex items-center mb-4">
            <FaClock className="mr-2 text-primary" />
            출발시간:{' '}
            <span className="font-bold">
              {String(chats.startDateTime).split('T')[0]} {String(chats.startDateTime).split('T')[1]}{' '}
            </span>
          </p>
          <p className="text-lg flex items-center mb-4">
            <FaMapMarkerAlt className="mr-2 text-primary" />
            출발위치: <span className="font-bold">{chats.startPosition}</span>
          </p>
          <p className="text-lg flex items-center mb-4">
            <FaRoad className="mr-2 text-primary" />
            거리: <span className="font-bold">{chats.distance}km</span>
          </p>
          <p className="text-lg flex items-center mb-4">
            <FaRunning className="mr-2 text-primary" />
            페이스:{' '}
            <span className="font-bold">
              {chats.paceSec ? `${chats.paceMin}분 ${chats.paceSec}초` : `${chats.paceMin}분`}
            </span>
          </p>
          <p className="mt-4 text-lg text-gray-800 leading-relaxed bg-gray-100 p-4 rounded-md border-2 border-primary border-dotted shadow-md">
            {chats.content}
          </p>
        </section>
        {/* <section className="border-t-2 border-gray-200 pt-4">
          <h2 className="text-2xl font-semibold mb-4">참가 예정 멤버</h2>
          <ul className="space-y-3">
            {chats.participants.map((participant: Participant) => (
              <li key={participant.userId} className="bg-white border-l-4 border-primary rounded-lg shadow-md p-4">
                <div className="flex items-center space-x-4">
                  <span className="font-bold text-gray-800">{participant.nickname}</span>
                </div>
              </li>
            ))}
          </ul>
        </section> */}
      </main>
    </div>
  );
}
