import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../util/db.js';

class Schedule extends Model {}

Schedule.init(
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
  },
  { sequelize, underscored: true, modelName: 'schedule' }
);

export default Schedule;
