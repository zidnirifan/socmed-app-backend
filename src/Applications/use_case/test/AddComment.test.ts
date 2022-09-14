import Comment from '../../../Domains/comments/entities/Comment';
import MockCommentRepository from '../../../Domains/comments/test/CommentRepositoryTestHelper';
import MockValidator from '../../validator/test/ValidatorTestHelper';
import MockPostRepository from '../../../Domains/posts/test/PostRepositoryTestHelper';
import AddComment from '../AddComment';
import MockSocketClient from '../../socketClient/test/SocketClientTestHelper';

describe('AddComment use case', () => {
  it('should orchestrating the add comment action correctly', async () => {
    const useCasePayload = {
      userId: 'user-123',
      content: 'comment',
      postId: 'post-123',
    };
    const id = 'comment-123';

    const mockCommentRepository = new MockCommentRepository();
    const mockValidator = new MockValidator();
    const mockPostRepository = new MockPostRepository();
    const mockSocketClient = new MockSocketClient();

    mockCommentRepository.addComment = jest.fn(() => Promise.resolve(id));
    mockCommentRepository.isCommentExist = jest.fn(() => Promise.resolve());
    mockValidator.validate = jest.fn(() => {});
    mockPostRepository.isPostExist = jest.fn(() => Promise.resolve());
    mockSocketClient.sendNotif = jest.fn(() => Promise.resolve());

    const addCommentUseCase = new AddComment({
      commentRepository: mockCommentRepository,
      postRepository: mockPostRepository,
      validator: mockValidator,
      socketClient: mockSocketClient,
    });

    const commentId = await addCommentUseCase.execute(useCasePayload);

    expect(commentId).toEqual(id);
    expect(mockValidator.validate).toBeCalledWith(useCasePayload);
    expect(mockPostRepository.isPostExist).toBeCalledWith(
      useCasePayload.postId
    );
    expect(mockCommentRepository.isCommentExist).not.toBeCalled();
    expect(mockCommentRepository.addComment).toBeCalledWith(
      new Comment(useCasePayload)
    );
  });

  it('should called isCommentExist function if replyTo not undefined', async () => {
    const useCasePayload = {
      userId: 'user-123',
      content: 'comment',
      postId: 'post-123',
      replyTo: 'comment-231',
    };
    const id = 'comment-123';

    const mockCommentRepository = new MockCommentRepository();
    const mockValidator = new MockValidator();
    const mockPostRepository = new MockPostRepository();
    const mockSocketClient = new MockSocketClient();

    mockCommentRepository.addComment = jest.fn(() => Promise.resolve(id));
    mockCommentRepository.isCommentExist = jest.fn(() => Promise.resolve());
    mockValidator.validate = jest.fn(() => {});
    mockPostRepository.isPostExist = jest.fn(() => Promise.resolve());
    mockSocketClient.sendNotif = jest.fn(() => Promise.resolve());

    const addCommentUseCase = new AddComment({
      commentRepository: mockCommentRepository,
      postRepository: mockPostRepository,
      validator: mockValidator,
      socketClient: mockSocketClient,
    });

    const commentId = await addCommentUseCase.execute(useCasePayload);

    expect(commentId).toEqual(id);
    expect(mockValidator.validate).toBeCalledWith(useCasePayload);
    expect(mockPostRepository.isPostExist).toBeCalledWith(
      useCasePayload.postId
    );
    expect(mockCommentRepository.isCommentExist).toBeCalledWith(
      useCasePayload.replyTo
    );
    expect(mockCommentRepository.addComment).toBeCalledWith(
      new Comment(useCasePayload)
    );
  });
});
