export interface IUserLogin {
  username: string;
  password: string;
}

class UserLogin implements IUserLogin {
  username: string;
  password: string;

  constructor(payload: IUserLogin) {
    this.username = payload.username;
    this.password = payload.password;
  }
}

export default UserLogin;
