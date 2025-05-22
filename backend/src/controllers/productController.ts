import { Request, Response } from 'express';
import Product from '../models/Product';

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
    console.log('Fetched products:', products);
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
