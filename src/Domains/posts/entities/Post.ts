type TFileType = 'image/jpeg' | 'image/png' | 'image/webp' | 'image/gif';

interface Media {
  path: string;
  fileName: string;
  fileType: TFileType;
}

export interface IPost {
  caption?: string;
  media: Media[];
  userId: string;
}

class Post {
  caption?: string;
  media: Media[];
  userId: string;

  constructor(payload: IPost) {
    this.caption = payload.caption || '';
    this.media = payload.media;
    this.media.forEach((e) => {
      e.fileName = +new Date() + e.fileName;
    });
    this.userId = payload.userId;
  }
}

export default Post;
