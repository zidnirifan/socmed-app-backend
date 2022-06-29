import db from '../../database/mongo/db';
import PostModel from '../../model/Post';
import PostRepositoryMongo from '../PostRepositoryMongo';

describe('PostRepositoryMongo', () => {
  beforeAll(() => {
    db.on('open', () => {});
  });

  afterEach(async () => {
    await PostModel.deleteMany();
  });

  afterAll(() => {
    db.close();
  });

  describe('addPost function', () => {
    it('should save post to database', async () => {
      const post = {
        userId: '62bbec0108243e15bde1c28c',
        caption: 'hello ges',
        media: ['http://images.com/img.png'],
      };

      const postRepositoryMongo = new PostRepositoryMongo();
      const id = await postRepositoryMongo.addPost(post);

      const postSaved = await PostModel.findById(id);

      expect(postSaved.userId.toString()).toEqual(post.userId);
      expect(postSaved.caption).toEqual(post.caption);
      expect(postSaved.media).toEqual(post.media);
    });
  });
});
