import { Schema, Types, model } from 'mongoose';
import { paginate, toJSON } from '../../plugin';
import { IFolderDoc, IFolderModel, IMediaDoc, IMediaModel } from './media.interface';

const mediaSchema = new Schema<IMediaDoc, IMediaModel>(
  {
    name: {
      type: String
    },
    user: {
      type: Types.ObjectId,
      ref: 'User'
    },
    type: {
      type: String
    },
    publicId: {
      type: String
    },
    url: {
      type: String
    },
    folder: {
      type: Schema.Types.ObjectId,
      ref: 'Folder'
    }
  },
  {
    timestamps: true
  }
);

const folderSchema = new Schema<IFolderDoc, IFolderModel>(
  {
    user: {
      type: Types.ObjectId,
      ref: 'User'
    },
    name: {
      type: String
    }
  },
  { timestamps: true }
);

// add plugin that converts mongoose to json
folderSchema.plugin(toJSON);
folderSchema.plugin(paginate);
mediaSchema.plugin(toJSON);
mediaSchema.plugin(paginate);

const Media = model<IMediaDoc, IMediaModel>('Media', mediaSchema);
const Folder = model<IFolderDoc, IFolderModel>('Folder', folderSchema);

export { Folder, Media };
