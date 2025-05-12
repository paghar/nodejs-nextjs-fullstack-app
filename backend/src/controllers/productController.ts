import { Request, Response } from 'express';
import Product from '../models/Product';

export const getAllProducts = async (_req: Request, res: Response): Promise<void> => {
  const products = await Product.findAll();
  res.json(products);
};

export const createProduct = async (req: Request, res: Response): Promise<void> => {
  const { name, price, description } = req.body;
  const product = await Product.create({ name, price, description });
  res.status(201).json(product);
};
