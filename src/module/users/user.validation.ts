import Joi from 'joi';
import { password } from '../../validation';

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
