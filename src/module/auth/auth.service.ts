import httpStatus from 'http-status';
import { TOKEN_TYPES, USER_STATUSES } from '../../constants';
import { generateToken, verifyToken } from '../../lib';
import { ApiError } from '../../utils';
import { IUserDoc, userService } from '../users';

/**
 * Login with username and password
 * @param {string} email
 * @param {string} password
 * @returns {Promise<IUserDoc>}
 */
export const loginWithEmailAndPassword = async (email: string, password: string) => {
  const user = await userService.getUserByEmail(email);
  if (!user || !(await user.isPasswordMatch(password))) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Incorrect email or password');
  }
  return user;
};

/**
 * Verify email
 * @param {string} verifyEmailToken
 * @returns {Promise<IUserDoc | null>}
 */
export const verifyEmail = async (verifyEmailToken: any) => {
  try {
    const decodedToken: any = await verifyToken(verifyEmailToken);
    if (decodedToken.type !== TOKEN_TYPES.VERIFY_EMAIL) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid token');
    }
    const user = await userService.getUserById(decodedToken.id);
    if (!user) {
      throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
    }

    if (user.status === USER_STATUSES.ACTIVE) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Email already verified');
    }

    user.status = USER_STATUSES.ACTIVE;
    await user.save();
    return user;
  } catch (error) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Email verification failed');
  }
};

/**
 * Reset password
 * @param {string} resetPasswordToken
 * @param {string} newPassword
 * @returns {Promise<void>}
 */
export const resetPassword = async (resetPasswordToken: any, newPassword: string) => {
  try {
    const decodedToken: any = await verifyToken(resetPasswordToken);
    if (decodedToken.type !== TOKEN_TYPES.RESET_PASSWORD) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid token');
    }
    const user = await userService.getUserById(decodedToken.id);
    await userService.updateUserById(user?._id, { password: newPassword });
  } catch {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Password reset failed');
  }
};

/**
 * Change password with old password
 * @param {string} userId
 * @param {string} oldPassword
 * @param {string} newPassword
 * @returns {Promise<IUserDoc>}
 */
export const changePassword = async (userId: string, oldPassword: string, newPassword: string) => {
  const user = await userService.getUserById(userId);
  if (!user || !(await user.isPasswordMatch(oldPassword))) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Current password is incorrect');
  }
  await userService.updateUserById(userId, { password: newPassword });
  return user;
};

/**
 * Generate verification email token
 * @param {IUserDoc} user
 * @returns {Promise<string>}
 */
export const generateVerificationEmailToken = async (user: any) => {
  const paylaod = {
    id: user?._id,
    email: user?.email,
    type: TOKEN_TYPES.VERIFY_EMAIL
  };
  const token = await generateToken(paylaod);
  return token;
};

/**
 * Generate reset password token
 * @param {string} email
 * @returns {Promise<string>}
 */
export const generateResetPasswordToken = async (email: string) => {
  const user = await userService.getUserByEmail(email);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'No users found with this email');
  }
  const paylaod = {
    id: user._id,
    email: user.email,
    type: TOKEN_TYPES.RESET_PASSWORD
  };
  const token = await generateToken(paylaod);
  return token;
};
