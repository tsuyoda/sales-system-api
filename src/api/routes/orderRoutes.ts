import express from 'express';
import OrderController from '../controllers/OrderController';
import { accessControl } from '../middlewares/auth';

const orderRoutes = express.Router();

orderRoutes.post(
  '/:id/generate-invoice',
  accessControl('create', 'orders'),
  OrderController.generateInvoice
);

orderRoutes.post('/', accessControl('create', 'orders'), OrderController.create);
orderRoutes.get('/:id', accessControl('read', 'orders'), OrderController.show);
orderRoutes.get('/', accessControl('read', 'orders'), OrderController.list);
orderRoutes.delete('/:id', accessControl('delete', 'orders'), OrderController.delete);
orderRoutes.put('/:id', accessControl('update', 'orders'), OrderController.update);

export default orderRoutes;
