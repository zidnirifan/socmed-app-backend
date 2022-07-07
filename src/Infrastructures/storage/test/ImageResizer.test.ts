import path from 'path';
import ImageResizer from '../ImageResizer';

describe('ImageResizer', () => {
  describe('resizeImageToBuffer function', () => {
    it('should resize image correctly and return buffer Uint8Array', async () => {
      const imgPath = path.resolve(
        __dirname,
        '../../../test/images/gedang.jpg'
      );
      const imageResizer = new ImageResizer();

      const buffer = await imageResizer.resizeImageToBuffer(imgPath, 400);

      expect(buffer).toBeInstanceOf(Uint8Array);
    });
  });
});
