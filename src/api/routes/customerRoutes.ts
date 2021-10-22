import CustomerController from '../controllers/CustomerController';
import express from 'express';

const customerRoutes = express.Router();

customerRoutes.post('/', CustomerController.create);
customerRoutes.get('/:id', CustomerController.show);
customerRoutes.get('/', CustomerController.list);
customerRoutes.delete('/:id', CustomerController.delete);
customerRoutes.put('/:id', CustomerController.update);

export default customerRoutes;
