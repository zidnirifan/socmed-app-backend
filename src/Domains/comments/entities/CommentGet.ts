interface User {
  id: string;
  username: string;
  profilePhoto: string;
}

export interface ReplyTo {
  id: string;
  user: { id: string; username: string };
}

export interface ICommentGet {
  id: string;
  user: User;
  content: string;
  postId: string;
  replyTo?: ReplyTo;
  replies?: ICommentGet[];
  createdAt: string;
}

export interface PayloadCommentGet {
  id: string;
  user: User;
  content: string;
  postId: string;
  replyTo?: ReplyTo;
  replies?: ICommentGet[];
  createdAt: Date;
  likesCount: number;
  isLiked: boolean;
}

class CommentGet implements ICommentGet {
  id: string;
  user: User;
  content: string;
  postId: string;
  replyTo?: ReplyTo;
  replies?: ICommentGet[];
  createdAt: string;
  likesCount: number;
  isLiked: boolean;

  constructor(payload: PayloadCommentGet) {
    this.id = payload.id;
    this.user = payload.user;
    this.content = payload.content;
    this.postId = payload.postId;
    this.replyTo = payload.replyTo;
    this.replies = payload.replies;
    this.createdAt = this.timeSince(payload.createdAt);
    this.likesCount = payload.likesCount;
    this.isLiked = payload.isLiked;
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
