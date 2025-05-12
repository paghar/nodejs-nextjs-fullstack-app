import express, { Application } from 'express';
import productRoutes from './routes/productRoutes';

const app: Application = express();

app.use(express.json());

// Routes
app.use('/api/products', productRoutes);

export default app;
