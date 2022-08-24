export interface IChat {
  from: string;
  to: string;
  chat: string;
}

class Chat {
  from: string;
  to: string;
  chat: string;

  constructor(payload: IChat) {
    this.from = payload.from;
    this.to = payload.to;
    this.chat = payload.chat;
  }
}

export default Chat;
