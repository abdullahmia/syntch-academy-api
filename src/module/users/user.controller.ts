import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { IOptions } from '../../plugin';
import { catchAsync, pick } from '../../utils';
import * as userService from './user.service';

export const createUser = catchAsync(async (req: Request, res: Response) => {
  const user = await userService.createUser(req.body);
  return res.status(httpStatus.CREATED).send(user);
});

export const getUsers = catchAsync(async (req: Request, res: Response) => {
  const filter = pick(req.query, ['name', 'role']);
  const options: IOptions = pick(req.query, ['sortBy', 'limit', 'page', 'projectBy']);
  const users = await userService.queryUsers(filter, options);
  return res.status(httpStatus.OK).send(users);
});

export const getUser = catchAsync(async (req: Request, res: Response) => {
  const user = await userService.getUserById(req.params.userId);
  return res.status(httpStatus.OK).send(user);
});

export const updateUser = catchAsync(async (req: Request, res: Response) => {
  const user = await userService.updateUserById(req.params.userId, req.body);
  return res.status(httpStatus.OK).send(user);
});
