import * as Yup from 'yup';
import { REGEX_OBJECT_ID } from '../../core/constants/regex';
import ApiError from '../../core/exceptions/ApiError';
import { Request } from 'express';

class InvoiceValidator {
  async list(req: Request) {
    const schema = Yup.object({
      orderCod: Yup.number().integer().optional(),
      customer: Yup.string()
        .matches(new RegExp(REGEX_OBJECT_ID), 'customer must be a ObjectId')
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

export default new InvoiceValidator();
