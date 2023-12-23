import { IUserDoc, NewCreatedUser } from './user.interface';
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
