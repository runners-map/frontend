import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface ChartProps {
  year: number;
  month: number;
}

async function fetchChartData(year: number, month: number) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/record?year=${year}&month=${month}`,
    {
      cache: "no-store",
    }
  );
  const data = await res.json();
  return data;
}

export default async function Chart({ year, month }: ChartProps) {
  const chartData = await fetchChartData(year, month);

  const daysInMonth = new Date(year, month, 0).getDate();
  const labels = Array.from({ length: daysInMonth }, (_, i) => `${i + 1}일`);
  const distances = Array(daysInMonth).fill(0);

  chartData.forEach((data) => {
    const date = new Date(data.runninDate);
    const day = date.getDate();
    if (date.getMonth() + 1 === month && date.getFullYear() === year) {
      distances[day - 1] = data.totalDistance;
    }
  });

  const data = {
    labels,
    datasets: [
      {
        label: `${year}년 ${month}월 일별 달린 거리`,
        data: distances,
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
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
          callback: function (value, index, values) {
            const day = index + 1;
            const daysInMonth = new Date(year, month, 0).getDate();

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
    <div>
      <Bar data={data} options={options} />
    </div>
  );
}
