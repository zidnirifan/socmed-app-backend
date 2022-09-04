export interface IUserGet {
  id: string;
  username: string;
  fullName: string;
  profilePhoto: string;
}

class UserGet implements IUserGet {
  id: string;
  username: string;
  fullName: string;
  profilePhoto: string;

  constructor(payload: IUserGet) {
    this.id = payload.id;
    this.username = payload.username;
    this.fullName = payload.fullName;
    this.profilePhoto = payload.profilePhoto;
  }
}

export default UserGet;
