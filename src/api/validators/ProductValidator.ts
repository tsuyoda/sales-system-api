import Joi from 'joi';

import ApiError from '../../core/exceptions/ApiError';
import { Request } from 'express';

class ProductValidator {
  create(req: Request) {
    const schema = Joi.object({
      title: Joi.string().required(),
      description: Joi.string().required(),
      value: Joi.number().required(),
      amount: Joi.number().integer().required(),
    });

    const { value, error } = schema.validate(req.body);

    if (error) {
      throw new ApiError(400, error.details[0].message);
    }

    return value;
  }

  update(req: Request) {
    const schema = Joi.object({
      id: Joi.string()
        .regex(/^[0-9a-fA-F]{24}$/)
        .message('"id" must be a ObjectId')
        .required(),
      title: Joi.string().required(),
      description: Joi.string().required(),
      value: Joi.number().required(),
      amount: Joi.number().integer().required(),
    });

    const { value, error } = schema.validate({ ...req.params, ...req.body });

    if (error) {
      throw new ApiError(400, error.details[0].message);
    }

    return value;
  }

  list(req: Request) {
    const schema = Joi.object({
      title: Joi.string().optional(),
    });

    const { value, error } = schema.validate(req.query);

    if (error) {
      throw new ApiError(400, error.details[0].message);
    }

    return value;
  }

  showOrDelete(req: Request) {
    const schema = Joi.object({
      id: Joi.string()
        .regex(/^[0-9a-fA-F]{24}$/)
        .message('"id" must be a ObjectId')
        .required(),
    });

    const { value, error } = schema.validate(req.params);

    if (error) {
      throw new ApiError(400, error.details[0].message);
    }

    return value;
  }
}

export default new ProductValidator();
