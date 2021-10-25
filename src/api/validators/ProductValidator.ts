import * as Yup from 'yup';
import { REGEX_OBJECT_ID } from '../../core/constants/regex';
import ApiError from '../../core/exceptions/ApiError';
import { Request } from 'express';

class ProductValidator {
  async create(req: Request) {
    const schema = Yup.object({
      sku: Yup.string()
        .matches(/^[\w-]+$/, 'Invalid SKU')
        .required(),
      title: Yup.string().required(),
      description: Yup.string().required(),
      value: Yup.number().required(),
      quantity: Yup.number().integer().required(),
      measurementUnit: Yup.object({
        type: Yup.string().required(),
        value: Yup.number().required(),
      }).required(),
      width: Yup.number().required(),
      height: Yup.number().required(),
      weight: Yup.number().required(),
      length: Yup.number().required(),
      provider: Yup.string()
        .matches(new RegExp(REGEX_OBJECT_ID), 'id must be a ObjectId')
        .required(),
    });

    return schema.validate(req.body).catch(err => {
      throw new ApiError(400, err.message);
    });
  }

  async update(req: Request) {
    const schema = Yup.object({
      id: Yup.string().matches(new RegExp(REGEX_OBJECT_ID), 'id must be a ObjectId').required(),
      sku: Yup.string()
        .matches(/^[\w-]+$/, 'Invalid SKU')
        .required(),
      title: Yup.string().required(),
      description: Yup.string().required(),
      value: Yup.number().required(),
      quantity: Yup.number().integer().required(),
      measurementUnit: Yup.object({
        type: Yup.string().required(),
        value: Yup.number().required(),
      }).required(),
      width: Yup.number().required(),
      height: Yup.number().required(),
      weight: Yup.number().required(),
      length: Yup.number().required(),
      provider: Yup.string()
        .matches(new RegExp(REGEX_OBJECT_ID), 'id must be a ObjectId')
        .required(),
    });

    return schema.validate({ ...req.body, ...req.params }).catch(err => {
      throw new ApiError(400, err.message);
    });
  }

  async list(req: Request) {
    const schema = Yup.object({
      title: Yup.string().optional(),
      sku: Yup.string()
        .matches(/^[\w-]+$/, 'Invalid SKU')
        .optional(),
      provider: Yup.string()
        .matches(new RegExp(REGEX_OBJECT_ID), 'id must be a ObjectId')
        .optional(),
      page: Yup.number().integer().default(1),
      limit: Yup.number().integer().default(10),
      sort: Yup.string().oneOf(['asc', 'desc']).default('desc'),
    });

    return schema.validate(req.query).catch(err => {
      throw new ApiError(400, err.message);
    });
  }
}

export default new ProductValidator();
