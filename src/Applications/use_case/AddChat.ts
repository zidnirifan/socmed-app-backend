import Chat, { IChat } from '../../Domains/chats/entities/Chat';
import { IChatRepository } from '../../Domains/chats/ChatRepository';
import { IValidator } from '../validator/Validator';

interface IDependency {
  chatRepository: IChatRepository;
  validator: IValidator<IChat>;
}

class AddChat {
  private chatRepository: IChatRepository;
  private validator: IValidator<IChat>;

  constructor(dependency: IDependency) {
    this.chatRepository = dependency.chatRepository;
    this.validator = dependency.validator;
  }

  async execute(payload: IChat) {
    this.validator.validate(payload);
    const user = new Chat(payload);
    return this.chatRepository.addChat(user);
  }
}

export default AddChat;
