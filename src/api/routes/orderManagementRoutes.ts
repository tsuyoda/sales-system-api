import express from 'express';
import OrderManagementController from '../controllers/OrderManagementController';
import { accessControl } from '../middlewares/auth';

const orderManagementRoutes = express.Router();

orderManagementRoutes.get('/', accessControl('read', 'orders'), OrderManagementController.list);
orderManagementRoutes.post(
  '/:id/moderate',
  accessControl('create', 'orders'),
  OrderManagementController.moderate
);

export default orderManagementRoutes;
