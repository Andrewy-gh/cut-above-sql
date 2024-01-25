import { findById } from '../services.js/userService.js';

// req.body from client:
// {
//   date: '2024-02-02',
//   start: '17:30',
//   end: '18:00',
//   service: 'Haircut',
//   employee: '64a60e878bdf8a4ac0f98209'
// }
const services = [
  'Haircut',
  'Beard Trim',
  'Straight Razor Shave',
  'Cut and Shave Package',
  'The Full Package',
];

const isString = (text) => {
  return typeof text === 'string' || text instanceof String;
};

const parseString = (string) => {
  if (!isString(string)) {
    throw new Error('Incorrect or missing field');
  }
  return string;
};

const isDate = (date) => {
  return Boolean(Date.parse(date));
};

const parseDate = (date) => {
  if (!isString(date) || !isDate(date)) {
    throw new Error('Incorrect date: ' + date);
  }
  return date;
};

const isValidTime = (timeString) => {
  const regex = /^([01]\d|2[0-3]):([0-5]\d)$/; // Matches HH:MM format
  return regex.test(timeString);
};

const parseTime = (timeString) => {
  if (!parseString(timeString) || !isValidTime(timeString)) {
    throw new Error('Incorrect or missing time');
  }
  return timeString;
};

const isService = (service) => {
  return services.includes(service);
};

const parseService = (service) => {
  if (!parseString(service) || !isService(service)) {
    throw new Error('Incorrect or missing service');
  }
  return service;
};

const parseUser = async (userId, role) => {
  const user = await findById(userId);
  if (!user || user?.role !== role) {
    throw new Error('Incorrect or missing user id');
  }
  return user;
};

export const validateNewRequest = async (object) => {
  if (!object || typeof object !== 'object') {
    throw new Error('Incorrect or missing data');
  }

  if (
    'date' in object &&
    'clientId' in object &&
    'startTime' in object &&
    'endTime' in object &&
    'service' in object &&
    'employeeId' in object
  ) {
    const newAppointment = {
      date: parseDate(object.date),
      clientId: await parseUser(object.clientId, 'client'),
      startTime: parseTime(object.startTime),
      endTime: parseTime(object.endTime),
      service: parseService(object.service),
      employeeId: await parseUser(object.employeeId, 'employee'),
    };
    return newAppointment;
  }
  throw new Error('Incorrect data: a field missing');
};
