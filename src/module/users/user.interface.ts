import { Document, Model } from 'mongoose';
import { QueryResult } from '../../plugin';

export interface SocialProfile {
  linkedIn?: string;
  github?: string;
  website?: string;
}

export interface IUser {
  firstName: string;
  lastName: string;
  username: string;
  displayName: string;
  email: string;
  password: string;
  occupation?: string;
  phoneNumber?: string;
  role: string;
  status: string;
  socialProfile: SocialProfile;
  profilePicture?: {
    public_id: string;
    url: string;
  };
}

export interface IUserDoc extends IUser, Document {
  isPassowrdMatch(password: string): boolean;
}

export interface IUserModel extends Model<IUserDoc> {
  isEmailTaken(email: string): boolean;
  isUsernameTaken(username: string): boolean;
  paginate(filter: Record<string, any>, options: Record<string, any>): Promise<QueryResult>;
}

export type IUserBody = Partial<IUser>;

export type NewCreatedUser = Omit<IUser, 'role' | 'status' | 'profilePicture'>;
