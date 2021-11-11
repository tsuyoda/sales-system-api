import { PaginationModel } from 'mongoose-paginate-ts';
import { IDbNotification, INotificationData } from '../interfaces/INotification';
import { INotificationParams } from './../interfaces/INotification';
import NotificationModel from './../models/NotificationModel';
import { io } from '../../api/index';
import RoleModel from './../models/RoleModel';
import UserModel from './../models/UserModel';
import ResourceModel from './../models/ResourceModel';
import ApiError from '../exceptions/ApiError';

class NotificationService {
  async createToAllowedUser(data: INotificationData): Promise<void> {
    const resource = await ResourceModel.findOne({ name: 'orderManagement' });

    if (!resource) {
      throw new ApiError(500, 'unable to find order resource');
    }

    const roles = await RoleModel.find({
      $or: [
        {
          'permissions.resource': resource._id,
          'permissions.actions': 'notification',
        },
        { isAdmin: true },
      ],
    });

    const users = await UserModel.find({ role: { $in: roles.map(role => role._id) } });

    users.forEach(user => {
      this.create({
        ...data,
        user: user._id.toString(),
      });
    });
  }

  async setNotificationViewed(id: string): Promise<void> {
    await NotificationModel.findByIdAndUpdate(id, { viewed: true });
  }

  async create(data: INotificationData): Promise<IDbNotification> {
    data.viewed = false;

    const notification = await NotificationModel.create(data);
    io.to(data.user).emit('new_notification', notification);
    return notification;
  }

  async list(data: INotificationParams): Promise<PaginationModel<IDbNotification>> {
    const { page, limit, sort, ...params } = data;

    const options = {
      query: params,
      sort: { createdAt: sort },
      page,
      limit,
    };

    const results = await NotificationModel.paginate(options);

    if (!results) {
      return {} as PaginationModel<IDbNotification>;
    }

    return results;
  }
}

export default new NotificationService();
