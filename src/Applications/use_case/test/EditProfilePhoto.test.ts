import EditProfilePhoto from '../EditProfilePhoto';
import MockUserRepository from '../../../Domains/users/test/UserRepositoryTestHelper';
import MockImageResizer from '../../storage/test/ImageResizerTestHelper';
import MockStorage from '../../storage/test/StorageTestHelper';
import MockValidator from '../../validator/test/ValidatorTestHelper';

describe('EditProfilePhoto use case', () => {
  it('should orchestrating the edit profile photo action correctly', async () => {
    // Arrange
    const payload = {
      userId: 'user-123',
      path: '/images/img.jpg',
      fileName: 'img.jpg',
      fileType: 'image/jpeg' as const,
    };

    const buffer = new Uint8Array([1, 2]);
    const profilePhotoUrl = 'http://image.com/img.jpg';

    const mockValidator = new MockValidator();
    const mockUserRepository = new MockUserRepository();
    const mockImageResizer = new MockImageResizer();
    const mockStorage = new MockStorage();

    // Mocking
    mockValidator.validate = jest.fn(() => {});
    mockUserRepository.isUserExistById = jest.fn(() => Promise.resolve());
    mockImageResizer.resizeImageToBuffer = jest.fn(() =>
      Promise.resolve(buffer)
    );
    mockStorage.writeFileFromBuffer = jest.fn(() =>
      Promise.resolve(profilePhotoUrl)
    );
    mockUserRepository.editProfilePhotoById = jest.fn(() => Promise.resolve());

    // Create use case instance
    const editProfilePhoto = new EditProfilePhoto({
      validator: mockValidator,
      userRepository: mockUserRepository,
      imageResizer: mockImageResizer,
      storage: mockStorage,
    });

    // Action
    const profilePhoto = await editProfilePhoto.execute(payload);

    // Assert
    expect(profilePhoto).toEqual(profilePhotoUrl);
    expect(mockValidator.validate).toBeCalledWith(payload);
    expect(mockUserRepository.isUserExistById).toBeCalledWith(payload.userId);
    expect(mockImageResizer.resizeImageToBuffer).toBeCalledWith(
      payload.path,
      400
    );
    expect(mockStorage.writeFileFromBuffer).toBeCalled();
    expect(mockUserRepository.editProfilePhotoById).toBeCalledWith(
      payload.userId,
      profilePhotoUrl
    );
  });
});
