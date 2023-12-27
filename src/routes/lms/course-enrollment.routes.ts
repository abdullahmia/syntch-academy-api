import express, { Router } from 'express';
import { auth } from '../../module/auth';
import {
  courseEnrollmentController,
  courseEnrollmentValidator
} from '../../module/lms/course-enrollment';
import { validate } from '../../validation';

const router: Router = express.Router();

router.post(
  '/enroll/:courseId',
  auth('accessCourse'),
  validate(courseEnrollmentValidator.enrollStudentToCourse),
  courseEnrollmentController.enrollStudentToCourse
);

export default router;

/**
 * @swagger
 * tags:
 *   name: Course Enrollment
 *   description: Course enrollment management and retrieval
 */

/**
 * @swagger
 * /courses/enroll/{courseId}:
 *   post:
 *     summary: Enroll a student to a course
 *     tags:
 *       - Course Enrollment
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: courseId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the course to enroll the student in
 *     responses:
 *       '201':
 *         description: Student successfully enrolled in the course
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Enrollment'
 *             example:
 *               studentId: '1234567890abcdef12345678'
 *               courseId: '1234567890abcdef12345678'
 *               progress: 0
 *               isCompleted: false
 *               payments: null
 *               paymentStatus: 'pending'
 *               status: 'active'
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
 */
