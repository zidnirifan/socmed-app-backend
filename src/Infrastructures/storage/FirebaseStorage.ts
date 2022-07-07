/* istanbul ignore file */

import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import Storage from '../../Applications/storage/Storage';
import firebaseApp from '../firebase';

class FirebaseStorage extends Storage {
  private storage;
  private folder;
  private ref;
  private uploadBytes;
  private getDownloadURL;

  constructor(folder = 'images') {
    super();
    this.storage = getStorage(firebaseApp);
    this.folder = folder;
    this.ref = ref;
    this.uploadBytes = uploadBytes;
    this.getDownloadURL = getDownloadURL;
  }

  async writeFileFromBuffer(
    buffer: Uint8Array,
    fileName: string,
    fileType: string
  ): Promise<string> {
    const metadata = {
      contentType: fileType,
    };
    const imgPath = `${this.folder}/${fileName}`;
    const storageRef = this.ref(this.storage, imgPath);

    await this.uploadBytes(storageRef, buffer, metadata);
    return this.getDownloadURL(ref(this.storage, imgPath));
  }
}

export default FirebaseStorage;
