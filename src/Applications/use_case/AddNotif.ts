import { ICommentRepository } from '../../Domains/comments/CommentRepository';
import Notif, {
  ITypeNotif,
  PayloadNotif,
} from '../../Domains/notif/entities/Notif';
import { INotifRepository } from '../../Domains/notif/NotifRepository';
import { IPostRepository } from '../../Domains/posts/PostRepository';
import { IUserRepository } from '../../Domains/users/UserRepository';

interface IDependency {
  notifRepository: INotifRepository;
  userRepository: IUserRepository;
  postRepository: IPostRepository;
  commentRepository: ICommentRepository;
}

interface INotif {
  userId: string;
  username: string;
  to?: string;
  type: ITypeNotif;
  postId?: string;
  commentId?: string;
  comment?: string;
}

class AddNotif {
  private notifRepository: INotifRepository;
  private userRepository: IUserRepository;
  private postRepository: IPostRepository;
  private commentRepository: ICommentRepository;

  constructor(dependency: IDependency) {
    this.notifRepository = dependency.notifRepository;
    this.userRepository = dependency.userRepository;
    this.postRepository = dependency.postRepository;
    this.commentRepository = dependency.commentRepository;
  }

  // eslint-disable-next-line consistent-return
  async execute({
    userId,
    to,
    type,
    postId,
    commentId,
    comment,
  }: PayloadNotif): Promise<INotif | void> {
    if (type === 'follow') {
      const notif = new Notif({
        userId,
        to: to || '',
        type,
      });
      this.notifRepository.addNotif(notif);
      const username = await this.userRepository.getUsernameById(userId);
      return { ...notif, username };
    }

    if (type === 'like-post') {
      const userIdPost = await this.postRepository.getUserIdPost(postId || '');

      const notif = new Notif({
        userId,
        to: userIdPost,
        type,
        postId,
      });
      this.notifRepository.addNotif(notif);

      const username = await this.userRepository.getUsernameById(userId);

      return { ...notif, username };
    }

    if (type === 'comment') {
      const userIdPost = await this.postRepository.getUserIdPost(postId || '');

      const notif = new Notif({
        userId,
        to: userIdPost,
        type,
        comment,
        commentId,
        postId,
      });
      this.notifRepository.addNotif(notif);

      const username = await this.userRepository.getUsernameById(userId);

      return { ...notif, username };
    }

    if (type === 'like-comment') {
      const userIdComment = await this.commentRepository.getUserIdComment(
        commentId || ''
      );

      const notif = new Notif({
        userId,
        to: userIdComment,
        type,
        commentId,
      });
      this.notifRepository.addNotif(notif);

      const username = await this.userRepository.getUsernameById(userId);

      return { ...notif, username };
    }

    if (type === 'reply-comment') {
      const userIdComment = await this.commentRepository.getUserIdComment(
        commentId || ''
      );

      const notif = new Notif({
        userId,
        to: userIdComment,
        type,
        commentId,
        postId,
        comment,
      });
      this.notifRepository.addNotif(notif);

      const username = await this.userRepository.getUsernameById(userId);

      return { ...notif, username };
    }
  }
}

export default AddNotif;
