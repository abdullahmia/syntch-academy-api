import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { TOKEN_TYPES } from '../../constants';
import { generateToken } from '../../lib';
import { catchAsync } from '../../utils';
import { emailService } from '../email';
import { userService } from '../users';
import * as authService from './auth.service';

export const login = catchAsync(async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user = await authService.loginWithEmailAndPassword(email, password);
  const token = await generateToken({
    id: user._id,
    email: user.email,
    role: user.role,
    status: user.status,
    username: user.username,
    type: TOKEN_TYPES.ACCESS
  });

  res.send({ user, token });
});

export const register = catchAsync(async (req: Request, res: Response) => {
  const user = await userService.createUser(req.body);
  const verificationEmailToken = await authService.generateVerificationEmailToken(user);
  await emailService.sendVerificationEmail(user.email, verificationEmailToken, user.username);
  res.status(httpStatus.CREATED).send({ data: user, message: 'User registered successfully' });
});

export const verifyEmail = catchAsync(async (req: Request, res: Response) => {
  const user = await authService.verifyEmail(req.query['token']);
  return res.status(httpStatus.OK).send(user);
});

export const forgotPassword = catchAsync(async (req: Request, res: Response) => {
  const resetPasswordToken = await authService.generateResetPasswordToken(req.body.email);
  await emailService.sendResetPasswordEmail(req.body.email, resetPasswordToken);
  res.status(httpStatus.NO_CONTENT).send();
});

export const resetPassword = catchAsync(async (req: Request, res: Response) => {
  await authService.resetPassword(req.query['token'], req.body.password);
  res.status(httpStatus.NO_CONTENT).send({
    message: 'Password reset successful'
  });
});
