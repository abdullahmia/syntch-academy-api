import { courseService } from '../course';
import { IEnrollmentDoc } from './course-enrollment.interface';
import Enrollment from './course-enrollment.model';

/**
 * Enroll a student to a course
 * @param {ObjectId} courseId
 * @param {ObjectId} studentId
 * @returns {Promise<IEnrollmentDoc>}
 */
export const enrollStudentToCourse = async (
  courseId: string,
  studentId: string
): Promise<IEnrollmentDoc> => {
  const enrollment = await Enrollment.create({
    courseId: courseId,
    studentId: studentId
  });

  await courseService.enrollUserToCourse(courseId, studentId);

  return await enrollment.populate('courseId studentId');
};
