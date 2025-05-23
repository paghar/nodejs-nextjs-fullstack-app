import { Request, Response } from 'express';
import Product from '../models/Product';
import { Op } from 'sequelize';

export const createProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, description, price } = req.body;
    const file = req.file;

    if (!file) {
      res.status(400).json({ message: 'Image file is required' });
      return;
    }

    const imagePath = `uploads/${file.filename}`;

    const product = await Product.create({
      name,
      description,
      price,
      image_url: imagePath, // store the file path in the database
    });

    res.status(201).json(product); // return the created product
  } catch (err) {
    console.error('Error creating product:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const getAllProducts = async (_req: Request, res: Response): Promise<void> => {
  try {
    const products = await Product.findAll();   
    res.json(products);
  } catch (err) {
    console.error('Error fetching products:', err);
    res.status(500).json({ error: 'Failed to fetch products' });
  }
};

export const getProductById = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  try {
    const product = await Product.findByPk(id);
    if (!product) {
      res.status(404).json({ error: 'Product not found' });
      return;
    }
    res.json(product);
  } catch (err) {
    console.error('Error fetching product:', err);
    res.status(500).json({ error: 'Failed to fetch product' });
  }
};

export const updateProduct = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const { name, price, description,image_url } = req.body;
   const file = req.file;

  try {
    const product = await Product.findByPk(id);

    if (!product) {
      res.status(404).json({ error: 'Product not found' });
      return;
    }

    const imagePath = file ? `uploads/${file.filename}` : image_url;

    // Update the product fields
    await product.update({ name, price, description, image_url: imagePath });

    res.status(200).json(product);
  } catch (err) {
    console.error('Error updating product:', err);
    res.status(500).json({ error: 'Failed to update product' });
  }
};

export const deleteProduct = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  try {
    const product = await Product.findByPk(id);

    if (!product) {
      res.status(404).json({ error: 'Product not found' });
      return;
    }

    await product.destroy();
    res.status(204).send(); // No content, but success
  } catch (err) {
    console.error('Error deleting product:', err);
    res.status(500).json({ error: 'Failed to delete product' });
  }
};

export const getPaginatedProducts = async (req: Request, res: Response) => {
  try {
    const search = (req.query.search as string) || '';
    const sort = (req.query.sort as string) || '';
    const page = parseInt((req.query.page as string) || '1', 10);
    const limit = parseInt((req.query.limit as string) || '10', 10);
    const offset = (page - 1) * limit;

    const whereCondition = search
      ? {
          [Op.or]: [
            { name: { [Op.iLike]: `%${search}%` } },
            { description: { [Op.iLike]: `%${search}%` } },
          ],
        }
      : {};

    const orderCondition: [string, 'ASC' | 'DESC'][] =
      sort === 'price_asc'
        ? [['price', 'ASC']]
        : sort === 'price_desc'
        ? [['price', 'DESC']]
        : [];

    const { rows: products, count: total } = await Product.findAndCountAll({
      where: whereCondition,
      order: orderCondition,
      offset,
      limit,
    });

    res.json({
      products,
      total,
      page,
      limit,
    });
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
