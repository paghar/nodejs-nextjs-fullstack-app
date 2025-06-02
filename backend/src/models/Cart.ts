import { DataTypes, Model } from 'sequelize';
import {sequelize} from './index';
import CartItem from './CartItem'; 

class Cart extends Model {
  public id!: number;
  public user_id!: number;
  public readonly created_at!: Date;
  public readonly updated_at!: Date;
  public readonly cartItems?: CartItem[];
}

Cart.init(
  {
    user_id: { type: DataTypes.INTEGER, allowNull: false },
  },
  {
    sequelize,
    modelName: 'Cart',
    tableName: 'carts',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  }
);

export default Cart;
