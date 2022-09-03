import MockChatRepository from '../../../Domains/chats/test/ChatRepositoryTestHelper';
import ReadChat from '../ReadChat';

describe('ReadChat use case', () => {
  it('should orchestrating the read chat action correctly', async () => {
    const ownUserId = 'user-1';
    const foreignUserId = 'user-2';

    const mockChatRepository = new MockChatRepository();

    mockChatRepository.readChat = jest.fn(() => Promise.resolve());

    const addChatUseCase = new ReadChat({
      chatRepository: mockChatRepository,
    });

    await addChatUseCase.execute(ownUserId, foreignUserId);

    expect(mockChatRepository.readChat).toBeCalledWith(
      ownUserId,
      foreignUserId
    );
  });
});
