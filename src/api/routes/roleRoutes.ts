import RoleController from '../controllers/RoleController';

import express from 'express';
import { accessControl } from '../middlewares/auth';

const roleRoutes = express.Router();

roleRoutes.post('/', accessControl('create', 'roles'), RoleController.create);
roleRoutes.put('/:id', accessControl('update', 'roles'), RoleController.update);
roleRoutes.get('/', accessControl('read', 'roles'), RoleController.list);
roleRoutes.get('/:id', accessControl('read', 'roles'), RoleController.show);
roleRoutes.delete('/:id', accessControl('delete', 'roles'), RoleController.delete);

export default roleRoutes;
