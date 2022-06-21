import { IRouter } from 'express';
import { IContainer } from '../../../Infrastructures/container';

abstract class BaseRouter {
  router: IRouter;
  protected container: IContainer;

  constructor(router: IRouter, container: IContainer) {
    this.router = router;
    this.container = container;

    this.routes();
  }

  abstract routes(): void;
}

export default BaseRouter;
