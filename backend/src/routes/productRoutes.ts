import { Router } from 'express';
import { upload } from '../middlewares/upload';
import {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  getPaginatedProducts,
} from '../controllers/productController';
import { requireAuth } from '../middlewares/authMiddleware';
import { requireAdmin } from '../middlewares/roleMiddleware';

const router = Router();

router.post('/', upload.single('image'), createProduct);
router.get('/', getAllProducts);
router.get('/paginated', getPaginatedProducts);
router.get('/:id', getProductById);
router.put('/:id',upload.single('image'), updateProduct);
router.delete('/:id',requireAuth, requireAdmin, deleteProduct);

export default router;
