/* istanbul ignore file */

import Storage from '../Storage';

class MockStorage extends Storage {
  writeFileFromBuffer(
    buffer: Uint8Array,
    fileName: string,
    fileType: string
  ): Promise<string> {
    throw new Error('Method not implemented.');
  }
}

export default MockStorage;
