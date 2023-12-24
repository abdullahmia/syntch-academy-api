import Joi from 'joi';
import { objectId, password } from '../../validation';

const createUserBody = {
  email: Joi.string().required().email(),
  password: Joi.string().required().custom(password),
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  username: Joi.string().required(),
  displayName: Joi.string(),
  occupation: Joi.string(),
  phoneNumber: Joi.string(),
  socialProfile: Joi.object({
    linkedIn: Joi.string(),
    github: Joi.string(),
    website: Joi.string()
  })
};

export const createUser = {
  body: Joi.object().keys(createUserBody)
};

export const getUser = {
  params: Joi.object().keys({
    userId: Joi.string().custom(objectId)
  })
};

export const getUsers = {
  query: Joi.object().keys({
    name: Joi.string(),
    role: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer()
  })
};

export const updateUser = {
  params: Joi.object().keys({
    userId: Joi.required().custom(objectId)
  }),
  body: Joi.object()
    .keys({
      email: Joi.string().email(),
      password: Joi.string().custom(password),
      firstName: Joi.string(),
      lastName: Joi.string(),
      username: Joi.string(),
      displayName: Joi.string(),
      occupation: Joi.string(),
      phoneNumber: Joi.string(),
      socialProfile: Joi.object({
        linkedIn: Joi.string(),
        github: Joi.string(),
        website: Joi.string()
      })
    })
    .min(1)
    .required()
    .options({ allowUnknown: false })
};

export const deleteUser = {
  body: Joi.object().keys({
    userId: Joi.string().custom(objectId)
  })
};
