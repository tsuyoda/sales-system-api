import ScoreLevelController from '../controllers/ScoreLevelController';
import express from 'express';
import { accessControl } from '../middlewares/auth';

const scoreLevelRoutes = express.Router();

scoreLevelRoutes.post('/', accessControl('create', 'customers'), ScoreLevelController.create);
scoreLevelRoutes.get('/:id', accessControl('read', 'customers'), ScoreLevelController.show);
scoreLevelRoutes.get('/', accessControl('read', 'customers'), ScoreLevelController.list);
scoreLevelRoutes.delete('/:id', accessControl('delete', 'customers'), ScoreLevelController.delete);
scoreLevelRoutes.put('/:id', accessControl('update', 'customers'), ScoreLevelController.update);

export default scoreLevelRoutes;
