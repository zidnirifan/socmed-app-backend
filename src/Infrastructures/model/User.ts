import { Schema, model, Types, Document, ObjectId } from 'mongoose';

export interface IUserModel extends Document {
  username: string;
  password: string;
  fullName: string;
  profilePhoto: string;
  bio: string;
  followers: ObjectId[];
}

const userSchema = new Schema<IUserModel>({
  username: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50,
  },
  password: {
    type: String,
    required: true,
  },
  fullName: {
    type: String,
    required: true,
  },
  profilePhoto: {
    type: String,
    default: '',
  },
  bio: {
    type: String,
    default: '',
  },
  followers: [{ type: Types.ObjectId, ref: 'User' }],
});

const User = model<IUserModel>('User', userSchema);

export default User;
