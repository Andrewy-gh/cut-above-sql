import { User } from '../models/index.js';

export const findById = async (id) => await User.findByPk(id);
