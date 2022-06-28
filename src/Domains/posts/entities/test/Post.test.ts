import Post from '../Post';

describe('Post entity', () => {
  it('should create Post object correctly', () => {
    const payload = {
      caption: 'helo ges',
      userId: 'user-123',
      media: [
        {
          path: '/img/images.png',
          fileName: 'images.png',
          fileType: 'image/png' as const,
        },
      ],
    };

    const { caption, userId, media } = new Post(payload);

    expect(caption).toEqual(payload.caption);
    expect(userId).toEqual(payload.userId);
    expect(media).toStrictEqual(payload.media);
  });
});