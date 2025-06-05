import express from 'express';
import {
  registerUser,
  loginUser,
  logoutUser,
  getCurrentUser,
} from '../controllers/authController';
import {
  registerValidation,
  loginValidation,
} from '../validators/authValidator';
import { requireAuth } from '../middlewares/authMiddleware';

const router = express.Router();

router.post('/register', registerValidation, registerUser);
router.post('/login', loginValidation, loginUser);
router.post('/logout', requireAuth, logoutUser); 
router.get('/me', requireAuth, getCurrentUser);
router.get('/csrf-token', (req, res) => {
  res.json({ csrfToken: req.csrfToken() });
});

export default router;
