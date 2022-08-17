import sharp from 'sharp';
import ImageResizerAbstract from '../../Applications/storage/ImageResizer';

class ImageResizer extends ImageResizerAbstract {
  private sharp;

  constructor() {
    super();
    this.sharp = sharp;
  }

  async resizeImageToBuffer(
    srcPath: string,
    size: number
  ): Promise<Uint8Array> {
    const { data } = await this.sharp(srcPath)
      .resize(size)
      .withMetadata()
      .toBuffer({ resolveWithObject: true });
    return new Uint8Array(data.buffer);
  }
}

export default ImageResizer;
