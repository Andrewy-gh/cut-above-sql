import { Appointment } from '../models/index.js';
import { createNew, update } from '../services/appointmentService.js';
import { formatDateAndTimes } from '../utils/dateTime.js';
import logger from '../utils/logger/index.js';

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

/**
 * @description book a new appointment
 * @params {
 *   date: '2024-02-02',
 *   start: '10:00',
 *   end: '10:30',
 *   service: 'Haircut',
 *   employee: '0b4e6b4d-b28c-4f82-b9b6-9fec81d773de'
 * }
 * @route /api/appointments
 * @method POST
 * @returns {Appointment | Error}, returns a valid Appointment object or Error
 */
export const bookAppointment = async (req, res) => {
  const formattedDateAndTimes = formatDateAndTimes(req.body);
  const appointment = await createNew({
    ...req.body,
    ...formattedDateAndTimes,
    clientId: req.session.user.id,
  });
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
    date: '2024-02-01T05:00:00.000Z',
    start: '2024-02-01T22:00:00.000Z',
    end: '2024-02-01T22:30:00.000Z',
    clientId: '747041dd-6837-497b-be49-9ebe5aab399d',
    employeeId: 'a0107c2f-bfa3-41ab-a903-55c6da4a8773',
    service: 'Haircut',
  };
  const appointment = await Appointment.create(newAppt);
  res.json(appointment);
};

/**
 * @description modify an appointment
 * @route /api/appointments/:id
 * @method PUT
 * @returns {Appointment | Error}, returns a valid Appointment object or Error
 */
export const modifyAppointment = async (req, res) => {
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
    start: '14:00:00',
    end: '14:30:00',
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
