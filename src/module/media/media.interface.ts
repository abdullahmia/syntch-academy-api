import { Document, Model, ObjectId } from 'mongoose';
import { QueryResult } from '../../plugin';

export interface IMedia {
  name: string;
  user: ObjectId;
  type: string;
  publicId: string;
  url: string;
  folder?: ObjectId;
}

export interface IFolder {
  name: string;
  user: ObjectId;
}

export interface IMediaDoc extends IMedia, Document {
  //
}

export interface IMediaModel extends Model<IMediaDoc> {
  paginate(filter: Record<string, any>, options: Record<string, any>): Promise<QueryResult>;
}

export interface IFolderDoc extends IFolder, Document {}
export interface IFolderModel extends Model<IFolderDoc> {
  paginate(filter: Record<string, any>, options: Record<string, any>): Promise<QueryResult>;
}

export type IMediaBody = Partial<IMedia>;
export type IFolderBody = Partial<IFolder>;
