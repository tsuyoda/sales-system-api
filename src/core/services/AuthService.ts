import ApiError from '../exceptions/ApiError';
import User from '../models/UserModel';
import bcrypt from 'bcrypt';
import Jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../../config/auth';
import { IAuthData, IAuth } from '../interfaces/IAuth';
import { IDbRole } from '../interfaces/IRole';

class AuthService {
  async authenticate(data: IAuthData): Promise<IAuth> {
    const { username, password } = data;

    const user = await User.findOne({ name: username }).select('+password').populate('role');

    if (!user) {
      throw new ApiError(404, 'user not found');
    }

    if (!(await bcrypt.compare(password, user.password))) {
      throw new ApiError(401, 'wrong password');
    }

    const token = Jwt.sign({ id: user._id, name: username }, JWT_SECRET, { expiresIn: 7200 });

    const currentDate = new Date();
    const validityDate = new Date();

    validityDate.setSeconds(currentDate.getSeconds() + 1800);

    const roleData = user.role as IDbRole;

    return {
      token,
      expiresAt: validityDate,
      createdAt: currentDate,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
      role: {
        id: roleData._id,
        name: roleData.name,
        description: roleData.description,
      },
    };
  }
}

export default new AuthService();
