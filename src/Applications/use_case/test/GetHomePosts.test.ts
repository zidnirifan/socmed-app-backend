import GetHomePosts from '../GetHomePosts';
import MockPostRepository from '../../../Domains/posts/test/PostRepositoryTestHelper';
import PostGet from '../../../Domains/posts/entities/PostGet';

describe('GetHomePosts use case', () => {
  it('should orchestrating get home posts action correctly', async () => {
    // Arrange
    const id = 'post-123';

    const expectedPost = {
      id,
      user: { username: 'jhondoe', profilePhoto: 'photo.png' },
      media: ['http://img.com/img.jpg'],
      caption: 'hello ges',
      createdAt: new Date(),
    };

    const mockPostRepository = new MockPostRepository();

    // Mocking
    mockPostRepository.getHomePosts = jest.fn(() =>
      Promise.resolve([expectedPost])
    );

    // Create use case instancea
    const getHomePosts = new GetHomePosts({
      postRepository: mockPostRepository,
    });

    // Action
    const posts = await getHomePosts.execute();

    // Assert
    expect(posts[0]).toBeInstanceOf(PostGet);
    expect(posts[0]).toEqual(expectedPost);
    expect(mockPostRepository.getHomePosts).toBeCalled();
  });
});
