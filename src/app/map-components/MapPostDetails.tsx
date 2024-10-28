import Image from "next/image";
import { AiFillHeart } from "react-icons/ai";
import Cookies from "js-cookie";
import { useUserInfo } from "@/types/UserInfo";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function MapPostDetails({ post }) {
  const { user } = useUserInfo();
  const router = useRouter();

  const handleEnter = async () => {
    try {
      const response = await axios.post(
        `/api/posts/participate`,
        {},
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("accessToken")}`, // 필요시 인증 토큰 추가
          },
          params: {
            userId: user?.userId,
            postId: post.postId,
          },
        }
      );

      console.log("참여 성공:", response.data);
      // 성공적으로 참여가 완료되었음을 사용자에게 알리거나 상태 업데이트를 수행
      router.push(`/post-list/post/${post.postId}/post-info`);
    } catch (error) {
      console.error("참여 오류:", error);
      // 에러 처리 로직 추가 (예: 사용자에게 오류 알림)
    }
  };

  const handleLike = async () => {
    try {
      const response = await axios.post(
        `/api/posts/${post.postId}/after-run-pictures/${post.fileId}/like`,
        {},
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("accessToken")}`, // 필요한 경우 인증 토큰 추가
          },
        }
      );

      console.log("Like successful:", response.data);
      // 성공적으로 좋아요가 처리되었음을 사용자에게 알리거나 상태 업데이트를 수행할 수 있음
    } catch (error) {
      console.error("Error liking post:", error);
      // 에러 처리 로직 추가 (예: 사용자에게 오류 알림)
    }
  };
  return (
    <>
      <div>
        {post.arriveYn ? (
          <div className="relative w-full h-full overflow-hidden">
            <Image
              src={post.afterRunPictureUrl}
              alt={post.title}
              fill
              className="object-cover rounded-lg"
            />
            <button
              onClick={handleLike}
              className="btn rounded-full absolute bottom-5 right-5 w-12 h-12 p-0"
            >
              <AiFillHeart size={30} className="text-secondary" />
              <span className="absolute -top-2 -right-2 text-white bg-red-500 rounded-full px-2 py-1 text-xs">
                {post.likeCount}
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
