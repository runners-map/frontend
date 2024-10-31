import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "@/app/chart/calendar.css";

export default function ChartCalendar({
  chartData,
  date,
  currentDate,
  selectedDay,
  onDateClick,
}: {
  chartData: {
    userId: number;
    year: number;
    month: number;
    day: number;
    totalDistance: number;
  }[];
  date: Date;
  currentDate: Date;
  selectedDay: number | null;
  onDateClick: (day: number) => void;
}) {
  return (
    <Calendar
      activeStartDate={date}
      showNavigation={false}
      tileClassName={({ date, view }) => {
        if (view === "month") {
          const isToday =
            currentDate.getFullYear() === date.getFullYear() &&
            currentDate.getMonth() === date.getMonth() &&
            currentDate.getDate() === date.getDate();

          const isRunningDay = chartData.some(
            (data) =>
              data.day === date.getDate() &&
              data.month === date.getMonth() + 1 && // month는 1부터 시작
              data.year === date.getFullYear()
          );

          if (isToday) {
            return "today";
          } else if (isRunningDay) {
            return selectedDay === date.getDate()
              ? "running-day selected-day"
              : "running-day";
          }
        }
        return null;
      }}
      tileDisabled={({ date, view }) => {
        if (view === "month") {
          const isRunningDay = chartData.some(
            (data) =>
              data.day === date.getDate() &&
              data.month === date.getMonth() + 1 &&
              data.year === date.getFullYear()
          );
          return !isRunningDay;
        }
        return false;
      }}
      formatDay={(_locale, date) => date.getDate().toString()}
      onClickDay={(selectedDate) => onDateClick(selectedDate.getDate())}
    />
  );
}
