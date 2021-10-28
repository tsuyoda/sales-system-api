import CustomerController from '../controllers/CustomerController';
import express from 'express';
import { accessControl } from '../middlewares/auth';

const customerRoutes = express.Router();

customerRoutes.post('/', accessControl('create', 'customers'), CustomerController.create);
customerRoutes.get('/:id', accessControl('read', 'customers'), CustomerController.show);
customerRoutes.get('/', accessControl('read', 'customers'), CustomerController.list);
customerRoutes.delete('/:id', accessControl('delete', 'customers'), CustomerController.delete);
customerRoutes.put('/:id', accessControl('update', 'customers'), CustomerController.update);

export default customerRoutes;
