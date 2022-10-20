import Notif, { PayloadNotif } from '../Notif';

describe('Notif entity', () => {
  it('should create Notif object correctly', () => {
    const payload = {
      userId: 'user-124',
      to: 'user-321',
      type: 'follow' as const,
    };

    const { userId, to, text, type } = new Notif(payload);

    expect(userId).toEqual(payload.userId);
    expect(to).toEqual(payload.to);
    expect(type).toEqual(payload.type);
    expect(text).toEqual('started following you');
  });

  it('should have property postId if type is like-post', () => {
    const payload = {
      userId: 'user-124',
      to: 'user-321',
      type: 'like-post' as const,
      postId: 'post-123',
    };

    const { userId, to, text, type, postId } = new Notif(payload);

    expect(userId).toEqual(payload.userId);
    expect(to).toEqual(payload.to);
    expect(type).toEqual(payload.type);
    expect(postId).toEqual(payload.postId);
    expect(text).toEqual('liked your post');
  });

  it('should have property postId if type is comment', () => {
    const payload = {
      userId: 'user-124',
      to: 'user-321',
      type: 'comment' as const,
      postId: 'post-123',
      comment: 'wow is good',
    };

    const { userId, to, text, type, postId } = new Notif(payload);

    expect(userId).toEqual(payload.userId);
    expect(to).toEqual(payload.to);
    expect(type).toEqual(payload.type);
    expect(postId).toEqual(payload.postId);
    expect(text).toEqual(`commented: ${payload.comment}`);
  });

  it('should have property postId and commentId if type is like-comment', () => {
    const payload = {
      userId: 'user-124',
      to: 'user-321',
      type: 'like-comment' as const,
      postId: 'post-123',
      commentId: 'comment-222',
    };

    const { userId, to, text, type, postId, commentId } = new Notif(payload);

    expect(userId).toEqual(payload.userId);
    expect(to).toEqual(payload.to);
    expect(type).toEqual(payload.type);
    expect(postId).toEqual(payload.postId);
    expect(commentId).toEqual(payload.commentId);
    expect(text).toEqual('liked your comment');
  });

  it('should have property postId and commentId if type is reply-comment', () => {
    const payload = {
      userId: 'user-124',
      to: 'user-321',
      type: 'reply-comment' as const,
      postId: 'post-123',
      commentId: 'comment-222',
      comment: 'This is reply',
    };

    const { userId, to, text, type, postId, commentId } = new Notif(payload);

    expect(userId).toEqual(payload.userId);
    expect(to).toEqual(payload.to);
    expect(type).toEqual(payload.type);
    expect(postId).toEqual(payload.postId);
    expect(commentId).toEqual(payload.commentId);
    expect(text).toEqual(`replied your comment: ${payload.comment}`);
  });

  it('should throw error when type is not match', () => {
    const payload = {
      userId: 'user-124',
      to: 'user-321',
      type: 'wrong-type' as const,
    };

    expect(() => new Notif(payload as unknown as PayloadNotif)).toThrowError(
      'Type is not match'
    );
  });
});
