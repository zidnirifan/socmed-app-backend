import { Router } from 'express';
import { IContainer } from '../../../Infrastructures/container';

abstract class BaseRouter {
  router = Router();
  protected container: IContainer;

  constructor(container: IContainer) {
    this.container = container;

    this.routes();
  }

  abstract routes(): void;
}

export default BaseRouter;
