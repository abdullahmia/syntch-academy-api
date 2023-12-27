import { Schema, model } from 'mongoose';
import { ENROLLMENT_STATUSES, PAYMENT_STATUSES } from '../../../constants';
import { paginate, toJSON } from '../../../plugin';
import { IEnrollmentDoc, IEnrollmentModel } from './course-enrollment.interface';

const enrollmentsSchema = new Schema<IEnrollmentDoc, IEnrollmentModel>(
  {
    studentId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    courseId: {
      type: Schema.Types.ObjectId,
      ref: 'Course',
      required: true
    },
    progress: {
      type: Number,
      default: 0
    },
    isCompleted: {
      type: Boolean,
      default: false
    },
    payments: {
      type: Schema.Types.Mixed,
      default: {}
    },
    paymentStatus: {
      type: String,
      enum: Object.values(PAYMENT_STATUSES),
      default: PAYMENT_STATUSES.PENDING
    },
    status: {
      type: String,
      enum: Object.values(ENROLLMENT_STATUSES),
      default: ENROLLMENT_STATUSES.PENDING
    }
  },
  { timestamps: true }
);

// plugins
enrollmentsSchema.plugin(toJSON);
enrollmentsSchema.plugin(paginate);

const Enrollment = model<IEnrollmentDoc, IEnrollmentModel>('Enrollment', enrollmentsSchema);

export default Enrollment;
