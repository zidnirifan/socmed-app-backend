type TFileType = 'image/jpeg' | 'image/png' | 'image/webp';

export interface IProfilePhoto {
  userId: string;
  path: string;
  fileName: string;
  fileType: TFileType;
}

class ProfilePhoto implements IProfilePhoto {
  userId: string;
  path: string;
  fileName: string;
  fileType: TFileType;

  constructor(payload: IProfilePhoto) {
    this.userId = payload.userId;
    this.path = payload.path;
    this.fileName = +new Date() + payload.fileName;
    this.fileType = payload.fileType;
  }
}

export default ProfilePhoto;
