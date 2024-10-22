import Header from "@/components/Header";
import { ChatRoom } from "@/types/ChatRoom";
import axios from "axios";
import PostInfoButton from "./PostInfoButton";
import ChatRoomContainer from "./ChatRoomContainer";

const getChatRoom = async (id: string) => {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/ChatRoom`
  );
  const data = response.data.find(
    (d: ChatRoom) => d.chatRoomId === parseInt(id)
  );
  return data;
};

export default async function ChatPage({
  params: { id },
}: {
  params: { id: string };
}) {
  const chatRoom = await getChatRoom(id);
  return (
    <div>
      <section className="flex justify-center bg-gradient-to-r from-blue-200 to-purple-200 p-10">
        <Header />
        <h1 className="text-4xl font-extrabold">{chatRoom.title}</h1>
        <PostInfoButton id={id} />
      </section>
      <section>
        <ChatRoomContainer />
      </section>
    </div>
  );
}
