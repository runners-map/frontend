"use client";

import axios from "axios";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Ranking } from "@/types/Ranking";
import { HiMiniUser } from "react-icons/hi2";
import RankingLoading from "./RankingLoading";

const fetchRankingList = async () => {
  try {
    console.log("데이터 받아오기 시작");
    const res = await axios.get("/api/ranking");
    console.log("결과", res.data);
    return res.data;
  } catch (error) {
    console.error(error);
    return []; // 오류 발생 시 빈 배열 반환
  }
};

export default function RankingList() {
  const [rankingList, setRankingList] = useState<Ranking[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth() + 1;

  useEffect(() => {
    const loadRankingList = async () => {
      setIsLoading(true); // 로딩 시작
      const data = await fetchRankingList(); // 비동기 함수 호출
      setRankingList(data); // 데이터 설정
      setIsLoading(false); // 로딩 종료
    };

    loadRankingList(); // useEffect 내부에서 비동기 함수 호출
  }, [currentYear, currentMonth]);

  return (
    <div
      className="p-5 overflow-y-scroll"
      style={{ height: "calc(100vh - 124px)" }}
    >
      {isLoading ? (
        <div className="">
          <RankingLoading />
        </div>
      ) : (
        <ul className="space-y-4">
          {rankingList.map((ranking) => (
            <li
              key={ranking.userId}
              className={`flex justify-between items-center h-20 px-4 rounded-3xl shadow-md ${
                ranking.rankPosition === 1
                  ? "bg-yellow-300"
                  : ranking.rankPosition === 2
                  ? "bg-slate-300"
                  : ranking.rankPosition === 3
                  ? "bg-orange-300"
                  : "bg-white"
              }`}
            >
              <span
                className={`font-semibold basis-2/12 ${
                  ranking.rankPosition <= 3 ? "text-3xl" : "text-base"
                }`}
              >
                {ranking.rankPosition === 1
                  ? "🥇"
                  : ranking.rankPosition === 2
                  ? "🥈"
                  : ranking.rankPosition === 3
                  ? "🥉"
                  : `${ranking.rankPosition}위 `}
              </span>
              <div className="basis-3/12 aspect-square relative rounded-full">
                {ranking.profileImageUrl !== "" ? (
                  <Image
                    src={ranking.profileImageUrl}
                    alt="프로필사진"
                    fill
                    className="object-cover rounded-full w-full"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gray-400 text-gray-300 rounded-full">
                    <HiMiniUser className="w-5/6 h-5/6" />
                  </div>
                )}
              </div>
              <span className="text-lg basis-5/12 text-center">
                {ranking.nickName}
              </span>
              <span className="text-gray-600 basis-3/12 text-right">
                {ranking.totalDistance} km
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
