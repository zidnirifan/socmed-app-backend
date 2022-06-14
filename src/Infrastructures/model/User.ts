import { Schema, model } from 'mongoose';

const userSchema: Schema = new Schema({
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
});

const User = model('User', userSchema);

export type IUserModel = typeof User;

export default User;
