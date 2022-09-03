import LatestChat from '../../../Domains/chats/entities/LatestChat';
import MockChatRepository from '../../../Domains/chats/test/ChatRepositoryTestHelper';
import GetLatestChat from '../GetLatestChat';

describe('GetLatestChat use case', () => {
  it('should orchestrating the get latest chat action correctly', async () => {
    const user1 = {
      id: 'user-1',
      fullName: 'user1',
      profilePhoto: 'profile.png',
    };
    const user2 = {
      id: 'user-1',
      fullName: 'user1',
      profilePhoto: 'profile.png',
    };

    const chat = {
      id: 'chat-123',
      from: user1,
      to: user2,
      chat: 'hello',
      createdAt: new Date(),
      isRead: false,
    };

    const expectedChat = new LatestChat(chat);

    const mockChatRepository = new MockChatRepository();

    mockChatRepository.getLatestChat = jest.fn(() => Promise.resolve([chat]));

    const addChatUseCase = new GetLatestChat({
      chatRepository: mockChatRepository,
    });

    const chats = await addChatUseCase.execute(user1.id);

    expect(chats[0]).toBeInstanceOf(LatestChat);
    expect(chats[0]).toEqual(expectedChat);
    expect(mockChatRepository.getLatestChat).toBeCalledWith(user1.id);
  });
});
