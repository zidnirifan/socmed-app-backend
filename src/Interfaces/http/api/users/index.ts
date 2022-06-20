import { Router } from 'express';
import { IContainer } from '../../../../Infrastructures/container';
import UsersHandler from './handler';
import routes from './routes';

const usersPlugin = (container: IContainer) => {
  const router = Router();
  const usersHandler = new UsersHandler(container);

  return routes(router, usersHandler);
};

export default usersPlugin;
