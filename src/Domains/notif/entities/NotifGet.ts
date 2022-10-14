import { ITypeNotif } from './Notif';

interface UserNotif {
  id: string;
  username: string;
  profilePhoto: string;
}

export interface PayloadNotifGet {
  id: string;
  user: UserNotif;
  to: string;
  type: ITypeNotif;
  text: string;
  postId?: string;
  commentId?: string;
  createdAt: Date;
  isRead: boolean;
}

export interface INotifGet {
  id: string;
  user: UserNotif;
  to: string;
  text: string;
  type: ITypeNotif;
  postId?: string;
  commentId?: string;
  createdAt: string;
  isRead: boolean;
}

class NotifGet implements INotifGet {
  id: string;
  user: UserNotif;
  to: string;
  text: string;
  type: ITypeNotif;
  postId?: string;
  commentId?: string;
  createdAt: string;
  isRead: boolean;

  constructor(payload: PayloadNotifGet) {
    this.id = payload.id;
    this.user = payload.user;
    this.to = payload.to;
    this.text = payload.text;
    this.type = payload.type;
    this.postId = payload.postId;
    this.commentId = payload.commentId;
    this.createdAt = this.timeSince(payload.createdAt);
    this.isRead = payload.isRead;
  }

  private timeSince(date: Date) {
    const secondInMs = 1000;

    const seconds = Math.floor(
      (new Date().valueOf() - date.valueOf()) / secondInMs
    );

    const minutesInSeconds = 60;
    const hourInSeconds = 60 * minutesInSeconds;
    const dayInSeconds = 24 * hourInSeconds;
    const weekInSeconds = 7 * dayInSeconds;

    const timeToText = (amount: number, text: string) => {
      const flooredAmount = Math.floor(amount);
      return `${flooredAmount}${text}`;
    };

    let interval = seconds / weekInSeconds;
    if (interval >= 1) return timeToText(interval, 'w');

    interval = seconds / dayInSeconds;
    if (interval >= 1) return timeToText(interval, 'd');

    interval = seconds / hourInSeconds;
    if (interval >= 1) return timeToText(interval, 'h');

    interval = seconds / minutesInSeconds;
    if (interval >= 1) return timeToText(interval, 'm');

    return timeToText(seconds, 's');
  }
}

export default NotifGet;
