import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { catchAsync } from '../../utils';
import * as userService from './user.service';

export const createUser = catchAsync(async (req: Request, res: Response) => {
  const user = await userService.createUser(req.body);
  return res.status(httpStatus.CREATED).send(user);
});
