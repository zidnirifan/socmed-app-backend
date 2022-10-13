import { Schema, model, Types, Document, ObjectId } from 'mongoose';

export interface IUser extends Document {
  username: string;
  password: string;
  fullName: string;
  profilePhoto: string;
  bio: string;
  followers: ObjectId[];
}

const userSchema = new Schema<IUser>({
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
  },
  bio: {
    type: String,
  },
  followers: [{ type: Types.ObjectId, ref: 'User' }],
});

const User = model<IUser>('User', userSchema);

export default User;
