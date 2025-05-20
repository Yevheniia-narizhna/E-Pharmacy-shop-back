import express from 'express';
import cors from 'cors';
import pino from 'pino-http';
import cookieParser from 'cookie-parser';
// import allRouters from './routers/index.js';
// import { env } from './utils/env.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';
import { errorHandler } from './middlewares/errorHandler.js';
import router from './routers/index.js';

const app = express();

// const corsOptions = {
//   origin: ['https://med-store-client.vercel.app', 'http://localhost:5173'],
//   credentials: true,
// };

app.use(
  cors({
    origin: '*',
    credentials: false,
  }),
);

app.use(cookieParser());
app.use(router);

app.use(
  pino({
    transport: {
      target: 'pino-pretty',
    },
    options: {
      colorize: true,
    },
  }),
);

app.get('/', (req, res) => {
  res.json({
    message: 'Start page!',
  });
});

app.use('*', notFoundHandler);

app.use(errorHandler);

const setupServer = () => {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};

export default setupServer;
