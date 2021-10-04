import ProviderController from '../controllers/ProviderController'
import express from 'express';

const providerRoutes = express.Router();

providerRoutes.post('/', ProviderController.create);
providerRoutes.get('/:id', ProviderController.show);
providerRoutes.get('/', ProviderController.list);
providerRoutes.delete('/:id', ProviderController.delete);
providerRoutes.put('/:id', ProviderController.update);

export default providerRoutes;