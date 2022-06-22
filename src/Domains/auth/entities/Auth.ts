export interface IAuth {
  accessToken: string;
  refreshToken: string;
}

class Auth implements IAuth {
  accessToken: string;
  refreshToken: string;

  constructor(payload: IAuth) {
    this.accessToken = payload.accessToken;
    this.refreshToken = payload.refreshToken;
  }
}

export default Auth;
