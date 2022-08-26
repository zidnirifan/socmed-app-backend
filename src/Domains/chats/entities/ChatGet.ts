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
    const secondInMs = 1000;

    const seconds = Math.floor(
      (new Date().valueOf() - date.valueOf()) / secondInMs
    );

    const minutesInSeconds = 60;
    const hourInSeconds = 60 * minutesInSeconds;
    const dayInSeconds = 24 * hourInSeconds;
    const weekInSeconds = 7 * dayInSeconds;

    let interval = seconds / dayInSeconds;
    if (interval <= 1) return 'Today';

    interval = seconds / dayInSeconds;
    if (interval <= 2) return 'Yesterday';

    interval = seconds / weekInSeconds;
    if (interval <= 1)
      return new Date(date).toLocaleDateString('en-ID', { weekday: 'long' });

    return new Date(date).toDateString();
  }
}

export default ChatGet;
