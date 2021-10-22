import * as Yup from 'yup';

import ApiError from '../../core/exceptions/ApiError';
import { Request } from 'express';
import { REGEX_OBJECT_ID } from '../../core/constants/regex';

class RoleValidator {
  async create(req: Request) {
    const schema = Yup.object({
      name: Yup.string().required(),
      description: Yup.string().optional(),
      permissions: Yup.array()
        .of(
          Yup.object({
            resource: Yup.string()
              .matches(new RegExp(REGEX_OBJECT_ID), 'permission must be a ObjectId')
              .required(),
            actions: Yup.array().of(Yup.string().required()).required(),
          })
        )
        .required(),
      isAdmin: Yup.boolean().optional().default(false),
    });

    return schema.validate(req.body).catch(err => {
      throw new ApiError(400, err.message);
    });
  }

  async update(req: Request) {
    const schema = Yup.object({
      id: Yup.string().matches(new RegExp(REGEX_OBJECT_ID), 'id must be a ObjectId').required(),
      name: Yup.string().required(),
      description: Yup.string().optional(),
      permissions: Yup.array()
        .of(
          Yup.object({
            resource: Yup.string()
              .matches(new RegExp(REGEX_OBJECT_ID), 'permission must be a ObjectId')
              .required(),
            actions: Yup.array().of(Yup.string().required()).required(),
          })
        )
        .required(),
      isAdmin: Yup.boolean().optional(),
    });

    return schema.validate({ ...req.params, ...req.body }).catch(err => {
      throw new ApiError(400, err.message);
    });
  }

  async list(req: Request) {
    const schema = Yup.object({
      name: Yup.lazy(val =>
        Array.isArray(val) ? Yup.array().of(Yup.string()).optional() : Yup.string().optional()
      ),
      page: Yup.number().integer().default(1),
      limit: Yup.number().integer().default(10),
      sort: Yup.string().oneOf(['asc', 'desc']).default('desc'),
    });

    return schema.validate({ ...req.query }).catch(err => {
      throw new ApiError(400, err.message);
    });
  }
}

export default new RoleValidator();
