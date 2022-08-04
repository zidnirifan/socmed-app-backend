import CommentGet from '../CommentGet';

describe('CommentGet entity', () => {
  it('should create CommentGet object correctly', () => {
    const payload = {
      user: {
        id: 'user-123',
        username: 'jhondoe',
        profilePhoto: 'image.jpg',
      },
      content: 'comment',
      postId: 'post-123',
      createdAt: new Date(),
    };

    const { user, content, postId, replyTo, createdAt } = new CommentGet(
      payload
    );

    expect(user).toEqual(payload.user);
    expect(content).toEqual(payload.content);
    expect(postId).toEqual(payload.postId);
    expect(replyTo).toBeUndefined();
    expect(createdAt).toEqual('0s');
  });

  it('createdAt should have value "1w"', () => {
    const weekInMs = 7 * 24 * 60 * 60 * 1000;

    const payload = {
      user: {
        id: 'user-123',
        username: 'jhondoe',
        profilePhoto: 'image.jpg',
      },
      content: 'comment',
      postId: 'post-123',
      createdAt: new Date(Date.now() - weekInMs),
    };

    const { user, content, postId, replyTo, createdAt } = new CommentGet(
      payload
    );

    expect(user).toEqual(payload.user);
    expect(content).toEqual(payload.content);
    expect(postId).toEqual(payload.postId);
    expect(replyTo).toBeUndefined();
    expect(createdAt).toEqual('1w');
  });

  it('createdAt should have value "1d"', () => {
    const dayInMs = 24 * 60 * 60 * 1000;

    const payload = {
      user: {
        id: 'user-123',
        username: 'jhondoe',
        profilePhoto: 'image.jpg',
      },
      content: 'comment',
      postId: 'post-123',
      createdAt: new Date(Date.now() - dayInMs),
    };

    const { user, content, postId, replyTo, createdAt } = new CommentGet(
      payload
    );

    expect(user).toEqual(payload.user);
    expect(content).toEqual(payload.content);
    expect(postId).toEqual(payload.postId);
    expect(replyTo).toBeUndefined();
    expect(createdAt).toEqual('1d');
  });

  it('createdAt should have value "1h"', () => {
    const hourInMs = 60 * 60 * 1000;

    const payload = {
      user: {
        id: 'user-123',
        username: 'jhondoe',
        profilePhoto: 'image.jpg',
      },
      content: 'comment',
      postId: 'post-123',
      createdAt: new Date(Date.now() - hourInMs),
    };

    const { user, content, postId, replyTo, createdAt } = new CommentGet(
      payload
    );

    expect(user).toEqual(payload.user);
    expect(content).toEqual(payload.content);
    expect(postId).toEqual(payload.postId);
    expect(replyTo).toBeUndefined();
    expect(createdAt).toEqual('1h');
  });

  it('createdAt should have value "1m"', () => {
    const minuteInMs = 60 * 1000;

    const payload = {
      user: {
        id: 'user-123',
        username: 'jhondoe',
        profilePhoto: 'image.jpg',
      },
      content: 'comment',
      postId: 'post-123',
      createdAt: new Date(Date.now() - minuteInMs),
    };

    const { user, content, postId, replyTo, createdAt } = new CommentGet(
      payload
    );

    expect(user).toEqual(payload.user);
    expect(content).toEqual(payload.content);
    expect(postId).toEqual(payload.postId);
    expect(replyTo).toBeUndefined();
    expect(createdAt).toEqual('1m');
  });
});
