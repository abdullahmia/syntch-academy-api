import express, { Router } from 'express';
import { courseController } from '../../module/lms/course';

const router: Router = express.Router();

router.route('/').get(courseController.addCourse);

export default router;
