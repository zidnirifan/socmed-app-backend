export interface IComment {
  userId: string;
  content: string;
  postId: string;
  replyTo?: string;
  parentComment?: string;
}

class Comment implements IComment {
  userId: string;
  content: string;
  postId: string;
  replyTo?: string | undefined;
  parentComment?: string | undefined;

  constructor(payload: IComment) {
    this.userId = payload.userId;
    this.content = payload.content;
    this.postId = payload.postId;
    this.replyTo = payload.replyTo;
    this.parentComment = payload.parentComment;
  }
}

export default Comment;
