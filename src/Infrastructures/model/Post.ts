import { model, Schema, Types } from 'mongoose';

const postSchema = new Schema(
  {
    userId: {
      type: Types.ObjectId,
      ref: 'User',
      required: true,
    },
    caption: {
      type: String,
      required: true,
    },
    media: [{ type: String, required: true }],
    likes: [{ type: Types.ObjectId, ref: 'User' }],
  },
  { timestamps: true }
);

const PostModel = model('Post', postSchema);

export default PostModel;
