interface User {
  id: string;
  fullName: string;
  profilePhoto: string;
}

export interface PayloadLatestChat {
  id: string;
  from: User;
  to: User;
  chat: string;
  createdAt: Date;
  isRead: boolean;
}

export interface ILatestChat {
  id: string;
  from: User;
  to: User;
  chat: string;
  isRead: boolean;
  date: string;
  time: string;
}

class LatestChat implements ILatestChat {
  id: string;
  from: User;
  to: User;
  chat: string;
  isRead: boolean;
  date: string;
  time: string;

  constructor(payload: PayloadLatestChat) {
    this.id = payload.id;
    this.from = payload.from;
    this.to = payload.to;
    this.chat = payload.chat;
    this.isRead = payload.isRead;
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

export default LatestChat;
