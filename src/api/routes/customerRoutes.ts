import CustomerController from '../controllers/CustomerController';
import express from 'express';
import { accessControl } from '../middlewares/auth';

const customerRoutes = express.Router();

customerRoutes.post('/', accessControl('create', 'clients'), CustomerController.create);
customerRoutes.get('/:id', accessControl('create', 'clients'), CustomerController.show);
customerRoutes.get('/', accessControl('create', 'clients'), CustomerController.list);
customerRoutes.delete('/:id', accessControl('create', 'clients'), CustomerController.delete);
customerRoutes.put('/:id', accessControl('create', 'clients'), CustomerController.update);

export default customerRoutes;
