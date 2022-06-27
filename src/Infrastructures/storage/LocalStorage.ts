/* istanbul ignore file */

import fs from 'fs';
import path from 'path';
import Storage from '../../Applications/storage/Storage';
import config from '../../Commons/config';

class LocalStorage extends Storage {
  private folderPath: string;
  private publicUrl: string;

  constructor(
    folderPath: string = path.resolve(__dirname, '../../../public/images'),
    publicUrl: string = `http://localhost:${config.serverPort}/images`
  ) {
    super();
    this.folderPath = folderPath;
    this.publicUrl = publicUrl;

    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath, { recursive: true });
    }
  }

  writeFileFromBuffer(buffer: Uint8ClampedArray, fileName: string): string {
    const filePath = `${this.folderPath}/${fileName}`;

    fs.writeFile(filePath, buffer, (err) => {
      if (err) console.error(err);
    });

    const url = `${this.publicUrl}/${fileName}`;
    return url;
  }
}

export default LocalStorage;
