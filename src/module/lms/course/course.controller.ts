import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { catchAsync } from '../../../utils';
import * as courseService from './course.service';

export const addCourse = catchAsync(async (req: Request, res: Response) => {
  const course = await courseService.addNewCourse();
  return res.status(httpStatus.CREATED).send(course);
});
