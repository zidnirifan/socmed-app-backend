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
    // if (type === 'like') {
    //   const userPost = this.postRepository.getUser(postId)

    //   const notif = new Notif({
    //     userId,
    //     to: to || '',
    //     type,
    //   });
    //   await this.notifRepository.addNotif(notif);
    //   const username = await this.userRepository.getUsernameById(userId);
    //   return { ...notif, username };
    // }
  }
}

export default AddNotif;
