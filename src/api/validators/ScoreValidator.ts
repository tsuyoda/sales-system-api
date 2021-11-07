import * as Yup from 'yup';

import ApiError from '../../core/exceptions/ApiError';
import { Request } from 'express';
import { REGEX_OBJECT_ID } from '../../core/constants/regex';

class UserValidator {
  async create(req: Request) {
    const schema = Yup.object({
      points: Yup.number().integer().default(0),
      customer: Yup.string()
        .matches(new RegExp(REGEX_OBJECT_ID), 'customer must be a ObjectId')
        .required(),
      scoreLevel: Yup.string()
        .matches(new RegExp(REGEX_OBJECT_ID), 'score level must be a ObjectId')
        .required(),
    });

    return schema.validate(req.body).catch(err => {
      throw new ApiError(400, err.message);
    });
  }

  async update(req: Request) {
    const schema = Yup.object({
      id: Yup.string().matches(new RegExp(REGEX_OBJECT_ID), 'id must be a ObjectId').required(),
      points: Yup.number().integer().default(0),
      customer: Yup.string()
        .matches(new RegExp(REGEX_OBJECT_ID), 'customer must be a ObjectId')
        .required(),
      scoreLevel: Yup.string()
        .matches(new RegExp(REGEX_OBJECT_ID), 'score level must be a ObjectId')
        .required(),
    });

    return schema.validate({ ...req.params, ...req.body }).catch(err => {
      throw new ApiError(400, err.message);
    });
  }

  async list(req: Request) {
    const schema = Yup.object({
      customer: Yup.string()
        .matches(new RegExp(REGEX_OBJECT_ID), 'customer must be a ObjectId')
        .optional(),
      scoreLevel: Yup.string()
        .matches(new RegExp(REGEX_OBJECT_ID), 'score level must be a ObjectId')
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

export default new UserValidator();
