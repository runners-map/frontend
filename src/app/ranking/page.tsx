import { Ranking } from "@/types/Ranking";
import Image from "next/image";

export default async function RankingPage() {
  const currentMonth = new Date().getMonth() + 1;
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/ranking`);
  const rankingList: Ranking[] = await res.json();

  return (
    <>
      <div className="shadow-md shadow-slate-300 rounded-b-3xl py-4 text-gray-500 bg-white">
        <h1 className="text-xl font-semibold text-center">
          {currentMonth}월 랭킹
        </h1>
      </div>
      <div className="p-5">
        <ul className="space-y-4">
          {rankingList.map((ranking) => (
            <li
              key={ranking.userId}
              className={`flex justify-between items-center h-20 px-4 rounded-3xl shadow-md ${
                ranking.rank === 1
                  ? "bg-yellow-300"
                  : ranking.rank === 2
                  ? "bg-slate-300"
                  : ranking.rank === 3
                  ? "bg-orange-300"
                  : "bg-white"
              }`}
            >
              <span
                className={`font-semibold basis-1/6 ${
                  ranking.rank <= 3 ? "text-3xl" : "text-lg"
                }`}
              >
                {ranking.rank === 1
                  ? "🥇"
                  : ranking.rank === 2
                  ? "🥈"
                  : ranking.rank === 3
                  ? "🥉"
                  : `${ranking.rank} 위`}
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
                {ranking.nicknName}
              </span>
              <span className="text-gray-600 basis-2/6 text-right">
                {ranking.total_distance} km
              </span>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
