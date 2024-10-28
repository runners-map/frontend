'use client';

import { useRouter } from 'next/navigation';

export default function EditButton({ id }: { id: string }) {
  const router = useRouter();

  const handleEdit = () => {
    router.push(`/post-list/post/${id}/edit/editRoute`);
  };

  return (
    <button
      className="shadow-lg rounded-full bg-blue-200 w-12 h-12 active:bg-blue-400 transition-colors duration-150 ease-in-out"
      onClick={() => handleEdit()}>
      📝
    </button>
  );
}
