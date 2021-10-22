import ApiError from '../exceptions/ApiError';
import User from '../models/UserModel';
import bcrypt from 'bcrypt';
import Jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../../config/auth';
import { IAuthData, IAuth, IDecodedJWT } from '../interfaces/IAuth';
import { IDbRole } from '../interfaces/IRole';

class AuthService {
  async authenticate(data: IAuthData): Promise<IAuth> {
    const { username, password } = data;

    const user = await User.findOne({ name: username }).select('+password').populate('role');

    if (!user) {
      throw new ApiError(401, 'user not found');
    }

    if (!(await bcrypt.compare(password, user.password))) {
      throw new ApiError(401, 'wrong password');
    }

    const roleData = user.role as IDbRole;

    const jwtPayload: IDecodedJWT = {
      id: user._id,
      name: username,
      roleId: roleData._id,
      isAdmin: !!roleData.isAdmin,
    };

    const expiresIn = 7200;
    const token = Jwt.sign(jwtPayload, JWT_SECRET, { expiresIn });

    const currentDate = new Date();
    const validityDate = new Date();

    validityDate.setSeconds(currentDate.getSeconds() + expiresIn);

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
