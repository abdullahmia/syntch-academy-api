import Joi from 'joi';
import { password } from '../../validation';

export const loginBody = {
  body: Joi.object().keys({
    email: Joi.string().required(),
    password: Joi.string().required().custom(password)
  })
};

export const verifyEmail = {
  query: Joi.object().keys({
    token: Joi.string().required()
  })
};

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

export const forgotPassword = {
  body: Joi.object().keys({
    email: Joi.string().email().required()
  })
};

export const resetPassword = {
  query: Joi.object().keys({
    token: Joi.string().required()
  }),
  body: Joi.object().keys({
    password: Joi.string().required().custom(password)
  })
};
