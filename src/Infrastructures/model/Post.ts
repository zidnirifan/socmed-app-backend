import { Document, model, ObjectId, Schema, Types } from 'mongoose';

interface IPostModel extends Document {
  userId: ObjectId;
  caption: string;
  media: string[];
  likes: ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}

const postSchema = new Schema<IPostModel>(
  {
    userId: {
      type: Types.ObjectId,
      ref: 'User',
      required: true,
    },
    caption: {
      type: String,
    },
    media: [{ type: String, required: true }],
    likes: [{ type: Types.ObjectId, ref: 'User' }],
  },
  { timestamps: true }
);

const PostModel = model<IPostModel>('Post', postSchema);

export default PostModel;
