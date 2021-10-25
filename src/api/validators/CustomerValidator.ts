import * as Yup from 'yup';

import ApiError from '../../core/exceptions/ApiError';
import { Request } from 'express';
import { REGEX_OBJECT_ID } from '../../core/constants/regex';

const docSchema = Yup.object({
  id: Yup.string().required(),
  type: Yup.mixed<'F' | 'J'>().oneOf(['F', 'J']).required(),
});

const contactSchema = Yup.object({
  email: Yup.string().email().required(),
  tel: Yup.string().required(),
});

const addressSchema = Yup.object({
  street: Yup.string().required(),
  number: Yup.number().required(),
  complement: Yup.string().optional(),
  city: Yup.string().required(),
  state: Yup.string().required(),
  postalCode: Yup.string().required(),
});

class CustomerValidator {
  async create(req: Request) {
    const schema = Yup.object({
      fullName: Yup.string().required(),
      doc: docSchema,
      address: addressSchema,
      contact: contactSchema,
      participatePointsProgram: Yup.boolean().required(),
    });

    return schema.validate(req.body).catch(err => {
      throw new ApiError(400, err.message);
    });
  }

  async update(req: Request) {
    const schema = Yup.object({
      id: Yup.string().matches(new RegExp(REGEX_OBJECT_ID), 'id must be a ObjectId').required(),
      fullName: Yup.string().required(),
      doc: docSchema,
      address: addressSchema,
      contact: contactSchema,
      participatePointsProgram: Yup.boolean().required(),
    });

    return schema.validate({ ...req.params, ...req.body }).catch(err => {
      throw new ApiError(400, err.message);
    });
  }

  async list(req: Request) {
    const schema = Yup.object({
      fullName: Yup.string().optional(),
      email: Yup.string().email().optional(),
      doc: Yup.string().optional(),
      page: Yup.number().integer().default(1),
      limit: Yup.number().integer().default(10),
      sort: Yup.string().oneOf(['asc', 'desc']).default('desc'),
    });

    return schema.validate(req.query).catch(err => {
      throw new ApiError(400, err.message);
    });
  }
}

export default new CustomerValidator();
