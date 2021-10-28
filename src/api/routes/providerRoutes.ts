import ProviderController from '../controllers/ProviderController';
import express from 'express';
import { accessControl } from '../middlewares/auth';

const providerRoutes = express.Router();

providerRoutes.post('/', accessControl('create', 'providers'), ProviderController.create);
providerRoutes.get('/:id', accessControl('read', 'providers'), ProviderController.show);
providerRoutes.get('/', accessControl('read', 'providers'), ProviderController.list);
providerRoutes.delete('/:id', accessControl('delete', 'providers'), ProviderController.delete);
providerRoutes.put('/:id', accessControl('update', 'providers'), ProviderController.update);

export default providerRoutes;
