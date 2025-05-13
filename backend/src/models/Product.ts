import { DataTypes, Model } from 'sequelize';
import {sequelize} from './index';

class Product extends Model {
  public id!: number;
  public name!: string;
  public description?: string;
  public price!: number;  
  public image_url?: string;
  public readonly created_at!: Date;
  public readonly updated_at!: Date;
}

Product.init(
  {
    name: { type: DataTypes.STRING, allowNull: false },
    description: DataTypes.STRING,
    price: { type: DataTypes.FLOAT, allowNull: false },   
    image_url: DataTypes.STRING,
  },
  {
    sequelize,
    modelName: 'Product',
    tableName: 'products',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  }
);

export default Product;
