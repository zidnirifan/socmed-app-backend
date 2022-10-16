import { Document, model, ObjectId, Schema, Types } from 'mongoose';
import { ITypeNotif } from '../../Domains/notif/entities/Notif';

export interface INotifModel extends Document {
  userId: ObjectId;
  to: ObjectId;
  text: string;
  type: ITypeNotif;
  postId?: ObjectId;
  commentId?: ObjectId;
  isRead: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const notifSchema = new Schema<INotifModel>(
  {
    userId: { type: Types.ObjectId, ref: 'User' },
    to: { type: Types.ObjectId, ref: 'User' },
    text: { type: String },
    type: {
      type: String,
      enum: ['follow', 'like-post', 'comment', 'like-comment', 'reply-comment'],
    },
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

const NotifModel = model<INotifModel>('Notif', notifSchema);

export default NotifModel;
