import PostGet from '../PostGet';

describe('PostGet entity', () => {
  it('should create PostGet object correctly', () => {
    const payload = {
      id: 'post-123',
      username: 'jhondoe',
      caption: 'helo ges',
      media: ['img.jpg'],
      createdAt: new Date(),
    };

    const { id, caption, username, media, createdAt } = new PostGet(payload);

    expect(id).toEqual(payload.id);
    expect(username).toEqual(payload.username);
    expect(caption).toEqual(payload.caption);
    expect(media[0]).toEqual(payload.media[0]);
    expect(createdAt).toEqual(payload.createdAt);
  });
});
