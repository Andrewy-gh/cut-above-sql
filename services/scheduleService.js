import { Schedule } from '../models/index.js';
import { checkAvailability } from '../utils/dateTime.js';

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
    throw new Error('appointment not available');
  }
  return schedule.id;
  // if (available) {
  //   return schedule.id;
  // } else {
  //   return false;
  // }
  // return schedule.id;
};
