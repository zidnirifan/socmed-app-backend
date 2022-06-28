export interface IStorage {
  writeFileFromBuffer(buffer: Uint8ClampedArray, originalName: string): string;
}

abstract class Storage implements IStorage {
  abstract writeFileFromBuffer(
    buffer: Uint8ClampedArray,
    originalName: string
  ): string;
}

export default Storage;
