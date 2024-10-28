import PostEditForm from '@/app/post-list/post/[id]/edit/PostEditForm';

export const metadata = {
  title: '모집글 수정'
};

export default async function EditPostPage({ params: { id } }: { params: { id: string } }) {
  return <PostEditForm id={id} />;
}
