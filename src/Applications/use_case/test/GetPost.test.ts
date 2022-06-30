import GetPost from '../GetPost';
import MockPostRepository from '../../../Domains/posts/test/PostRepositoryTestHelper';
import PostGet from '../../../Domains/posts/entities/PostGet';

describe('GetPost use case', () => {
  it('should orchestrating add post action correctly', async () => {
    // Arrange
    const id = 'post-123';

    const expectedPost = {
      id,
      username: 'jhondoe',
      media: ['http://img.com/img.jpg'],
      caption: 'hello ges',
      createdAt: new Date(),
    };

    const mockPostRepository = new MockPostRepository();

    // Mocking
    mockPostRepository.isPostExist = jest.fn(() => Promise.resolve());
    mockPostRepository.getPostById = jest.fn(() =>
      Promise.resolve(expectedPost)
    );

    // Create use case instancea
    const getPost = new GetPost({
      postRepository: mockPostRepository,
    });

    // Action
    const post = await getPost.execute(id);

    // Assert
    expect(post).toBeInstanceOf(PostGet);
    expect(post).toEqual(expectedPost);
    expect(mockPostRepository.isPostExist).toBeCalledWith(id);
    expect(mockPostRepository.getPostById).toBeCalledWith(id);
  });
});
