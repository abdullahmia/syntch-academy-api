import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { RequestUser } from '../../../@types';
import { catchAsync } from '../../../utils';
import * as courseService from './course.service';

export const addCourse = catchAsync(async (req: Request, res: Response) => {
  const course = await courseService.addNewCourse(req.body);
  return res.status(httpStatus.CREATED).send(course);
});

export const updateCourse = catchAsync(async (req: Request, res: Response) => {
  const course = await courseService.updateCourseById(req.params.courseId, req.body);
  return res.status(httpStatus.OK).send(course);
});

export const getAllCourses = catchAsync(async (req: Request, res: Response) => {
  const courses = await courseService.getAllCourses();
  return res.status(httpStatus.OK).send(courses);
});

export const getCoursesByUserId = catchAsync(async (req: Request, res: Response) => {
  const user = req.user as RequestUser;
  const courses = await courseService.getCoursesByUserId(user.id);
  return res.status(httpStatus.OK).send(courses);
});

export const getCourseBySlug = catchAsync(async (req: Request, res: Response) => {
  const course = await courseService.getCourseBySlug(req.params.slug);
  return res.status(httpStatus.OK).send(course);
});

export const deleteCourseById = catchAsync(async (req: Request, res: Response) => {
  await courseService.deleteCourseById(req.params.courseId);
  return res.status(httpStatus.NO_CONTENT).send();
});

export const enrollCourse = catchAsync(async (req: Request, res: Response) => {
  const user = req.user as RequestUser;
  await courseService.enrollUserToCourse(req.params.courseId, user.id);
  return res.status(httpStatus.NO_CONTENT).send();
});

export const addModuletoCourse = catchAsync(async (req: Request, res: Response) => {
  const module = await courseService.addModuleToCourse(req.params.courseId, req.body);
  return res.status(httpStatus.CREATED).send(module);
});
