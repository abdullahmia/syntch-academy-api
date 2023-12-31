import { ICourse } from './course.interface';
import Course from './course.model';

/**
 * Add a new course
 * @param {ICourse} course
 * @returns {Promise<ICourse>}
 */
export const addNewCourse = async (payload: Partial<ICourse>): Promise<ICourse> => {
  const course = await Course.create(payload);
  return course;
};

/**
 * Get All courses
 * @returns {Promise<Course[]>}
 */
export const getAllCourses = async (): Promise<ICourse[]> => {
  const courses = await Course.find({}).populate('instructor enrollments');

  return courses;
};

/**
 * Get course by user id
 * @param {string} userId
 * @returns {Promise<Course[]>}
 */
export const getCoursesByUserId = async (userId: string): Promise<ICourse[]> => {
  const courses = await Course.find({ instructor: userId })
    .populate('instructor')
    .populate({
      path: 'enrollments',
      populate: {
        path: 'user'
      }
    })
    .populate({
      path: 'modules',
      populate: {
        path: 'lessons'
      }
    });
  return courses;
};

/**
 * Get Course by slug
 * @param {string} slug
 * @returns {Promise<ICourse>}
 */
export const getCourseBySlug = async (slug: string): Promise<ICourse | null> => {
  const course = await Course.findOne({ slug })
    .populate('instructor')
    .populate({
      path: 'modules',
      populate: {
        path: 'lessons'
      }
    })
    .populate({
      path: 'enrollments',
      populate: {
        path: 'user'
      }
    });

  if (!course) {
    return null;
  }
  return course;
};

/**
 * Update Course by id
 * @param {string} id
 * @param {ICourse} course
 * @returns {Promise<ICourse>}
 */
export const updateCourseById = async (
  id: string,
  payload: Partial<ICourse>
): Promise<ICourse | null> => {
  const course = await getCourseById(id);
  if (!course) {
    return null;
  }

  const updatedCourse = await Course.findOneAndUpdate(
    {
      _id: id
    },
    {
      $set: payload
    },
    {
      new: true
    }
  ).populate('instructor');

  return updatedCourse;
};

/**
 * Get Course by id
 * @param {string} id
 * @returns {Promise<ICourse>}
 */
export const getCourseById = async (id: string) => {
  const course = await Course.findOne({ _id: id }).populate('instructor');
  if (!course) {
    return null;
  }
  return course;
};

/**
 * Delete course by id
 * @param {string} id
 * @returns {Promise<ICourse>}
 */
export const deleteCourseById = async (id: string): Promise<ICourse | null> => {
  const course = await getCourseById(id);
  if (!course) {
    return null;
  }
  await Course.findOneAndDelete({ _id: id });
  return course;
};

/**
 * Enroll user to course
 * @param {string} courseId
 * @param {string} studentId
 * @returns {Promise<ICourse>}
 */
export const enrollUserToCourse = async (courseId: string, studentId: string) => {
  const course = await getCourseById(courseId);
  if (!course) {
    return null;
  }
  const updatedCourse = await Course.findOneAndUpdate(
    { _id: courseId },
    { $addToSet: { enrollments: studentId } },
    { new: true }
  );
  return updatedCourse;
};

/**
 * Add module to course
 * @param {string} courseId
 * @param {string} moduleId
 * @returns {Promise<ICourse>}
 */
export const addModuleToCourse = async (courseId: string, moduleId: string) => {
  const course = await getCourseById(courseId);
  if (!course) {
    return null;
  }
  const updatedCourse = await Course.findOneAndUpdate(
    { _id: courseId },
    { $addToSet: { modules: moduleId } },
    { new: true }
  ).populate('instructor');
  return updatedCourse;
};
