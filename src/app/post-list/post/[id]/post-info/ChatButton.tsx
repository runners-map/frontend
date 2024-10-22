'use client';

import { useRouter } from 'next/navigation';

export default function ChatButton({ id }: { id: string }) {
  const router = useRouter();

  const handleChat = (id: string) => {
    router.push(`/chat-list/${id}/chat`);
  };

  return (
    <button className="btn btn-outline btn-success ml-2" onClick={() => handleChat(id)}>
      채팅
    </button>
  );
}
