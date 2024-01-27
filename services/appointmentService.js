import { Appointment } from '../models/index.js';
import { checkScheduleAvailability } from './scheduleService.js';
import ApiError from '../utils/ApiError.js';

export const updateAppointment = async (newAppt) => {
  const appointment = await Appointment.findByPk(newAppt.id);
  if (!appointment) {
    throw new ApiError(404, 'appointment not found');
  }
  if (newAppt.date && newAppt.date !== appointment.date) {
    const availbleScheduleId = await checkScheduleAvailability(newAppt);
    const schedule = await appointment.getSchedule();
    await schedule.removeAppointment(appointment);
    appointment.set({
      ...newAppt,
      scheduleId: availbleScheduleId,
    });
    await appointment.save();
  } else {
    appointment.set({
      ...newAppt,
    });
    await appointment.save();
  }
  return appointment;
};
