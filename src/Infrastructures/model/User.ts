import { Schema, model } from 'mongoose';

const userSchema = new Schema({
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

export default User;
