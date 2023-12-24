import httpStatus from 'http-status';
import mongoose from 'mongoose';
import { MEDIA_PATHS } from '../../constants';
import { deleteMedia, updateMedia } from '../../lib';
import { IOptions, QueryResult } from '../../plugin';
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

/**
 * Query for users
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @returns {Promise<QueryResult>}
 */
export const queryUsers = async (
  filter: Record<string, any>,
  options: IOptions
): Promise<QueryResult> => {
  const users = await User.paginate(filter, options);
  return users;
};

/**
 * Delete user by id
 * @param {mongoose.Types.ObjectId} userId
 * @returns {Promise<IUserDoc | null>}
 * @throws {Error}
 * @throws {ApiError}
 */
export const deleteUserById = async (userId: string): Promise<IUserDoc | null> => {
  const user = await getUserById(userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  await User.findOneAndDelete({ _id: userId });
  return user;
};

/**
 * Upload profile picture using cloudinary
 * @param {mongoose.Types.ObjectId} userId
 * @param {string} pictureUrl
 * @returns {Promise<IUserDoc | null>}
 */
export const updateProfilePicture = async (userId: string, file: any) => {
  const user = await getUserById(userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }

  if (!file) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Please upload a file');
  }

  if (file.size > 2 * 1024 * 1024) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Please upload an image less than 2MB');
  }

  // upload image to cloudinary
  const uploadedImage: any = await updateMedia(
    file.path,
    MEDIA_PATHS.PROFILE_PICTURES,
    user.profilePicture?.public_id
  );
  if (uploadedImage?.public_id && uploadedImage?.url) {
    const user = await User.findOneAndUpdate(
      { _id: userId },
      {
        profilePicture: {
          public_id: uploadedImage.public_id,
          url: uploadedImage.url
        }
      },
      { new: true }
    );
    return user;
  }
};

/**
 * Delete profile picture using cloudinary
 * @param {mongoose.Types.ObjectId} userId
 * @returns {Promise<IUserDoc | null>}
 * @throws {Error}
 */
export const deleteProfilePicture = async (userId: string): Promise<IUserDoc | null> => {
  const user = await getUserById(userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }

  if (user.profilePicture?.public_id) {
    // delete image from cloudinary
    const deletedImage = await deleteMedia(user.profilePicture.public_id);
    console.log(deletedImage);
    const updatedUser = await User.findOneAndUpdate(
      { _id: userId },
      { profilePicture: null },
      { new: true }
    );
    return updatedUser;
  } else {
    throw new ApiError(httpStatus.BAD_REQUEST, 'User does not have a profile picture');
  }
};
