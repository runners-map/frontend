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

const fetchChartData = async (date: Date) => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/record`,
    {
      params: {
        year: year,
        month: month,
      },
    }
  );
  return response.data;
};

export default function ChartContainer() {
  const [date, setDate] = useState(new Date());
  const [isChart, setIsChart] = useState(true);
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const listRef = useRef<{ [key: number]: HTMLLIElement | null }>({});
  const currentDate = new Date();
  const queryClient = useQueryClient();

  const { data: chartData, isLoading } = useQuery<Record[]>({
    queryKey: ["chartData", date.getFullYear(), date.getMonth() + 1],
    queryFn: () => fetchChartData(date),
    staleTime: Infinity,
  });

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
          queryFn: () => fetchChartData(newDate),
          staleTime: Infinity,
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
    <div className="flex flex-col h-full">
      {isLoading ? (
        <ChartLoading />
      ) : (
        <>
          <ChartStat />
          <div className="border-2 border-primary rounded-2xl px-1 py-2 mb-3 relative">
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
                  chartData={chartData || []}
                  year={date.getFullYear()}
                  month={date.getMonth() + 1}
                  selectedDay={selectedDay}
                  onBarClick={handleDateClick}
                />
              ) : (
                <ChartCalendar
                  chartData={chartData || []}
                  date={date}
                  currentDate={currentDate}
                  selectedDay={selectedDay}
                  onDateClick={handleDateClick}
                />
              )}
            </div>
          </div>
          <div className="overflow-y-auto max-h-60">
            <ChartList
              chartData={chartData || []}
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
