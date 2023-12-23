import express, { Router } from 'express';
import { userController, userValidation } from '../module/users';
import { validate } from '../validation';

const router: Router = express.Router();

router.route('/').post(validate(userValidation.createUser), userController.createUser); // TODO: Add validation & it should be protected route

export default router;
