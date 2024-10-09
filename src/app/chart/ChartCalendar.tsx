import { Record } from "@/types/Record";
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
  chartData: Record[];
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
          const today = currentDate;
          const isToday =
            today.getFullYear() === date.getFullYear() &&
            today.getMonth() === date.getMonth() &&
            today.getDate() === date.getDate();

          const isRunningDay = chartData.some(
            (data) =>
              data.day === date.getDate() &&
              date.getMonth() + 1 === chartData[0].month &&
              date.getFullYear() === chartData[0].year
          );

          if (isToday) {
            return "today";
          } else if (isRunningDay) {
            if (selectedDay === date.getDate()) {
              return "running-day selected-day";
            }
            return "running-day";
          }
        }
        return null;
      }}
      tileDisabled={({ date, view }) => {
        if (view === "month") {
          const isRunningDay = chartData.some(
            (data) =>
              data.day === date.getDate() &&
              date.getMonth() + 1 === chartData[0].month &&
              date.getFullYear() === chartData[0].year
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
