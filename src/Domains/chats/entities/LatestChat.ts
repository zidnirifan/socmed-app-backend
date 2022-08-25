interface User {
  id: string;
  fullName: string;
  profilePhoto: string;
}

export interface ILatestChat {
  id: string;
  from: User;
  to: User;
  chat: string;
  createdAt: Date;
}

class LatestChat {
  id: string;
  from: User;
  to: User;
  chat: string;
  createdAt: Date;

  constructor(payload: ILatestChat) {
    this.id = payload.id;
    this.from = payload.from;
    this.to = payload.to;
    this.chat = payload.chat;
    this.createdAt = payload.createdAt;
  }
}

export default LatestChat;
