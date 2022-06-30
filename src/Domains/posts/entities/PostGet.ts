export interface IPostGet {
  id: string;
  username: string;
  caption: string;
  media: string[];
  createdAt: Date;
}

class PostGet implements IPostGet {
  id: string;
  username: string;
  caption: string;
  media: string[];
  createdAt: Date;

  constructor(payload: IPostGet) {
    this.id = payload.id;
    this.username = payload.username;
    this.caption = payload.caption;
    this.media = payload.media;
    this.createdAt = payload.createdAt;
  }
}

export default PostGet;
