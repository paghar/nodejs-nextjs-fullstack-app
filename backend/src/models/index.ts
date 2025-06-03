import sequelize from './sequelize';
import User from './User';
import Product from './Product';
import Cart from './Cart';
import CartItem from './CartItem';
import Order from './Order';
import OrderItem from './OrderItem';
import AuthToken from './AuthToken';

// Associations
User.hasOne(Cart, { foreignKey: 'user_id' });
Cart.belongsTo(User, { foreignKey: 'user_id' });

Cart.hasMany(CartItem, { foreignKey: 'cart_id', as: 'cartItems' });
CartItem.belongsTo(Cart, { foreignKey: 'cart_id' });

CartItem.belongsTo(Product, { foreignKey: 'product_id', as: 'product' });
Product.hasMany(CartItem, { foreignKey: 'product_id' });

export {
  sequelize,
  User,
  Product,
  Cart,
  CartItem,
  Order,
  OrderItem,
  AuthToken
};