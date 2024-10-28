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
              new Date(data.actualStartTime).getMonth() === date.getMonth() &&
              new Date(data.actualStartTime).getFullYear() ===
                date.getFullYear()
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
          const isRunningDay = chartData.some((data) => {
            const actualDate = new Date(data.actualStartTime); // 문자열을 Date 객체로 변환
            return (
              actualDate.getDate() === date.getDate() &&
              actualDate.getMonth() === date.getMonth() &&
              actualDate.getFullYear() === date.getFullYear()
            );
          });

          return !isRunningDay; // isRunningDay가 false인 경우 비활성화
        }
        return false;
      }}
      formatDay={(_locale, date) => date.getDate().toString()}
      onClickDay={(selectedDate) => onDateClick(selectedDate.getDate())}
    />
  );
}
