export interface IChatGet {
  id: string;
  from: string;
  to: string;
  chat: string;
  createdAt: Date;
}

class ChatGet {
  id: string;
  from: string;
  to: string;
  chat: string;
  createdAt: Date;

  constructor(payload: IChatGet) {
    this.id = payload.id;
    this.from = payload.from;
    this.to = payload.to;
    this.chat = payload.chat;
    this.createdAt = payload.createdAt;
  }
}

export default ChatGet;
