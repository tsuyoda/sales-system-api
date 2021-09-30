import * as Yup from 'yup';

import ApiError from '../../core/exceptions/ApiError';
import { Request } from 'express';

class ProductValidator {
  async create(req: Request) {
    const schema = Yup.object({
      title: Yup.string().required(),
      description: Yup.string().required(),
      value: Yup.number().required(),
      amount: Yup.number().integer().required(),
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
      title: Yup.string().required(),
      description: Yup.string().required(),
      value: Yup.number().required(),
      amount: Yup.number().integer().required(),
    });

    return schema.validate({ ...req.body, ...req.params }).catch(err => {
      throw new ApiError(400, err.message);
    });
  }

  async list(req: Request) {
    const schema = Yup.object({
      title: Yup.string().optional(),
      page: Yup.number().integer().default(1),
      limit: Yup.number().integer().default(10),
    });

    return schema.validate(req.query).catch(err => {
      throw new ApiError(400, err.message);
    });
  }
}

export default new ProductValidator();
