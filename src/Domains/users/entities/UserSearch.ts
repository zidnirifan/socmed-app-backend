export interface IUserSearch {
  id: string;
  username: string;
  fullName: string;
  profilePhoto: string;
}

class UserSearch implements IUserSearch {
  id: string;
  username: string;
  fullName: string;
  profilePhoto: string;

  constructor(payload: IUserSearch) {
    this.id = payload.id;
    this.username = payload.username;
    this.fullName = payload.fullName;
    this.profilePhoto = payload.profilePhoto;
  }
}

export default UserSearch;
