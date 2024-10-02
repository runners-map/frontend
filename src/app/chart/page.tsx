import ChartContainer from "@/app/chart/ChartContainer";

export default function ChartPage() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-8 text-center">
        📊 월별 데이터 차트 📊
      </h1>
      <ChartContainer />
    </div>
  );
}
