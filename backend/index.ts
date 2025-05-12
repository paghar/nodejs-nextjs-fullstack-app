import dotenv from 'dotenv';
dotenv.config();

import app from './src/app';
import { sequelize } from './src/models';

const PORT = process.env.PORT || 3000;

sequelize.sync({ alter: true }) // or { force: true } for full reset during dev
  .then(() => {
    console.log('✅ Database synced successfully');
    app.listen(PORT, () => {
      console.log(`🚀 Server is running at http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error('❌ Failed to sync database:', error);
  });
