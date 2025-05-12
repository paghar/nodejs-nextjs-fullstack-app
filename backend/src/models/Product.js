const { DataTypes } = require('sequelize');
const sequelize = require('./index');

const Product = sequelize.define('Product', {
  name: { type: DataTypes.STRING, allowNull: false },
  price: { type: DataTypes.FLOAT, allowNull: false },
  description: { type: DataTypes.STRING }
}, {
  timestamps: true
});

(async () => {
  await sequelize.sync({ force: false });
  console.log('✅ Product table synced');
})();

module.exports = Product;
