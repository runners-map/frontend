'use client';

import { useRouter } from 'next/navigation';

export default function ChatButton({ id }: { id: string }) {
  const router = useRouter();

  const handleChat = (id: string) => {
    router.push(`/post-list/post/${id}/comment`);
  };

  return (
    <button
      className="shadow-lg rounded-full bg-blue-200 active:bg-blue-400 transition-colors duration-150 ease-in-out text-white w-12 h-12 flex items-center justify-center ml-2"
      onClick={() => handleChat(id)}>
      💬
    </button>
  );
}
