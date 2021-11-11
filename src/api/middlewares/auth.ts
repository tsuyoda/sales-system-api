import { NextFunction, Request, Response } from 'express';
import Jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../../config/auth';

import ApiError from '../../core/exceptions/ApiError';
import { IDecodedJWT } from '../../core/interfaces/IAuth';
import RoleService from '../../core/services/RoleService';
import { AccessControl } from 'accesscontrol';

const auth = (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization || '';

    const [, token] = authHeader?.split(' ');

    if (!token) {
      throw new ApiError(401, 'token é obrigatório');
    }

    Jwt.verify(token, JWT_SECRET, (err, decoded: IDecodedJWT) => {
      if (err) {
        throw new ApiError(401, 'token inválido ou expirado');
      }

      req.user = {
        id: decoded.id,
        name: decoded.name,
        roleId: decoded.roleId,
        isAdmin: decoded.isAdmin,
      };
    });

    next();
  } catch (err) {
    next(err);
  }
};

const accessControl =
  (action, resource) => async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!req.user) {
        throw new ApiError(500, 'Erro ao encontrar informações do usuário');
      }

      const { roleId } = req.user;

      const role = await RoleService.show(roleId);

      if (role.isAdmin) {
        return next();
      }

      const grants: { role: string; resource: string; action: string }[] = [];

      role.permissions.forEach((grant: any) => {
        grant.actions.forEach(action => {
          grants.push({ role: role.name, resource: grant.resource.name, action: action });
        });
      });

      if (!grants.length) {
        throw new ApiError(403, 'Você não possui permissão para executar esta ação.');
      }
      const ac = new AccessControl(grants.filter(grant => grant.resource !== 'orderManagement'));

      const permission = ac.can(role.name)[action](resource);

      if (!permission.granted) {
        throw new ApiError(403, 'Você não possui permissão para executar esta ação.');
      }

      next();
    } catch (err) {
      next(err);
    }
  };

export { auth, accessControl };
