import Joi from 'joi';
import { password } from '../../validation';

export const loginBody = {
  body: Joi.object().keys({
    email: Joi.string().required(),
    password: Joi.string().required().custom(password)
  })
};
