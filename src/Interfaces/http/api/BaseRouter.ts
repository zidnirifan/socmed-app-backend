import { IRouter } from 'express';
import { IContainer } from '../../../Infrastructures/container';

abstract class BaseRouter<Handler> {
  router: IRouter;
  protected container: IContainer;
  protected handler: Handler;

  constructor(router: IRouter, container: IContainer, handler: Handler) {
    this.router = router;
    this.container = container;
    this.handler = handler;

    this.routes();
  }

  abstract routes(): void;
}

export default BaseRouter;
