import { parseISO, isAfter, isBefore, getHours } from 'date-fns';

export function parseTimeStringToDate(timeString: string, day: number): Date {
  const currentDate: Date = new Date();

  const [time, amPm]: string[] = timeString.split(" ");
  const [hoursString, minutesString]: string[] = time.split(":");
  let hours: number = parseInt(hoursString, 10);
  const minutes: number = parseInt(minutesString, 10);

  if (amPm === "PM" && hours < 12) {
    hours += 12;
  } else if (amPm === "AM" && hours === 12) {
    hours = 0;
  }

  currentDate.setHours(hours, minutes, 0);
  currentDate.setDate(currentDate.getDate() - currentDate.getDay() + day);

  return currentDate;
}

export function isCurrentTimeBetween(start: string, end: string, day: number): boolean {
  const currentTime: Date = new Date();
  const currentHour: number = getHours(currentTime);

  const startHour: number = parseTimeStringToDate(start, currentTime.getDay()).getHours();
  const endHour: number = parseTimeStringToDate(end, currentTime.getDay()).getHours();

  return currentHour >= startHour && currentHour <= endHour && currentTime.getDay() === day;
}