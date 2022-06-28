export interface IImageResizer {
  resizeImageToBuffer(
    srcPath: string,
    size: number
  ): Promise<Uint8ClampedArray>;
}

abstract class ImageResizer implements IImageResizer {
  abstract resizeImageToBuffer(
    srcPath: string,
    size: number
  ): Promise<Uint8ClampedArray>;
}

export default ImageResizer;
