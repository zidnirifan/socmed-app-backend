export interface IImageResizer {
  resizeImageToBuffer(srcPath: string, size: number): Promise<Uint8Array>;
}

abstract class ImageResizer implements IImageResizer {
  abstract resizeImageToBuffer(
    srcPath: string,
    size: number
  ): Promise<Uint8Array>;
}

export default ImageResizer;
