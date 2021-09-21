import * as Yup from 'yup';

import ApiError from '../../core/exceptions/ApiError';
import { Request } from 'express';

class AuthValidator {
  async authenticate(req: Request) {
    const schema = Yup.object({
      username: Yup.string().required(),
      password: Yup.string().required(),
    });

    return schema.validate(req.body).catch(err => {
      throw new ApiError(400, err.message);
    });
  }
}

export default new AuthValidator();
