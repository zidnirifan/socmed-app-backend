import { NextFunction, Request, Response } from 'express';
import JwtTokenManager from '../../../Infrastructures/security/JwtTokenManager';
import { PayloadToken } from '../../../Applications/security/TokenManager';

export interface RequestAuth extends Request {
  auth?: PayloadToken;
}

const jwtTokenManager = new JwtTokenManager();

const auth = async (
  req: RequestAuth,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  if (!req.headers.authorization) {
    return res
      .status(401)
      .json({ status: 'fail', message: 'missing authentication' });
  }

  const token = req.headers.authorization.replace('Bearer ', '');

  try {
    jwtTokenManager.verifyAccessToken(token);
  } catch (error) {
    return next(error);
  }

  const result = jwtTokenManager.decodeToken(token);
  req.auth = result;

  return next();
};

export default auth;
