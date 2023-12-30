import bcrypt from 'bcryptjs';
import { ObjectId, Schema, model } from 'mongoose';
import { USER_ROLES, USER_STATUSES } from '../../constants';
import { paginate, toJSON } from '../../plugin';
import { IUserDoc, IUserModel } from './user.interface';

const userSchema = new Schema<IUserDoc, IUserModel>(
  {
    firstName: {
      type: String,
      required: [true, 'First name is required'],
      trim: true,
      maxlength: [50, 'First name cannot be more than 50 characters']
    },
    lastName: {
      type: String,
      required: [true, 'Last name is required'],
      trim: true,
      maxlength: [50, 'Last name cannot be more than 50 characters']
    },
    username: {
      type: String,
      trim: true,
      maxlength: [50, 'Username cannot be more than 50 characters']
    },
    displayName: {
      type: String,
      maxlength: [50, 'Display name cannot be more than 50 characters']
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      trim: true
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      trim: true
    },
    phoneNumber: {
      type: String,
      trim: true
    },
    occupation: {
      type: String
    },
    role: {
      type: String,
      enum: Object.values(USER_ROLES),
      default: USER_ROLES.USER
    },
    status: {
      type: String,
      enum: Object.values(USER_STATUSES),
      default: USER_STATUSES.INACTIVE
    },
    socialProfile: {
      linkedIn: {
        type: String,
        trim: true
      },
      github: {
        type: String,
        trim: true
      },
      website: {
        type: String,
        trim: true
      }
    },
    profilePicture: {
      public_id: {
        type: String,
        trim: true
      },
      url: {
        type: String,
        trim: true
      }
    }
  },
  { timestamps: true }
);

// add plugins to converts mongoose to json & pagination
userSchema.plugin(toJSON);
userSchema.plugin(paginate);

/**
 * Check if email is taken
 * @param {string} email - The user's email
 * @param {ObjectId} [excludeUserId] - The id of the user to be excluded
 * @returns {Promise<boolean>}
 */
userSchema.static(
  'isEmailTaken',
  async function (email: string, excludeUserId?: ObjectId): Promise<boolean> {
    const user = await this.findOne({ email, _id: { $ne: excludeUserId } });
    return !!user;
  }
);

/**
 * Check if username is taken
 * @param {string} username - The user's username
 * @param {ObjectId} [excludeUserId] - The id of the user to be excluded
 * @returns {Promise<boolean>}
 */
userSchema.static(
  'isUsernameTaken',
  async function (username: string, excludeUserId?: string): Promise<boolean> {
    const user = await this.findOne({ username, _id: { $ne: excludeUserId } });
    return !!user;
  }
);

/**
 * Check if password matches the user's password
 * @param {string} password - The user's password
 * @returns {Promise<boolean>}
 */
userSchema.method('isPasswordMatch', async function (password: string): Promise<boolean> {
  const user = this as IUserDoc;
  let isMatch = await bcrypt.compare(password, user.password);
  return isMatch;
});

/**
 * Hashes the user password
 * @param {string} password - The user's password
 * @returns {Promise<string>}
 */
userSchema.pre('save', async function (next) {
  const user = this as IUserDoc;
  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});

const User = model<IUserDoc, IUserModel>('User', userSchema);

export default User;
