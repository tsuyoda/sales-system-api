import IndexController from './controllers/IndexController';
import productRoutes from './routes/productRoutes';
import express from 'express';
import ApiError from '../core/exceptions/ApiError';
import roleRoutes from './routes/roleRoutes';
import userRoutes from './routes/userRoutes';
import authRoutes from './routes/authRoutes';
import { auth } from './middlewares/auth';
import providerRoutes from './routes/providerRoutes';
import resourceRoutes from './routes/resourceRoutes';
import customerRoutes from './routes/customerRoutes';
import sellerRoutes from './routes/sellerRoutes';
import orderRoutes from './routes/orderRoutes';
import profileRoutes from './routes/profileRoutes';

const router = express.Router();

router.get('/', IndexController.index);

router.use('/auth', authRoutes);

router.use(auth);

router.use('/product', productRoutes);
router.use('/role', roleRoutes);
router.use('/resource', resourceRoutes);
router.use('/user', userRoutes);
router.use('/provider', providerRoutes);
router.use('/customer', customerRoutes);
router.use('/seller', sellerRoutes);
router.use('/order', orderRoutes);
router.use('/profile', profileRoutes);

router.all('*', () => {
  throw new ApiError(404, 'Route not found');
});

export default router;
