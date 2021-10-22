import express from 'express';
import ResourceController from '../controllers/ResourceController';
import { accessControl } from '../middlewares/auth';

const resourceRoutes = express.Router();

resourceRoutes.post('/', accessControl('create', 'resources'), ResourceController.create);
resourceRoutes.put('/:id', accessControl('update', 'resources'), ResourceController.update);
resourceRoutes.get('/', ResourceController.list);
resourceRoutes.get('/:id', ResourceController.show);
resourceRoutes.delete('/:id', accessControl('delete', 'resources'), ResourceController.delete);

export default resourceRoutes;
