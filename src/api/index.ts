import { NODE_PORT } from '../config/app';
import apiRouter from './router';
import express from 'express';
import handleError from './middlewares/handleError';
import cors from 'cors';

const app = express();

app.use(cors());

app.disable('x-powered-by');
app.use(express.json());

app.use('/', apiRouter);

app.use(handleError);

app.listen(NODE_PORT, () => {
  console.log('Sales System API - Server Started on Port ', NODE_PORT);
});
