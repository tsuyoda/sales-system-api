import UserController from '../controllers/UserController';
import express from 'express';

const userRoutes = express.Router();

userRoutes.post('/', UserController.create);
userRoutes.get('/:id', UserController.show);
userRoutes.get('/', UserController.list);
userRoutes.delete('/:id', UserController.delete);
userRoutes.put('/:id', UserController.update);

export default userRoutes;
