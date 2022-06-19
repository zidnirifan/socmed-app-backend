import { NextFunction, Request, Response } from 'express';
import AddUserUseCase from '../../../../Applications/use_case/AddUser';
import { IContainer } from '../../../../Infrastructures/container';

export interface IUsersHandler {
  postUserHandler(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void>;
}

class UsersHandler implements IUsersHandler {
  private container: IContainer;

  constructor(container: IContainer) {
    this.container = container;

    this.postUserHandler = this.postUserHandler.bind(this);
  }

  async postUserHandler(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> {
    try {
      const addUserUseCase = this.container.getInstance(AddUserUseCase.name);
      const userId = await addUserUseCase.execute(req.body);

      return res.status(201).json({
        status: 'success',
        message: 'user successfully registered',
        data: {
          userId,
        },
      });
    } catch (error) {
      return next(error);
    }
  }
}

export default UsersHandler;
