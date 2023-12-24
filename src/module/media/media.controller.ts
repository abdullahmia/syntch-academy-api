import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { RequestUser } from '../../@types';
import { catchAsync } from '../../utils';
import * as mediaService from './media.service';

export const createFolder = catchAsync(async (req: Request, res: Response) => {
  const user = req.user as RequestUser;
  const folder = await mediaService.createFolder(user.id, req.body.name);
  return res.status(httpStatus.CREATED).send(folder);
});

export const renameFolder = catchAsync(async (req: Request, res: Response) => {
  const user = req.user as RequestUser;
  const folder = await mediaService.renameFolder(req.params.id, req.body.name, user.id);
  return res.status(httpStatus.OK).send(folder);
});

export const addMedia = catchAsync(async (req: Request, res: Response) => {
  const user = req.user as RequestUser;
  const media = await mediaService.addMedia(user.id, req.file, req.body.folder);
  return res.status(httpStatus.CREATED).send(media);
});

export const getMediaByUserId = catchAsync(async (req: Request, res: Response) => {
  const user = req.user as RequestUser;
  const medias = await mediaService.getMediaFolderByUserId(user.id);
  return res.status(httpStatus.OK).send(medias);
});

export const getMediaByFolderAndFolder = catchAsync(async (req: Request, res: Response) => {
  const user = req.user as RequestUser;
  const medias = await mediaService.getMediaByFolderAndUser(req.params.folderId, user.id);
  return res.status(httpStatus.OK).send(medias);
});

export const deleteMediaById = catchAsync(async (req: Request, res: Response) => {
  const user = req.user as RequestUser;
  await mediaService.deleteMediaById(req.params.mediaId, user.id);
  return res.status(httpStatus.NO_CONTENT).send();
});
