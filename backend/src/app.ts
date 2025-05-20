import express, { Application } from 'express';
import cors from 'cors'; 
import productRoutes from './routes/productRoutes';
import path from 'path';

const app: Application = express();

app.use(cors()); 
app.use(express.json());

// Serve static files
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Routes
app.use('/api/products', productRoutes);

export default app;
