import NotifGet from '../NotifGet';

describe('NotifGet entity', () => {
  it('should create NotifGet object correctly', () => {
    const payload = {
      id: 'notif-124',
      user: {
        id: 'user-111',
        username: 'jhondoe',
        profilePhoto: 'img.jpg',
      },
      to: 'user-321',
      type: 'follow' as const,
      text: 'started following you',
      createdAt: new Date(),
      isRead: false,
    };

    const { id, user, to, text, type, createdAt, isRead } = new NotifGet(
      payload
    );

    expect(id).toEqual(payload.id);
    expect(user).toEqual(payload.user);
    expect(to).toEqual(payload.to);
    expect(type).toEqual(payload.type);
    expect(text).toEqual(payload.text);
    expect(isRead).toEqual(payload.isRead);
    expect(createdAt).toEqual('0s');
  });

  it('createdAt should have value "1w"', () => {
    const weekInMs = 7 * 24 * 60 * 60 * 1000;

    const payload = {
      id: 'notif-124',
      user: {
        id: 'user-111',
        username: 'jhondoe',
        profilePhoto: 'img.jpg',
      },
      to: 'user-321',
      type: 'follow' as const,
      text: 'started following you',
      createdAt: new Date(Date.now() - weekInMs),
      isRead: false,
    };

    const { createdAt } = new NotifGet(payload);

    expect(createdAt).toEqual('1w');
  });

  it('createdAt should have value "1d"', () => {
    const dayInMs = 24 * 60 * 60 * 1000;

    const payload = {
      id: 'notif-124',
      user: {
        id: 'user-111',
        username: 'jhondoe',
        profilePhoto: 'img.jpg',
      },
      to: 'user-321',
      type: 'follow' as const,
      text: 'started following you',
      createdAt: new Date(Date.now() - dayInMs),
      isRead: false,
    };

    const { createdAt } = new NotifGet(payload);

    expect(createdAt).toEqual('1d');
  });

  it('createdAt should have value "1h"', () => {
    const hourInMs = 60 * 60 * 1000;

    const payload = {
      id: 'notif-124',
      user: {
        id: 'user-111',
        username: 'jhondoe',
        profilePhoto: 'img.jpg',
      },
      to: 'user-321',
      type: 'follow' as const,
      text: 'started following you',
      createdAt: new Date(Date.now() - hourInMs),
      isRead: false,
    };

    const { createdAt } = new NotifGet(payload);

    expect(createdAt).toEqual('1h');
  });

  it('createdAt should have value "1m"', () => {
    const minuteInMs = 60 * 1000;

    const payload = {
      id: 'notif-124',
      user: {
        id: 'user-111',
        username: 'jhondoe',
        profilePhoto: 'img.jpg',
      },
      to: 'user-321',
      type: 'follow' as const,
      text: 'started following you',
      createdAt: new Date(Date.now() - minuteInMs),
      isRead: false,
    };

    const { createdAt } = new NotifGet(payload);

    expect(createdAt).toEqual('1m');
  });
});
