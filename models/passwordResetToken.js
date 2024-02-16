import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../utils/db.js';

class PasswordResetToken extends Model {}

PasswordResetToken.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { isEmail: true },
    },
    tokenHash: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    usedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    expiresAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.literal("NOW() + INTERVAL '1 hour'"),
    },
  },
  {
    sequelize,
    timestamps: true,
    updatedAt: false,
    underscored: true,
    modelName: 'password_reset_token',
  }
);

export default PasswordResetToken;
