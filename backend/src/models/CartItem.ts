import { DataTypes, Model } from 'sequelize';
import sequelize from './sequelize';

class CartItem extends Model {
  public id!: number;
  public cart_id!: number;
  public product_id!: number;
  public quantity!: number;
}

CartItem.init(
  {
    cart_id: { type: DataTypes.INTEGER, allowNull: false },
    product_id: { type: DataTypes.INTEGER, allowNull: false },
    quantity: { type: DataTypes.INTEGER, allowNull: false },
  },
  {
    sequelize,
    modelName: 'CartItem',
    tableName: 'cart_items',
    timestamps: false,
  }
);

export default CartItem;
