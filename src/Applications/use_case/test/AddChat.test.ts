import Chat from '../../../Domains/chats/entities/Chat';
import MockChatRepository from '../../../Domains/chats/test/ChatRepositoryTestHelper';
import MockValidator from '../../validator/test/ValidatorTestHelper';
import AddChat from '../AddChat';

describe('AddChat use case', () => {
  it('should orchestrating the add chat action correctly', async () => {
    const useCasePayload = {
      from: 'user-1',
      to: 'user-2',
      chat: 'hello',
    };
    const id = 'chat-123';

    const mockChatRepository = new MockChatRepository();
    const mockValidator = new MockValidator();

    mockChatRepository.addChat = jest.fn(() => Promise.resolve(id));
    mockValidator.validate = jest.fn(() => {});

    const addChatUseCase = new AddChat({
      chatRepository: mockChatRepository,
      validator: mockValidator,
    });

    const chatId = await addChatUseCase.execute(useCasePayload);

    expect(chatId).toEqual(id);
    expect(mockValidator.validate).toBeCalledWith(useCasePayload);
    expect(mockChatRepository.addChat).toBeCalledWith(new Chat(useCasePayload));
  });
});
