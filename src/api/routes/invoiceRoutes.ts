import express from 'express';
import InvoiceController from '../controllers/InvoiceController';
import { accessControl } from '../middlewares/auth';

const invoiceRoutes = express.Router();

invoiceRoutes.get('/:id', accessControl('read', 'orders'), InvoiceController.show);
invoiceRoutes.get('/', accessControl('read', 'orders'), InvoiceController.list);

export default invoiceRoutes;
