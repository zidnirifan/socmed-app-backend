import PostGet from '../PostGet';

describe('PostGet entity', () => {
  it('should create PostGet object correctly', () => {
    const payload = {
      id: 'post-123',
      user: {
        username: 'jhondoe',
        profilePhoto: 'photo.png',
      },
      caption: 'helo ges',
      media: ['img.jpg'],
      createdAt: new Date(),
    };

    const { id, caption, user, media, createdAt } = new PostGet(payload);

    expect(id).toEqual(payload.id);
    expect(user).toEqual(payload.user);
    expect(caption).toEqual(payload.caption);
    expect(media[0]).toEqual(payload.media[0]);
    expect(typeof createdAt).toEqual('string');
    expect(createdAt).toEqual('0 seconds ago');
  });

  it('createdAt should have value "2 year ago"', () => {
    const yearInMs = 2 * 365 * 24 * 60 * 60 * 1000;

    const payload = {
      id: 'post-123',
      user: {
        username: 'jhondoe',
        profilePhoto: 'photo.png',
      },
      caption: 'helo ges',
      media: ['img.jpg'],
      createdAt: new Date(Date.now() - yearInMs),
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
        username: 'jhondoe',
        profilePhoto: 'photo.png',
      },
      caption: 'helo ges',
      media: ['img.jpg'],
      createdAt: new Date(Date.now() - yearInMs),
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
        username: 'jhondoe',
        profilePhoto: 'photo.png',
      },
      caption: 'helo ges',
      media: ['img.jpg'],
      createdAt: new Date(Date.now() - monthInMs),
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
        username: 'jhondoe',
        profilePhoto: 'photo.png',
      },
      caption: 'helo ges',
      media: ['img.jpg'],
      createdAt: new Date(Date.now() - weekInMs),
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
        username: 'jhondoe',
        profilePhoto: 'photo.png',
      },
      caption: 'helo ges',
      media: ['img.jpg'],
      createdAt: new Date(Date.now() - dayInMs),
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
        username: 'jhondoe',
        profilePhoto: 'photo.png',
      },
      caption: 'helo ges',
      media: ['img.jpg'],
      createdAt: new Date(Date.now() - hourInMs),
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
        username: 'jhondoe',
        profilePhoto: 'photo.png',
      },
      caption: 'helo ges',
      media: ['img.jpg'],
      createdAt: new Date(Date.now() - minuteInMs),
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
