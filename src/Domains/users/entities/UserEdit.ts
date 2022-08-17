export interface IUserEdit {
  id: string;
  username: string;
  fullName: string;
  bio?: string;
}

class UserEdit implements IUserEdit {
  id: string;
  username: string;
  fullName: string;
  bio?: string;

  constructor(payload: IUserEdit) {
    this.id = payload.id;
    this.username = payload.username;
    this.fullName = payload.fullName;
    this.bio = payload.bio || '';
  }
}

export default UserEdit;
