import Joi from 'joi';

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
