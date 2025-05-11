const express = require('express');
const app = express();

// Middlewares
app.use(express.json());

// Routes
const helloRoutes = require('./routes/helloRoutes');
app.use('/api', helloRoutes);

module.exports = app;
