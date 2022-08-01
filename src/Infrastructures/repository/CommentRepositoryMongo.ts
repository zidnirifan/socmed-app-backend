import { Types } from 'mongoose';
import NotFoundError from '../../Commons/exceptions/NotFoundError';
import CommentRepository from '../../Domains/comments/CommentRepository';
import { IComment } from '../../Domains/comments/entities/Comment';
import CommentModel from '../model/Comment';

class CommentRepositoryMongo extends CommentRepository {
  private Model;

  constructor() {
    super();
    this.Model = CommentModel;
  }

  async addComment(payload: IComment): Promise<string> {
    const comment = new this.Model(payload);
    const { _id } = await comment.save();
    return _id.toString();
  }

  async isCommentExist(id: string): Promise<void> {
    const isValid = Types.ObjectId.isValid(id);
    if (!isValid) {
      throw new NotFoundError('comment not found');
    }

    const isExist = await this.Model.countDocuments({ _id: id });
    if (!isExist) {
      throw new NotFoundError('comment not found');
    }
  }
}

export default CommentRepositoryMongo;
