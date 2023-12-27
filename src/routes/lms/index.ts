import express, { Router } from 'express';

import courseEnrollmentRoute from './course-enrollment.routes';
import courseRoute from './course.routes';

const router: Router = express.Router();

router.use('/course', courseRoute);
router.use('/course-enrollment', courseEnrollmentRoute);

export default router;
