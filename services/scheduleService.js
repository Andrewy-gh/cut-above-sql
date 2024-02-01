import { Schedule } from '../models/index.js';
import { checkAvailability } from '../utils/dateTime.js';
import ApiError from '../utils/ApiError.js';
import { convertDate } from '../utils/dateTime.js';

export const checkScheduleAvailability = async (newAppt) => {
  // must convert from dayjs obj to iso string for query
  const date = convertDate(newAppt.date).toISOString();
  const schedule = await Schedule.findOne({ where: { date } });
  if (!schedule) {
    throw new ApiError(410, 'Schedule not available');
  }
  // TODO: Eager load appointments
  const appointments = await schedule.getAppointments();
  // TODO: check before open or check after close too
  const available = checkAvailability(appointments, newAppt);
  if (!available) {
    throw new ApiError(410, 'Appointment not available'); // Gone
  }
  return schedule.id;
};
