import { Router } from 'express';
import { upload } from '../middlewares/upload';
import {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} from '../controllers/productController';

const router = Router();

router.post('/', upload.single('image'), createProduct);
router.get('/', getAllProducts);
router.get('/:id', getProductById);
router.put('/:id',upload.single('image'), updateProduct);
router.delete('/:id', deleteProduct);

export default router;
