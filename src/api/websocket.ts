import { Server } from 'socket.io';
import Jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config/auth';
import { IDecodedJWT } from './../core/interfaces/IAuth';
import NotificationService from '../core/services/NotificationService';

class Socket {
  constructor(private io: Server) {}

  public start() {
    // set authorization for socket.io
    this.io
      .use(function (socket, next) {
        if (socket.handshake.query && socket.handshake.query.token) {
          Jwt.verify(
            socket.handshake.query.token,
            JWT_SECRET,
            function (err, decoded: IDecodedJWT) {
              if (err) return next(new Error('Authentication error'));
              socket.data.decoded = decoded;
              next();
            }
          );
        } else {
          next(new Error('Authentication error'));
        }
      })
      .on('connection', socket => {
        const { id } = socket.data.decoded;
        console.log(`New client ${id}`);

        socket.join(id);

        socket.on('list_notifications', async params => {
          const notifications = await NotificationService.list({
            user: id,
            page: params?.page || 1,
            limit: params?.limit || 5,
            sort: params?.sort || 'desc',
          });

          socket.emit('list_notifications', notifications);
        });

        socket.on('set_notification_viewed', async notificationId => {
          await NotificationService.setNotificationViewed(notificationId);

          const notifications = await NotificationService.list({
            user: id,
            viewed: false,
            page: 1,
            limit: 5,
            sort: 'desc',
          });

          socket.emit('list_unread_notifications', notifications);
        });

        socket.on('list_unread_notifications', async () => {
          const notifications = await NotificationService.list({
            user: id,
            viewed: false,
            page: 1,
            limit: 5,
            sort: 'desc',
          });

          socket.emit('list_unread_notifications', notifications);
        });

        socket.on('disconnect', () => {
          console.log(`Disconnected ${id}`);
        });
      });
  }
}

export default Socket;
