export default async function RankingLoading() {
  const currentMonth = new Date().getMonth() + 1;
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-8 text-center">
        🏆 {currentMonth}월 랭킹 🏆
      </h1>
      <ul className="space-y-3">
        {Array.from({ length: 10 }).map((_, index) => (
          <div key={index} className="skeleton h-16"></div>
        ))}
      </ul>
    </div>
  );
}
