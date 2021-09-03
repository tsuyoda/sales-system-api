import ProductController from '../controllers/ProductController';
import express from 'express';

const productRoutes = express.Router();

productRoutes.post('/', ProductController.create);
productRoutes.get('/:id', ProductController.show);
productRoutes.get('/', ProductController.list);
productRoutes.delete('/:id', ProductController.delete);
productRoutes.put('/:id', ProductController.update);

export default productRoutes;
