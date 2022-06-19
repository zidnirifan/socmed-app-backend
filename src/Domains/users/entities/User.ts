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
    this.username = payload.username;
    this.fullName = payload.fullName;
    this.password = payload.password;
    this.profilePhoto = payload.profilePhoto || '';
    this.bio = payload.bio || '';
  }
}

export default User;
