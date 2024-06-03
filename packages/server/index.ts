import dotenv from 'dotenv';
import cors from 'cors';
import express from 'express';
import sequelize from './db';
import router from './routes/index';
import { errorHandler } from './middleware/ErrorHandlingMiddleware';
dotenv.config({ path: '../../.env' });

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/server', router);
app.use(errorHandler);
const port = Number(process.env.SERVER_PORT) || 3001;

const start = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync({ alter: process.env.NODE_ENV !== 'production' });
    app.listen(port, () => {
      console.log(`  ➜ 🎸 Server is listening on port: ${port}`);
    });
  } catch (e) {
    console.log(e);
  }
};

start();
