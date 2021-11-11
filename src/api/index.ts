import { FRONT_URL, NODE_PORT } from '../config/app';
import apiRouter from './router';
import express from 'express';
import handleError from './middlewares/handleError';
import cors from 'cors';
import { createServer } from 'http';
import { Server } from 'socket.io';
import Socket from './websocket';

const app = express();

const server = createServer(app);
export const io = new Server(server, {
  cors: {
    origin: FRONT_URL,
    methods: ['GET', 'POST'],
  },
});

const socket = new Socket(io);

app.use(cors());

app.disable('x-powered-by');
app.use(express.json());

socket.start();

app.use('/', apiRouter);

app.use(handleError);

server.listen(NODE_PORT, () => {
  console.log('Sales System API - Server Started on Port ', NODE_PORT);
});
