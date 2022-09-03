import { ObjectSchema } from 'joi';
import { IChat } from '../../../Domains/chats/entities/Chat';
import Validator from '../Validator';

class ChatValidator extends Validator<IChat> {
  protected schema(): ObjectSchema<IChat> {
    const { Joi } = this;

    return Joi.object({
      from: Joi.string().required(),
      to: Joi.string().required(),
      chat: Joi.string().required(),
    });
  }
}

export default ChatValidator;
