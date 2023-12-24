import { MEDIA_PATHS } from '../../constants';
import { deleteMedia, uploadMedia } from '../../lib';
import { IFolderDoc, IMediaDoc } from './media.interface';
import { Folder, Media } from './media.model';

/**
 * add a new folder
 * @param {IFolderBody} body
 * @returns {Promise<IFolderDoc>}
 */
export const createFolder = async (userId: string, name: string): Promise<IFolderDoc> => {
  const folder = await Folder.create({ user: userId, name });
  return folder;
};

/**
 * Rename a folder
 * @param {string} id
 * @param {string} name
 * @returns {Promise<IFolderDoc>}
 */
export const renameFolder = async (
  id: string,
  name: string,
  userId: string
): Promise<IFolderDoc | null> => {
  const folder = await Folder.findOneAndUpdate({ _id: id, user: userId }, { name }, { new: true });
  return folder;
};

/**
 * Add a media to a folder
 * @param {string} id
 *
 */
export const addMedia = async (userId: string, file: any, folderId = ''): Promise<IMediaDoc> => {
  let fileType = '';
  if (file.mimetype.includes('image')) fileType = MEDIA_PATHS.IMAGES;
  else if (file.mimetype.includes('video')) fileType = MEDIA_PATHS.VIDEOS;
  else fileType = MEDIA_PATHS.DOCUMENTS;

  // upload file to cloudinary
  const uploadedFile = await uploadMedia(file.path, fileType);
  if (uploadedFile.public_id) {
    const newMedia = await Media.create({
      user: userId,
      folder: folderId,
      name: file.originalname,
      publicId: uploadedFile.public_id,
      url: uploadedFile.secure_url
    });
    return await newMedia.populate('folder', 'name');
  } else {
    throw new Error('Error uploading file');
  }
};

/**
 * Get medias by user id
 * @param {string} userId
 * @returns {Promise<IMediaDoc[]>}
 * @throws {Error}
 * @throws {ApiError}
 */
export const getMediaFolderByUserId = async (userId: string) => {
  const folders = await Folder.find({ user: userId });
  const medias = await Media.find({ user: userId, folder: { $exists: false } });

  return { folders, media: medias };
};

/**
 * Get media by folder id & user id
 * @param {string} folderId
 * @param {string} userId
 * @returns {Promise<IMediaDoc[]>}
 * @throws {Error}
 */
export const getMediaByFolderAndUser = async (folderId: string, userId: string) => {
  const medias = await Media.find({ folder: folderId, user: userId }).populate('folder', 'name');
  console.log(medias);
  return medias;
};

/**
 * Delete a media by id
 * @param {string} id
 * @returns {Promise<IMediaDoc | null>}
 * @throws {Error}
 */
export const deleteMediaById = async (id: string, userId: string): Promise<IMediaDoc | null> => {
  const media = await Media.findOne({ _id: id, user: userId });
  await Media.findOneAndDelete({ _id: id, user: userId });
  if (media?.publicId) {
    await deleteMedia(media.publicId);
  }
  return media;
};
