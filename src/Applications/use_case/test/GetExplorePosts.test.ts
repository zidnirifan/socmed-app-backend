import GetExplorePosts from '../GetExplorePosts';
import MockPostRepository from '../../../Domains/posts/test/PostRepositoryTestHelper';
import PostGet from '../../../Domains/posts/entities/PostGet';

describe('GetExplorePosts use case', () => {
  it('should orchestrating get home posts action correctly', async () => {
    // Arrange
    const id = 'post-123';
    const userId = 'user-123';

    const postFromRepo = {
      id,
      user: { id: userId, username: 'jhondoe', profilePhoto: 'photo.png' },
      media: ['http://img.com/img.jpg'],
      caption: 'hello ges',
      createdAt: new Date(),
      likesCount: 1,
      isLiked: true,
      commentsCount: 1,
    };

    const expectedPost = new PostGet(postFromRepo);

    const mockPostRepository = new MockPostRepository();

    // Mocking
    mockPostRepository.getExplorePosts = jest.fn(() =>
      Promise.resolve([postFromRepo])
    );

    // Create use case instancea
    const getExplorePosts = new GetExplorePosts({
      postRepository: mockPostRepository,
    });

    // Action
    const posts = await getExplorePosts.execute(userId);

    // Assert
    expect(posts[0]).toBeInstanceOf(PostGet);
    expect(posts[0]).toEqual(expectedPost);
    expect(mockPostRepository.getExplorePosts).toBeCalledWith(userId);
  });
});
