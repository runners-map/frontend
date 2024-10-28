'use client';

import fetchCall from '@/lib/axios';
import { useRouter } from 'next/navigation';

export default function DeleteButton({ id }: { id: string }) {
  const router = useRouter();
  const handleDelete = async () => {
    try {
      await fetchCall(`/posts/${id}`, 'delete');
      console.log('Post deleted successfully');
      router.push('/post-list');
    } catch (error) {
      console.error('Failed to delete the post', error);
    }
  };

  return (
    <button
      onClick={handleDelete}
      className="bg-red-500 text-white rounded px-4 py-2 transition-colors duration-150 ease-in-out hover:bg-red-600">
      삭제
    </button>
  );
}
