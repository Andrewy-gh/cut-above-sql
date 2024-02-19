import { User } from '../models/index.js';

export const findById = async (id) => await User.findByPk(id);

export const getAppointmentsByRole = async (user) => {
  if (user.role === 'client') {
    return await user.getAppointments({
      attributes: {
        exclude: ['clientId', 'employeeId'],
      },
      include: [
        {
          model: User,
          as: 'employee',
        },
      ],
    });
  } else if (user.role === 'employee') {
    return await user.getEmployeeAppointments({
      attributes: {
        exclude: ['clientId', 'employeeId'],
      },
      include: [
        {
          model: User,
          as: 'client',
        },
      ],
    });
  }
};
