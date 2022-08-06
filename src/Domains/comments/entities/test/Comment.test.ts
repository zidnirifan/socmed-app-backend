import Comment from '../Comment';

describe('Comment entity', () => {
  it('should create Comment object correctly', () => {
    const payload = {
      userId: 'user-123',
      content: 'comment',
      postId: 'post-123',
    };

    const { userId, content, postId, replyTo, parentComment } = new Comment(
      payload
    );

    expect(userId).toEqual(payload.userId);
    expect(content).toEqual(payload.content);
    expect(postId).toEqual(payload.postId);
    expect(replyTo).toBeUndefined();
    expect(parentComment).toBeUndefined();
  });
});
