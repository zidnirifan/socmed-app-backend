import MockCommentRepository from '../../../Domains/comments/test/CommentRepositoryTestHelper';
import MockPostRepository from '../../../Domains/posts/test/PostRepositoryTestHelper';
import GetPostComments from '../GetPostComments';
import CommentGet from '../../../Domains/comments/entities/CommentGet';

describe('GetPostComments use case', () => {
  it('should orchestrating the get post comments action correctly', async () => {
    const postId = '62e5da0011eaf17d6b5a1721';

    const comment = {
      id: '62ebc4b03b23d29f46f1ae8d',
      user: {
        id: '62b55fa0f96df4d764f6722d',
        username: 'jhondoe',
        profilePhoto: 'image.jpg',
      },
      content: 'menjajal comment',
      postId: '62e5da0011eaf17d6b5a1721',
      createdAt: new Date(),
    };

    const reply = {
      id: '62ebc50265d8f398aacddd3d',
      user: {
        id: '62b55fa0f96df4d764f6722d',
        username: 'jhondoe',
        profilePhoto: 'image.jpg',
      },
      content: 'menjajal comment',
      postId: '62e5da0011eaf17d6b5a1721',
      replyTo: {
        id: '62ebc4b03b23d29f46f1ae8d',
        user: {
          id: '62b55fa0f96df4d764f6722d',
          username: 'jhondoe',
        },
      },
      createdAt: '1h',
    };

    const expectedComment = new CommentGet({
      ...comment,
      replies: [reply],
    });

    const mockCommentRepository = new MockCommentRepository();
    const mockPostRepository = new MockPostRepository();

    mockCommentRepository.getCommentsByPostId = jest.fn(() =>
      Promise.resolve([comment])
    );
    mockCommentRepository.getReplies = jest.fn(() => Promise.resolve([reply]));
    mockPostRepository.isPostExist = jest.fn(() => Promise.resolve());

    const getPostComments = new GetPostComments({
      commentRepository: mockCommentRepository,
      postRepository: mockPostRepository,
    });

    const comments = await getPostComments.execute(postId);

    expect(comments[0]).toBeInstanceOf(CommentGet);
    expect(comments[0]).toEqual(expectedComment);
    expect(mockPostRepository.isPostExist).toBeCalledWith(postId);
    expect(mockCommentRepository.getCommentsByPostId).toBeCalledWith(postId);
    expect(mockCommentRepository.getReplies).toBeCalledWith(comment.id);
  });
});
