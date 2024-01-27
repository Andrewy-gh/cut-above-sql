import { Sequelize } from 'sequelize';
import { DATABASE_URL } from './config.js';

export const sequelize = new Sequelize(DATABASE_URL);

export const connectToDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log('connected to the database');
  } catch (error) {
    connect('failed to connect to database', error);
  }
  return null;
};
