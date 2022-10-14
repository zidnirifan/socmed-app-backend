import { Document, model, Schema } from 'mongoose';

export interface IAuthModel extends Document {
  refreshToken: string;
}

const authSchema = new Schema<IAuthModel>({
  refreshToken: {
    type: String,
    required: true,
  },
});

const AuthModel = model<IAuthModel>('Auth', authSchema);

export default AuthModel;
