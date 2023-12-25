import { MEDIA_PATHS } from '../../constants';
import { deleteMedia, uploadMedia } from '../../lib';
import { getCachedData, setCachedData } from '../../services';
import { IFolderDoc, IMediaDoc } from './media.interface';
import { Folder, Media } from './media.model';

/**
 * GET THE CACHE KEY FOR FOLDER & MEDIA
 */
export const getFolderKeyByUser = (userId: string) => `user:${userId}:folder`;
export const getMediaKeyByUser = (userId: string) => `user:${userId}:media`;
export const getFolderAndMediaKeyByUser = (userId: string) => `user:${userId}:folder:media`;
export const getMediaByFolderAndUserKey = (userId: string, folderId: string) =>
  `user:${userId}:folder:${folderId}:media`;

/**
 * add a new folder
 * @param {IFolderBody} body
 * @returns {Promise<IFolderDoc>}
 */
export const createFolder = async (userId: string, name: string): Promise<IFolderDoc> => {
  const folder = await Folder.create({ user: userId, name });
  const getFolderCache = await getCachedData(getFolderKeyByUser(userId));
  if (getFolderCache) {
    const newCachedData = [...getFolderCache, folder];
    await setCachedData(getFolderKeyByUser(userId), newCachedData);
  } else {
    await setCachedData(getFolderKeyByUser(userId), [folder]);
  }

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
  const getFolderCache = await getCachedData(getFolderKeyByUser(userId));
  if (getFolderCache) {
    const newCachedData = getFolderCache.map((item: any) => {
      if (item._id === id) {
        return { ...item, name };
      }
      return item;
    });
    await setCachedData(getFolderKeyByUser(userId), newCachedData);
  }
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
      folder: folderId ? folderId : undefined,
      name: file.originalname,
      publicId: uploadedFile.public_id,
      url: uploadedFile.secure_url
    });
    // add this media to redis by user id & also folder id if exists
    const getMediaByUserCache = await getCachedData(getMediaKeyByUser(userId));
    if (getMediaByUserCache) {
      const newCachedData = [...getMediaByUserCache, newMedia];
      await setCachedData(getMediaKeyByUser(userId), newCachedData);
    } else {
      await setCachedData(getMediaKeyByUser(userId), [newMedia]);
    }

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
  const getMediaByUser = await getCachedData(getMediaKeyByUser(userId));
  const getFolderByUser = await getCachedData(getFolderKeyByUser(userId));

  if (getMediaByUser && getFolderByUser) {
    return { folders: getFolderByUser, media: getMediaByUser };
  } else {
    const folders = await Folder.find({ user: userId });
    const medias = await Media.find({ user: userId, folder: { $exists: false } });
    const data = { folders, media: medias };
    await setCachedData(getFolderAndMediaKeyByUser(userId), data);
    return data;
  }
};

/**
 * Get media by folder id & user id
 * @param {string} folderId
 * @param {string} userId
 * @returns {Promise<IMediaDoc[]>}
 * @throws {Error}
 */
export const getMediaByFolderAndUser = async (folderId: string, userId: string) => {
  const getMediaCacheData = await getCachedData(getMediaByFolderAndUserKey(userId, folderId));
  if (getMediaCacheData) {
    return getMediaCacheData;
  } else {
    const medias = await Media.find({ folder: folderId, user: userId }).populate('folder', 'name');
    await setCachedData(getMediaByFolderAndUserKey(userId, folderId), medias);
    return medias;
  }
};

/**
 * Delete a media by id
 * @param {string} id
 * @returns {Promise<IMediaDoc | null>}
 * @throws {Error}
 */
export const deleteMediaById = async (id: string, userId: string): Promise<IMediaDoc | null> => {
  const media = await Media.findOneAndDelete({ _id: id, user: userId });
  if (media) {
    await deleteMedia(media.publicId);
    const getMediaCacheData = await getCachedData(getMediaKeyByUser(userId));
    if (getMediaCacheData) {
      const newCachedData = getMediaCacheData.filter((item: any) => item._id !== id);
      await setCachedData(getMediaKeyByUser(userId), newCachedData);
    }
    return media;
  } else {
    throw new Error('Media not found');
  }
};
