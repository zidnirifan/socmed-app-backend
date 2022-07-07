/* istanbul ignore file */

import ImageResizer from '../ImageResizer';

class MockImageResizer extends ImageResizer {
  resizeImageToBuffer(srcPath: string, size: number): Promise<Uint8Array> {
    throw new Error('Method not implemented.');
  }
}

export default MockImageResizer;
