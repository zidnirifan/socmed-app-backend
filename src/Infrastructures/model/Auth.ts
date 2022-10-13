import { Document, model, Schema } from 'mongoose';

export interface Auth extends Document {
  refreshToken: string;
}

const authSchema = new Schema<Auth>({
  refreshToken: {
    type: String,
    required: true,
  },
});

const AuthModel = model<Auth>('Auth', authSchema);

export default AuthModel;
