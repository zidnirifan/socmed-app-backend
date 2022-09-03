import { model, Schema, Types } from 'mongoose';

const notifSchema = new Schema(
  {
    userId: { type: Types.ObjectId, ref: 'User' },
    to: { type: Types.ObjectId, ref: 'User' },
    text: { type: String },
    type: { type: String, enum: ['follow', 'like', 'comment'] },
    postId: {
      type: Types.ObjectId,
      ref: 'Post',
    },
    commentId: {
      type: Types.ObjectId,
      ref: 'Comment',
    },
    isRead: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const NotifModel = model('Notif', notifSchema);

export default NotifModel;
