import UserProfile from '../UserProfile';

describe('a UserProfile entities', () => {
  it('should create user profile object correctly', () => {
    const payload = {
      id: 'user-123',
      username: 'jhondoe',
      fullName: 'Jhon Doe',
      profilePhoto: 'https://img.com',
      bio: 'I am an engineer',
      posts: [{ id: 'post-123', media: 'img.jpg' }],
      postsCount: 1,
      followersCount: 1,
      followingCount: 1,
      isFollowed: true,
    };

    const {
      id,
      username,
      fullName,
      profilePhoto,
      bio,
      posts,
      postsCount,
      followersCount,
      followingCount,
      isFollowed,
    } = new UserProfile(payload);

    expect(id).toEqual(payload.id);
    expect(username).toEqual(payload.username);
    expect(fullName).toEqual(payload.fullName);
    expect(profilePhoto).toEqual(payload.profilePhoto);
    expect(bio).toEqual(payload.bio);
    expect(posts).toEqual(payload.posts);
    expect(postsCount).toEqual(payload.postsCount);
    expect(followersCount).toEqual(payload.followersCount);
    expect(followingCount).toEqual(payload.followingCount);
    expect(isFollowed).toEqual(payload.isFollowed);
  });
});
