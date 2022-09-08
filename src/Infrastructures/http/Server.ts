import express, { Request, Response, NextFunction, Application } from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import compression from 'compression';
import cors from 'cors';
import path from 'path';
import UsersRoutes from '../../Interfaces/http/api/users/routes';
import ClientError from '../../Commons/exceptions/ClientError';
import { IContainer } from '../container';
import AuthRoutes from '../../Interfaces/http/api/auth/routes';
import PostsRoutes from '../../Interfaces/http/api/post/routes';
import CommentsRoutes from '../../Interfaces/http/api/comments/routes';
import ChatsRoutes from '../../Interfaces/http/api/chats/routes';
import NotifsRoutes from '../../Interfaces/http/api/notifs/routes';
import config from '../../Commons/config';

class Server {
  app: Application;
  private container: IContainer;

  constructor(container: IContainer) {
    this.app = express();
    this.container = container;

    this.plugins();
    this.routes();
    this.errorHandler();
  }

  private plugins(): void {
    this.app.use(bodyParser.json());
    this.app.use(morgan('dev'));
    this.app.use(compression());
    this.app.use(cors({ origin: config.cors_origin }));
    this.app.use(express.static(path.join(__dirname, '../../../public')));
  }

  private routes(): void {
    const usersRoutes = new UsersRoutes(this.container).router;
    const authRoutes = new AuthRoutes(this.container).router;
    const postsRoutes = new PostsRoutes(this.container).router;
    const commentsRoutes = new CommentsRoutes(this.container).router;
    const chatsRoutes = new ChatsRoutes(this.container).router;
    const notifsRoutes = new NotifsRoutes(this.container).router;

    this.app.use('/users', usersRoutes);
    this.app.use('/auth', authRoutes);
    this.app.use('/posts', postsRoutes);
    this.app.use('/posts', commentsRoutes);
    this.app.use('/chats', chatsRoutes);
    this.app.use('/notifications', notifsRoutes);
  }

  private errorHandler() {
    this.app.use(
      (error: TypeError, req: Request, res: Response, next: NextFunction) => {
        if (error instanceof ClientError) {
          return res.status(error.statusCode).json({
            status: 'fail',
            message: error.message,
          });
        }

        /* istanbul ignore next */
        console.error(error);
        /* istanbul ignore next */
        return res.status(500).json({
          status: 'error',
          message: 'server error',
        });
      }
    );

    this.app.use((req: Request, res: Response, next: NextFunction) => {
      res.status(404);
      if (req.accepts('json')) {
        res.send({ status: 'fail', message: 'not found' });
      }
    });
  }
}

export default Server;
