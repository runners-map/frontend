export default function ChartStat({ totalDistance, monthDistance }) {
  return (
    <div className="stats shadow-md shadow-slate-300 w-full flex-shrink-0 flex">
      <div className="stat flex-1">
        <div className="stat-title">누적 달린 거리</div>
        <div className="stat-value text-primary text-2xl">
          {totalDistance} km
        </div>
      </div>
      <div className="stat flex-1">
        <div className="stat-title">이번달 달린 거리</div>
        <div className="stat-value text-primary text-2xl">
          {monthDistance} km
        </div>
      </div>
    </div>
  );
}
