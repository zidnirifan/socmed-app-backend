import PostGet from '../PostGet';

describe('PostGet entity', () => {
  it('should create PostGet object correctly', () => {
    const payload = {
      id: 'post-123',
      user: {
        id: 'user-123',
        username: 'jhondoe',
        profilePhoto: 'photo.png',
      },
      caption: 'helo ges',
      media: ['img.jpg'],
      createdAt: new Date(),
      likesCount: 1,
      isLiked: true,
      commentsCount: 1,
    };

    const { id, caption, user, media, createdAt, isLiked } = new PostGet(
      payload
    );

    expect(id).toEqual(payload.id);
    expect(user).toEqual(payload.user);
    expect(caption).toEqual(payload.caption);
    expect(media[0]).toEqual(payload.media[0]);
    expect(typeof createdAt).toEqual('string');
    expect(createdAt).toEqual('0 seconds ago');
    expect(isLiked).toEqual(payload.isLiked);
  });

  it('createdAt should have value "2 year ago"', () => {
    const yearInMs = 2 * 365 * 24 * 60 * 60 * 1000;

    const payload = {
      id: 'post-123',
      user: {
        id: 'user-123',
        username: 'jhondoe',
        profilePhoto: 'photo.png',
      },
      caption: 'helo ges',
      media: ['img.jpg'],
      createdAt: new Date(Date.now() - yearInMs),
      likesCount: 1,
      isLiked: true,
      commentsCount: 1,
    };

    const { id, caption, user, media, createdAt } = new PostGet(payload);

    expect(id).toEqual(payload.id);
    expect(user).toEqual(payload.user);
    expect(caption).toEqual(payload.caption);
    expect(media[0]).toEqual(payload.media[0]);
    expect(typeof createdAt).toEqual('string');
    expect(createdAt).toEqual('2 years ago');
  });

  it('createdAt should have value "1 year ago"', () => {
    const yearInMs = 365 * 24 * 60 * 60 * 1000;

    const payload = {
      id: 'post-123',
      user: {
        id: 'user-123',
        username: 'jhondoe',
        profilePhoto: 'photo.png',
      },
      caption: 'helo ges',
      media: ['img.jpg'],
      createdAt: new Date(Date.now() - yearInMs),
      likesCount: 1,
      isLiked: true,
      commentsCount: 1,
    };

    const { id, caption, user, media, createdAt } = new PostGet(payload);

    expect(id).toEqual(payload.id);
    expect(user).toEqual(payload.user);
    expect(caption).toEqual(payload.caption);
    expect(media[0]).toEqual(payload.media[0]);
    expect(typeof createdAt).toEqual('string');
    expect(createdAt).toEqual('1 year ago');
  });

  it('createdAt should have value "1 month ago"', () => {
    const monthInMs = 30 * 24 * 60 * 60 * 1000;

    const payload = {
      id: 'post-123',
      user: {
        id: 'user-123',
        username: 'jhondoe',
        profilePhoto: 'photo.png',
      },
      caption: 'helo ges',
      media: ['img.jpg'],
      createdAt: new Date(Date.now() - monthInMs),
      likesCount: 1,
      isLiked: true,
      commentsCount: 1,
    };

    const { id, caption, user, media, createdAt } = new PostGet(payload);

    expect(id).toEqual(payload.id);
    expect(user).toEqual(payload.user);
    expect(caption).toEqual(payload.caption);
    expect(media[0]).toEqual(payload.media[0]);
    expect(typeof createdAt).toEqual('string');
    expect(createdAt).toEqual('1 month ago');
  });

  it('createdAt should have value "1 week ago"', () => {
    const weekInMs = 7 * 24 * 60 * 60 * 1000;

    const payload = {
      id: 'post-123',
      user: {
        id: 'user-123',
        username: 'jhondoe',
        profilePhoto: 'photo.png',
      },
      caption: 'helo ges',
      media: ['img.jpg'],
      likesCount: 1,
      createdAt: new Date(Date.now() - weekInMs),
      isLiked: true,
      commentsCount: 1,
    };

    const { id, caption, user, media, createdAt } = new PostGet(payload);

    expect(id).toEqual(payload.id);
    expect(user).toEqual(payload.user);
    expect(caption).toEqual(payload.caption);
    expect(media[0]).toEqual(payload.media[0]);
    expect(typeof createdAt).toEqual('string');
    expect(createdAt).toEqual('1 week ago');
  });

  it('createdAt should have value "1 day ago"', () => {
    const dayInMs = 24 * 60 * 60 * 1000;

    const payload = {
      id: 'post-123',
      user: {
        id: 'user-123',
        username: 'jhondoe',
        profilePhoto: 'photo.png',
      },
      caption: 'helo ges',
      media: ['img.jpg'],
      createdAt: new Date(Date.now() - dayInMs),
      likesCount: 1,
      isLiked: true,
      commentsCount: 1,
    };

    const { id, caption, user, media, createdAt } = new PostGet(payload);

    expect(id).toEqual(payload.id);
    expect(user).toEqual(payload.user);
    expect(caption).toEqual(payload.caption);
    expect(media[0]).toEqual(payload.media[0]);
    expect(typeof createdAt).toEqual('string');
    expect(createdAt).toEqual('1 day ago');
  });

  it('createdAt should have value "1 hour ago"', () => {
    const hourInMs = 60 * 60 * 1000;

    const payload = {
      id: 'post-123',
      user: {
        id: 'user-123',
        username: 'jhondoe',
        profilePhoto: 'photo.png',
      },
      caption: 'helo ges',
      media: ['img.jpg'],
      createdAt: new Date(Date.now() - hourInMs),
      likesCount: 1,
      isLiked: true,
      commentsCount: 1,
    };

    const { id, caption, user, media, createdAt } = new PostGet(payload);

    expect(id).toEqual(payload.id);
    expect(user).toEqual(payload.user);
    expect(caption).toEqual(payload.caption);
    expect(media[0]).toEqual(payload.media[0]);
    expect(typeof createdAt).toEqual('string');
    expect(createdAt).toEqual('1 hour ago');
  });

  it('createdAt should have value "1 minute ago"', () => {
    const minuteInMs = 60 * 1000;

    const payload = {
      id: 'post-123',
      user: {
        id: 'user-123',
        username: 'jhondoe',
        profilePhoto: 'photo.png',
      },
      caption: 'helo ges',
      media: ['img.jpg'],
      likesCount: 1,
      createdAt: new Date(Date.now() - minuteInMs),
      isLiked: true,
      commentsCount: 1,
    };

    const { id, caption, user, media, createdAt } = new PostGet(payload);

    expect(id).toEqual(payload.id);
    expect(user).toEqual(payload.user);
    expect(caption).toEqual(payload.caption);
    expect(media[0]).toEqual(payload.media[0]);
    expect(typeof createdAt).toEqual('string');
    expect(createdAt).toEqual('1 minute ago');
  });
});
