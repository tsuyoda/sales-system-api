import IndexController from './controllers/IndexController';
import productRoutes from './routes/productRoutes';
import express from 'express';
import ApiError from '../core/exceptions/ApiError';
import roleRoutes from './routes/roleRoutes';

const router = express.Router();

router.get('/', IndexController.index);

router.use('/product', productRoutes);
router.use('/role', roleRoutes);

router.all('*', () => {
  throw new ApiError(404, 'Route not found');
});

export default router;
