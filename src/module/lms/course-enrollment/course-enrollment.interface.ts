import { Document, Model, Types } from 'mongoose';
import { QueryResult } from '../../../plugin';

export interface IEnrollment {
  studentId: Types.ObjectId;
  courseId: Types.ObjectId;
  progress: number;
  isCompleted: boolean;
  payments: any;
  paymentStatus: string;
  status: string;
}

export interface IEnrollmentDoc extends IEnrollment, Document {}

export interface IEnrollmentModel extends Model<IEnrollmentDoc> {
  paginate(filter: Record<string, any>, options: Record<string, any>): Promise<QueryResult>;
}

export type UpdateEnrollmentBody = Partial<IEnrollment>;
export type IEnrollmentBody = Partial<IEnrollment>;
