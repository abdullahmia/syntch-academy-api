import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { RequestUser } from '../../@types';
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

export const deleteUser = catchAsync(async (req: Request, res: Response) => {
  await userService.deleteUserById(req.params.userId);
  return res.status(httpStatus.NO_CONTENT).send();
});

export const uploadProfilePicture = catchAsync(async (req: Request, res: Response) => {
  const user = req.user as RequestUser;
  const file: any = req.file;
  const updatedUser = await userService.updateProfilePicture(user?.id, file);
  return res.status(httpStatus.OK).send(updatedUser);
});

export const deleteProfilePicture = catchAsync(async (req: Request, res: Response) => {
  const user = req.user as RequestUser;
  const updatedUser = await userService.deleteProfilePicture(user?.id);
  return res.status(httpStatus.OK).send(updatedUser);
});
