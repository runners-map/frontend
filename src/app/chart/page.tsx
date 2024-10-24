import ChartContainer from "@/app/chart/ChartContainer";

export default function ChartPage() {
  return (
    <>
      <div className="shadow-md shadow-slate-300 rounded-b-3xl py-4 text-gray-500 bg-white">
        <h1 className="text-xl font-semibold text-center">러닝 기록</h1>
      </div>
      <ChartContainer />
    </>
  );
}
