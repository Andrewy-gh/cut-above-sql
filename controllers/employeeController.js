import { User } from '../models/index.js';

export const getAllEmployees = async (req, res) => {
  const employees = await User.findAll({
    where: { role: 'employee' },
    attributes: {
      exclude: [
        'lastName',
        'email',
        'role',
        'createdAt',
        'updatedAt',
        'image',
        'profile',
      ],
    },
  });
  res.json(employees);
};

export const getEmployeeProfiles = async (req, res) => {
  const employees = await User.findAll({
    where: { role: 'employee' },
    attributes: {
      exclude: ['lastName', 'email', 'role', 'createdAt', 'updatedAt'],
    },
  });
  res.json(employees);
};
