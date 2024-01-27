import { User } from '../models/index.js';

export const findById = async (id) => await User.findByPk(id);

export const getAppointmentsByRole = async (user) => {
  if (user.role === 'client') {
    return await user.getAppointments({
      attributes: {
        exclude: ['clientId', 'employeeId', 'createdAt', 'updatedAt'],
      },
      include: [
        {
          model: User,
          as: 'employee',
          attributes: {
            exclude: ['createdAt', 'updatedAt'],
          },
        },
      ],
    });
  } else if (user.role === 'employee') {
    return await user.getEmployeeAppointments({
      attributes: {
        exclude: ['clientId', 'employeeId', 'createdAt', 'updatedAt'],
      },
      include: [
        {
          model: User,
          as: 'client',
          attributes: {
            exclude: ['createdAt', 'updatedAt'],
          },
        },
      ],
    });
  }
};
