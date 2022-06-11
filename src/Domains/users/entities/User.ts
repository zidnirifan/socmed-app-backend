interface Payload {
  username: string;
  fullName: string;
  password: string;
  profilePhoto?: string;
  bio?: string;
}

class User {
  username: string;
  fullName: string;
  password: string;
  profilePhoto?: string;
  bio?: string;

  constructor(payload: Payload) {
    this.username = payload.username;
    this.fullName = payload.fullName;
    this.password = payload.password;
    this.profilePhoto = payload.profilePhoto || '';
    this.bio = payload.bio || '';

    this.verifyPayload();
  }

  private verifyPayload() {
    if (this.username.length < 5) {
      throw new Error('USER.USERNAME_MINIMAL_CHAR');
    }

    if (this.username.length > 50) {
      throw new Error('USER.USERNAME_LIMIT_CHAR');
    }

    if (!this.username.match(/^[\w]+$/)) {
      throw new Error('USER.USERNAME_CONTAIN_RESTRICTED_CHARACTER');
    }

    if (this.password.length < 8) {
      throw new Error('USER.PASSWORD_MINIMAL_CHAR');
    }
  }
}

export default User;
