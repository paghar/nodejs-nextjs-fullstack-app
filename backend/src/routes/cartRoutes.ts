import express from 'express';
import { addToCart, clearCart, deleteCartItem, getCart, updateCartItem } from '../controllers/cartController';
import { requireAuth } from '../middlewares/authMiddleware';

const router = express.Router();

router.post('/add', requireAuth, addToCart);
router.get('/', requireAuth, getCart);
router.put('/item/:id', requireAuth, updateCartItem);
router.delete('/item/:id', requireAuth, deleteCartItem);
router.delete('/clear', requireAuth, clearCart);

export default router;
