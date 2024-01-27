import { Appointment } from '../models/index.js';
import { checkScheduleAvailability } from './scheduleService.js';

export const updateAppointment = async (newAppt) => {
  const appointment = await Appointment.findByPk(newAppt.id);
  if (!appointment) {
    // return res.status(404).json({ error: 'appointment not found' });
    throw new Error('appointment not found');
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
