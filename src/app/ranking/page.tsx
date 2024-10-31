import RankingList from "./RankingList";

export default function RankingPage() {
  const currentMonth = new Date().getMonth() + 1;

  return (
    <>
      <div className="shadow-md shadow-slate-300 rounded-b-3xl py-4 text-gray-500 bg-white relative">
        <h1 className="text-xl font-semibold text-center">
          {currentMonth}월 랭킹
        </h1>
      </div>
      <RankingList />
    </>
  );
}
