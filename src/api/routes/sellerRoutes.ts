import SellerController from '../controllers/SellerController';
import express from 'express';
import { accessControl } from '../middlewares/auth';

const sellerRoutes = express.Router();

sellerRoutes.post('/', accessControl('create', 'users'), SellerController.create);
sellerRoutes.get('/:id', accessControl('read', 'users'), SellerController.show);
sellerRoutes.get('/', accessControl('read', 'users'), SellerController.list);
sellerRoutes.delete('/:id', accessControl('delete', 'users'), SellerController.delete);
sellerRoutes.put('/:id', accessControl('update', 'users'), SellerController.update);

export default sellerRoutes;
