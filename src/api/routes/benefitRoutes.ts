import express from 'express';
import BenefitController from '../controllers/BenefitController';
import { accessControl } from '../middlewares/auth';

const benefitRoutes = express.Router();

benefitRoutes.post('/', accessControl('create', 'benefits'), BenefitController.create);
benefitRoutes.put('/:id', accessControl('update', 'benefits'), BenefitController.update);
benefitRoutes.get('/', accessControl('read', 'benefits'), BenefitController.list);
benefitRoutes.get('/:id', accessControl('read', 'benefits'), BenefitController.show);
benefitRoutes.delete('/:id', accessControl('delete', 'benefits'), BenefitController.delete);

export default benefitRoutes;
