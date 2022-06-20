import autoBind from 'auto-bind';
import { IContainer } from '../../../Infrastructures/container';

abstract class BaseHandler {
  protected container: IContainer;

  constructor(container: IContainer) {
    this.container = container;

    autoBind(this);
  }
}

export default BaseHandler;
