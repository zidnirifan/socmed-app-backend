import { model, Schema } from 'mongoose';

const authSchema = new Schema({
  refreshToken: {
    type: String,
    required: true,
  },
});

const AuthModel = model('Auth', authSchema);

export default AuthModel;
