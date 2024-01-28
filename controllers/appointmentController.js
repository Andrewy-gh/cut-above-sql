import { Appointment } from '../models/index.js';
import { checkScheduleAvailability } from '../services/scheduleService.js';
import { validateNewRequest } from '../utils/validation.js';
import { createNew, update } from '../services/appointmentService.js';

/**
 * @description retrieve all appointments
 * @route /api/appointments
 * @method GET
 * @returns {Appointment[]}, array of Appointment objects
 */
export const getAllAppointments = async (req, res) => {
  const appointments = await Appointment.findAll();
  res.json(appointments);
};

// req.body from client:
// {
//   date: '2024-02-02',
//   start: '17:30',
//   end: '18:00',
//   service: 'Haircut',
//   employee: '64a60e878bdf8a4ac0f98209'
// }

/**
 * @description book a new appointment
 * @route /api/appointments
 * @method POST
 * @returns {Appointment | Error}, returns a valid Appointment object or Error
 */
export const bookAppointment = async (req, res) => {
  const appointment = await createNew(req.body);
  res.json(appointment);
};

/**
 * @description function to test booking an appointment
 * @route /api/appointments/test
 * @method POST
 * @returns {Appointment}, returns an Appointment object
 */
export const testBookingAppontment = async (req, res) => {
  const newAppt = {
    date: '2024-01-27',
    startTime: '17:00',
    endTime: '17:30',
    clientId: '383dc04f-9903-4037-b070-ca502d7dd7f9',
    employeeId: 'e123b115-d3a2-4c7e-a45d-f82fde101161',
    service: 'Haircut',
  };
  const appointment = await Appointment.create({
    ...newAppt,
    scheduleId: '32c237aa-8550-44f8-a313-b99737047872',
  });
  res.json(appointment);
};

/**
 * @description modify an appointment
 * @route /api/appointments/:id
 * @method PUT
 * @returns {Appointment | Error}, returns a valid Appointment object or Error
 */
export const modifyAppointment = async (req, res) => {
  console.log('====================================');
  console.log('req.body: ', req.body);
  console.log('====================================');
  const updatedAppointment = await update({
    ...req.body,
    id: req.params.id,
  });
  res.json(updatedAppointment);
};

/**
 * @description function to test modifying an appointment
 * @route /api/appointments/:id/test
 * @method PUT
 * @returns {Appointment}, returns an Appointment object with updated details
 */
export const testAppointmentUpdate = async (req, res) => {
  const newAppt = {
    date: '2024-01-28',
    startTime: '14:00:00',
    endTime: '14:30:00',
    clientId: '96b0cfd3-8c5f-4bb7-8946-c550e1e36f99',
    employeeId: '6383181b-e1e5-4931-a43f-090eccd9f7e7',
  };
  const appointment = await Appointment.findByPk(req.params.id);
  appointment.set(newAppt);
  await appointment.save();
  res.json(appointment);
};

/**
 * @description delete an Appointment by id
 * @route /api/appointments/:id
 * @method DELETE
 * @returns {Response}, response with code 200 No Content
 */
export const deleteAppointmentById = async (req, res) => {
  const appointment = await Appointment.findByPk(req.params.id);
  await appointment.destroy();
  res.status(200).end();
};
