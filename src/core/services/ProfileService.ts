import ApiError from '../exceptions/ApiError';
import User from '../models/UserModel';
import bcrypt from 'bcrypt';
import { Types } from 'mongoose';
import { IResetPasswordData } from '../interfaces/IProfile';

class AuthService {
  async resetPassword(id: Types.ObjectId, data: IResetPasswordData): Promise<void> {
    const { currentPassword, newPassword } = data;

    const user = await User.findById(id).select('+password');

    if (!user) {
      throw new ApiError(401, 'user not found');
    }

    if (!(await bcrypt.compare(currentPassword, user.password))) {
      throw new ApiError(401, 'wrong password');
    }

    const hashPassword = await bcrypt.hash(newPassword, 10);

    await User.findByIdAndUpdate(id, { password: hashPassword });
  }
}

export default new AuthService();
