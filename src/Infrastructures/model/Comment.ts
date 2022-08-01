import { model, Schema, Types } from 'mongoose';

const commentSchema = new Schema(
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
  },
  { timestamps: true }
);

const CommentModel = model('Comment', commentSchema);

export default CommentModel;
