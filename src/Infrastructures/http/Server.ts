import express, {
  Request,
  Response,
  NextFunction,
  Application,
  Router,
  IRouter,
} from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import compression from 'compression';
import cors from 'cors';
import UsersRoutes from '../../Interfaces/http/api/users/routes';
import ClientError from '../../Commons/exceptions/ClientError';
import { IContainer } from '../container';

class Server {
  app: Application;
  private router: IRouter;
  private container: IContainer;

  constructor(container: IContainer) {
    this.app = express();
    this.router = Router();
    this.container = container;

    this.plugins();
    this.routes();
    this.errorHandler();
  }

  private plugins(): void {
    this.app.use(bodyParser.json());
    this.app.use(morgan('dev'));
    this.app.use(compression());
    this.app.use(cors());
  }

  private routes(): void {
    const usersRoutes = new UsersRoutes(this.router, this.container).router;

    this.app.use('/users', usersRoutes);
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
        console.log(error.message);
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
