import ChatGet from '../ChatGet';

describe('ChatGet entity', () => {
  it('should create ChatGet object correctly', () => {
    const payload = {
      id: 'chat-123',
      from: 'user-1',
      to: 'user-2',
      chat: 'hello',
      createdAt: new Date(),
    };

    const { id, from, to, chat, time, date } = new ChatGet(payload);

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

    const payload = {
      id: 'chat-123',
      from: 'user-1',
      to: 'user-2',
      chat: 'hello',
      createdAt: new Date(Date.now() - hours25),
    };

    const { date } = new ChatGet(payload);

    expect(date).toEqual('Yesterday');
  });

  it('date should have value the day name', () => {
    const threeDays = 3 * 24 * 60 * 60 * 1000;

    const payload = {
      id: 'chat-123',
      from: 'user-1',
      to: 'user-2',
      chat: 'hello',
      createdAt: new Date(Date.now() - threeDays),
    };

    const { date } = new ChatGet(payload);

    expect(date).toEqual(
      new Date(Date.now() - threeDays).toLocaleDateString('en-ID', {
        weekday: 'long',
      })
    );
  });

  it('date should have value the date string', () => {
    const eightDays = 8 * 24 * 60 * 60 * 1000;

    const payload = {
      id: 'chat-123',
      from: 'user-1',
      to: 'user-2',
      chat: 'hello',
      createdAt: new Date(Date.now() - eightDays),
    };

    const { date } = new ChatGet(payload);

    expect(date).toEqual(new Date(Date.now() - eightDays).toDateString());
  });
});
