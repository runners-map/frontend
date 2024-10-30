import Header from '@/components/Header';
import PostInfoButton from './PostInfoButton';
import CommentSection from './CommentSection';
export const metadata = {
  title: '댓글 달기'
};
export default async function CommentPage({ params: { id } }: { params: { id: string } }) {
  return (
    <div>
      <section className="flex justify-center bg-gradient-to-r from-primary to-blue-200 p-10">
        <Header />
        <PostInfoButton id={id} />
      </section>
      <section>
        <CommentSection />
      </section>
    </div>
  );
}
