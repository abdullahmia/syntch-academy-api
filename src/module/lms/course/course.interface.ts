import { Document, Model, Types } from 'mongoose';
import { QueryResult } from '../../../plugin';

export interface ICourse {
  title: string;
  description: string;
  duration: number;
  price: number;
  status: string;
  category: string;
  thumbnail: {
    public_id: string;
    url: string;
  };
  instructor: Types.ObjectId;
  enrollments: Types.ObjectId[];
  modules: Types.ObjectId[];
  slug: string;
}

export interface ICourseDoc extends ICourse, Document {}

export interface ICourseModel extends Model<ICourseDoc> {
  paginate(filter: Record<string, any>, options: Record<string, any>): Promise<QueryResult>;
}
export type UpdateCourseBody = Partial<ICourse>;
export type ICourseBody = Partial<ICourse>;
