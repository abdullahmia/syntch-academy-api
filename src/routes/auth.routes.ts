import express, { Router } from 'express';
import { authController, authValidation } from '../module/auth';
import { validate } from '../validation';

const router: Router = express.Router();

router.post('/login', validate(authValidation.loginBody), authController.login);
router.post('/register', validate(authValidation.createUser), authController.register);
router.post('/verify-email', validate(authValidation.verifyEmail), authController.verifyEmail);
router.post(
  '/forgot-password',
  validate(authValidation.forgotPassword),
  authController.forgotPassword
);
router.post(
  '/reset-password',
  validate(authValidation.resetPassword),
  authController.resetPassword
);

export default router;
