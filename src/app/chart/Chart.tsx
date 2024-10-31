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

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Legend);

export default function Chart({
  chartData,
  year,
  month,
  selectedDay,
  onBarClick,
}) {
  const daysInMonth = new Date(year, month, 0).getDate();
  const labels = Array.from({ length: daysInMonth }, (_, i) => `${i + 1}일`);
  const distances = Array(daysInMonth).fill(0);

  chartData.forEach((data) => {
    if (data.day && data.day <= daysInMonth) {
      const day = data.day;
      distances[day - 1] = data.totalDistance; // totalDistance 사용
    }
  });

  const backgroundColors = distances.map((_, index) =>
    selectedDay === index + 1 ? "#0064FF" : "lightgray"
  );

  const borderColors = distances.map((_, index) =>
    selectedDay === index + 1 ? "#0064FF" : "lightgray"
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
