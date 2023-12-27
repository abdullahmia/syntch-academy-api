import Joi from 'joi';
import { objectId } from '../../../validation';

export const addCourse = {
  body: Joi.object().keys({
    title: Joi.string().required(),
    description: Joi.string().required(),
    price: Joi.number().required(),
    status: Joi.string().required(),
    category: Joi.string().required(),
    thumbnail: Joi.object().keys({
      public_id: Joi.string().required(),
      url: Joi.string().required()
    }),
    instructor: Joi.string().required()
  })
};

export const updateCourse = {
  params: Joi.object().keys({
    courseId: Joi.string().required().custom(objectId)
  }),
  body: Joi.object()
    .keys({
      title: Joi.string(),
      description: Joi.string(),
      price: Joi.number(),
      status: Joi.string(),
      category: Joi.string(),
      thumbnail: Joi.object().keys({
        public_id: Joi.string(),
        url: Joi.string()
      }),
      instructor: Joi.string()
    })
    .min(1)
    .required()
    .options({ allowUnknown: false })
};

export const enrollCourse = {
  params: Joi.object().keys({
    courseId: Joi.string().required().custom(objectId)
  })
};

export const addModuleToCourse = {
  params: Joi.object().keys({
    courseId: Joi.string().required().custom(objectId)
  })
};
