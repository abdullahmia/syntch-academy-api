import { Request, Response } from 'express';
import { generateToken } from '../../lib';
import { catchAsync } from '../../utils';
import * as authService from './auth.service';

export const login = catchAsync(async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user = await authService.loginWithEmailAndPassword(email, password);
  const token = await generateToken({
    id: user._id,
    email: user.email,
    role: user.role,
    status: user.status,
    username: user.username
  });
  res.send({ user, token });
});
