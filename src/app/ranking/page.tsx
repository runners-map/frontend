import { Ranking } from "@/types/Ranking";

export default async function RankingPage() {
  const currentMonth = new Date().getMonth() + 1;
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/Ranking`);
  const rankingList: Ranking[] = await res.json();

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-8 text-center">
        🏆 {currentMonth}월 랭킹 🏆
      </h1>
      <ul className="space-y-3">
        {rankingList.map((ranking) => (
          <li
            key={ranking.userId}
            className={`flex justify-between items-center p-4 rounded-lg shadow-md ${
              ranking.rank === 1
                ? "bg-yellow-300"
                : ranking.rank === 2
                ? "bg-gray-300"
                : ranking.rank === 3
                ? "bg-orange-300"
                : "bg-gray-100"
            }`}
          >
            <span
              className={`rank font-semibold w-10 ${
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
            <span className="nickname text-lg flex-1 text-center">
              {ranking.nicknName}
            </span>
            <span className="distance text-gray-600 w-16 text-right">
              {ranking.total_distance} km
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
