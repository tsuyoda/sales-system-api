import * as Yup from 'yup';

import ApiError from '../../core/exceptions/ApiError';
import { Request } from 'express';

class UserValidator {
  async create(req: Request) {
    const schema = Yup.object({
      name: Yup.string().required(),
      fullName: Yup.string().required(),
      email: Yup.string().email().lowercase().required(),
      password: Yup.string().required(),
      role: Yup.string()
        .matches(/^[0-9a-fA-F]{24}$/, 'role must be a ObjectId')
        .required(),
    });

    return schema.validate(req.body).catch(err => {
      throw new ApiError(400, err.message);
    });
  }

  async update(req: Request) {
    const schema = Yup.object({
      id: Yup.string()
        .matches(/^[0-9a-fA-F]{24}$/, 'id must be a ObjectId')
        .required(),
      name: Yup.string().required(),
      fullName: Yup.string().required(),
      email: Yup.string().lowercase().required(),
      password: Yup.string().required(),
      role: Yup.string()
        .matches(/^[0-9a-fA-F]{24}$/, 'role must be a ObjectId')
        .required(),
    });

    return schema.validate({ ...req.params, ...req.body }).catch(err => {
      throw new ApiError(400, err.message);
    });
  }

  async list(req: Request) {
    const schema = Yup.object({
      name: Yup.string().optional(),
      fullName: Yup.string().optional(),
      email: Yup.string().email().optional(),
      role: Yup.string()
        .matches(/^[0-9a-fA-F]{24}$/, 'role must be a ObjectId')
        .optional(),
      page: Yup.number().integer().default(1),
      limit: Yup.number().integer().default(10),
    });

    return schema.validate(req.query).catch(err => {
      throw new ApiError(400, err.message);
    });
  }
}

export default new UserValidator();
