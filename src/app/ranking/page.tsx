export default async function RankingPage() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/Ranking`);
  const rankingData = await res.json();

  return (
    <div className="ranking-page p-8">
      <h1 className="text-2xl font-bold mb-4">🏆 Running Rankings 🏆</h1>
      <ul className="space-y-3">
        {rankingData.map((item: any) => (
          <li
            key={item.userId}
            className="ranking-item flex justify-between items-center bg-gray-100 p-4 rounded-lg shadow-md"
          >
            <span className="rank text-lg font-semibold">{item.rank}위</span>
            <span className="nickname text-lg">{item.nicknName}</span>
            <span className="distance text-gray-600">
              {item.total_distance} km
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
