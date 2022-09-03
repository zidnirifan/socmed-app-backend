type ITypeNotif = 'follow' | 'like' | 'comment';

export interface PayloadNotifGet {
  userId: string;
  to: string;
  type: ITypeNotif;
  text: string;
  postId?: string;
  commentId?: string;
  createdAt: Date;
}

export interface INotifGet {
  userId: string;
  to: string;
  text: string;
  type: ITypeNotif;
  postId?: string;
  commentId?: string;
  createdAt: Date;
}

class NotifGet implements INotifGet {
  userId: string;
  to: string;
  text: string;
  type: ITypeNotif;
  postId?: string;
  commentId?: string;
  createdAt: Date;

  constructor(payload: PayloadNotifGet) {
    this.userId = payload.userId;
    this.to = payload.to;
    this.text = payload.text;
    this.type = payload.type;
    this.postId = payload.postId;
    this.commentId = payload.postId;
    this.createdAt = payload.createdAt;
  }
}

export default NotifGet;
