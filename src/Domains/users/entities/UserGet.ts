export interface IUserGet {
  id: string;
  username: string;
  fullName: string;
  profilePhoto: string;
  isFollowed: boolean;
}

class UserGet implements IUserGet {
  id: string;
  username: string;
  fullName: string;
  profilePhoto: string;
  isFollowed: boolean;

  constructor(payload: IUserGet) {
    this.id = payload.id;
    this.username = payload.username;
    this.fullName = payload.fullName;
    this.profilePhoto = payload.profilePhoto;
    this.isFollowed = payload.isFollowed;
  }
}

export default UserGet;
