import GetExplorePostsMedia from '../GetExplorePostsMedia';
import MockPostRepository from '../../../Domains/posts/test/PostRepositoryTestHelper';

describe('GetExplorePostsMedia use case', () => {
  it('should orchestrating get home posts action correctly', async () => {
    // Arrange
    const postMedia = {
      id: 'post-123',
      media: 'http://img.com/img.jpg',
    };
    const exceptPosts = ['post-321'];

    const mockPostRepository = new MockPostRepository();

    // Mocking
    mockPostRepository.getExplorePostsMedia = jest.fn(() =>
      Promise.resolve([postMedia])
    );

    // Create use case instance
    const getExplorePostsMedia = new GetExplorePostsMedia({
      postRepository: mockPostRepository,
    });

    // Action
    const posts = await getExplorePostsMedia.execute(['post-321']);

    // Assert
    expect(posts[0]).toEqual(postMedia);
    expect(mockPostRepository.getExplorePostsMedia).toBeCalledWith(exceptPosts);
  });
});
