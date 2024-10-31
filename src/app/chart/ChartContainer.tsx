"use client";

import { useRef, useState } from "react";
import {
  HiMiniChevronLeft,
  HiMiniChevronRight,
  HiOutlineChartBarSquare,
  HiOutlineCalendarDays,
} from "react-icons/hi2";
import Chart from "@/app/chart/Chart";
import ChartLoading from "./ChartLoading";
import { useQuery, useQueryClient } from "@tanstack/react-query";

import ChartCalendar from "./ChartCalendar";
import axios from "axios";
import ChartList from "./ChartList";
import ChartStat from "./ChartStat";
import { useUserInfo } from "@/types/UserInfo";

const fetchChartData = async (date: Date) => {
  const recordMonth = date.getMonth() + 1;

  const response = await axios.get("/api/record", {
    params: {
      recordMonth,
    },
  });
  const recordData = response.data;
  console.log(recordData);
  return recordData[0]; // 첫 번째 데이터 반환
};

export default function ChartContainer() {
  const [date, setDate] = useState(new Date());
  const [isChart, setIsChart] = useState(true);
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const listRef = useRef<{ [key: number]: HTMLLIElement | null }>({});
  const currentDate = new Date();
  const queryClient = useQueryClient();
  const { user } = useUserInfo();

  const { data: chartData, isLoading } = useQuery({
    queryKey: ["chartData", date.getFullYear(), date.getMonth() + 1],
    queryFn: () => fetchChartData(date, user?.userId),
    staleTime: 0,
  });

  // recordData에 접근하여 type별로 데이터를 추출
  const recordData = chartData?.recordData || [];

  const totalDistance =
    recordData.find((item) => item.type === "ALL")?.resultList || 0;
  const monthDistance =
    recordData.find((item) => item.type === "MONTH")?.resultList || 0;
  const dayData =
    recordData.find((item) => item.type === "DAY")?.resultList || [];

  const handlePreviousMonth = () => {
    setDate((prev) => {
      const newDate = new Date(prev);
      newDate.setMonth(newDate.getMonth() - 1);

      const cacheKey = [
        "chartData",
        newDate.getFullYear(),
        newDate.getMonth() + 1,
      ];

      if (!queryClient.getQueryData(cacheKey)) {
        queryClient.fetchQuery({
          queryKey: cacheKey,
          queryFn: () => fetchChartData(newDate, user?.userId),
          staleTime: 0,
        });
      }

      return newDate;
    });
    setSelectedDay(null);
  };

  const handleNextMonth = () => {
    setDate((prev) => {
      const newDate = new Date(prev);
      newDate.setMonth(newDate.getMonth() + 1);
      return newDate;
    });
    setSelectedDay(null);
  };

  const toggleChart = () => {
    setIsChart((prev) => !prev);
  };

  const handleDateClick = (day: number) => {
    setSelectedDay(day);
    const element = listRef.current[day];
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div
      className="flex flex-col gap-3 py-3 px-4"
      style={{ height: "calc(100vh - 124px)" }}
    >
      {isLoading ? (
        <ChartLoading />
      ) : (
        <>
          <ChartStat
            totalDistance={totalDistance}
            monthDistance={monthDistance}
          />
          <div className="bg-white rounded-2xl px-1 py-2 relative shadow-md shadow-slate-300 flex-shrink-0">
            <div className="flex flex-none items-center justify-center space-x-3">
              <button
                onClick={handlePreviousMonth}
                className="w-10 h-10 text-primary flex justify-center items-center"
              >
                <HiMiniChevronLeft size={20} style={{ strokeWidth: 2 }} />
              </button>
              <span className="text-xl font-bold">
                {date.getFullYear()}년 {date.getMonth() + 1}월
              </span>
              <button
                onClick={handleNextMonth}
                className={`w-10 h-10 flex justify-center items-center ${
                  date.getFullYear() === currentDate.getFullYear() &&
                  date.getMonth() === currentDate.getMonth()
                    ? "text-gray-400 bg-white"
                    : "text-primary"
                }`}
              >
                <HiMiniChevronRight size={20} style={{ strokeWidth: 2 }} />
              </button>
            </div>
            <div className="absolute top-4 right-4">
              <label className="swap text-primary">
                <input
                  type="checkbox"
                  checked={isChart}
                  onChange={toggleChart}
                />
                <HiOutlineCalendarDays size={30} className="swap-on" />
                <HiOutlineChartBarSquare size={30} className="swap-off" />
              </label>
            </div>
            <div className="flex justify-center">
              {isChart ? (
                <Chart
                  chartData={dayData || []}
                  year={date.getFullYear()}
                  month={date.getMonth() + 1}
                  selectedDay={selectedDay}
                  onBarClick={handleDateClick}
                />
              ) : (
                <ChartCalendar
                  chartData={dayData || []}
                  date={date}
                  currentDate={currentDate}
                  selectedDay={selectedDay}
                  onDateClick={handleDateClick}
                />
              )}
            </div>
          </div>
          <div className="overflow-y-auto flex-1 rounded-xl shadow-md shadow-slate-300 bg-white py-2">
            <ChartList
              chartData={dayData || []}
              listRef={listRef}
              selectedDay={selectedDay}
              onListClick={handleDateClick}
            />
          </div>
        </>
      )}
    </div>
  );
}
