'use client';

import { useEffect, useState } from "react";
import { Post } from "@/types/Post";
import Confetti from "react-confetti";
import { useSearchParams, useRouter } from "next/navigation";
import { FaWeightHanging, FaBone, FaSmile } from "react-icons/fa";

const formatTime = (seconds: number) => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;

  return `${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
};

export default function Result({ id }: { id: string }) {
  const [post, setPost] = useState<Post | null>(null);
  const [showConfetti, setShowConfetti] = useState(true);
  const [bodySize, setBodySize] = useState({ width: 0, height: 0 });
  const router = useRouter();
  const searchParams = useSearchParams();
  const timeElapsed = searchParams.get("timeElapsed");

  useEffect(() => {
    const timer = setTimeout(() => setShowConfetti(false), 4000);

    const updateBodySize = () => {
      const body = document.querySelector("body");
      if (body) {
        setBodySize({
          width: body.clientWidth,
          height: body.clientHeight,
        });
      }
    };

    updateBodySize();
    window.addEventListener("resize", updateBodySize);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", updateBodySize);
    };
  }, [id]);

  return (
    <div className="bg-gradient-to-b from-primary to-white via-transparent min-h-screen">
      {showConfetti && (
        <Confetti width={bodySize.width} height={bodySize.height} />
      )}
      <div className="flex flex-col items-center justify-center p-5">
        <h1 className="text-5xl mb-5">축하드립니다</h1>
        <p className="text-lg">
          오늘도 완주하셨군요. 오늘 뛴거리는{" "}
          <span className="font-bold text-2xl">4.0 km</span>이며, 총 걸린 시간은{" "}
          <span className="font-bold text-2xl">
            {formatTime(Number(timeElapsed))}
          </span>
          입니다.
        </p>
      </div>
      <div className="flex flex-col items-center justify-center mt-16 px-14">
        <p>
          나에게 딱 맞는 최적의 러닝 속도를 찾아 더 효율적이고 똑똑한
          러닝라이프를 즐기세요
        </p>
        <div className="flex mt-5 space-x-1">
          <div className="bg-gray-200 w-28 h-28 rounded-full flex flex-col items-center justify-center">
            <FaWeightHanging className="text-3xl mb-2" />
            <p>체중감소</p>
          </div>
          <div className="bg-gray-200 w-28 h-28 rounded-full flex flex-col items-center justify-center">
            <FaBone className="text-3xl mb-2" />
            <p>골밀도 증가</p>
          </div>
          <div className="bg-gray-200 w-28 h-28 rounded-full flex flex-col items-center justify-center">
            <FaSmile className="text-3xl mb-2" />
            <p>자존감 증가</p>
          </div>
        </div>
      </div>
      <div className="flex justify-center mt-20">
        <button
          className="btn btn-primary mr-5 text-white"
          onClick={() => router.push("/")}
        >
          홈으로 가기
        </button>
        <button
          className="btn btn-primary text-white"
          onClick={() => router.push("/post-list/post/77/photo-upload")}
        >
          인증샷 업로드 하기
        </button>
      </div>
    </div>
  );
}
