import express from 'express';
import AuthController from '../controllers/AuthController';

const authRoutes = express.Router();

authRoutes.post('/', AuthController.authenticate);

export default authRoutes;
