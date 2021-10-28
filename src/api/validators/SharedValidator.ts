import * as Yup from 'yup';

import ApiError from '../../core/exceptions/ApiError';
import { Request } from 'express';
import { REGEX_OBJECT_ID } from '../../core/constants/regex';

class SharedValidator {
  async paramId(req: Request) {
    const schema = Yup.object({
      id: Yup.string().matches(new RegExp(REGEX_OBJECT_ID), 'id must be a ObjectId').required(),
    });

    return schema.validate(req.params).catch(err => {
      throw new ApiError(400, err.message);
    });
  }
}

export default new SharedValidator();
