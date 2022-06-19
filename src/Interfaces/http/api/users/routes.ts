import { IRouter } from 'express';
import { IUsersHandler } from './handler';

const routes = (router: IRouter, handler: IUsersHandler) => {
  router.post('/', handler.postUserHandler);

  return router;
};

export default routes;
