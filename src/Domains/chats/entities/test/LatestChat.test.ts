import LatestChat from '../LatestChat';

describe('LatestChat entity', () => {
  it('should create LatestChat object correctly', () => {
    const user1 = {
      id: 'user-1',
      fullName: 'user1',
      profilePhoto: 'profile.png',
    };
    const user2 = {
      id: 'user-1',
      fullName: 'user1',
      profilePhoto: 'profile.png',
    };

    const payload = {
      id: 'chat-123',
      from: user1,
      to: user2,
      chat: 'hello',
      createdAt: new Date(),
    };

    const { id, createdAt, from, to, chat } = new LatestChat(payload);

    expect(id).toEqual(payload.id);
    expect(from).toEqual(payload.from);
    expect(to).toEqual(payload.to);
    expect(chat).toEqual(payload.chat);
    expect(createdAt).toEqual(payload.createdAt);
  });
});
