import RoleController from '../controllers/RoleController';
import express from 'express';

const roleRoutes = express.Router();

roleRoutes.post('/', RoleController.create);
roleRoutes.put('/:id', RoleController.update);
roleRoutes.get('/', RoleController.list);
roleRoutes.get('/:id', RoleController.show);
roleRoutes.delete('/:id', RoleController.delete);

export default roleRoutes;
