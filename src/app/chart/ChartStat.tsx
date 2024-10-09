import { HiOutlineTrophy } from "react-icons/hi2";
import { IoFootstepsOutline } from "react-icons/io5";

export default function ChartStat() {
  return (
    <div className="stats shadow mb-4 border-2 border-primary">
      <div className="stat pr-3">
        <div className="stat-figure text-primary">
          <HiOutlineTrophy size={35} />
        </div>
        <div className="stat-title">누적 달린 거리</div>
        <div className="stat-value text-primary text-2xl">130.2 km</div>
      </div>
      <div className="stat px-3">
        <div className="stat-figure text-primary">
          <IoFootstepsOutline size={35} />
        </div>
        <div className="stat-title">이번달 달린 거리</div>
        <div className="stat-value text-primary text-2xl">30 km</div>
      </div>
    </div>
  );
}
