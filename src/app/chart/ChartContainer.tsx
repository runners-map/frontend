"use client";

import { useState, useEffect } from "react";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";
import Chart from "@/app/chart/Chart";
import ChartLoading from "./ChartLoading";

export default function ChartContainer() {
  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [chartData, setChartData] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const handlePreviousMonth = () => {
    if (month === 1) {
      setMonth(12);
      setYear((prevYear) => prevYear - 1);
    } else {
      setMonth((prevMonth) => prevMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (month === 12) {
      setMonth(1);
      setYear((prevYear) => prevYear + 1);
    } else {
      setMonth((prevMonth) => prevMonth + 1);
    }
  };

  useEffect(() => {
    const fetchChartData = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/record?year=${year}&month=${month}`,
          { cache: "no-store" }
        );
        const data = await res.json();
        setChartData(data);
      } catch (error) {
        console.error("Failed to fetch chart data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchChartData();
  }, [year, month]);

  return (
    <div>
      <div className="flex">
        <button onClick={handlePreviousMonth} className="btn">
          <HiChevronLeft />
        </button>
        <span className="text-xl font-bold">
          {year}년 {month}월
        </span>
        <button onClick={handleNextMonth} className="btn">
          <HiChevronRight />
        </button>
      </div>
      {loading ? (
        <ChartLoading />
      ) : (
        <Chart chartData={chartData} year={year} month={month} />
      )}
    </div>
  );
}
