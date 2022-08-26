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

    const { id, createdAt, from, to, chat } = new ChatGet(payload);

    expect(id).toEqual(payload.id);
    expect(from).toEqual(payload.from);
    expect(to).toEqual(payload.to);
    expect(chat).toEqual(payload.chat);
    expect(createdAt).toEqual(payload.createdAt);
  });
});
