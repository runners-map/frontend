export default async function RankingLoading() {
  const currentMonth = new Date().getMonth() + 1;
  return (
    <>
      <div className="shadow-md shadow-slate-300 rounded-3xl py-4 text-gray-500 bg-white">
        <h1 className="text-xl font-semibold text-center">
          {currentMonth}월 랭킹
        </h1>
      </div>
      <ul className="space-y-4">
        {Array.from({ length: 10 }).map((_, index) => (
          <div key={index} className="skeleton h-16"></div>
        ))}
      </ul>
    </>
  );
}
