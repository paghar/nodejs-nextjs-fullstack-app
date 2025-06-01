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

const router = Router();

router.post('/', upload.single('image'), createProduct);
router.get('/', getAllProducts);
router.get('/paginated', getPaginatedProducts);
router.get('/:id', getProductById);
router.put('/:id',upload.single('image'), updateProduct);
router.delete('/:id',deleteProduct);

export default router;
