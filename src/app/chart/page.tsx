import ChartContainer from "@/app/chart/ChartContainer";

export default function ChartPage() {
  return (
    <div className="py-8 px-4 flex flex-col">
      <h1 className="text-2xl font-bold mb-8 text-center">런닝 기록</h1>
      <ChartContainer />
    </div>
  );
}
