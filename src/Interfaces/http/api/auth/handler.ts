import { NextFunction, Request, Response } from 'express';
import LoginUser from '../../../../Applications/use_case/LoginUser';
import LogoutUser from '../../../../Applications/use_case/LogoutUser';
import RefreshAuth from '../../../../Applications/use_case/RefreshAuth';
import BaseHandler from '../BaseHandler';

class AuthHandler extends BaseHandler {
  async postAuth(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> {
    try {
      const loginUserUseCase = this.container.getInstance(LoginUser.name);
      const tokens = await loginUserUseCase.execute(req.body);

      return res.status(201).json({
        status: 'success',
        message: 'login success',
        data: tokens,
      });
    } catch (error) {
      return next(error);
    }
  }

  async putAuth(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> {
    try {
      const refreshAuthUseCase = this.container.getInstance(RefreshAuth.name);
      const accessToken = await refreshAuthUseCase.execute(req.body);

      return res.status(200).json({
        status: 'success',
        message: 'refresh access token success',
        data: { accessToken },
      });
    } catch (error) {
      return next(error);
    }
  }

  async deleteAuth(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> {
    try {
      const logoutUser = this.container.getInstance(LogoutUser.name);
      await logoutUser.execute(req.body);

      return res.status(200).json({
        status: 'success',
        message: 'logout success',
      });
    } catch (error) {
      return next(error);
    }
  }
}

export default AuthHandler;
