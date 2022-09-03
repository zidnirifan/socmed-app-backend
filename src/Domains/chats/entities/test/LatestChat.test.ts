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
      isRead: false,
    };

    const { id, time, date, from, to, chat } = new LatestChat(payload);

    expect(id).toEqual(payload.id);
    expect(from).toEqual(payload.from);
    expect(to).toEqual(payload.to);
    expect(chat).toEqual(payload.chat);
    expect(time).toEqual(
      new Date().toLocaleTimeString('id-ID', {
        hour: '2-digit',
        minute: '2-digit',
      })
    );
    expect(date).toEqual('Today');
  });

  it('date should have value "Yesterday"', () => {
    const hours25 = 25 * 60 * 60 * 1000;

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
      createdAt: new Date(Date.now() - hours25),
      isRead: false,
    };

    const { date } = new LatestChat(payload);

    expect(date).toEqual('Yesterday');
  });

  it('date should have value the day name', () => {
    const threeDays = 3 * 24 * 60 * 60 * 1000;

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
      createdAt: new Date(Date.now() - threeDays),
      isRead: false,
    };

    const { date } = new LatestChat(payload);

    expect(date).toEqual(
      new Date(Date.now() - threeDays).toLocaleDateString('en-ID', {
        weekday: 'long',
      })
    );
  });

  it('date should have value the date string', () => {
    const eightDays = 8 * 24 * 60 * 60 * 1000;

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
      createdAt: new Date(Date.now() - eightDays),
      isRead: false,
    };

    const { date } = new LatestChat(payload);

    expect(date).toEqual(new Date(Date.now() - eightDays).toDateString());
  });
});
