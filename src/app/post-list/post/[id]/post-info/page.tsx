// PostInfoPage.tsx
<<<<<<< HEAD
import PostInfo from './PostInfo';

export const metadata = {
  title: '채팅방 조회'
};

export default async function PostInfoPage({ params: { id } }: { params: { id: string } }) {
=======
import PostInfo from "./PostInfo";

export const metadata = {
  title: "채팅방 조회",
};

export default async function PostInfoPage({
  params: { id },
}: {
  params: { id: string };
}) {
>>>>>>> c3cc66b (fix : 충돌해결)
  return <PostInfo id={id} />;
}
