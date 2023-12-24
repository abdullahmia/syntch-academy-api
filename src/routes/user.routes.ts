import express, { Router } from 'express';
import { auth } from '../module/auth';
import { userController, userValidation } from '../module/users';
import { validate } from '../validation';

const router: Router = express.Router();

router
  .route('/')
  .post(auth('manageUsers'), validate(userValidation.createUser), userController.createUser)
  .get(auth('getUsers'), validate(userValidation.getUsers), userController.getUsers);

router
  .route('/:userId')
  .get(auth('getUsers'), validate(userValidation.getUser), userController.getUser)
  .patch(auth('manageUsers'), validate(userValidation.updateUser), userController.updateUser);

export default router;

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User management
 */

/**
 * @swagger
 * /users:
 *   post:
 *     summary: create new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *               - firstName
 *               - lastName
 *               - username
 *               - displayName
 *               - occupation
 *               - phoneNumber
 *               - socialProfile
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: Email address (must be unique)
 *               password:
 *                 type: string
 *                 format: password
 *                 minLength: 8
 *                 description: Password (at least one number and one letter)
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               username:
 *                 type: string
 *               displayName:
 *                 type: string
 *               occupation:
 *                 type: string
 *               phoneNumber:
 *                 type: string
 *                 format: phone
 *               socialProfile:
 *                 type: object
 *                 properties:
 *                   linkedIn:
 *                     type: string
 *                     format: uri
 *                   github:
 *                     type: string
 *                     format: uri
 *                   website:
 *                     type: string
 *                     format: uri
 *             example:
 *               email: abdullahbang1971@gmail.com
 *               password: Abdullah1971$$&&@@!!!
 *               firstName: John
 *               lastName: Doe
 *               username: johndoe
 *               displayName: JohnD
 *               occupation: Software Engineer
 *               phoneNumber: 123-456-7890
 *               socialProfile:
 *                 linkedIn: https://www.linkedin.com/in/johndoe
 *                 github: https://github.com/johndoe
 *                 website: https://www.johndoe.com
 *     responses:
 *       "201":
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   $ref: '#/components/schemas/User'
 *       "400":
 *         $ref: '#/components/responses/DuplicateEmail'
 */

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get users
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *         description: Page number for pagination
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 100
 *           default: 10
 *         description: Number of items to return per page
 *     responses:
 *       "200":
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 results:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/User'
 *                   description: List of users
 *                 page:
 *                   type: integer
 *                   description: Current page number
 *                 limit:
 *                   type: integer
 *                   description: Number of items per page
 *                 totalPages:
 *                   type: integer
 *                   description: Total number of pages
 *                 totalResults:
 *                   type: integer
 *                   description: Total number of results
 *             example:
 *               results:
 *                 - socialProfile:
 *                     linkedIn: https://www.linkedin.com/in/johndoe
 *                     github: https://github.com/johndoe
 *                     website: https://www.johndoe.com
 *                   firstName: John
 *                   lastName: Doe
 *                   username: johndoe
 *                   displayName: JohnD
 *                   email: abdullahbang1971@gmail.com
 *                   phoneNumber: 123-456-7890
 *                   occupation: Software Engineer
 *                   role: admin
 *                   status: active
 *                   id: 65874d3d3c1d8f03287c807a
 *               page: 1
 *               limit: 10
 *               totalPages: 1
 *               totalResults: 1
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 */

/**
 * @swagger
 * /users/{userId}:
 *   get:
 *     summary: Get user by ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the user to retrieve
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       "200":
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 */

/**
 * @swagger
 * /users/{userId}:
 *   patch:
 *     summary: Update user by ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the user to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               socialProfile:
 *                 type: object
 *                 properties:
 *                   linkedIn:
 *                     type: string
 *                     format: uri
 *                   github:
 *                     type: string
 *                     format: uri
 *                   website:
 *                     type: string
 *                     format: uri
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               username:
 *                 type: string
 *               displayName:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *               phoneNumber:
 *                 type: string
 *                 format: phone
 *               occupation:
 *                 type: string
 *             example:
 *               socialProfile:
 *                 linkedIn: https://www.linkedin.com/in/johndoe
 *                 github: https://github.com/johndoe
 *                 website: https://www.johndoe.com
 *               firstName: Abdulalh
 *               lastName: Mia
 *               username: abdullah1971
 *               displayName: abdullah
 *               email: abdullahbang1971@gmail.com
 *               phoneNumber: 123-456-7890
 *               occupation: Software Engineer
 *     responses:
 *       "200":
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *             example:
 *               socialProfile:
 *                 linkedIn: https://www.linkedin.com/in/johndoe
 *                 github: https://github.com/johndoe
 *                 website: https://www.johndoe.com
 *               firstName: Abdulalh
 *               lastName: Mia
 *               username: abdullah1971
 *               displayName: abdullah
 *               email: abdullahbang1971@gmail.com
 *               phoneNumber: 123-456-7890
 *               occupation: Software Engineer
 *               role: admin
 *               status: active
 *               createdAt: "2023-12-23T21:12:29.254Z"
 *               updatedAt: "2023-12-24T07:21:19.414Z"
 *               id: "65874d3d3c1d8f03287c807a"
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 */

// Ensure you have the necessary Swagger components and security schemes included
