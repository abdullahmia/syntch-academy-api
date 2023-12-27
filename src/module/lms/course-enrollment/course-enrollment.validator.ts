import Joi from 'joi';
import { objectId } from '../../../validation';

export const enrollStudentToCourse = {
  params: Joi.object().keys({
    courseId: Joi.string().required().custom(objectId)
  })
};
