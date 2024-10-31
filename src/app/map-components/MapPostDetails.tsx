"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { AiFillHeart } from "react-icons/ai";

export default function MapPostDetails({ post }) {
  const [like, setLike] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const router = useRouter();

  const handleEnter = async () => {
    router.push(`/post-list/post/${post.postId}/post-info`);
  };

  const handleLike = () => {
    if (isLiked) {
      setLike(like - 1);
    } else {
      setLike(like + 1);
    }
    setIsLiked(!isLiked);
  };

  return (
    <>
      <div className="w-full">
        {post.arriveYn ? (
          <div className="relative w-[328px] h-[256px] overflow-hidden">
            <Image
              src={post.afterRunPictureUrl}
              alt={post.title}
              fill
              className="object-cover"
            />
            <button
              onClick={handleLike}
              className="btn bg-white rounded-full absolute bottom-5 right-5 w-12 h-12 p-0"
            >
              <AiFillHeart
                size={30}
                className={isLiked ? "text-neutral" : "text-pink-200"}
              />
              <span className="absolute -top-2.5 -right-2.5 text-white bg-neutral rounded-full px-2 py-1 text-xs">
                {like}
              </span>
            </button>
          </div>
        ) : (
          <>
            <div className="post-details p-5 flex flex-col w-full">
              <div className="flex gap-3 mb-2">
                <div className="relative h-16 w-16 rounded-full">
                  <Image
                    src="https://img.freepik.com/free-photo/asian-woman-smiling-happy-face-portrait-close-up_53876-148130.jpg?t=st=1730159047~exp=1730162647~hmac=403f2a31c75554b85afdb8b6b3b6e6d0310e941e9a1506bb1655e94a9372d569&w=996"
                    fill
                    className="object-cover rounded-full"
                  ></Image>
                </div>
                <div>
                  <h2 className="text-lg">{post.title}</h2>
                  <p>{post.admin}</p>
                </div>
              </div>
              <div>
                <div className="text-sm text-center">
                  {post.gender === "M"
                    ? "남성"
                    : post.gender === "F"
                    ? "여성"
                    : "혼성"}{" "}
                  / {post.distance}km / {post.paceMin}'{post.paceSec}" /{" "}
                  {post.limitMemberCnt}명 /{" "}
                  {new Date(post.startDateTime).getMonth() + 1}월{" "}
                  {new Date(post.startDateTime).getDate()}일 /{" "}
                  {new Date(post.startDateTime).getHours()}:
                  {String(new Date(post.startDateTime).getMinutes()).padStart(
                    2,
                    "0"
                  )}
                </div>
              </div>
              <div className="divider my-1"></div>
              <p>{post.content}</p>
              <button
                className="btn w-full rounded-full btn-primary text-white mt-2"
                onClick={handleEnter}
              >
                참가 하기
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
}
