import AddPost from '../AddPost';
import MockPostRepository from '../../../Domains/posts/test/PostRepositoryTestHelper';
import MockImageResizer from '../../storage/test/ImageResizerTestHelper';
import MockStorage from '../../storage/test/StorageTestHelper';
import MockValidator from '../../validator/test/ValidatorTestHelper';

describe('AddPost use case', () => {
  it('should orchestrating add post action correctly', async () => {
    // Arrange
    const payload = {
      userId: 'user-123',
      caption: 'helo ges',
      media: [
        {
          path: '/images/img.jpg',
          fileName: 'img.jpg',
          fileType: 'image/jpeg' as const,
        },
      ],
    };

    const buffer = new Uint8Array([1, 2]);
    const mediaUrl = 'http://image.com/img.jpg';
    const postId = 'post-123';

    const mockValidator = new MockValidator();
    const mockPostRepository = new MockPostRepository();
    const mockImageResizer = new MockImageResizer();
    const mockStorage = new MockStorage();

    // Mocking
    mockValidator.validate = jest.fn(() => {});
    mockImageResizer.resizeImageToBuffer = jest.fn(() =>
      Promise.resolve(buffer)
    );
    mockStorage.writeFileFromBuffer = jest.fn(() => Promise.resolve(mediaUrl));
    mockPostRepository.addPost = jest.fn(() => Promise.resolve(postId));

    // Create use case instance
    const addPost = new AddPost({
      validator: mockValidator,
      postRepository: mockPostRepository,
      imageResizer: mockImageResizer,
      storage: mockStorage,
    });

    // Action
    const id = await addPost.execute(payload);

    // Assert
    expect(id).toEqual(postId);
    expect(mockValidator.validate).toBeCalledWith(payload);
    expect(mockImageResizer.resizeImageToBuffer).toBeCalledWith(
      payload.media[0].path,
      700
    );
    expect(mockStorage.writeFileFromBuffer).toBeCalled();
    expect(mockPostRepository.addPost).toBeCalledWith({
      userId: payload.userId,
      caption: payload.caption,
      media: [mediaUrl],
    });
  });
});
