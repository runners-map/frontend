import { AiFillHeart } from "react-icons/ai";
export default function MapPostDetails({ post }) {
  const handleEnter = () => {
    console.log("모집글 입장", post.postId);
    // postId로 입장 처리
    // postId로 모집글로 이동
  };
  return (
    <>
      <div>
        {post.arriveYn ? (
          <div className="relative w-full h-full overflow-hidden">
            <img
              src={post.photo_url}
              alt={post.title}
              className="object-cover rounded-lg"
            />
            <button className="btn rounded-full absolute bottom-5 right-5 w-12 h-12 p-0">
              <AiFillHeart size={30} className="text-secondary" />
              <span className="absolute -top-2 -right-2 text-white bg-red-500 rounded-full px-2 py-1 text-xs">
                2
              </span>
            </button>
          </div>
        ) : (
          <>
            <div className="post-details">
              <h2>제목: {post.title}</h2>
              <p>성별: {post.gender}</p>
              <p>제한 인원: {post.limitMemberCnt}</p>
              <p>위도: {post.lat}</p>
              <p>경도: {post.lng}</p>
              <p>내용: {post.content}</p>
            </div>
            <button className="btn w-full" onClick={handleEnter}>
              참가 하기
            </button>
          </>
        )}
      </div>
    </>
  );
}
