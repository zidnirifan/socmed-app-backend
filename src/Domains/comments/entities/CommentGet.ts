interface User {
  id: string;
  username: string;
  profilePhoto: string;
}

export interface PayloadCommentGet {
  user: User;
  content: string;
  postId: string;
  replyTo?: string;
  createdAt: Date;
}

export interface ICommentGet {
  user: User;
  content: string;
  postId: string;
  replyTo?: string;
  createdAt: string;
}

class CommentGet implements ICommentGet {
  user: User;
  content: string;
  postId: string;
  replyTo?: string | undefined;
  createdAt: string;

  constructor(payload: PayloadCommentGet) {
    this.user = payload.user;
    this.content = payload.content;
    this.postId = payload.postId;
    this.replyTo = payload.replyTo;
    this.createdAt = this.timeSince(payload.createdAt);
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

export default CommentGet;
