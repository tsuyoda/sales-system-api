import ProductController from '../controllers/ProductController';
import express from 'express';
import { accessControl } from '../middlewares/auth';

const productRoutes = express.Router();

productRoutes.post('/', accessControl('create', 'products'), ProductController.create);
productRoutes.get('/:id', accessControl('read', 'products'), ProductController.show);
productRoutes.get('/', accessControl('read', 'products'), ProductController.list);
productRoutes.delete('/:id', accessControl('delete', 'products'), ProductController.delete);
productRoutes.put('/:id', accessControl('update', 'products'), ProductController.update);

export default productRoutes;
