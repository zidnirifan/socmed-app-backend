import { Document, model, ObjectId, Schema, Types } from 'mongoose';

export interface IChatModel extends Document {
  from: ObjectId;
  to: ObjectId;
  chat: string;
  isRead: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const chatSchema = new Schema<IChatModel>(
  {
    from: { type: Types.ObjectId, ref: 'User' },
    to: { type: Types.ObjectId, ref: 'User' },
    chat: {
      type: String,
      required: true,
    },
    isRead: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const ChatModel = model<IChatModel>('Chat', chatSchema);

export default ChatModel;
