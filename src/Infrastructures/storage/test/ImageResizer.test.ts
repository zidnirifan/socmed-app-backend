import ImageResizer from '../ImageResizer';

describe('ImageResizer', () => {
  describe('resizeImageToBuffer function', () => {
    it('should resize image correctly and return buffer Uint8ClampedArray', async () => {
      const imageResizer = new ImageResizer();

      const buffer = await imageResizer.resizeImageToBuffer(
        'src/infrastructures/storage/test/images/gedang.jpg',
        400
      );

      expect(buffer).toBeInstanceOf(Uint8ClampedArray);
    });
  });
});
