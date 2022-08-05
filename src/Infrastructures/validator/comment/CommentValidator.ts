import { ObjectSchema } from 'joi';
import { IComment } from '../../../Domains/comments/entities/Comment';
import Validator from '../Validator';

class CommentValidator extends Validator<IComment> {
  protected schema(): ObjectSchema<IComment> {
    const { Joi } = this;

    return Joi.object({
      userId: Joi.string().required(),
      content: Joi.string().required(),
      postId: Joi.string().required(),
      replyTo: Joi.string(),
      parentComment: Joi.string(),
    });
  }
}

export default CommentValidator;
