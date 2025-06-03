import { DataTypes, Model } from 'sequelize';
import sequelize from './sequelize';

class AuthToken extends Model {
  public id!: number;
  public user_id!: number;
  public token!: string;
  public expires_at!: Date;
}

AuthToken.init(
  {
    user_id: { type: DataTypes.INTEGER, allowNull: false },
    token: { type: DataTypes.STRING, allowNull: false },
    expires_at: { type: DataTypes.DATE, allowNull: false },
  },
  {
    sequelize,
    modelName: 'AuthToken',
    tableName: 'auth_tokens',
    timestamps: false,
  }
);

export default AuthToken;
