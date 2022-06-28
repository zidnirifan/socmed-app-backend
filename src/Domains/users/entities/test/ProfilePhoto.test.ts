import ProfilePhoto from '../ProfilePhoto';

describe('a ProfilePhoto entities', () => {
  it('should create user object correctly', () => {
    const payload = {
      userId: 'user-123',
      path: '/img/photo.png',
      fileName: 'photo.png',
      fileType: 'image/jpeg' as const,
    };

    const { path, fileName, userId, fileType } = new ProfilePhoto(payload);

    expect(path).toEqual(payload.path);
    expect(fileName).not.toEqual(payload.fileName);
    expect(userId).toEqual(payload.userId);
    expect(fileType).toEqual(payload.fileType);
  });
});
