import { User } from '../models/index.js';

/**
 * @description retrieves all Users
 * @route /api/users/
 * @method GET
 * @returns {User[]}, array of User objects
 */
export const getAllUsers = async (req, res) => {
  const users = await User.findAll();
  res.json(users);
};

/**
 * @description retrieves appointments by user id, test function, hard coded for employees
 * @route /api/users/:id
 * @method GET
 * @returns {Appointment[]}, array of Appointment objects
 */
export const getAppointments = async (req, res) => {
  const user = await User.findByPk(req.params.id, {
    include: [
      {
        model: Appointment,
        as: 'employeeAppointments', // The alias you defined in the association
        include: {
          model: User,
          as: 'client',
        },
      },
    ],
  });
  res.json(user);
};

/**
 * @description retrieves appointments by user id and role
 * @route /api/users/:id/appointments
 * @method GET
 * @returns {Appointment[]}, array of Appointment objects
 */
export const getAppointmentsById = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    const appointments = await getAppointmentsByRole(user);
    res.json(appointments);
  } catch (error) {
    console.log('====================================');
    console.log(error);
    console.log('====================================');
  }
};

/**
 * @description create new user
 * @route /api/users
 * @method POST
 * @returns {User}, newly created user
 */
export const createNewUser = async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.json(user);
  } catch (error) {
    return res.status(400).json({ error });
  }
};

/**
 * @description test user schema validation
 * @route /api/users/test
 * @method POST
 * @returns {Response}, newly created user
 */
export const testUserSchema = async (req, res) => {
  try {
    const body = req.body;
    console.log(`Creating new user for: ${body.username},  ${body.email}`);
    res.json({ message: 'Thanks for registering!' });
  } catch (error) {
    return res.status(400).json({ error });
  }
};
