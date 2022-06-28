/* istanbul ignore file */

import Storage from '../Storage';

class MockStorage extends Storage {
  writeFileFromBuffer(buffer: Uint8ClampedArray, originalName: string): string {
    throw new Error('Method not implemented.');
  }
}

export default MockStorage;
