import { DataTypes, Model } from 'sequelize';
import {sequelize} from './index';

class Order extends Model {
  public id!: number;
  public user_id!: number;
  public total_amount!: number;
  public status!: string;
  public readonly created_at!: Date;
  public readonly updated_at!: Date;
}

Order.init(
  {
    user_id: { type: DataTypes.INTEGER, allowNull: false },
    total_amount: { type: DataTypes.FLOAT, allowNull: false },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'pending',
    },
  },
  {
    sequelize,
    modelName: 'Order',
    tableName: 'orders',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  }
);

export default Order;
