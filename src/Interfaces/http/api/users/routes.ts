import { IRouter } from 'express';
import { IContainer } from '../../../../Infrastructures/container';
import BaseRouter from '../BaseRouter';
import UsersHandler, { IUsersHandler } from './handler';

class UsersRoutes extends BaseRouter<IUsersHandler> {
  constructor(router: IRouter, container: IContainer) {
    const handler = new UsersHandler(container);
    super(router, container, handler);
  }

  routes(): void {
    this.router.post('/', this.handler.postUserHandler);
  }
}

export default UsersRoutes;
