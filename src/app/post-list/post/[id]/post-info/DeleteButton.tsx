'use client';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

export default function DeleteButton({ id }: { id: string }) {
  const router = useRouter();
  const accessToken = Cookies.get('accessToken');
  const handleDelete = async () => {
    try {
      await axios.delete(`/api/posts`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        },
        params: {
          postId: id
        }
      });
      router.push('/post-list');
    } catch (error) {
      console.error('Failed to delete the post', error);
    }
  };

  return (
    <button
      onClick={handleDelete}
      className="bg-red-500 text-white rounded p-2 transition-colors duration-150 ease-in-out hover:bg-red-600">
      X
    </button>
  );
}
