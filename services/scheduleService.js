import { Schedule } from '../models/index.js';
import { checkAvailability } from '../utils/dateTime.js';
import ApiError from '../utils/ApiError.js';
import { convertDate, convertDateAndTime } from '../utils/dateTime.js';

const defaultOpeningTime = '10:00';
const defaultClosingTime = '18:00';

export const checkScheduleAvailability = async (newAppt) => {
  const date = convertDate(newAppt.date);
  const open = convertDateAndTime(newAppt.date, defaultOpeningTime);
  const close = convertDateAndTime(newAppt.date, defaultClosingTime);
  const [schedule, created] = await Schedule.findOrCreate({
    where: { date },
    defaults: {
      open,
      close,
    },
  });
  if (created) {
    return schedule.id;
  }
  const appointments = await schedule.getAppointments();
  // TODO: check before open or check after close too
  const available = checkAvailability(appointments, newAppt);
  if (!available) {
    throw new ApiError(410, 'Appointment not available'); // Gone
  }
  return schedule.id;
};
