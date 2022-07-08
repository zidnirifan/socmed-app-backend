import MockPostRepository from '../../../Domains/posts/test/PostRepositoryTestHelper';
import ToggleLikePost from '../ToggleLikePost';

describe('GetPost use case', () => {
  it('should orchestrating like post action correctly if post not liked', async () => {
    // Arrange
    const payload = {
      userId: 'user-123',
      postId: 'post-123',
    };

    const mockPostRepository = new MockPostRepository();

    // Mocking
    mockPostRepository.isPostExist = jest.fn(() => Promise.resolve());
    mockPostRepository.isPostLiked = jest.fn(() => Promise.resolve(false));
    mockPostRepository.likePost = jest.fn(() => Promise.resolve());
    mockPostRepository.unlikePost = jest.fn(() => Promise.resolve());

    // Create use case instancea
    const toggleLike = new ToggleLikePost({
      postRepository: mockPostRepository,
    });

    // Action
    await toggleLike.execute(payload);

    // Assert
    expect(mockPostRepository.isPostExist).toBeCalledWith(payload.postId);
    expect(mockPostRepository.isPostLiked).toBeCalledWith(payload);
    expect(mockPostRepository.likePost).toBeCalledWith(payload);
    expect(mockPostRepository.unlikePost).not.toBeCalled();
  });

  it('should orchestrating unlike post action correctly if post already liked', async () => {
    // Arrange
    const payload = {
      userId: 'user-123',
      postId: 'post-123',
    };

    const mockPostRepository = new MockPostRepository();

    // Mocking
    mockPostRepository.isPostExist = jest.fn(() => Promise.resolve());
    mockPostRepository.isPostLiked = jest.fn(() => Promise.resolve(true));
    mockPostRepository.unlikePost = jest.fn(() => Promise.resolve());
    mockPostRepository.likePost = jest.fn(() => Promise.resolve());

    // Create use case instancea
    const toggleLike = new ToggleLikePost({
      postRepository: mockPostRepository,
    });

    // Action
    await toggleLike.execute(payload);

    // Assert
    expect(mockPostRepository.isPostExist).toBeCalledWith(payload.postId);
    expect(mockPostRepository.isPostLiked).toBeCalledWith(payload);
    expect(mockPostRepository.unlikePost).toBeCalledWith(payload);
    expect(mockPostRepository.likePost).not.toBeCalled();
  });
});
