export interface IStorage {
  writeFileFromBuffer(
    buffer: Uint8Array,
    fileName: string,
    fileType: string
  ): Promise<string>;
}

abstract class Storage implements IStorage {
  abstract writeFileFromBuffer(
    buffer: Uint8Array,
    fileName: string,
    fileType: string
  ): Promise<string>;
}

export default Storage;
