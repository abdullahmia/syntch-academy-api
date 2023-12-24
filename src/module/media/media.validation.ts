import Joi from 'joi';
import { objectId } from '../../validation';

export const createFolder = {
  body: Joi.object().keys({
    name: Joi.string().required()
  })
};

export const renameFolder = {
  params: Joi.object().keys({
    id: Joi.string().required()
  }),
  body: Joi.object().keys({
    name: Joi.string().required()
  })
};

export const getMediaByFolderAndFolder = {
  params: Joi.object().keys({
    folderId: Joi.string().required().custom(objectId)
  })
};

export const deleteMediaById = {
  params: Joi.object().keys({
    mediaId: Joi.string().required().custom(objectId)
  })
};
