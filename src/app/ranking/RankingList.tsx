"use client";
import axios from "axios";
import Image from "next/image";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { Ranking } from "@/types/Ranking";

export default function RankingList() {
  const [rankingList, setRankingList] = useState<Ranking[]>([]);
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth() + 1;

  useEffect(() => {
    const fetchRankingList = async () => {
      const accessToken = Cookies.get("accessToken");
      try {
        console.log("데이터 받아오기 시작");
        const res = await axios.get("/api/ranking", {
          headers: {
            Authorization: `Bearer ${accessToken}`, // 액세스 토큰 추가
          },
          params: {
            year: currentYear,
            month: currentMonth,
          },
        });
        console.log("결과", res.data);
        setRankingList(res.data); // 받아온 데이터로 상태 업데이트
      } catch (error) {
        console.error(error);
      }
    };

    fetchRankingList();
  }, [currentYear, currentMonth]);

  return (
    <div
      className="p-5 overflow-y-scroll"
      style={{ height: "calc(100vh - 124px)" }}
    >
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
              className={`font-semibold basis-1/6 ${
                ranking.rankPosition <= 3 ? "text-3xl" : "text-lg"
              }`}
            >
              {ranking.rankPosition === 1
                ? "🥇"
                : ranking.rankPosition === 2
                ? "🥈"
                : ranking.rankPosition === 3
                ? "🥉"
                : `${ranking.rankPosition} 위`}
            </span>
            <div className="basis-1/6 aspect-square relative rounded-full">
              <Image
                src="https://i.namu.wiki/i/zN7ASE4kyQNHO9jeAobgriDh2fqdbqiJVk5v7K-Tb_bCtOtem2v47wkFV4cQfYJYwbjr7bgoVqKVyHkp_Gy_6A.webp"
                alt="프로필사진"
                fill
                className="object-cover rounded-full w-full"
              />
            </div>
            <span className="text-lg basis-3/6 text-center">
              {ranking.nickName}
            </span>
            <span className="text-gray-600 basis-2/6 text-right">
              {ranking.totalDistance} km
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
