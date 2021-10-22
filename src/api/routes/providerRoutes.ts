import ProviderController from '../controllers/ProviderController';
import express from 'express';
import { accessControl } from '../middlewares/auth';

const providerRoutes = express.Router();

providerRoutes.post('/', accessControl('create', 'providers'), ProviderController.create);
providerRoutes.get('/:id', accessControl('create', 'providers'), ProviderController.show);
providerRoutes.get('/', accessControl('create', 'providers'), ProviderController.list);
providerRoutes.delete('/:id', accessControl('create', 'providers'), ProviderController.delete);
providerRoutes.put('/:id', accessControl('create', 'providers'), ProviderController.update);

export default providerRoutes;
