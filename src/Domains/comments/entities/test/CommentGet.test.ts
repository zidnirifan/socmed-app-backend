import CommentGet from '../CommentGet';

describe('CommentGet entity', () => {
  it('should create CommentGet object correctly', () => {
    const payload = {
      id: 'comment-123',
      user: {
        id: 'user-123',
        username: 'jhondoe',
        profilePhoto: 'image.jpg',
      },
      content: 'comment',
      postId: 'post-123',
      replies: [
        {
          id: 'comment-332',
          user: {
            id: 'user-135',
            username: 'gedang',
            profilePhoto: 'image.jpg',
          },
          content: 'reply',
          postId: 'post-123',
          replyTo: {
            id: 'comment-123',
            user: {
              id: 'user-123',
              username: 'jhondoe',
            },
          },
          createdAt: '1d',
          likesCount: 1,
          isLiked: true,
        },
      ],
      createdAt: new Date(),
      likesCount: 1,
      isLiked: true,
    };

    const {
      id,
      user,
      content,
      postId,
      replyTo,
      createdAt,
      replies = [],
    } = new CommentGet(payload);

    expect(id).toEqual(payload.id);
    expect(user).toEqual(payload.user);
    expect(content).toEqual(payload.content);
    expect(postId).toEqual(payload.postId);
    expect(replies).toHaveLength(1);
    expect(replies[0]).toEqual(payload.replies[0]);
    expect(replyTo).toBeUndefined();
    expect(createdAt).toEqual('0s');
  });

  it('createdAt should have value "1w"', () => {
    const weekInMs = 7 * 24 * 60 * 60 * 1000;

    const payload = {
      id: 'comment-123',
      user: {
        id: 'user-123',
        username: 'jhondoe',
        profilePhoto: 'image.jpg',
      },
      content: 'comment',
      postId: 'post-123',
      createdAt: new Date(Date.now() - weekInMs),
      likesCount: 1,
      isLiked: true,
    };

    const { createdAt } = new CommentGet(payload);

    expect(createdAt).toEqual('1w');
  });

  it('createdAt should have value "1d"', () => {
    const dayInMs = 24 * 60 * 60 * 1000;

    const payload = {
      id: 'comment-123',
      user: {
        id: 'user-123',
        username: 'jhondoe',
        profilePhoto: 'image.jpg',
      },
      content: 'comment',
      postId: 'post-123',
      createdAt: new Date(Date.now() - dayInMs),
      likesCount: 1,
      isLiked: true,
    };

    const { createdAt } = new CommentGet(payload);

    expect(createdAt).toEqual('1d');
  });

  it('createdAt should have value "1h"', () => {
    const hourInMs = 60 * 60 * 1000;

    const payload = {
      id: 'comment-123',
      user: {
        id: 'user-123',
        username: 'jhondoe',
        profilePhoto: 'image.jpg',
      },
      content: 'comment',
      postId: 'post-123',
      createdAt: new Date(Date.now() - hourInMs),
      likesCount: 1,
      isLiked: true,
    };

    const { createdAt } = new CommentGet(payload);

    expect(createdAt).toEqual('1h');
  });

  it('createdAt should have value "1m"', () => {
    const minuteInMs = 60 * 1000;

    const payload = {
      id: 'comment-123',
      user: {
        id: 'user-123',
        username: 'jhondoe',
        profilePhoto: 'image.jpg',
      },
      content: 'comment',
      postId: 'post-123',
      createdAt: new Date(Date.now() - minuteInMs),
      likesCount: 1,
      isLiked: true,
    };

    const { createdAt } = new CommentGet(payload);

    expect(createdAt).toEqual('1m');
  });
});
