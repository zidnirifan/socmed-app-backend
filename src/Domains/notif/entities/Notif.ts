export type ITypeNotif =
  | 'follow'
  | 'like-post'
  | 'comment'
  | 'like-comment'
  | 'reply-comment';

export interface PayloadNotif {
  userId: string;
  to?: string;
  type: ITypeNotif;
  postId?: string;
  commentId?: string;
  comment?: string;
}

export interface INotif {
  userId: string;
  to: string;
  text: string;
  type: ITypeNotif;
  postId?: string;
  commentId?: string;
}

class Notif implements INotif {
  userId: string;
  to: string;
  text: string;
  type: ITypeNotif;
  postId?: string;
  commentId?: string;

  constructor(payload: PayloadNotif) {
    this.userId = payload.userId;
    this.to = payload.to || '';
    this.text = this.translateText(payload.type, payload.comment || '');
    this.type = payload.type;
    this.postId = payload.postId;
    this.commentId = payload.commentId;
  }

  private translateText(type: ITypeNotif, comment: string): string {
    if (type === 'follow') return 'started following you';
    if (type === 'like-post') return 'liked your post';
    if (type === 'comment') return `commented: ${comment}`;
    if (type === 'like-comment') return 'liked your comment';
    if (type === 'reply-comment') return `replied your comment: ${comment}`;
    return '';
  }
}

export default Notif;
