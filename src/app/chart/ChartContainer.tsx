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
import { Record } from "@/types/Record";
import ChartCalendar from "./ChartCalendar";
import axios from "axios";
import ChartList from "./ChartList";
import ChartStat from "./ChartStat";
import { useUserInfo } from "@/types/UserInfo";
import Cookies from "js-cookie";

const fetchChartData = async (date: Date, userId: number) => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;

  const accessToken = Cookies.get("accessToken");

  const response = await axios.get("/api/posts/record", {
    headers: {
      Authorization: `Bearer ${accessToken}`, // 액세스 토큰 추가
    },
    params: {
      userId,
      year,
      month,
    },
  });
  console.log(response.data);
  return response.data;
};

export default function ChartContainer() {
  const [date, setDate] = useState(new Date());
  const [isChart, setIsChart] = useState(true);
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const listRef = useRef<{ [key: number]: HTMLLIElement | null }>({});
  const currentDate = new Date();
  const queryClient = useQueryClient();
  const { user } = useUserInfo();

  const { data: chartData, isLoading } = useQuery<[]>({
    queryKey: ["chartData", date.getFullYear(), date.getMonth() + 1],
    queryFn: () => fetchChartData(date, user?.userId),
    staleTime: 0,
  });

  const totalDistance =
    chartData?.find((item) => item.type === "ALL")?.resultList || 0;
  const monthDistance =
    chartData?.find((item) => item.type === "MONTH")?.resultList || 0;
  const dayData =
    chartData?.find((item) => item.type === "DAY")?.resultList || [];

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
      className="flex flex-col gap-5 py-5 px-5"
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
                className="btn btn-outline btn-primary border-0"
              >
                <HiMiniChevronLeft size={20} style={{ strokeWidth: 2 }} />
              </button>
              <span className="text-xl font-bold">
                {date.getFullYear()}년 {date.getMonth() + 1}월
              </span>
              <button
                onClick={handleNextMonth}
                className="btn btn-outline btn-primary border-0"
                disabled={
                  date.getFullYear() === currentDate.getFullYear() &&
                  date.getMonth() === currentDate.getMonth()
                }
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
                  chartData={chartData || []}
                  date={dayData}
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
