import ScoreController from '../controllers/ScoreController';
import express from 'express';
import { accessControl } from '../middlewares/auth';

const scoreRoutes = express.Router();

scoreRoutes.post('/', accessControl('create', 'customers'), ScoreController.create);
scoreRoutes.get('/:id', accessControl('read', 'customers'), ScoreController.show);
scoreRoutes.get('/', accessControl('read', 'customers'), ScoreController.list);
scoreRoutes.delete('/:id', accessControl('delete', 'customers'), ScoreController.delete);
scoreRoutes.put('/:id', accessControl('update', 'customers'), ScoreController.update);

export default scoreRoutes;
