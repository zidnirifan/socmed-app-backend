import { Document, model, ObjectId, Schema, Types } from 'mongoose';

export interface ICommentModel extends Document {
  userId: ObjectId;
  content: string;
  postId: ObjectId;
  replyTo?: ObjectId;
  parentComment?: ObjectId;
  likes: ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}

const commentSchema = new Schema<ICommentModel>(
  {
    userId: {
      type: Types.ObjectId,
      ref: 'User',
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    postId: {
      type: Types.ObjectId,
      ref: 'Post',
      required: true,
    },
    replyTo: {
      type: Types.ObjectId,
      ref: 'Comment',
    },
    parentComment: {
      type: Types.ObjectId,
      ref: 'Comment',
    },
    likes: [{ type: Types.ObjectId, ref: 'User' }],
  },
  { timestamps: true }
);

const CommentModel = model<ICommentModel>('Comment', commentSchema);

export default CommentModel;
