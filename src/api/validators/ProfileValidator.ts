import * as Yup from 'yup';

import ApiError from '../../core/exceptions/ApiError';
import { Request } from 'express';
import { REGEX_PASSWORD } from '../../core/constants/regex';

class ProfileValidator {
  async resetPassword(req: Request) {
    const schema = Yup.object({
      currentPassword: Yup.string().required(),
      newPassword: Yup.string()
        .matches(
          new RegExp(REGEX_PASSWORD),
          'Password must contain at least 8 characters, one uppercase, one number and one special case character'
        )
        .required(),
    });

    return schema.validate(req.body).catch(err => {
      throw new ApiError(400, err.message);
    });
  }
}

export default new ProfileValidator();
