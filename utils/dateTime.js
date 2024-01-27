import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween.js';

dayjs.extend(isBetween);

// isBetween usage: https://day.js.org/docs/en/plugin/is-between
export const checkAvailability = (appointments, newAppt) => {
  const newStart = dayjs(`${newAppt.date}T${newAppt.startTime}`);
  const newEnd = dayjs(`${newAppt.date}T${newAppt.endTime}`);
  for (let appt of appointments) {
    const start = dayjs(`${appt.date}T${appt.startTime}`);
    const end = dayjs(`${appt.date}T${appt.endTime}`);
    if (appt.employeeId === newAppt.employeeId) {
      if (
        newStart.isBetween(start, end, 'time', '[)') ||
        newEnd.isBetween(start, end, 'time', '(]')
      ) {
        return false; // overlap found
      }
    }
  }
  // No conflict found
  return true;
};
