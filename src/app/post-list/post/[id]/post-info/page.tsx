// PostInfoPage.tsx
import PostInfo from './PostInfo';

export const metadata = {
  title: '채팅방 조회'
};

export default async function PostInfoPage({ params: { id } }: { params: { id: string } }) {
  return <PostInfo id={id} />;
}
