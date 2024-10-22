'use client';

import { useRouter } from 'next/navigation';

export default function EditButton({ id }: { id: string }) {
  const router = useRouter();

  const handleEdit = (id: string) => {
    router.push(`/post/edit/${id}`);
  };

  return (
    <button className="btn btn-outline btn-success" onClick={() => handleEdit(id)}>
      수정
    </button>
  );
}
