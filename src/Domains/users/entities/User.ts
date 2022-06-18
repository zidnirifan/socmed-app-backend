export interface IUser {
  username: string;
  fullName: string;
  password: string;
  profilePhoto?: string;
  bio?: string;
}

class User implements IUser {
  username: string;
  fullName: string;
  password: string;
  profilePhoto?: string;
  bio?: string;

  constructor(payload: IUser) {
    this.verifyPayload(payload);

    this.username = payload.username;
    this.fullName = payload.fullName;
    this.password = payload.password;
    this.profilePhoto = payload.profilePhoto || '';
    this.bio = payload.bio || '';
  }

  private verifyPayload(payload: IUser) {
    const { username, fullName, password } = payload;

    if (!username || !fullName || !password) {
      throw new Error('USER.NOT_CONTAIN_NEEDED_PROPERTY');
    }

    if (
      typeof username !== 'string' ||
      typeof fullName !== 'string' ||
      typeof password !== 'string'
    ) {
      throw new Error('USER.NOT_MEET_DATA_TYPE_SPESIFICATION');
    }

    if (username.length < 5) {
      throw new Error('USER.USERNAME_MINIMAL_CHAR');
    }

    if (username.length > 50) {
      throw new Error('USER.USERNAME_LIMIT_CHAR');
    }

    if (!username.match(/^[\w]+$/)) {
      throw new Error('USER.USERNAME_CONTAIN_RESTRICTED_CHARACTER');
    }

    if (password.length < 8) {
      throw new Error('USER.PASSWORD_MINIMAL_CHAR');
    }
  }
}

export default User;
