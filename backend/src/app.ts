import express, { Application } from 'express';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import csrf from 'csurf';
import cors from 'cors'; 
import productRoutes from './routes/productRoutes';
import path from 'path';
import authRoutes from './routes/authRoutes';

const app: Application = express();


app.use(cors({
  origin: 'http://localhost:3000', // Your Next.js frontend URL
  credentials: true, // Allow cookies and headers
}));
app.use(express.json());
app.use(cookieParser());

// CSRF protection
app.use(session({
  secret: process.env.SESSION_SECRET || 'mySecret',
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 1000 * 60 * 60 // 1 hour
  }
}));

// CSRF protection middleware
app.use(csrf({ cookie: true }));

// Serve static files
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Routes
app.use('/api/products', productRoutes);
app.use('/api/auth', authRoutes); 

export default app;
