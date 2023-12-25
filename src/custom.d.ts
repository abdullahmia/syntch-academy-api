import { IUserDoc } from './modules/user/user.interfaces';

declare module 'express-serve-static-core' {
  export interface Request {
    user: IUserDoc;
  }
}

declare module 'mongoose' {
  export interface Query<T> {
    cache(options?: { time: number; key?: string }): Query<T>;
    useCache: boolean;
    time: number;
    hashKey: string;
  }
  export interface CustomQuery<T> extends MongooseQuery<T> {
    cache(options?: { time: number; key?: string }): CustomQuery<T>;
    useCache: boolean;
    time: number;
    hashKey: string;
  }
}
