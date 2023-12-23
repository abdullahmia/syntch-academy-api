import httpStatus from 'http-status';
import mongoose from 'mongoose';
import { ApiError } from '../../utils';
import { IUserDoc, NewCreatedUser, UpdateUserBody } from './user.interface';
import User from './user.model';

/**
 * Create a user
 * @param {NewCreatedUser} userBody
 * @returns {Promise<IUserDoc>}
 */
export const createUser = async (userBody: NewCreatedUser): Promise<IUserDoc> => {
  if (await User.isEmailTaken(userBody.email)) {
    throw new Error('Email already taken');
  }
  if (await User.isUsernameTaken(userBody.username)) {
    throw new Error('Username already taken');
  }

  return User.create(userBody);
};

/**
 * Get user by email
 * @param {string} email
 * @returns {Promise<IUserDoc>}
 */
export const getUserByEmail = async (email: string): Promise<IUserDoc | null> => {
  return User.findOne({ email });
};

/**
 * Get user by id
 * @param {string} id
 * @returns {Promise<IUserDoc>}
 */
export const getUserById = async (id: string): Promise<IUserDoc | null> => {
  return User.findById(id);
};

/**
 * Update user by id
 * @param {mongoose.Types.ObjectId} userId
 * @param {UpdateUserBody} updateBody
 * @returns {Promise<IUserDoc | null>}
 */
export const updateUserById = async (
  userId: string,
  updateBody: UpdateUserBody
): Promise<IUserDoc | null> => {
  const user = await getUserById(userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  if (updateBody.email && (await User.isEmailTaken(updateBody.email))) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
  }
  Object.assign(user, updateBody);
  await user.save();
  return user;
};
