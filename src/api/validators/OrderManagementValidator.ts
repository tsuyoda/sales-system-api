import * as Yup from 'yup';
import { REGEX_OBJECT_ID } from '../../core/constants/regex';
import ApiError from '../../core/exceptions/ApiError';
import { Request } from 'express';

class OrderManagementValidator {
  async moderate(req: Request) {
    const schema = Yup.object({
      id: Yup.string().matches(new RegExp(REGEX_OBJECT_ID), 'id must be a ObjectId').required(),
      status: Yup.mixed<'approved' | 'reproved'>().oneOf(['approved', 'reproved']).required(),
    });

    return schema.validate({ ...req.body, ...req.params }).catch(err => {
      throw new ApiError(400, err.message);
    });
  }

  async list(req: Request) {
    const schema = Yup.object({
      order: Yup.string()
        .matches(new RegExp(REGEX_OBJECT_ID), 'order must be a ObjectId')
        .optional(),
      status: Yup.string().optional(),
      page: Yup.number().integer().default(1),
      limit: Yup.number().integer().default(10),
      sort: Yup.string().oneOf(['asc', 'desc']).default('desc'),
    });

    return schema.validate(req.query).catch(err => {
      throw new ApiError(400, err.message);
    });
  }
}

export default new OrderManagementValidator();
