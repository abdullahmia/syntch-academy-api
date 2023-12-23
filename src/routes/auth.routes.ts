import express, { Router } from 'express';
import { authController, authValidation } from '../module/auth';
import { validate } from '../validation';

const router: Router = express.Router();

router.post('/login', validate(authValidation.loginBody), authController.login);

export default router;
