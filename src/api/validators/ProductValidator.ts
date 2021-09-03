import * as Yup from 'yup';

import ApiError from '../../core/exceptions/ApiError';
import { Request } from 'express';

class ProductValidator {
  async create(req: Request) {
    const schema = Yup.object({
      title: Yup.string().typeError('title is invalid').required('title is required'),
      description: Yup.string()
        .typeError('description is invalid')
        .required('description is required'),
      value: Yup.number().typeError('value is invalid').required('value is required'),
      amount: Yup.number()
        .integer('amount is invalid')
        .typeError('amount is invalid')
        .required('amount is required'),
    });

    return schema.validate(req.body).catch(err => {
      throw new ApiError(400, err.message);
    });
  }

  async update(req: Request) {
    const schema = Yup.object({
      id: Yup.string().typeError('id is invalid').required('id is required'),
      title: Yup.string().typeError('title is invalid').required('title is required'),
      description: Yup.string()
        .typeError('description is invalid')
        .required('description is required'),
      value: Yup.number().typeError('value is invalid').required('value is required'),
      amount: Yup.number()
        .integer('amount is invalid')
        .typeError('amount is invalid')
        .required('amount is required'),
    });

    return schema.validate({ ...req.body, ...req.params }).catch(err => {
      throw new ApiError(400, err.message);
    });
  }

  async list(req: Request) {
    const schema = Yup.object({
      title: Yup.string().typeError('title is invalid').optional(),
    });

    return schema.validate(req.query);
  }

  async showOrDelete(req: Request) {
    const schema = Yup.object({
      id: Yup.string().typeError('id is invalid').required('id is required'),
    });

    return schema.validate(req.params);
  }
}

export default new ProductValidator();
