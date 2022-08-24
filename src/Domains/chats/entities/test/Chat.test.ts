import Chat from '../Chat';

describe('Chat entity', () => {
  it('should create Chat object correctly', () => {
    const payload = {
      from: 'user-1',
      to: 'user-2',
      chat: 'hello',
    };

    const { from, to, chat } = new Chat(payload);

    expect(from).toEqual(payload.from);
    expect(to).toEqual(payload.to);
    expect(chat).toEqual(payload.chat);
  });
});
