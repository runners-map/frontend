import { Record } from "@/types/Record";
import { FaPersonRunning } from "react-icons/fa6";

interface ChartListProps {
  chartData: Record[];
  listRef: React.MutableRefObject<{ [key: number]: HTMLLIElement | null }>;
  selectedDay: number | null;
  onListClick: (day: number) => void;
}

export default function ChartList({
  chartData,
  listRef,
  selectedDay,
  onListClick,
}: ChartListProps) {
  return (
    <ul className="timeline timeline-vertical">
      {chartData.map((data, index) => (
        <li
          key={`${data.year}-${data.month}-${data.day}`}
          ref={(el) => {
            listRef.current[data.day] = el;
          }}
          onClick={() => onListClick(data.day)}
          className={`cursor-pointer grid-cols-[1fr_1fr_3fr] ${
            selectedDay === data.day ? "text-primary" : ""
          }`}
        >
          {index !== 0 && <hr />}
          <div className="timeline-start">{data.day}일</div>
          <div
            className={`${
              selectedDay === data.day
                ? "border-primary"
                : "border-gray-400 text-gray-400"
            } timeline-middle border-2 rounded-full p-1`}
          >
            <FaPersonRunning size={20} />
          </div>
          <div
            className={`timeline-end timeline-box ${
              selectedDay === data.day ? "border-primary" : ""
            }`}
          >
            {data.totalDistance}km {data.runningTime}
          </div>
          {index !== chartData.length - 1 && <hr />}
        </li>
      ))}
    </ul>
  );
}
