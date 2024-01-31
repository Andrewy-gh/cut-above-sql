import { User } from '../models/index.js';

export const getAllEmployees = async (req, res) => {
  const employees = await User.findAll({ where: { role: 'employee' } });
  res.json(employees);
};
