import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../util/db.js';

class Appointment extends Model {}

Appointment.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    startTime: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    endTime: {
      type: DataTypes.TIME,
      allowNull: false,
    },
  },
  { sequelize, underscored: true, modelName: 'appointment' }
);

export default Appointment;
