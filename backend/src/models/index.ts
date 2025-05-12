import { Sequelize } from 'sequelize';

const sequelize = new Sequelize(
  process.env.DB_NAME || '',
  process.env.DB_USER || '',
  process.env.DB_PASSWORD || '',
  {
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    dialect: 'postgres',
    logging: false,
  }
);

import User from './User';
import Product from './Product';
import Cart from './Cart';
import CartItem from './CartItem';
import Order from './Order';
import OrderItem from './OrderItem';
import AuthToken from './AuthToken';

// Associations
// User.hasOne(Cart, { foreignKey: 'user_id' });
// Cart.belongsTo(User, { foreignKey: 'user_id' });

// Cart.hasMany(CartItem, { foreignKey: 'cart_id' });
// CartItem.belongsTo(Cart, { foreignKey: 'cart_id' });

// Product.hasMany(CartItem, { foreignKey: 'product_id' });
// CartItem.belongsTo(Product, { foreignKey: 'product_id' });

// User.hasMany(Order, { foreignKey: 'user_id' });
// Order.belongsTo(User, { foreignKey: 'user_id' });

// Order.hasMany(OrderItem, { foreignKey: 'order_id' });
// OrderItem.belongsTo(Order, { foreignKey: 'order_id' });

// Product.hasMany(OrderItem, { foreignKey: 'product_id' });
// OrderItem.belongsTo(Product, { foreignKey: 'product_id' });

// User.hasMany(AuthToken, { foreignKey: 'user_id' });
// AuthToken.belongsTo(User, { foreignKey: 'user_id' });

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