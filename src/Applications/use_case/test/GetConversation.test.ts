import ChatGet from '../../../Domains/chats/entities/ChatGet';
import MockChatRepository from '../../../Domains/chats/test/ChatRepositoryTestHelper';
import GetConversation from '../GetConversation';

describe('GetConversation use case', () => {
  it('should orchestrating the get conversation action correctly', async () => {
    const ownUserId = 'user-1';
    const foreignUserId = 'user-2';

    const chat = {
      id: 'chat-123',
      from: ownUserId,
      to: foreignUserId,
      chat: 'hello',
      createdAt: new Date(),
    };

    const expectedChat = new ChatGet(chat);

    const mockChatRepository = new MockChatRepository();

    mockChatRepository.getConversation = jest.fn(() => Promise.resolve([chat]));

    const addChatUseCase = new GetConversation({
      chatRepository: mockChatRepository,
    });

    const chats = await addChatUseCase.execute(ownUserId, foreignUserId);

    expect(chats[0]).toBeInstanceOf(ChatGet);
    expect(chats[0]).toEqual(expectedChat);
    expect(mockChatRepository.getConversation).toBeCalledWith(
      ownUserId,
      foreignUserId
    );
  });
});
