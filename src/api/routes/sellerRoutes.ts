import SellerController from '../controllers/SellerController';
import express from 'express';
import { accessControl } from '../middlewares/auth';

const sellerRoutes = express.Router();

sellerRoutes.post('/', accessControl('create', 'clients'), SellerController.create);
sellerRoutes.get('/:id', accessControl('create', 'clients'), SellerController.show);
sellerRoutes.get('/', accessControl('create', 'clients'), SellerController.list);
sellerRoutes.delete('/:id', accessControl('create', 'clients'), SellerController.delete);
sellerRoutes.put('/:id', accessControl('create', 'clients'), SellerController.update);

export default sellerRoutes;
