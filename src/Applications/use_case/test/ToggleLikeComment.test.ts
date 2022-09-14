import MockCommentRepository from '../../../Domains/comments/test/CommentRepositoryTestHelper';
import MockSocketClient from '../../socketClient/test/SocketClientTestHelper';
import ToggleLikeComment from '../ToggleLikeComment';

describe('ToggleLikeComment use case', () => {
  it('should orchestrating like comment action correctly if comment not liked', async () => {
    // Arrange
    const payload = {
      userId: 'user-123',
      commentId: 'comment-123',
    };

    const mockCommentRepository = new MockCommentRepository();
    const mockSocketClient = new MockSocketClient();

    // Mocking
    mockCommentRepository.isCommentExist = jest.fn(() => Promise.resolve());
    mockCommentRepository.isCommentLiked = jest.fn(() =>
      Promise.resolve(false)
    );
    mockCommentRepository.likeComment = jest.fn(() => Promise.resolve());
    mockCommentRepository.unlikeComment = jest.fn(() => Promise.resolve());
    mockSocketClient.sendNotif = jest.fn(() => Promise.resolve());

    // Create use case instancea
    const toggleLike = new ToggleLikeComment({
      commentRepository: mockCommentRepository,
      socketClient: mockSocketClient,
    });

    // Action
    const result = await toggleLike.execute(payload);

    // Assert
    expect(result).toEqual('liked');
    expect(mockCommentRepository.isCommentExist).toBeCalledWith(
      payload.commentId
    );
    expect(mockCommentRepository.isCommentLiked).toBeCalledWith(payload);
    expect(mockCommentRepository.likeComment).toBeCalledWith(payload);
    expect(mockCommentRepository.unlikeComment).not.toBeCalled();
  });

  it('should orchestrating unlike comment action correctly if comment already liked', async () => {
    // Arrange
    const payload = {
      userId: 'user-123',
      commentId: 'comment-123',
    };

    const mockCommentRepository = new MockCommentRepository();
    const mockSocketClient = new MockSocketClient();

    // Mocking
    mockCommentRepository.isCommentExist = jest.fn(() => Promise.resolve());
    mockCommentRepository.isCommentLiked = jest.fn(() => Promise.resolve(true));
    mockCommentRepository.unlikeComment = jest.fn(() => Promise.resolve());
    mockCommentRepository.likeComment = jest.fn(() => Promise.resolve());
    mockSocketClient.sendNotif = jest.fn(() => Promise.resolve());

    // Create use case instancea
    const toggleLike = new ToggleLikeComment({
      commentRepository: mockCommentRepository,
      socketClient: mockSocketClient,
    });

    // Action
    const result = await toggleLike.execute(payload);

    // Assert
    expect(result).toEqual('unliked');
    expect(mockCommentRepository.isCommentExist).toBeCalledWith(
      payload.commentId
    );
    expect(mockCommentRepository.isCommentLiked).toBeCalledWith(payload);
    expect(mockCommentRepository.unlikeComment).toBeCalledWith(payload);
    expect(mockCommentRepository.likeComment).not.toBeCalled();
  });
});
