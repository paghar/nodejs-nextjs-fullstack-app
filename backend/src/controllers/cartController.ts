import { Request, Response } from 'express';
import { Cart, CartItem, Product } from '../models';

// POST /api/cart/add
export const addToCart = async (req: Request, res: Response): Promise<void> => {
  const userId = req.session.userId;
  const { productId, quantity = 1 } = req.body;

  if (!userId) {
    res.status(401).json({ message: 'Not authenticated' });
    return;
  }

  if (!productId || typeof quantity !== 'number' || quantity < 1) {
    res.status(400).json({ message: 'Invalid product or quantity' });
    return;
  }

  try {
    // Check if the product exists
    const product = await Product.findByPk(productId);
    if (!product) {
      res.status(404).json({ message: 'Product not found' });
      return;
    }

    // Find or create the user's cart
    let cart = await Cart.findOne({ where: { user_id: userId } });
    if (!cart) {
      cart = await Cart.create({ user_id: userId });
    }

    // Find or create the cart item
    let cartItem = await CartItem.findOne({
      where: {
        cart_id: cart.id,
        product_id: productId,
      },
    });

    if (cartItem) {
      // Update quantity if product is already in the cart
      cartItem.quantity += quantity;
      await cartItem.save();
    } else {
      // Add new product to the cart
      cartItem = await CartItem.create({
        cart_id: cart.id,
        product_id: productId,
        quantity,
      });
    }

    res.status(200).json({
      message: 'Product added to cart',
      item: {
        id: cartItem.id,
        product_id: cartItem.product_id,
        quantity: cartItem.quantity,
      },
    });
  } catch (error) {
    console.error('Error adding to cart:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};


// GET /api/cart
export const getCart = async (req: Request, res: Response): Promise<void> => {
  const userId = req.session.userId;

  if (!userId) {
    res.status(401).json({ message: 'Not authenticated' });
    return;
  }

  try {
    const cart = await Cart.findOne({
      where: { user_id: userId },
      include: [
        {
          model: CartItem,
          include: [
            {
              model: Product,
              attributes: ['id', 'name', 'price', 'image'],
            },
          ],
        },
      ],
    });

    if (!cart) {
      res.status(200).json({ cartItems: [] });
      return;
    }

    res.status(200).json({ cartItems: cart.cartItems });
  } catch (error) {
    console.error('Error fetching cart:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// PUT /api/cart/item/:id
export const updateCartItem = async (req: Request, res: Response): Promise<void> => {
  const userId = req.session.userId;
  const cartItemId = parseInt(req.params.id);
  const { quantity } = req.body;

  if (!userId) {
    res.status(401).json({ message: 'Not authenticated' });
    return;
  }

  if (!cartItemId || typeof quantity !== 'number' || quantity < 1) {
    res.status(400).json({ message: 'Invalid cart item ID or quantity' });
    return;
  }

  try {
    const cartItem = await CartItem.findByPk(cartItemId, {
      include: ['Cart'],
    });

    if (!cartItem || !cartItem.cart_id) {
      res.status(404).json({ message: 'Cart item not found' });
      return;
    }

    // Make sure the cart belongs to the user
    const cartOwnerId = (cartItem as any).Cart?.user_id;
    if (cartOwnerId !== userId) {
      res.status(403).json({ message: 'Forbidden' });
      return;
    }

    cartItem.quantity = quantity;
    await cartItem.save();

    res.status(200).json({
      message: 'Cart item updated successfully',
      item: {
        id: cartItem.id,
        product_id: cartItem.product_id,
        quantity: cartItem.quantity,
      },
    });
  } catch (error) {
    console.error('Error updating cart item:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// DELETE /api/cart/item/:id
export const deleteCartItem = async (req: Request, res: Response): Promise<void> => {
  const userId = req.session.userId;
  const cartItemId = parseInt(req.params.id);

  if (!userId) {
    res.status(401).json({ message: 'Not authenticated' });
    return;
  }

  if (isNaN(cartItemId)) {
    res.status(400).json({ message: 'Invalid cart item ID' });
    return;
  }

  try {
    const cartItem = await CartItem.findByPk(cartItemId);

    if (!cartItem) {
      res.status(404).json({ message: 'Cart item not found' });
      return;
    }

    const cart = await Cart.findByPk(cartItem.cart_id);

    if (!cart || cart.user_id !== userId) {
      res.status(403).json({ message: 'Forbidden' });
      return;
    }

    await cartItem.destroy();

    res.status(200).json({ message: 'Cart item deleted successfully' });
  } catch (error) {
    console.error('Error deleting cart item:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// DELETE /api/cart/clear
export const clearCart = async (req: Request, res: Response): Promise<void> => {
  const userId = req.session.userId;

  if (!userId) {
    res.status(401).json({ message: 'Not authenticated' });
    return;
  }

  try {
    const cart = await Cart.findOne({ where: { user_id: userId } });

    if (!cart) {
      res.status(404).json({ message: 'Cart not found' });
      return;
    }

    await CartItem.destroy({ where: { cart_id: cart.id } });

    res.status(200).json({ message: 'Cart cleared successfully' });
  } catch (error) {
    console.error('Error clearing cart:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};