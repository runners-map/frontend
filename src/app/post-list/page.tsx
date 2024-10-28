// pages/post-list/index.tsx (PostListPage 서버 컴포넌트)
import ClientPostList from './ClientPostList';

export const metadata = {
  title: '채팅방 목록'
};

export default function PostListPage() {
  return <ClientPostList />;
}
