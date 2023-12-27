import { ICourse } from './course.interface';
import Course from './course.model';

/**
 * Add a new course
 * @param {Course} course
 * @returns {Promise<Course>}
 */
export const addNewCourse = async (payload: Partial<ICourse>) => {
  const course = await Course.create(payload);
  return course;
};
