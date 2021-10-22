import UserController from '../controllers/UserController';
import express from 'express';
import { accessControl } from '../middlewares/auth';

const userRoutes = express.Router();

userRoutes.post('/', accessControl('create', 'users'), UserController.create);
userRoutes.get('/my_profile', UserController.showMyProfile);
userRoutes.get('/:id', accessControl('read', 'users'), UserController.show);
userRoutes.get('/', accessControl('read', 'users'), UserController.list);
userRoutes.delete('/:id', accessControl('delete', 'users'), UserController.delete);
userRoutes.put('/:id', accessControl('update', 'users'), UserController.update);

export default userRoutes;
