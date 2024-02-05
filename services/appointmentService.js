import { Appointment } from '../models/index.js';
import { checkScheduleAvailability } from './scheduleService.js';
import ApiError from '../utils/ApiError.js';
import { sequelize } from '../utils/db.js';

export const createNew = async (newAppt) => {
  const availbleScheduleId = await checkScheduleAvailability(newAppt);
  const appointment = await Appointment.create({
    ...newAppt,
    scheduleId: availbleScheduleId,
  });
  return appointment;
};

export const update = async (newAppt) => {
  const appointment = await Appointment.findByPk(newAppt.id);
  if (!appointment) {
    throw new ApiError(404, 'appointment not found');
  }
  // newAppt date is a string, appointment date is a date object
  if (newAppt.date && newAppt.date !== appointment.date.toISOString()) {
    const availbleScheduleId = await checkScheduleAvailability(newAppt);
    const result = await sequelize.transaction(async (t) => {
      const schedule = await appointment.getSchedule();
      await schedule.removeAppointment(appointment);
      appointment.set({
        ...newAppt,
        scheduleId: availbleScheduleId,
      });
      await appointment.save();
    });
    return result;
  } else {
    appointment.set({
      ...newAppt,
    });
    await appointment.save();
    return appointment;
  }
};
