import { DataTypes, Model } from 'sequelize';
import sequelize from './sequelize';

class OrderItem extends Model {
  public id!: number;
  public order_id!: number;
  public product_id!: number;
  public quantity!: number;
  public price_at_order!: number;
}

OrderItem.init(
  {
    order_id: { type: DataTypes.INTEGER, allowNull: false },
    product_id: { type: DataTypes.INTEGER, allowNull: false },
    quantity: { type: DataTypes.INTEGER, allowNull: false },
    price_at_order: { type: DataTypes.FLOAT, allowNull: false },
  },
  {
    sequelize,
    modelName: 'OrderItem',
    tableName: 'order_items',
    timestamps: false,
  }
);

export default OrderItem;
