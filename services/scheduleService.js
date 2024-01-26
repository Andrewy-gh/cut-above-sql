import { Schedule } from '../models/index.js';
import { checkAvailability } from '../util/dateTime.js';

// returns boolean
export const checkScheduleAvailability = async (newAppt) => {
  console.log('====================================');
  console.log('newAppt', newAppt);
  console.log('====================================');
  // current schedule's appointments
  const [schedule, created] = await Schedule.findOrCreate({
    where: { date: newAppt.date },
  });
  if (created) {
    return schedule.id;
  }
  const appointments = await schedule.getAppointments();
  // if (!checkAvailability(appointments, newAppt)) {
  //   throw new Error('This time slot is not available');
  // }
  // console.log('====================================');
  // console.log(checkAvailability(appointments, newAppt));
  // console.log('====================================');
  const available = checkAvailability(appointments, newAppt);
  if (available) {
    return schedule.id;
  } else {
    return false;
  }
  // return schedule.id;
};
