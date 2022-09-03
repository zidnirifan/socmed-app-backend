export interface PayloadChatGet {
  id: string;
  from: string;
  to: string;
  chat: string;
  createdAt: Date;
}

export interface IChatGet {
  id: string;
  from: string;
  to: string;
  chat: string;
  date: string;
  time: string;
}

class ChatGet implements IChatGet {
  id: string;
  from: string;
  to: string;
  chat: string;
  date: string;
  time: string;

  constructor(payload: PayloadChatGet) {
    this.id = payload.id;
    this.from = payload.from;
    this.to = payload.to;
    this.chat = payload.chat;
    this.date = this.formatDate(payload.createdAt);
    this.time = new Date(payload.createdAt).toLocaleTimeString('id-ID', {
      hour: '2-digit',
      minute: '2-digit',
    });
  }

  private formatDate(date: Date) {
    const now = new Date();
    const chat = new Date(date);

    const dateNow = now.toDateString();
    const dayNow = now.getDate();
    const monthYearNow = now.toLocaleDateString('en-ID', {
      year: 'numeric',
      month: 'numeric',
    });

    const dateChat = chat.toDateString();
    const dayChat = chat.getDate();
    const monthYearChat = chat.toLocaleDateString('en-ID', {
      year: 'numeric',
      month: 'numeric',
    });

    const secondInMs = 1000;

    const seconds = Math.floor(
      (new Date().valueOf() - date.valueOf()) / secondInMs
    );

    const weekInSeconds = 7 * 24 * 60 * 60;

    if (dateNow === dateChat) return 'Today';

    if (dayNow - 1 === dayChat && monthYearNow === monthYearChat)
      return 'Yesterday';

    const interval = seconds / weekInSeconds;
    if (interval <= 1)
      return new Date(date).toLocaleDateString('en-ID', { weekday: 'long' });

    return dateChat;
  }
}

export default ChatGet;
