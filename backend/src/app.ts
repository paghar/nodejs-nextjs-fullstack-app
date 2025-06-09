import express, { Application } from 'express';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import csrf from 'csurf';
import cors from 'cors'; 
import productRoutes from './routes/productRoutes';
import path from 'path';
import authRoutes from './routes/authRoutes';
import cartRoutes from './routes/cartRoutes';

const app: Application = express();

// 🌍 Define allowed origins for local + production
const allowedOrigins = [
  'http://localhost:3000', // Local frontend
  'https://nodejs-nextjs-fullstack-app.onrender.com', // Production frontend
];

// ✅ CORS Setup
app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('CORS not allowed'));
    }
  },
  credentials: true,
}));

app.use(express.json());
app.use(cookieParser());

// ✅ Session Setup (for both local and production)
app.use(session({
  secret: process.env.SESSION_SECRET || 'mySecret',
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production', // 'true' for HTTPS (Render), false locally
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax', // 'none' for cross-origin cookies
    maxAge: 1000 * 60 * 60, // 1 hour
  },
}));

// ✅ CSRF Middleware
app.use(csrf({ cookie: true }));

// ✅ CSRF Token Route
app.get('/api/auth/csrf-token', (req, res) => {
  res.status(200).json({ csrfToken: req.csrfToken() });
});

// Serve static files
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// API Routes
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/auth', authRoutes);

export default app;
