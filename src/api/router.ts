import IndexController from './controllers/IndexController';
import ProductRoutes from './routes/productRoutes';
import express from 'express';

const router = express.Router();

router.get('/', IndexController.index);

router.use('/product', ProductRoutes);

export default router;
