import Post, { IPost } from '../../Domains/posts/entities/Post';
import { IPostRepository } from '../../Domains/posts/PostRepository';
import { IImageResizer } from '../storage/ImageResizer';
import { IStorage } from '../storage/Storage';
import { IValidator } from '../validator/Validator';

interface Dependency {
  validator: IValidator<IPost>;
  postRepository: IPostRepository;
  imageResizer: IImageResizer;
  storage: IStorage;
}

class AddPost {
  private validator: IValidator<IPost>;
  private postRepository: IPostRepository;
  private imageResizer: IImageResizer;
  private storage: IStorage;

  constructor(dependency: Dependency) {
    this.validator = dependency.validator;
    this.postRepository = dependency.postRepository;
    this.imageResizer = dependency.imageResizer;
    this.storage = dependency.storage;
  }

  async execute(payload: IPost): Promise<string> {
    this.validator.validate(payload);
    const post = new Post(payload);
    const imgWidth = 700;

    const buffers = await Promise.all(
      post.media.map(async (e) => {
        const buffer = await this.imageResizer.resizeImageToBuffer(
          e.path,
          imgWidth
        );
        return { buffer, fileName: e.fileName, fileType: e.fileType };
      })
    );

    const fileNames = await Promise.all(
      buffers.map((b) =>
        this.storage.writeFileFromBuffer(b.buffer, b.fileName, b.fileType)
      )
    );

    return this.postRepository.addPost({
      userId: post.userId,
      caption: post.caption,
      media: fileNames,
    });
  }
}

export default AddPost;
