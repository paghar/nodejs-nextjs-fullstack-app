import express, { Application } from 'express';
import cors from 'cors'; // ✅ add this
import productRoutes from './routes/productRoutes';
import path from 'path';

const app: Application = express();

app.use(cors()); // ✅ allow all origins (or restrict below)
app.use(express.json());

// Serve static files
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Routes
app.use('/api/products', productRoutes);

export default app;
