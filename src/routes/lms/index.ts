import express, { Router } from 'express';

import courseRoute from './course.routes';

const router: Router = express.Router();

router.use('/course', courseRoute);

export default router;
