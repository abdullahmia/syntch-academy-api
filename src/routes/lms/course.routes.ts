import express, { Router } from 'express';
import { auth } from '../../module/auth';
import { courseController, courseMiddleware, couseValidator } from '../../module/lms/course';
import { validate } from '../../validation';

const router: Router = express.Router();

router
  .route('/')
  .post(auth('manageCourses'), validate(couseValidator.addCourse), courseController.addCourse)
  .get(courseController.getAllCourses);

router.get('/:slug', courseController.getCourseBySlug);

router.get('/my-courses', auth('manageCourses'), courseController.getCoursesByUserId);

router
  .route('/:courseId')
  .patch(
    [auth('manageCourses'), courseMiddleware.isCourseOwner, validate(couseValidator.updateCourse)],
    courseController.updateCourse
  )
  .delete(
    [auth('manageCourses'), courseMiddleware.isCourseOwner],
    courseController.deleteCourseById
  );

export default router;

/**
 * @swagger
 * tags:
 *   name: Courses
 *   description: Course management and retrieval
 */

/**
 * @swagger
 * /courses:
 *   post:
 *     summary: Add a new course
 *     tags:
 *       - Courses
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: Title of the course
 *               description:
 *                 type: string
 *                 description: Description of the course
 *               price:
 *                 type: number
 *                 description: Price of the course
 *               status:
 *                 type: string
 *                 description: Status of the course
 *               category:
 *                 type: string
 *                 description: Category of the course
 *               thumbnail:
 *                 type: object
 *                 properties:
 *                   public_id:
 *                     type: string
 *                     description: Public ID of the thumbnail image
 *                   url:
 *                     type: string
 *                     description: URL of the thumbnail image
 *               instructor:
 *                 type: string
 *                 description: ID of the instructor
 *             required:
 *               - title
 *               - description
 *               - price
 *               - status
 *               - category
 *               - thumbnail
 *               - instructor
 *           example:
 *             title: "Mastering JavaScript With Tailwindcss"
 *             description: "Learn the fundamentals of JavaScript and become a proficient developer."
 *             price: 99
 *             status: "published"
 *             category: "Web Development"
 *             thumbnail:
 *               public_id: "sample_image_id"
 *               url: "https://example.com/images/course-thumbnail.jpg"
 *             instructor: "658bd563da22b24cdc0b2f3e"
 *     responses:
 *       '201':
 *         description: Course successfully added
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 course:
 *                   $ref: '#/components/schemas/Course'
 *       '400':
 *         $ref: '#/components/responses/BadRequest'
 *       '401':
 *         $ref: '#/components/responses/Unauthorized'
 *       '403':
 *         $ref: '#/components/responses/Forbidden'
 *       '500':
 *         $ref: '#/components/responses/InternalError'
 */

/**
 * @swagger
 * /courses:
 *   get:
 *     summary: Get all courses
 *     tags:
 *       - Courses
 *     responses:
 *       '200':
 *         description: Successfully retrieved courses
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Course'
 *       '401':
 *         $ref: '#/components/responses/Unauthorized'
 *       '403':
 *         $ref: '#/components/responses/Forbidden'
 *       '500':
 *         $ref: '#/components/responses/InternalError'
 */

/**
 * @swagger
 * /courses/{slug}:
 *   get:
 *     summary: Get a single course by slug
 *     tags:
 *       - Courses
 *     parameters:
 *       - in: path
 *         name: slug
 *         required: true
 *         schema:
 *           type: string
 *         description: The slug of the course
 *     responses:
 *       '200':
 *         description: Successfully retrieved the course
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Course'
 *       '404':
 *         $ref: '#/components/responses/NotFound'
 *       '500':
 *         $ref: '#/components/responses/InternalError'
 */

/**
 * @swagger
 * /courses/my-courses:
 *   get:
 *     summary: Get courses by user ID
 *     tags:
 *       - Courses
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Successfully retrieved the user's courses
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Course'
 *       '401':
 *         $ref: '#/components/responses/Unauthorized'
 *       '403':
 *         $ref: '#/components/responses/Forbidden'
 *       '500':
 *         $ref: '#/components/responses/InternalError'
 */

/**
 * @swagger
 * /courses/{courseId}:
 *   patch:
 *     summary: Update a course by ID
 *     tags:
 *       - Courses
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: courseId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the course to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CourseUpdate'
 *     responses:
 *       '200':
 *         description: Course successfully updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Course'
 *       '400':
 *         $ref: '#/components/responses/BadRequest'
 *       '401':
 *         $ref: '#/components/responses/Unauthorized'
 *       '403':
 *         $ref: '#/components/responses/Forbidden'
 *       '404':
 *         $ref: '#/components/responses/NotFound'
 *       '500':
 *         $ref: '#/components/responses/InternalError'
 *   delete:
 *     summary: Delete a course by ID
 *     tags:
 *       - Courses
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: courseId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the course to delete
 *     responses:
 *       '200':
 *         description: Course successfully deleted
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Course'
 *       '401':
 *         $ref: '#/components/responses/Unauthorized'
 *       '403':
 *         $ref: '#/components/responses/Forbidden'
 *       '404':
 *         $ref: '#/components/responses/NotFound'
 *       '500':
 *         $ref: '#/components/responses/InternalError'
 */
