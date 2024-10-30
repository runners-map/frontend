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
          key={data.postId}
          ref={(el) => {
            listRef.current[data.day] = el;
          }}
          onClick={() => onListClick(data.day)}
          className={`cursor-pointer grid-cols-[3fr_1fr_3fr] ${
            selectedDay === data.day ? "text-primary" : ""
          }`}
        >
          {index !== 0 && <hr />}
          <div className="timeline-start">
            {new Date(data.actualStartTime).getFullYear()}년{" "}
            {new Date(data.actualStartTime).getMonth() + 1}월 {data.day}일
          </div>
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
            {data.distance}km {data.runningTime}
          </div>
          {index !== chartData.length - 1 && <hr />}
        </li>
      ))}
    </ul>
  );
}
