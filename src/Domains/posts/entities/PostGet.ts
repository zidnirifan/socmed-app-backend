interface User {
  id: string;
  username: string;
  profilePhoto: string;
}

export interface PayloadPostGet {
  id: string;
  user: User;
  caption: string;
  media: string[];
  createdAt: Date;
  likesCount: number;
  isLiked: boolean;
  commentsCount: number;
}

export interface IPostGet {
  id: string;
  user: User;
  caption: string;
  media: string[];
  createdAt: string;
  likesCount: number;
  isLiked: boolean;
  commentsCount: number;
}

class PostGet implements IPostGet {
  id: string;
  user: User;
  caption: string;
  media: string[];
  createdAt: string;
  likesCount: number;
  isLiked: boolean;
  commentsCount: number;

  constructor(payload: PayloadPostGet) {
    this.id = payload.id;
    this.user = payload.user;
    this.caption = payload.caption;
    this.media = payload.media;
    this.likesCount = payload.likesCount;
    this.createdAt = this.timeSince(payload.createdAt);
    this.isLiked = payload.isLiked;
    this.commentsCount = payload.commentsCount;
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
    const monthInSeconds = 30 * dayInSeconds;
    const yearInSeconds = 365 * dayInSeconds;

    const isSingle = (amount: number) => (amount === 1 ? '' : 's');

    const timeToText = (amount: number, text: string) => {
      const flooredAmount = Math.floor(amount);
      return `${flooredAmount} ${text}${isSingle(flooredAmount)} ago`;
    };

    let interval = seconds / yearInSeconds;
    if (interval >= 1) return timeToText(interval, 'year');

    interval = seconds / monthInSeconds;
    if (interval >= 1) return timeToText(interval, 'month');

    interval = seconds / weekInSeconds;
    if (interval >= 1) return timeToText(interval, 'week');

    interval = seconds / dayInSeconds;
    if (interval >= 1) return timeToText(interval, 'day');

    interval = seconds / hourInSeconds;
    if (interval >= 1) return timeToText(interval, 'hour');

    interval = seconds / minutesInSeconds;
    if (interval >= 1) return timeToText(interval, 'minute');

    return timeToText(seconds, 'second');
  }
}

export default PostGet;
