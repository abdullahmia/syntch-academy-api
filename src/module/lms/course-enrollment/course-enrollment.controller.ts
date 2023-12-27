import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { RequestUser } from '../../../@types';
import { catchAsync } from '../../../utils';
import * as courseEnrollmentService from './course-enrollment.service';

export const enrollStudentToCourse = catchAsync(async (req: Request, res: Response) => {
  const user = req.user as RequestUser;
  const enrollment = await courseEnrollmentService.enrollStudentToCourse(
    req.params.courseId,
    user.id
  );
  return res.status(httpStatus.CREATED).send(enrollment);
});
