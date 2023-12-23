import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import passport from 'passport';
import { ApiError } from '../../utils';
import { IUserDoc } from '../users';

const verityCallback =
  (req: Request, resolve: any, reject: any) => (error: Error, user: IUserDoc, info: string) => {
    console.log('error', error);
    if (error || info || !user) {
      return reject(new ApiError(httpStatus.UNAUTHORIZED, 'Please authenticate'));
    }

    req.user = user;
    return resolve();
  };

const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  return new Promise<void>((resolve, reject) => {
    passport.authenticate('jwt', { session: false }, verityCallback(req, resolve, reject))(
      req,
      res,
      next
    );
  })
    .then(() => next())
    .catch((err) => next(err));
};

export default authMiddleware;
