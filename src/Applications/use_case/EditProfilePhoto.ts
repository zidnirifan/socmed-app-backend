import ProfilePhoto, {
  IProfilePhoto,
} from '../../Domains/users/entities/ProfilePhoto';
import { IUserRepository } from '../../Domains/users/UserRepository';
import { IImageResizer } from '../storage/ImageResizer';
import { IStorage } from '../storage/Storage';
import { IValidator } from '../validator/Validator';

interface Dependency {
  validator: IValidator<IProfilePhoto>;
  imageResizer: IImageResizer;
  storage: IStorage;
  userRepository: IUserRepository;
}

class EditProfilePhoto {
  validator: IValidator<IProfilePhoto>;
  imageResizer: IImageResizer;
  storage: IStorage;
  userRepository: IUserRepository;

  constructor(dependency: Dependency) {
    this.validator = dependency.validator;
    this.imageResizer = dependency.imageResizer;
    this.storage = dependency.storage;
    this.userRepository = dependency.userRepository;
  }

  async execute(payload: IProfilePhoto) {
    this.validator.validate(payload);
    await this.userRepository.isUserExistById(payload.userId);
    const { path, fileName, userId, fileType } = new ProfilePhoto(payload);
    const widthImg = 400;
    const buffer = await this.imageResizer.resizeImageToBuffer(path, widthImg);
    const photoUrl = await this.storage.writeFileFromBuffer(
      buffer,
      fileName,
      fileType
    );
    await this.userRepository.editProfilePhotoById(userId, photoUrl);
    return photoUrl;
  }
}

export default EditProfilePhoto;
