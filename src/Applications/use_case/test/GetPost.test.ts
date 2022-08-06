import GetPost from '../GetPost';
import MockPostRepository from '../../../Domains/posts/test/PostRepositoryTestHelper';
import PostGet from '../../../Domains/posts/entities/PostGet';

describe('GetPost use case', () => {
  it('should orchestrating get post action correctly', async () => {
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
    mockPostRepository.isPostExist = jest.fn(() => Promise.resolve());
    mockPostRepository.getPostById = jest.fn(() =>
      Promise.resolve(postFromRepo)
    );

    // Create use case instancea
    const getPost = new GetPost({
      postRepository: mockPostRepository,
    });

    // Action
    const post = await getPost.execute(id, userId);

    // Assert
    expect(post).toBeInstanceOf(PostGet);
    expect(post).toEqual(expectedPost);
    expect(mockPostRepository.isPostExist).toBeCalledWith(id);
    expect(mockPostRepository.getPostById).toBeCalledWith(id, userId);
  });
});
