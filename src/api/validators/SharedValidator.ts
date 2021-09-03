import * as Yup from 'yup';

import ApiError from '../../core/exceptions/ApiError';
import { Request } from 'express';

class SharedValidator {
  async paramId(req: Request) {
    const schema = Yup.object({
      id: Yup.string()
        .matches(/^[0-9a-fA-F]{24}$/, 'id must be a ObjectId')
        .required(),
    });

    return schema.validate(req.params).catch(err => {
      throw new ApiError(400, err.message);
    });
  }
}

export default new SharedValidator();
