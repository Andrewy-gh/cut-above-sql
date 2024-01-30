import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../utils/db.js';

class User extends Model {}

User.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: { isEmail: true },
    },
    passwordHash: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM('client', 'employee', 'admin'),
      defaultValue: 'client',
      allowNull: false,
    },
  },
  {
    defaultScope: { attributes: { exclude: ['passwordHash'] } },
    sequelize,
    underscored: true,
    modelName: 'user',
  }
);

export default User;
