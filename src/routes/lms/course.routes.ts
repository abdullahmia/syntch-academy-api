import express, { Router } from 'express';
import { auth } from '../../module/auth';
import { courseController, couseValidator } from '../../module/lms/course';
import { validate } from '../../validation';

const router: Router = express.Router();

router
  .route('/')
  .post(auth('manageCourses'), validate(couseValidator.addCourse), courseController.addCourse);

export default router;
