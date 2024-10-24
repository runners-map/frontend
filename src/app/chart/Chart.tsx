"use client";

import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Legend,
  ChartEvent,
  ActiveElement,
} from "chart.js";
import { Record } from "@/types/Record";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Legend);

interface ChartProps {
  chartData: Record[];
  year: number;
  month: number;
  selectedDay: number | null;
  onBarClick: (day: number) => void;
}

export default function Chart({
  chartData,
  year,
  month,
  selectedDay,
  onBarClick,
}: ChartProps) {
  const daysInMonth = new Date(year, month, 0).getDate();
  const labels = Array.from({ length: daysInMonth }, (_, i) => `${i + 1}일`);
  const distances = Array(daysInMonth).fill(0);

  chartData.forEach((data) => {
    if (data.year === year && data.month === month) {
      const day = data.day;
      distances[day - 1] = data.totalDistance;
    }
  });

  const backgroundColors = distances.map((_, index) =>
    selectedDay === index + 1 ? "rgba(74, 0, 255, 1)" : "rgba(209, 219, 255, 1)"
  );

  const borderColors = distances.map((_, index) =>
    selectedDay === index + 1 ? "rgba(74, 0, 255, 1)" : "rgba(209, 219, 255, 1)"
  );

  const data = {
    labels,
    datasets: [
      {
        data: distances,
        backgroundColor: backgroundColors,
        borderColor: borderColors,
        borderWidth: 1,
        borderRadius: {
          topLeft: 10,
          topRight: 10,
          bottomLeft: 0,
          bottomRight: 0,
        },
      },
    ],
  };

  const options = {
    responsive: true,
    onClick: (_event: ChartEvent, elements: ActiveElement[]) => {
      if (elements.length > 0) {
        const index = elements[0].index;
        onBarClick(index + 1);
      }
    },
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        title: {
          display: false,
        },
        grid: {
          display: false,
        },
        ticks: {
          callback: function (_tickValue: string | number, index: number) {
            const day = index + 1;
            if (
              day === 1 ||
              (day % 5 === 0 && day <= 25) ||
              day === daysInMonth
            ) {
              return `${day}일`;
            }
            return "";
          },
          autoSkip: false,
          maxRotation: 0,
        },
      },
      y: {
        title: {
          display: false,
        },
        beginAtZero: true,
      },
    },
  };

  return (
    <>
      <Bar data={data} options={options} height={250} />
    </>
  );
}
