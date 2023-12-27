import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import { RequestUser } from '../../../@types';
import { ApiError, catchAsync } from '../../../utils';
import Course from './course.model';

export const isCourseOwner = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const course = await Course.findById(req.params.courseId);
  const user = req.user as RequestUser;
  if (!course || !user) {
    return res.status(404).send({ message: 'Course not found' });
  }

  if (course.instructor.toString() !== user.id.toString()) {
    return next(
      new ApiError(httpStatus.FORBIDDEN, 'You are not authorized to perform this action')
    );
  }
  next();
});
