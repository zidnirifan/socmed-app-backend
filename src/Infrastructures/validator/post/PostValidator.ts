import { ObjectSchema } from 'joi';
import { IPost } from '../../../Domains/posts/entities/Post';
import Validator from '../Validator';

class PostValidator extends Validator<IPost> {
  protected schema(): ObjectSchema<IPost> {
    const { Joi } = this;

    return Joi.object({
      userId: Joi.string().required(),
      caption: Joi.string().allow(''),
      media: Joi.array()
        .items(
          Joi.object({
            path: Joi.string().required(),
            fileName: Joi.string().required(),
            fileType: Joi.string()
              .valid('image/jpeg', 'image/png', 'image/webp', 'image/gif')
              .required(),
          }).required()
        )
        .required(),
    });
  }
}

export default PostValidator;
