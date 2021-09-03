import { NODE_PORT } from '../config/app';
import apiRouter from './router';
import express from 'express';
import handleError from './middlewares/handleError';

const app = express();

app.disable('x-powered-by');
app.use(express.json());

app.use('/', apiRouter);

app.use(handleError);

app.listen(NODE_PORT, () => {
  console.log('Sales System API - Server Started on Port ', NODE_PORT);
});
