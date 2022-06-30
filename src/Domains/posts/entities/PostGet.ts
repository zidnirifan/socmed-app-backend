interface User {
  username: string;
  profilePhoto: string;
}

export interface IPostGet {
  id: string;
  user: User;
  caption: string;
  media: string[];
  createdAt: Date;
}

class PostGet implements IPostGet {
  id: string;
  user: User;
  caption: string;
  media: string[];
  createdAt: Date;

  constructor(payload: IPostGet) {
    this.id = payload.id;
    this.user = payload.user;
    this.caption = payload.caption;
    this.media = payload.media;
    this.createdAt = payload.createdAt;
  }
}

export default PostGet;
