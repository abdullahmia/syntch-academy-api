import express, { Router } from 'express';
import { fileUploader } from '../lib';
import { validate } from '../middlewares';
import { auth } from '../module/auth';
import { mediaController, mediaValidation } from '../module/media';

const router: Router = express.Router();

// Folder
router
  .route('/folder')
  .post(auth('manageMedia'), validate(mediaValidation.createFolder), mediaController.createFolder);

router
  .route('/folder/:id')
  .patch(auth('manageMedia'), validate(mediaValidation.renameFolder), mediaController.renameFolder);

// Media
router
  .route('/media')
  .post(auth('manageMedia'), fileUploader.single('file'), mediaController.addMedia);
router.delete(
  '/media/:mediaId',
  auth('manageMedia'),
  validate(mediaValidation.deleteMediaById),
  mediaController.deleteMediaById
);

router.route('/').get(auth('manageMedia'), mediaController.getMediaByUserId);
router.get(
  '/:folderId',
  auth('manageMedia'),
  validate(mediaValidation.getMediaByFolderAndFolder),
  mediaController.getMediaByFolderAndFolder
);

export default router;

/**
 * @swagger
 * tags:
 *   name: Media
 *   description: Media management and retrieval APIs
 */
/**
 * @swagger
 * /folder:
 *   post:
 *     summary: Create a folder
 *     tags: [Media]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *             example:
 *               name: documents
 *     responses:
 *       "201":
 *         description: Folder successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Folder'
 *             example:
 *               user: 65874d3d3c1d8f03287c807a
 *               name: documents
 *               createdAt: "2023-12-24T13:26:23.140Z"
 *               updatedAt: "2023-12-24T13:26:23.140Z"
 *               id: "6588317fdd492f256af4ee3a"
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 */
/**
 * @swagger
 * /folder/{id}:
 *   patch:
 *     summary: Rename a folder
 *     tags: [Media]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the folder to be renamed
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *             example:
 *               name: "new_name"
 *     responses:
 *       "200":
 *         description: Folder successfully renamed
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Folder'
 *             example:
 *               user: "65874d3d3c1d8f03287c807a"
 *               name: "new_name"
 *               createdAt: "2023-12-24T13:26:23.140Z"
 *               updatedAt: "2023-12-24T13:43:01.258Z"
 *               id: "6588317fdd492f256af4ee3a"
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 */

/**
 * @swagger
 * /media:
 *   post:
 *     summary: Upload media file
 *     tags: [Media]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *               folderId:
 *                 type: string
 *             required:
 *               - file
 *               - folderId
 *     responses:
 *       "201":
 *         description: Media file successfully uploaded
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 name:
 *                   type: string
 *                 user:
 *                   type: string
 *                 publicId:
 *                   type: string
 *                 url:
 *                   type: string
 *                 folder:
 *                   type: object
 *                   properties:
 *                     name:
 *                       type: string
 *                     id:
 *                       type: string
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                 updatedAt:
 *                   type: string
 *                   format: date-time
 *                 id:
 *                   type: string
 *             example:
 *               name: "LMS Functional and Non-Functional Requirements.docx"
 *               user: "65874d3d3c1d8f03287c807a"
 *               publicId: "documents/fejogslm4bbmx9t2rp5l"
 *               url: "https://res.cloudinary.com/abdullah1971/raw/upload/v1703432423/documents/fejogslm4bbmx9t2rp5l"
 *               folder:
 *                 name: "photos"
 *                 id: "65882f811acbe8efd8056499"
 *               createdAt: "2023-12-24T15:40:24.126Z"
 *               updatedAt: "2023-12-24T15:40:24.126Z"
 *               id: "658850e882536032eaf555e1"
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 */

/**
 * @swagger
 * /media/{mediaId}:
 *   delete:
 *     summary: Delete media by ID
 *     tags: [Media]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: mediaId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the media to delete
 *     responses:
 *       "200":
 *         description: Media successfully deleted
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Folder'
 *             example:
 *               name: "LMS Functional and Non-Functional Requirements.docx"
 *               user: "65874d3d3c1d8f03287c807a"
 *               publicId: "documents/fejogslm4bbmx9t2rp5l"
 *               url: "https://res.cloudinary.com/abdullah1971/raw/upload/v1703432423/documents/fejogslm4bbmx9t2rp5l"
 *               folder:
 *                 name: "photos"
 *                 id: "65882f811acbe8efd8056499"
 *               createdAt: "2023-12-24T15:40:24.126Z"
 *               updatedAt: "2023-12-24T15:40:24.126Z"
 *               id: "658850e882536032eaf555e1"
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *
 * /media:
 *   get:
 *     summary: Get all media for the user
 *     tags: [Media]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       "200":
 *         description: Media and folders successfully retrieved
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 folders:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Folder'
 *                 media:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Media'
 *             example:
 *               folders:
 *                 - name: "photos"
 *                   user: "65874d3d3c1d8f03287c807a"
 *                   createdAt: "2023-12-24T13:17:53.397Z"
 *                   updatedAt: "2023-12-24T13:17:53.397Z"
 *                   id: "65882f811acbe8efd8056499"
 *                 - user: "65874d3d3c1d8f03287c807a"
 *                   name: "documents hi"
 *                   createdAt: "2023-12-24T13:26:23.140Z"
 *                   updatedAt: "2023-12-24T13:43:01.258Z"
 *                   id: "6588317fdd492f256af4ee3a"
 *               media: []
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 */
