import { Schema, model } from 'mongoose';
import { COURSE_STATUSES } from '../../../constants';
import { paginate, toJSON } from '../../../plugin';
import { ICourseDoc, ICourseModel } from './course.interface';

const courseSchema = new Schema<ICourseDoc, ICourseModel>(
  {
    title: {
      type: String,
      required: true
    },
    description: {
      type: String
    },
    duration: {
      type: Number
    },
    price: {
      type: Number,
      required: true
    },
    status: {
      type: String,
      enum: Object.values(COURSE_STATUSES),
      default: COURSE_STATUSES.DRAFT
    },
    category: {
      type: String,
      required: true
    },
    thumbnail: {
      public_id: {
        type: String,
        required: true
      },
      url: {
        type: String,
        required: true
      }
    },
    instructor: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    enrollments: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User'
      }
    ],
    modules: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Module'
      }
    ],
    slug: {
      type: String,
      unique: true
    }
  },
  { timestamps: true }
);

// plugin for pagination & toJSON
courseSchema.plugin(toJSON);
courseSchema.plugin(paginate);

// generate slug before creating course
courseSchema.pre('save', function (next) {
  const course = this as ICourseDoc;
  course.slug = course.title.toLowerCase().split(' ').join('-');
  next();
});

const Course = model<ICourseDoc, ICourseModel>('Course', courseSchema);
export default Course;
