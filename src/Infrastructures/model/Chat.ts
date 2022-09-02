import { model, Schema, Types } from 'mongoose';

const chatSchema = new Schema(
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

const ChatModel = model('Chat', chatSchema);

export default ChatModel;
