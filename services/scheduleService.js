import { Schedule } from '../models/index.js';
import { checkAvailability } from '../utils/dateTime.js';
import ApiError from '../utils/ApiError.js';

export const checkScheduleAvailability = async (newAppt) => {
  // current schedule's appointments
  const [schedule, created] = await Schedule.findOrCreate({
    where: { date: newAppt.date },
  });
  if (created) {
    return schedule.id;
  }
  const appointments = await schedule.getAppointments();
  const available = checkAvailability(appointments, newAppt);
  if (!available) {
    throw new ApiError(410, 'Appointment not available'); // Gone
  }
  return schedule.id;
};
