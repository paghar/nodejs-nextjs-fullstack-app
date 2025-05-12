const express = require('express');
const app = express();

const productRoutes = require('./routes/productRoutes');
require('./models/Product'); // Syncs DB model

app.use(express.json());
app.use('/api/products', productRoutes);

module.exports = app;
